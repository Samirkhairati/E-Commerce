// goes over createUser, loginUser, logoutUser;

import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';

const createUser = asyncHandler(async (req, res, next) => {

    // fields check
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('@createUser ERORR: Please provide all fields');
    }

    // check if registered
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).send('User already exists');
        throw new Error('@createUser ERROR: User already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload to db
    const user = new User({ username, email, password: hashedPassword });
    try {
        await user.save();
        createToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
        })
    } catch (error) {
        res.status(400);
        throw new Error('@createUser ERROR: User could not be created');
    }


    next();

}, '@createUser ERROR: definition: ')

const loginUser = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    // fields check
    if (!email || !password) {
        res.status(400);
        throw new Error('@loginUser ERROR: Please provide all fields');
    }

    if (!email.includes('@') || !email.includes('.')) {
        res.status(400);
        throw new Error('@loginUser ERROR: Please provide a valid email');
    }

    // check if registered
    const userExists = await User.findOne({ email });
    if (!userExists) {
        res.status(400);
        throw new Error('@loginUser ERROR: User does not exist');
    } else {
        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if (!passwordMatch) {
            res.status(400);
            throw new Error('@loginUser ERROR: Password is incorrect');
        } else {
            createToken(res, userExists._id);
            res.status(200).json({
                _id: userExists._id,
                username: userExists.username,
                email: userExists.email,
                password: userExists.password,
            });
        }
    }
    next();

}, '@loginUser ERROR: definition: ')

const logoutUser = asyncHandler(async (req, res, next) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({message: 'User logged out',});

    next();

}, '@logoutUser ERROR: definition: ')

const getAllUsers = asyncHandler(async (req, res, next) => {

    const users = await User.find({});
    res.status(200).json(users);
    next();

}, '@getAllUsers ERROR: definition: ')

const getCurrentUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('@getCurrentUserProfile ERROR: User not found');
    }
}, '@getCurrentUserProfile ERROR: definition: ')

const updateCurrentUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    
    if (user) {

        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
         next()
    } else {
        res.status(404);
        throw new Error('@updateCurrentUserProfile ERROR: User not found');
    }

}, '@updateCurrentUserProfile ERROR: definition: ')

export { 
    createUser, 
    loginUser, 
    logoutUser, 
    getAllUsers, 
    getCurrentUserProfile,
    updateCurrentUserProfile,
};