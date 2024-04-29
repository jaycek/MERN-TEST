import express from 'express'
import cors from 'cors'
import userRouter from './Routers/userRouter.js'
import employeeRouter from './Routers/employeeRouter.js'
import postRouter from './Routers/postRouter.js'
import path from 'path'
import 'dotenv/config';
import mongoose from "mongoose";

async function main() {
    // console.log(process.env.MONGODB_URL)
    await mongoose.connect(process.env.MONGODB_URL);
}           
main().then(console.log("DB connected")).catch(err => console.log(err));


const app=express()

app.use(express.json())
app.use(cors())
app.use('/api/users',userRouter)
app.use('/api/employees',employeeRouter)
app.use('/api/posts',postRouter)

const __dirname = path.resolve();
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname,'/dist')))
app.get('/*', function(req, res) 
{ res.sendFile(path.join(__dirname ,'/dist/index.html')); });


// app.use(express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

