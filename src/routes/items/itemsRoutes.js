import express from "express";
const router = express.Router();

// Import the relevant controllers
import { getItem } from "../../controllers/index.js";

// Define the routes
router.get("/", getItem);

export default router;
