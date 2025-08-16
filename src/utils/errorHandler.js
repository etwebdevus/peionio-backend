const { StatusCodes } = require('http-status-codes');
const logger = require('./logger');

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const handleError = (err, req, res, next) => {
  const { statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message } = err;
  
  const response = {
    success: false,
    status: statusCode,
    message: statusCode === StatusCodes.INTERNAL_SERVER_ERROR 
      ? 'Internal Server Error' 
      : message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
    logger.error(`${err.message}`, { 
      metadata: { 
        error: err, 
        requestInfo: {
          method: req.method,
          url: req.originalUrl,
          ip: req.ip,
          body: req.body
        }
      }
    });
  }

  res.status(statusCode).json(response);
};

module.exports = {
  ApiError,
  handleError
};

