import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function connectDB () {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log ("MongoDB connection successfull!");
    } catch (error) {
        console.error ("MongoDB connection error", error);
        process.exit(1);
    }
}
