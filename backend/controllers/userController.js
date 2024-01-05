import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const createUser = asyncHandler( async (req, res, next) => { 
    
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('@createUser ERORR: Please provide all fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('@createUser ERROR: User already exists');
    }

    const user = new User({ username, email, password });
    try {
        await user.save();
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
        })
    }
    catch (error) {
        res.status(400);
        throw new Error('@createUser ERROR: User could not be created');
    }
    next();

}, '@createUser ERROR: definition: ')

export { createUser };