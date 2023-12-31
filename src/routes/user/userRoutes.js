import express from 'express';
const router = express.Router();

import { getUserDetails } from '../../controllers/user/userController.mjs';
import { authenticateToken } from '../../middleware/index.js';

router.get('/load-user', authenticateToken, getUserDetails);

export default router;
