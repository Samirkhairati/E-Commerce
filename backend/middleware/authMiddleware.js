import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

const userAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    } else {
        throw new Error('@userAuth ERROR: No token, authorization denied');
    }

    
}, '@userAuth ERROR: definition: ');

const adminAuth = asyncHandler(async (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Not Authorized as an admin' });
        throw new Error('@adminAuth ERROR: Not authorized as an admin');
    }
    
}, '@adminAuth ERROR: definition: ')

export { userAuth, adminAuth };
