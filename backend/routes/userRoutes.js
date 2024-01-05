import express from 'express';
import {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
} from '../controllers/userController.js';

import { userAuth, adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createUser).get(userAuth, adminAuth, getAllUsers);
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/profile').get(userAuth, getCurrentUserProfile).put(userAuth, updateCurrentUserProfile)

export default router;
