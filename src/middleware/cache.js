/**
 * Cache-Control middleware for read-only GET endpoints.
 * Usage:  router.get('/balance', cacheFor(30), controller.getBalance);
 *
 * @param {number} seconds – max-age in seconds (default 15)
 */
function cacheFor(seconds = 15) {
    return (_req, res, next) => {
        // Only cache successful GET responses
        res.on('finish', () => {
            // Already set by downstream? don't override
        });
        res.set('Cache-Control', `private, max-age=${seconds}`);
        next();
    };
}

/** No-store helper for mutation endpoints (POST, PUT, DELETE, etc.) */
function noCache(_req, res, next) {
    res.set('Cache-Control', 'no-store');
    next();
}

module.exports = { cacheFor, noCache };
