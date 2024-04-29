import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    image:String,
    title:String,
    subtitle:String,
    desc:String

  }, {versionKey:false});
  const Post = mongoose.model('posts', blogSchema);

  export default Post;