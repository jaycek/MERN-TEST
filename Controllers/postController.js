import Post from "../Models/postModel.js";
import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();

const getPosts = async (req, res) => {

    try {
        const posts= await Post.find({});
        console.log(posts)
        res.status(200).send(posts)
        
    } catch (error) {
        console.error(error);
         res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addPost =  async (req, res) => {

    try {
        console.log(req.body)
        console.log(req.file.filename)
        var postItem = {
           image : req.file.filename,
           title : req.body.title,
           subtitle : req.body.subtitle,
           desc:req.body.desc
            
        }
      var post = new Post(postItem);
      await post.save();
       // Set the imageUrl based on your server URL and the image ID
       post.imageUrl = `http://localhost:3000/uploads/${post._id}`;
    //this is for getting the image from the database

    // Save the updated Image model
    await post.save();
      res.status(200).send(post)}
        
     catch (error) {
        console.error(error);
         res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updatePost = async (req,res)=>{

    try {
        
        const postItem = await Post.findByIdAndUpdate(req.params.id, req.body,{new:true});
        console.log(postItem)
        res.status(200).json(postItem)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
   }

   const deletePost = async (req,res)=>{
    try {
        const item = await Post.findByIdAndDelete(req.params.id);
        console.log(item)
        res.status(200).json({message: "Post deleted"})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
   }

   const getImageById = async (req,res)=>{
    try {
        const id = req.params.id
        const post = await Post.findById(id).exec();
        if (! post) return res.status(404).json({ error: 'Image not found' });
        const imagePath = path.join(__dirname, 'uploads', post.image);
        console.log( imagePath)
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ error: 'Image file not found' });
          }
      
          // Send the image file as a response
          res.sendFile(imagePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

   }
export {getPosts,addPost,updatePost,deletePost,getImageById}