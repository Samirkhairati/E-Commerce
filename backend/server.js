// packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

// utils
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from './routes/orderRoutes.js';


// setup
dotenv.config();
connectDB();

// middleware
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
     {
    //     // origin: 'https://e-commerce-production-ecfb.up.railway.app', Railway URL
    //     // origin: 'http://localhost:5173', //Development URL
    //     // origin: 'http://localhost:3000', Build URL
    //    origin:  process.env.FRONTEND_URL || 'http://localhost:5173',
    //     credentials: true,
     }
));
// routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get('/', (req, res) => {
    res.send(`API is running on port ${process.env.PORT}...`);
})

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(process.env.PORT || 6969, () => {
    console.log(`Server running on port ${process.env.PORT || 6969}`);
});