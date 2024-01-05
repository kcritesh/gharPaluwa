import express from 'express';
import { authenticateToken } from '../../middleware/index.js';
import {
  addToCart,
  getCartByCustomerId,
  removeFromCart,
  removeQuantityFromCart,
  clearCart,
} from '../../controllers/cart/cartControllers.mjs';

const router = express.Router();

router.post('/add-to-cart', authenticateToken, addToCart);
router.get('/get-cart', authenticateToken, getCartByCustomerId);
router.post('/remove-from-cart', authenticateToken, removeFromCart);
router.post(
  '/remove-quantity-from-cart',
  authenticateToken,
  removeQuantityFromCart
);
router.post('/clear-cart', authenticateToken, clearCart);

export default router;
