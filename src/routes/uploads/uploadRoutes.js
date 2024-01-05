import express from 'express';
import { getSignedUrl } from '../../controllers/uploads/uploadController.mjs';
import { authenticateToken } from '../../middleware/index.js';

const router = express.Router();

router.get('/:type/:domain', authenticateToken, getSignedUrl);

export default router;
