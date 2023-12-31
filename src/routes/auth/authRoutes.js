import express from 'express';
import {
  login,
  register,
  verifyEmail,
  resetPasswordRequest,
  verifyResetPassword,
  resetPassword,
  sendPhoneVerification,
  verifyPhoneVerification,
} from '../../controllers/auth/authController.mjs';
import {
  minuteLimiter,
  dailyLimiter,
} from '../../middleware/limiter/limiters.js';
import { authenticateToken } from '../../middleware/auth/authenticatetoken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email/:token', verifyEmail);
router.post(
  '/reset-password-request',
  [minuteLimiter, dailyLimiter],
  resetPasswordRequest
);
router.post('/verify-reset-password', verifyResetPassword);
router.post('/reset-password', resetPassword);
router.post(
  '/send-phone-verification',
  [minuteLimiter, dailyLimiter, authenticateToken],
  sendPhoneVerification
);
router.post(
  '/verify-phone-verification',
  authenticateToken,
  verifyPhoneVerification
);

export default router;
