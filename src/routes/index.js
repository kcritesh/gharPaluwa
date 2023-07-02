import express from "express";
const router = express.Router();

// Import the routes from other files
import authRoutes from "./auth/authRoutes.js";
import itemRoutes from "./items/itemsRoutes.js";

// Use the imported routes
router.use("/auth", authRoutes); // localhost:9000/api/auth/register or localhost:9000/api/auth/login
router.use("/item", itemRoutes); // localhost:9000/api/item both GET and POST

export default router;
