const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Public routes (no authentication required)
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/resend-verification', authController.resendVerification);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Protected routes (authentication required)
router.post('/refresh-token', authenticate, authController.refreshToken);
router.delete('/revoke-token', authenticate, authController.logout);

module.exports = router;

