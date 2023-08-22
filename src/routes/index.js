import express from "express";
const router = express.Router();

// ===========Import the relevant middleware================
import { authenticateToken } from "../middleware/index.js";

// Import the routes from other files
import authRoutes from "./auth/authRoutes.js";
import productRoutes from "./products/productRoutes.js";
import userRoutes from "./user/userRoutes.js";
import orderRoutes from "./orders/orderRoutes.js";

// Use the imported routes
router.use("/auth", authRoutes); // localhost:9000/api/auth/register or localhost:9000/api/auth/login

// ==================Protected routes=======================
router.use("/products", productRoutes); // localhost:9000/api/products both GET and POST

router.use("/user", userRoutes);

router.use("/orders", orderRoutes);

export default router;
