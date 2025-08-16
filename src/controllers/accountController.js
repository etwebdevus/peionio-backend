const { StatusCodes } = require('http-status-codes');
const accountService = require('../services/accountService');
const { ApiError } = require('../utils/errorHandler');

/**
 * Account controller for handling account-related requests
 */
class AccountController {
  /**
   * Register a new team member
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async registerMember(req, res, next) {
    try {
      const { first_name, last_name, middle_name, email } = req.body;
      const twoFactorCode = req.headers['2fa'];
      
      if (!first_name || !last_name || !email) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST, 
          'First name, last name, and email are required'
        );
      }
      
      const memberData = { first_name, last_name, middle_name, email };
      const result = await accountService.registerMember(memberData, twoFactorCode);
      res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add an existing user as a team member
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async addMember(req, res, next) {
    try {
      const { email } = req.body;
      const twoFactorCode = req.headers['2fa'];
      
      if (!email) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email is required');
      }
      
      const result = await accountService.addMember(email, twoFactorCode);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verify a team member with token
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async verifyMember(req, res, next) {
    try {
      const { token } = req.params;
      
      if (!token) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Token is required');
      }
      
      const result = await accountService.verifyMember(token);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Remove a team member
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async removeMember(req, res, next) {
    try {
      const { memberId } = req.params;
      const twoFactorCode = req.headers['2fa'];
      
      if (!memberId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Member ID is required');
      }
      
      const result = await accountService.removeMember(memberId, twoFactorCode);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Setup 2FA for the account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async setup2FA(req, res, next) {
    try {
      const result = await accountService.setup2FA();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get account credits
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getCredits(req, res, next) {
    try {
      const result = await accountService.getCredits();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all team members
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getAllMembers(req, res, next) {
    try {
      const result = await accountService.getAllMembers();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Reset 2FA for the account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async reset2FA(req, res, next) {
    try {
      const twoFactorCode = req.headers['2fa'];
      
      if (!twoFactorCode) {
        throw new ApiError(StatusCodes.BAD_REQUEST, '2FA code is required');
      }
      
      const result = await accountService.reset2FA(twoFactorCode);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Buy credits for the account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async buyCredits(req, res, next) {
    try {
      const { amount } = req.body;
      
      if (!amount || isNaN(amount) || amount <= 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Valid amount is required');
      }
      
      const result = await accountService.buyCredits(amount);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Change account password
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async changePassword(req, res, next) {
    try {
      const { old_password, new_password, confirm_password } = req.body;
      const twoFactorCode = req.headers['2fa'];
      
      if (!old_password || !new_password || !confirm_password) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST, 
          'Old password, new password, and confirm password are required'
        );
      }
      
      if (new_password !== confirm_password) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Passwords do not match');
      }
      
      const result = await accountService.changePassword(
        old_password, 
        new_password, 
        confirm_password, 
        twoFactorCode
      );
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AccountController();

