const express = require('express');
const accountController = require('../controllers/accountController');
const { authenticate, require2FA } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Routes that require 2FA
router.post('/members/register', require2FA, accountController.registerMember);
router.post('/members/add', require2FA, accountController.addMember);
router.delete('/members/:memberId', require2FA, accountController.removeMember);
router.post('/2fa', require2FA, accountController.reset2FA);
router.post('/change-password', require2FA, accountController.changePassword);

// Routes that don't require 2FA
router.post('/members/verify/:token', accountController.verifyMember);
router.get('/2fa', accountController.setup2FA);
router.get('/credits', accountController.getCredits);
router.get('/members', accountController.getAllMembers);
router.post('/credits', accountController.buyCredits);

module.exports = router;

