import express from 'express';

import { getUserDetails } from '../../controllers/user/userController.mjs';
import { authenticateToken } from '../../middleware/index.js';

const router = express.Router();
router.get('/load-user', authenticateToken, getUserDetails);

export default router;
