import express from 'express';
const router = express.Router();
import { authenticateToken } from '../../middleware/index.js';
import {
  createOrder,
  getOrdersByVendorId,
  getOrdersByCustomerId,
} from '../../controllers/orders/orderControllers.mjs';

router.post('/create', authenticateToken, createOrder);
router.get('/view-orders/vendor', authenticateToken, getOrdersByVendorId);
router.get('/view-orders/customer', authenticateToken, getOrdersByCustomerId);
export default router;
