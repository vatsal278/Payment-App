const ApiError = require('../utils/errors');

/**
 * Global error-handling middleware.
 *
 * Must be registered LAST with app.use(). Express recognises it as an
 * error handler because it has 4 parameters (err, req, res, next).
 *
 * All responses follow the standard shape:
 *   { success: false, data: null, message: "", error: "" }
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
    // Known operational errors
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            data: null,
            message: err.message,
            error: err.message,
        });
    }

    // JSON parse errors from express.json()
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Invalid JSON in request body',
            error: 'Invalid JSON in request body',
        });
    }

    // Unexpected / programmer errors
    console.error('Unhandled error:', err);
    return res.status(500).json({
        success: false,
        data: null,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    });
}

module.exports = errorHandler;
