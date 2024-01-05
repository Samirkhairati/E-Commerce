import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const createUser = asyncHandler((req, res, next) => { 
    // const { name, email, password } = req.body;
    // const user = await User.create({ name, email, password });

    // res.status(201).json({
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    // });

    res.send('createUser invoked: 🍎');
    next();
})

export { createUser };