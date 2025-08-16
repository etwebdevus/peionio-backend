const express = require('express');
const authRoutes = require('./authRoutes');
const accountRoutes = require('./accountRoutes');
const transactionRoutes = require('./transactionRoutes');
const receivingAccountRoutes = require('./receivingAccountRoutes');

const router = express.Router();

// API routes
router.use('/team/auth', authRoutes);
router.use('/team/account', accountRoutes);
router.use('/team/transactions', transactionRoutes);
router.use('/team/receiving-accounts', receivingAccountRoutes);

module.exports = router;

