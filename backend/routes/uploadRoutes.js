// uploadRoutes.js

import express from 'express';
import {upload} from '../middleware/fileUpload.js';
import uploadController from '../controllers/uploadController.js';

const router = express.Router();

// POST route for handling file upload

router.route('/')
    .post(upload.single('file'), uploadController)
    .get((req, res) => {
        res.json({message: "GET request to /api/upload"})
    });

export default router;
