const { StatusCodes } = require('http-status-codes');
const { handleError } = require('../utils/errorHandler');

/**
 * Global error handling middleware
 * @param {Object} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  handleError(err, req, res, next);
};

/**
 * Middleware for handling 404 Not Found errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    status: StatusCodes.NOT_FOUND,
    message: `Route not found: ${req.originalUrl}`
  });
};

module.exports = {
  errorHandler,
  notFound
};

