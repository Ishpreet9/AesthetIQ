import express from 'express';
import { generateImage, getAllImages } from '../controllers/imageController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/generate-image',authMiddleware,generateImage);
router.post('/get-all-images',authMiddleware,getAllImages);

export default router