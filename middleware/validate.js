const ApiError = require('../utils/ApiError');

/**
 * Validation middleware factory
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: false,
        });

        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            return next(new ApiError(400, message));
        }

        next();
    };
};

module.exports = validate;
