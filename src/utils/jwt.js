const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_SECRET || 'dev-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || ACCESS_SECRET + '-refresh';
const ACCESS_EXPIRY = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * Generate a short-lived access token.
 * @param {object} user — must have at least { id, email, cashtag }
 * @returns {string} signed JWT
 */
function generateAccessToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, cashtag: user.cashtag, type: 'access' },
        ACCESS_SECRET,
        { expiresIn: ACCESS_EXPIRY }
    );
}

/**
 * Generate a long-lived refresh token.
 * @param {object} user
 * @returns {string} signed JWT
 */
function generateRefreshToken(user) {
    return jwt.sign(
        { id: user.id, type: 'refresh' },
        REFRESH_SECRET,
        { expiresIn: REFRESH_EXPIRY }
    );
}

/**
 * Verify and decode a token.
 * @param {string} token  — the JWT string
 * @param {string} [type='access'] — 'access' | 'refresh'
 * @returns {object} decoded payload
 * @throws if invalid / expired
 */
function verifyToken(token, type = 'access') {
    const secret = type === 'refresh' ? REFRESH_SECRET : ACCESS_SECRET;
    return jwt.verify(token, secret);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
};
