import express from 'express';
import {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from '../controllers/userController.js';

import { userAuth, adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(createUser)
    .get(getAllUsers);

router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)

router.route('/profile')
    .put(userAuth, updateCurrentUserProfile)
    .get(userAuth, getCurrentUserProfile)
    

router.route('/:id')
    .delete(userAuth, adminAuth, deleteUserById)
    .get(userAuth, adminAuth, getUserById)
    .put(userAuth, adminAuth, updateUserById)

export default router;
