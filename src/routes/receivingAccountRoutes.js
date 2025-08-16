const express = require('express');
const receivingAccountController = require('../controllers/receivingAccountController');
const { authenticate, require2FA } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Routes that require 2FA
router.post('/', require2FA, receivingAccountController.createReceivingAccount);
router.put('/', require2FA, receivingAccountController.updateReceivingAccount);
router.post('/reactivate/:receivingAccountId', require2FA, receivingAccountController.reactivateReceivingAccount);
router.post('/extend/:receivingAccountId', require2FA, receivingAccountController.extendReceivingAccount);

// Routes that don't require 2FA
router.get('/', receivingAccountController.getAllReceivingAccounts);
router.get('/:receivingAccountId', receivingAccountController.getReceivingAccount);

module.exports = router;

