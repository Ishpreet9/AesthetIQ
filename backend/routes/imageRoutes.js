import express from 'express';
import { generateImage } from '../controllers/imageController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/generate-image',authMiddleware,generateImage);

export default router