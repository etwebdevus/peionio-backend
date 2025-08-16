const apiClient = require('../utils/apiClient');
const logger = require('../utils/logger');

class AccountService {
  /**
   * Register a new team member
   * @param {Object} memberData - Member registration data
   * @param {string} memberData.first_name - First name
   * @param {string} memberData.last_name - Last name
   * @param {string} memberData.middle_name - Middle name (optional)
   * @param {string} memberData.email - Email
   * @param {string} twoFactorCode - 2FA code (if required)
   * @returns {Promise<Object>} Registration response
   */
  async registerMember(memberData, twoFactorCode = null) {
    try {
      const headers = twoFactorCode ? { '2FA': twoFactorCode } : {};
      return await apiClient.post('/team/account/members/register', memberData, headers);
    } catch (error) {
      logger.error('Member registration failed:', error.message);
      throw error;
    }
  }

  /**
   * Add an existing user as a team member
   * @param {string} email - User email
   * @param {string} twoFactorCode - 2FA code (if required)
   * @returns {Promise<Object>} Response
   */
  async addMember(email, twoFactorCode = null) {
    try {
      const headers = twoFactorCode ? { '2FA': twoFactorCode } : {};
      return await apiClient.post('/team/account/members/add', { email }, headers);
    } catch (error) {
      logger.error('Add member failed:', error.message);
      throw error;
    }
  }

  /**
   * Verify a team member with token
   * @param {string} token - Verification token
   * @returns {Promise<Object>} Verification response
   */
  async verifyMember(token) {
    try {
      return await apiClient.post(`/team/account/members/verify/${token}`);
    } catch (error) {
      logger.error('Member verification failed:', error.message);
      throw error;
    }
  }

  /**
   * Remove a team member
   * @param {string} memberId - Member ID
   * @param {string} twoFactorCode - 2FA code (if required)
   * @returns {Promise<Object>} Response
   */
  async removeMember(memberId, twoFactorCode = null) {
    try {
      const headers = twoFactorCode ? { '2FA': twoFactorCode } : {};
      return await apiClient.delete(`/team/account/members/${memberId}`, {}, headers);
    } catch (error) {
      logger.error('Remove member failed:', error.message);
      throw error;
    }
  }

  /**
   * Setup 2FA for the account
   * @returns {Promise<Object>} 2FA setup data
   */
  async setup2FA() {
    try {
      return await apiClient.get('/team/account/2fa');
    } catch (error) {
      logger.error('2FA setup failed:', error.message);
      throw error;
    }
  }

  /**
   * Get account credits
   * @returns {Promise<Object>} Credits information
   */
  async getCredits() {
    try {
      return await apiClient.get('/team/account/credits');
    } catch (error) {
      logger.error('Get credits failed:', error.message);
      throw error;
    }
  }

  /**
   * Get all team members
   * @returns {Promise<Object>} List of team members
   */
  async getAllMembers() {
    try {
      return await apiClient.get('/team/account/members');
    } catch (error) {
      logger.error('Get all members failed:', error.message);
      throw error;
    }
  }

  /**
   * Reset 2FA for the account
   * @param {string} twoFactorCode - Current 2FA code
   * @returns {Promise<Object>} Response
   */
  async reset2FA(twoFactorCode) {
    try {
      const headers = { '2FA': twoFactorCode };
      return await apiClient.post('/team/account/2fa', {}, headers);
    } catch (error) {
      logger.error('Reset 2FA failed:', error.message);
      throw error;
    }
  }

  /**
   * Buy credits for the account
   * @param {number} amount - Amount of credits to buy
   * @returns {Promise<Object>} Response
   */
  async buyCredits(amount) {
    try {
      return await apiClient.post('/team/account/credits', { amount });
    } catch (error) {
      logger.error('Buy credits failed:', error.message);
      throw error;
    }
  }

  /**
   * Change account password
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   * @param {string} confirmPassword - Confirm new password
   * @param {string} twoFactorCode - 2FA code (if required)
   * @returns {Promise<Object>} Response
   */
  async changePassword(oldPassword, newPassword, confirmPassword, twoFactorCode = null) {
    try {
      const headers = twoFactorCode ? { '2FA': twoFactorCode } : {};
      return await apiClient.post('/team/account/change-password', {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      }, headers);
    } catch (error) {
      logger.error('Change password failed:', error.message);
      throw error;
    }
  }
}

module.exports = new AccountService();

