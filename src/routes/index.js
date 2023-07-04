import express from "express";
const router = express.Router();

// ===========Import the relevant middleware================
import { authenticateToken } from "../middleware/index.js";

// Import the routes from other files
import authRoutes from "./auth/authRoutes.js";
import productRoutes from "./products/productRoutes.js";

// Use the imported routes
router.use("/auth", authRoutes); // localhost:9000/api/auth/register or localhost:9000/api/auth/login

// ==================Protected routes=======================
router.use("/products", productRoutes); // localhost:9000/api/products both GET and POST

export default router;
