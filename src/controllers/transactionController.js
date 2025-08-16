const { StatusCodes } = require('http-status-codes');
const transactionService = require('../services/transactionService');

/**
 * Transaction controller for handling transaction-related requests
 */
class TransactionController {
  /**
   * Get recent transactions
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getRecentTransactions(req, res, next) {
    try {
      const result = await transactionService.getRecentTransactions();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all transactions with optional filters
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getAllTransactions(req, res, next) {
    try {
      const { member_id, from, to, page, limit } = req.query;
      
      const filters = {};
      if (member_id) filters.memberId = member_id;
      if (from) filters.from = from;
      if (to) filters.to = to;
      if (page) filters.page = parseInt(page, 10);
      if (limit) filters.limit = parseInt(limit, 10);
      
      const result = await transactionService.getAllTransactions(filters);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransactionController();

