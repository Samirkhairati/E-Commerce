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
const app = express();
const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
app.use(cors(
    {
        origin: true,
        credentials: true,
    }
));

// routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);




// TEST
app.get('/', (req, res) => {
    res.send(`API is running on port ${process.env.PORT}...`);
})

app.listen(process.env.PORT || 6969, () => {
    console.log(`Server running on port ${process.env.PORT || 6969}`);
});