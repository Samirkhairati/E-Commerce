import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { json } from 'express';

const userAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token)
    if (token) {
        console.log("hi4")
        try {
            console.log("hi")
            const decoded = jwt.verify(token, process.env.JWT);
            console.log(decoded)
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('@userAuth ERROR: Not authorized, token failed');
        }
    } else {
        console.log("hi5")
        throw new Error('@userAuth ERROR: No token, authorization denied');
    }

    
}, '@userAuth ERROR: definitio12323n: ');

const adminAuth = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('@adminAuth ERROR: Not authorized as an admin');
    }
    
}, '@adminAuth ERROR: definition: ')

export { userAuth, adminAuth };
