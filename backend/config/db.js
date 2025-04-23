

import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://kushal123:dummy9860@cluster0.jr6ugis.mongodb.net/food-del').then(()=>{
        console.log("Connected to MongoDB")
    })
}

