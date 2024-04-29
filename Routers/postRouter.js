import express from 'express'
import { getPosts, addPost,updatePost,deletePost,getImageById } from '../Controllers/postController.js'
import {upload} from '../upload.js'

import passport from '../passport.js';

const postRouter = express.Router()

postRouter.get('/',getPosts)

postRouter.get('/images/:id',getImageById)
  
postRouter.post('/',passport.authenticate('jwt', { session: false }),upload.single('image'),addPost)

postRouter.patch('/:id',updatePost)

postRouter.delete('/:id',deletePost)


export default postRouter