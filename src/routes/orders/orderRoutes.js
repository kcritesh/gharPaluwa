import express from 'express';
import { authenticateToken } from '../../middleware/index.js';
import {
  createOrder,
  getOrdersByVendorId,
  getOrdersByCustomerId,
} from '../../controllers/orders/orderControllers.mjs';

const router = express.Router();

router.post('/create', authenticateToken, createOrder);
router.get('/view-orders/vendor', authenticateToken, getOrdersByVendorId);
router.get('/view-orders/customer', authenticateToken, getOrdersByCustomerId);
export default router;
