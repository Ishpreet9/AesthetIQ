import express from 'express';
import { loginUser, registerUser, userCredits } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/credits',authMiddleware,userCredits);

export default router;