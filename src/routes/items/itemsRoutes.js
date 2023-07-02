import express from "express";
const router = express.Router();
import { authenticateToken } from "../../middleware/index.js";

// Import the relevant controllers
import { getItem } from "../../controllers/index.js";

// Define the routes
router.get("/", authenticateToken, getItem);

export default router;
