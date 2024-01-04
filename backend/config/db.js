import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Hello! 🍎");
        const conn = await mongoose.connect(process.env.MONGODB); 
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
};

export default connectDB