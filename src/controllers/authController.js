const { StatusCodes } = require('http-status-codes');
const authService = require('../services/authService');
const { ApiError } = require('../utils/errorHandler');

/**
 * Auth controller for handling authentication-related requests
 */
class AuthController {
  /**
   * Login a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email and password are required');
      }
      
      const result = await authService.login(email, password);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Register a new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async register(req, res, next) {
    try {
      const { first_name, last_name, middle_name, email, password } = req.body;
      
      if (!first_name || !last_name || !email || !password) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST, 
          'First name, last name, email, and password are required'
        );
      }
      
      const userData = { first_name, last_name, middle_name, email, password };
      const result = await authService.register(userData);
      res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verify email with token
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async verifyEmail(req, res, next) {
    try {
      const { token } = req.params;
      
      if (!token) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Token is required');
      }
      
      const result = await authService.verifyEmail(token);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Resend verification email
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async resendVerification(req, res, next) {
    try {
      const { email } = req.body;
      
      if (!email) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email is required');
      }
      
      const result = await authService.resendVerification(email);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Request password reset
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      
      if (!email) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email is required');
      }
      
      const result = await authService.forgotPassword(email);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Reset password with token
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async resetPassword(req, res, next) {
    try {
      const { token } = req.params;
      const { new_password, confirm_password } = req.body;
      
      if (!token || !new_password || !confirm_password) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST, 
          'Token, new password, and confirm password are required'
        );
      }
      
      if (new_password !== confirm_password) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Passwords do not match');
      }
      
      const result = await authService.resetPassword(token, new_password, confirm_password);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Refresh authentication token
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async refreshToken(req, res, next) {
    try {
      const result = await authService.refreshToken();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Logout (revoke token)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async logout(req, res, next) {
    try {
      const result = await authService.logout();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();

