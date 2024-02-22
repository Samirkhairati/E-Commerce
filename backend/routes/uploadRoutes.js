// uploadRoutes.js

import express from 'express';
import {upload} from '../middleware/fileUpload.js';
import fs from 'fs';
import { cloudinary } from '../config/cloudinary.js';

const router = express.Router();

// POST route for handling file upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        fs.unlinkSync(req.file.path)
        res.status(500).json({ error: "Couldn't Upload Image" });
      } else {
        fs.unlinkSync(req.file.path)
        res.status(200).json({ url: result.secure_url });
      }
    })
  } catch (error) {
    throw new Error('@uploadFile ERROR: ' + error);
  }
});

router.get('/', (req, res) => { res.send(process.env.CLOUDINARY_CLOUD_NAME) });

export default router;
