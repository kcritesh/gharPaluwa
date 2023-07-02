import express from "express";
const router = express.Router();

// Import the relevant controllers
import { createProduct } from "../../controllers/products/productController.js";

// Define the routes
router.post("/", createProduct);

export default router;
