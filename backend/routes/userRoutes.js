import express from 'express';
import { loginUser, logoutUser, registerUser, resetCredits, userCredits } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post('/credits',authMiddleware,userCredits);
router.post('/reset-credits',authMiddleware,resetCredits);

export default router;