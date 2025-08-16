const express = require('express');
const transactionController = require('../controllers/transactionController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Transaction routes
router.get('/recent', transactionController.getRecentTransactions);
router.get('/', transactionController.getAllTransactions);

module.exports = router;

