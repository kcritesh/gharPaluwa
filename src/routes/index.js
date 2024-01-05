import express from "express";

// ===========Import the relevant middleware================
// import { authenticateToken } from "../middleware/index.js";

// Import the routes from other files
import authRoutes from "./auth/authRoutes.js";
import productRoutes from "./products/productRoutes.js";
import userRoutes from "./user/userRoutes.js";
import orderRoutes from "./orders/orderRoutes.js";
import cartRoutes from "./cart/cartRoutes.js";
import uploadRoutes from "./uploads/uploadRoutes.js";
import categoryRoutes from "./category/categoryRoutes.js";

// Use the imported routes
const router = express.Router();

router.use("/auth", authRoutes); // localhost:9000/api/auth/register or localhost:9000/api/auth/login

// ==================Protected routes=======================
router.use("/products", productRoutes); // localhost:9000/api/products both GET and POST

router.use("/user", userRoutes);

router.use("/orders", orderRoutes);

router.use("/cart", cartRoutes);

router.use("/category", categoryRoutes);

router.use("/putSignedUrl", uploadRoutes);

export default router;
