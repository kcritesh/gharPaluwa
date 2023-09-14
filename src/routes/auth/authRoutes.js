import express from "express";
const router = express.Router();
import {
  login,
  register,
  verifyEmail,
  resetPasswordRequest,
  verifyResetPassword,
} from "../../controllers/auth/authController.js";

router.post("/register", register);
router.post("/login", login);
router.post("/verify-email/:token", verifyEmail);
router.post("/reset-password-request", resetPasswordRequest);
router.post("/verify-reset-password", verifyResetPassword);

export default router;
