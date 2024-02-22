// uploadRoutes.js

import express from 'express';
import {upload} from '../middleware/fileUpload.js';
import uploadController from '../controllers/uploadController.js';

const router = express.Router();

// POST route for handling file upload
router.post('/', upload.single('file'), uploadController);

export default router;
