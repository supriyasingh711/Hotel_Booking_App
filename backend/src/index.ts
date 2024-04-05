import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import { Server } from 'http';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

// app.get("/api/test",async(req,res)=>{
//     res.json({message:"hello from express endpoint!"})
// })
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.listen(7000,()=>{
    console.log("server running")
})