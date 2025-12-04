const ApiError = require('../utils/ApiError');

/**
 * Centralized error handling middleware
 * Converts all errors to consistent JSON responses
 */
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((e) => e.message)
            .join(', ');
    }

    // Handle Mongoose cast errors (invalid ObjectId)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyPattern)[0];
        message = `Duplicate value for field: ${field}`;
    }

    // Default to 500 if no status code
    statusCode = statusCode || 500;
    message = message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = errorHandler;
