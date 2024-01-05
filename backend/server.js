// packages
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

// utils
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

// setup
dotenv.config();
connectDB();

// middleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

// app.get('/', (req, res) => {
//     res.send('/ 🍎');
// });

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});