console.log("Hello! 🍎");

// packages
const express = require('express');
const dotenv = require('dotenv');
import path from 'path';
import cookieParser from 'cookie-parser';

// utils
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is running...');
});
