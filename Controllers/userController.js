import User from "../Models/userModel.js"
import bcrypt from 'bcrypt'
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken'
import 'dotenv/config';

const jwt_secret_key = process.env.JWT_SECRET_KEY
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt_secret_key // Replace with your secret key
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));
const addUser = async (req,res)=>{

  try {
    
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds,async (err, hash) => {
      if (err) {
        console.error('Error occurred while hashing:', err);
        res.status(500).json({ error: 'Error while hashing' });
      }
      var userItem = {
        name : req.body.name,
        email: req.body.email,
        username : req.body.username,
        password : hash,
        createdAt:new Date()
      }
      console.log(userItem)
      var user = new User(userItem)
      await user.save()
      res.status(200).json(user)
    });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
      
  }

  const getUsers = async (req, res) => {
    try {
      
      const users= await User.find({});
      if (!users) {
        return res.status(404).json({ error: 'Users not found' });
      }
      console.log(users)
       res.status(200).json(users)
    } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
 }

 const getUserByUserName = async (req,res)=>{
  const useritem = await User.findOne({username :req.params.username});
  console.log(req.params.username)
  res.status(200).json(useritem)

 }

 const getUserById = async (req,res)=>{
  try {
    const useritem = await User.findById(req.params.id);
    if (!useritem) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(req.params.id)
    res.status(200).json(useritem)
    
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

 }
 const updateUserbyID = async (req,res)=>{
  const useritem = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
  console.log(useritem)
  res.status(200).json(useritem)

 }
 const updateUser = async(req, res,next) => {
  console.log("Updated user")
  await User.findOneAndUpdate({ name: '1234Test' }, { name: 'Jane Doe' })
  
  next()
}

const deleteUser = async (req,res)=>{
  const useritem = await User.findByIdAndDelete(req.params.id);
  console.log(useritem)
  res.status(200).json(useritem)

 }
const sendMail = (req,res)=>{
  res.send(`Updated user ${req.params.userId}`)
}

const login = async (req,res)=>{

  try {
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(!user){
      return res.status(500).json({message:"User not found"})
    }

    const isValid = await bcrypt.compare(password,user.password)
    console.log(isValid)
    if(!isValid){
      return res.status(401).json({message:"Invalid credentials"})
    }
    let payload={user:email,pwd:password};
    let token=jwt.sign(payload,jwt_secret_key);

    
    res.status(200).json({message:'Login successful',isAuthenticated:true,token:token})
  } catch (error) {
    console.error(error);
        res.status(500).json(error);
  }
}
export {login,getUsers,getUserById,getUserByUserName,updateUserbyID,addUser,updateUser,deleteUser,sendMail}

