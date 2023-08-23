import express from "express";
const router = express.Router();
import { authenticateToken } from "../../middleware/index.js";
import {
  addToCart,
  getCartByCustomerId,
  removeFromCart,
  removeQuantityFromCart,
  clearCart,
} from "../../controllers/cart/cartControllers.js";

router.post("/add-to-cart", authenticateToken, addToCart);
router.get("/get-cart", authenticateToken, getCartByCustomerId);
router.post("/remove-from-cart", authenticateToken, removeFromCart);
router.post(
  "/remove-quantity-from-cart",
  authenticateToken,
  removeQuantityFromCart
);
router.post("/clear-cart", authenticateToken, clearCart);

export default router;
