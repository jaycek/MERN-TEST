import mongoose from 'mongoose'

// async function main() {
//   await mongoose.connect('mongodb+srv://user1:NWdH60okKMkYY5zx@cluster0.fsqnz3x.mongodb.net/FSDCrashCourse');

  
// }

// main().then(console.log("Connected to DB")).catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    username:String,
    email:String,
    password:String,
    createdAt: Date
});

const User = mongoose.model('users', userSchema, 'users');

export default User;