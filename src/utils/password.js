const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

/**
 * Hash a plaintext password.
 * @param {string} plain
 * @returns {Promise<string>} bcrypt hash
 */
async function hashPassword(plain) {
    return bcrypt.hash(plain, SALT_ROUNDS);
}

/**
 * Compare a plaintext password against a bcrypt hash.
 * @param {string} plain
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
async function comparePassword(plain, hash) {
    return bcrypt.compare(plain, hash);
}

module.exports = { hashPassword, comparePassword };
