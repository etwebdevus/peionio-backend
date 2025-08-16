const apiClient = require('../utils/apiClient');
const logger = require('../utils/logger');

class TransactionService {
  /**
   * Get recent transactions
   * @returns {Promise<Object>} Recent transactions
   */
  async getRecentTransactions() {
    try {
      return await apiClient.get('/team/transactions/recent');
    } catch (error) {
      logger.error('Get recent transactions failed:', error.message);
      throw error;
    }
  }

  /**
   * Get all transactions with optional filters
   * @param {Object} filters - Optional filters
   * @param {string} filters.memberId - Filter by member ID
   * @param {string} filters.from - Start date (yyyy-MM-dd)
   * @param {string} filters.to - End date (yyyy-MM-dd)
   * @param {number} filters.page - Page number (0-based)
   * @param {number} filters.limit - Results per page
   * @returns {Promise<Object>} Transactions list
   */
  async getAllTransactions(filters = {}) {
    try {
      const params = {};
      
      if (filters.memberId) params.member_id = filters.memberId;
      if (filters.from) params.from = filters.from;
      if (filters.to) params.to = filters.to;
      if (filters.page !== undefined) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      
      return await apiClient.get('/team/transactions', params);
    } catch (error) {
      logger.error('Get all transactions failed:', error.message);
      throw error;
    }
  }
}

module.exports = new TransactionService();

