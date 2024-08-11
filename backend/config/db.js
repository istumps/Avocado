import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MongoDB_URI)
    .then(()=>{console.log("Connected to MongoDB")})
}