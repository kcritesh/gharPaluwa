import express from "express";
const router = express.Router();
import { authenticateToken } from "../../middleware/index.js";
import {
  createOrder,
  getOrdersByVendorId,
} from "../../controllers/orders/orderControllers.js";

router.post("/create", authenticateToken, createOrder);
router.get("/view-orders/vendor", authenticateToken, getOrdersByVendorId);
export default router;
