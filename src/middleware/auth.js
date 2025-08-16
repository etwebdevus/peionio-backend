const { StatusCodes } = require('http-status-codes');
const { ApiError } = require('../utils/errorHandler');
const apiClient = require('../utils/apiClient');

/**
 * Middleware to check if the user is authenticated
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticate = (req, res, next) => {
  try {
    // Check if there's a token in the request headers
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Authentication required. Please provide a valid token.'
      );
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Authentication required. Please provide a valid token.'
      );
    }
    
    // Set the token for the API client
    apiClient.setAccessToken(token);
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to check if 2FA is provided when required
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const require2FA = (req, res, next) => {
  try {
    const twoFactorCode = req.headers['2fa'];
    
    if (!twoFactorCode) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        '2FA code is required for this operation.'
      );
    }
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
  require2FA
};

