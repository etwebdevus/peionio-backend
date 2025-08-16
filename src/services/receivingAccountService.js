const apiClient = require('../utils/apiClient');
const logger = require('../utils/logger');

class ReceivingAccountService {
  /**
   * Create a new receiving account
   * @param {Object} accountData - Receiving account data
   * @param {string} accountData.member_id - Member ID
   * @param {string} accountData.payment_rail - Payment rail
   * @param {string} accountData.destination_address - Destination address
   * @param {string} twoFactorCode - 2FA code (if required)
   * @returns {Promise<Object>} Created account data
   */
  async createReceivingAccount(accountData, twoFactorCode = null) {
    try {
      const headers = twoFactorCode ? { '2FA': twoFactorCode } : {};
      return await apiClient.post('/team/receiving-accounts', accountData, headers);
    } catch (error) {
      logger.error('Create receiving account failed:', error.message);
      throw error;
    }
  }

  /**
   * Update an existing receiving account
   * @param {Object} accountData - Receiving account update data
   * @param {string} accountData.receiving_account_id - Receiving account ID
   * @param {string} accountData.payment_rail - Payment rail
   * @param {string} accountData.destination_address - Destination address
   * @param {string} twoFactorCode - 2FA code (if required)
   * @returns {Promise<Object>} Updated account data
   */
  async updateReceivingAccount(accountData, twoFactorCode = null) {
    try {
      const headers = twoFactorCode ? { '2FA': twoFactorCode } : {};
      return await apiClient.put('/team/receiving-accounts', accountData, headers);
    } catch (error) {
      logger.error('Update receiving account failed:', error.message);
      throw error;
    }
  }

  /**
   * Get all receiving accounts
   * @returns {Promise<Object>} List of receiving accounts
   */
  async getAllReceivingAccounts() {
    try {
      return await apiClient.get('/team/receiving-accounts');
    } catch (error) {
      logger.error('Get all receiving accounts failed:', error.message);
      throw error;
    }
  }

  /**
   * Get a specific receiving account by ID
   * @param {string} receivingAccountId - Receiving account ID
   * @returns {Promise<Object>} Receiving account data
   */
  async getReceivingAccount(receivingAccountId) {
    try {
      return await apiClient.get(`/team/receiving-accounts/${receivingAccountId}`);
    } catch (error) {
      logger.error('Get receiving account failed:', error.message);
      throw error;
    }
  }

  /**
   * Reactivate a receiving account
   * @param {string} receivingAccountId - Receiving account ID
   * @param {string} twoFactorCode - 2FA code (if required)
   * @returns {Promise<Object>} Response
   */
  async reactivateReceivingAccount(receivingAccountId, twoFactorCode = null) {
    try {
      const headers = twoFactorCode ? { '2FA': twoFactorCode } : {};
      return await apiClient.post(`/team/receiving-accounts/reactivate/${receivingAccountId}`, {}, headers);
    } catch (error) {
      logger.error('Reactivate receiving account failed:', error.message);
      throw error;
    }
  }

  /**
   * Extend a receiving account
   * @param {string} receivingAccountId - Receiving account ID
   * @param {string} twoFactorCode - 2FA code (if required)
   * @returns {Promise<Object>} Response
   */
  async extendReceivingAccount(receivingAccountId, twoFactorCode = null) {
    try {
      const headers = twoFactorCode ? { '2FA': twoFactorCode } : {};
      return await apiClient.post(`/team/receiving-accounts/extend/${receivingAccountId}`, {}, headers);
    } catch (error) {
      logger.error('Extend receiving account failed:', error.message);
      throw error;
    }
  }
}

module.exports = new ReceivingAccountService();

