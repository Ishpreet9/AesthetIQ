import express from 'express';
import { addBookmark, generateImage, getAllImages, removeBookmark } from '../controllers/imageController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/generate-image',authMiddleware,generateImage);
router.post('/get-all-images',authMiddleware,getAllImages);
router.post('/add-bookmark',authMiddleware,addBookmark);
router.post('/remove-bookmark',authMiddleware,removeBookmark);

export default router