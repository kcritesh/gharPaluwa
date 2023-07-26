import express from "express";
const router = express.Router();
import {
  login,
  register,
  verifyEmail,
} from "../../controllers/auth/authController.js";

router.post("/register", register);
router.post("/login", login);
router.post("/verify-email/:token", verifyEmail);

export default router;
