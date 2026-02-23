const rateLimit = require('express-rate-limit');

/**
 * Global rate limiter — 100 requests per 15 minutes per IP.
 */
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000, // Very high for dev
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        data: null,
        message: 'Too many requests, please try again later',
        error: 'Rate limit exceeded',
    },
});

/**
 * Strict limiter for auth endpoints — 10 requests per 15 minutes per IP.
 * Prevents brute-force login/register attacks.
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500, // Very high for dev
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        data: null,
        message: 'Too many authentication attempts, please try again later',
        error: 'Rate limit exceeded',
    },
});

/**
 * Limiter for transfer endpoints — 30 requests per minute per IP.
 */
const transferLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        data: null,
        message: 'Too many transfer requests, please slow down',
        error: 'Rate limit exceeded',
    },
});

module.exports = { globalLimiter, authLimiter, transferLimiter };
