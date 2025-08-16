const { StatusCodes } = require('http-status-codes');
const receivingAccountService = require('../services/receivingAccountService');
const { ApiError } = require('../utils/errorHandler');

/**
 * Receiving Account controller for handling receiving account-related requests
 */
class ReceivingAccountController {
  /**
   * Create a new receiving account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async createReceivingAccount(req, res, next) {
    try {
      const { member_id, payment_rail, destination_address } = req.body;
      const twoFactorCode = req.headers['2fa'];
      
      if (!member_id || !payment_rail || !destination_address) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST, 
          'Member ID, payment rail, and destination address are required'
        );
      }
      
      const accountData = { member_id, payment_rail, destination_address };
      const result = await receivingAccountService.createReceivingAccount(accountData, twoFactorCode);
      res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update an existing receiving account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateReceivingAccount(req, res, next) {
    try {
      const { receiving_account_id, payment_rail, destination_address } = req.body;
      const twoFactorCode = req.headers['2fa'];
      
      if (!receiving_account_id || !payment_rail || !destination_address) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST, 
          'Receiving account ID, payment rail, and destination address are required'
        );
      }
      
      const accountData = { receiving_account_id, payment_rail, destination_address };
      const result = await receivingAccountService.updateReceivingAccount(accountData, twoFactorCode);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all receiving accounts
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getAllReceivingAccounts(req, res, next) {
    try {
      const result = await receivingAccountService.getAllReceivingAccounts();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a specific receiving account by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getReceivingAccount(req, res, next) {
    try {
      const { receivingAccountId } = req.params;
      
      if (!receivingAccountId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Receiving account ID is required');
      }
      
      const result = await receivingAccountService.getReceivingAccount(receivingAccountId);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Reactivate a receiving account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async reactivateReceivingAccount(req, res, next) {
    try {
      const { receivingAccountId } = req.params;
      const twoFactorCode = req.headers['2fa'];
      
      if (!receivingAccountId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Receiving account ID is required');
      }
      
      const result = await receivingAccountService.reactivateReceivingAccount(receivingAccountId, twoFactorCode);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Extend a receiving account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async extendReceivingAccount(req, res, next) {
    try {
      const { receivingAccountId } = req.params;
      const twoFactorCode = req.headers['2fa'];
      
      if (!receivingAccountId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Receiving account ID is required');
      }
      
      const result = await receivingAccountService.extendReceivingAccount(receivingAccountId, twoFactorCode);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReceivingAccountController();

