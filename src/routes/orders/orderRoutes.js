import express from "express";
const router = express.Router();
import { authenticateToken } from "../../middleware/index.js";
import { createOrder } from "../../controllers/orders/orderControllers.js";

router.post("/create", authenticateToken, createOrder);
export default router;
