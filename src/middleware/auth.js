const { verifyToken } = require('../utils/jwt');
const ApiError = require('../utils/errors');

/**
 * JWT authentication middleware.
 *
 * Expects: Authorization: Bearer <token>
 * On success: attaches decoded payload to req.user
 * On failure: throws 401 ApiError
 */
function auth(req, _res, next) {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            throw ApiError.unauthorized('Missing or malformed Authorization header');
        }

        const token = header.split(' ')[1];
        const decoded = verifyToken(token, 'access');

        if (decoded.type !== 'access') {
            throw ApiError.unauthorized('Invalid token type');
        }

        req.user = decoded; // { id, email, cashtag, type, iat, exp }
        next();
    } catch (err) {
        if (err instanceof ApiError) return next(err);
        // jwt.verify throws its own errors (TokenExpiredError, JsonWebTokenError…)
        next(ApiError.unauthorized(err.message === 'jwt expired' ? 'Token expired' : 'Invalid token'));
    }
}

module.exports = auth;
