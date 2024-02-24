import fs from 'fs';
import { cloudinary } from '../config/cloudinary.js';

const uploadController = async (req, res) => {
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
}
export default uploadController;