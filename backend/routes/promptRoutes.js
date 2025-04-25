import express from 'express';
import { enhancePrompt, randomPrompt } from '../controllers/promptController.js';

const router = express.Router();

router.post('/enhance-prompt',enhancePrompt);
router.post('/random-prompt',randomPrompt);

export default router;