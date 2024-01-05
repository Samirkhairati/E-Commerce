import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB); 
        console.log(`MongoDB connected 🍀`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
};

export default connectDB 