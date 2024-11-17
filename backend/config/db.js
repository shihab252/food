import mongoose from "mongoose";

export const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://Shihabkhan:OpCuXx04MwL6Q5lX@cluster0.z9drg.mongodb.net/delivaryweb").then(()=>console.log("DB connected"));
}