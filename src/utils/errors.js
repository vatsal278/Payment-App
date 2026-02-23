/**
 * FlowCash — Standardised API error class.
 *
 * Throw an ApiError anywhere in controllers/middleware and the global
 * error handler will format it into the standard response shape.
 */

class ApiError extends Error {
    /**
     * @param {number} statusCode — HTTP status code (400, 401, 404, 500 …)
     * @param {string} message    — human-readable error message
     */
    constructor(statusCode, message) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }

    /* ── Convenience factories ── */

    static badRequest(msg = 'Bad request') { return new ApiError(400, msg); }
    static unauthorized(msg = 'Unauthorized') { return new ApiError(401, msg); }
    static forbidden(msg = 'Forbidden') { return new ApiError(403, msg); }
    static notFound(msg = 'Not found') { return new ApiError(404, msg); }
    static conflict(msg = 'Conflict') { return new ApiError(409, msg); }
    static internal(msg = 'Internal server error') { return new ApiError(500, msg); }
}

module.exports = ApiError;
