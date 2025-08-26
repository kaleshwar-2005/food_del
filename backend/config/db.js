import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://kaleshwarlakaram2005:14042005@cluster0.onhqqwb.mongodb.net/food_del').then(()=>
        console.log("DB connected successfully"))
}