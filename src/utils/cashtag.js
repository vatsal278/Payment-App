const userModel = require('../models/userModel');

/**
 * Generate a unique $cashtag suggestion from a full name.
 *
 * Strategy:
 *   1. Lowercase, strip non-alphanumeric chars → base tag (e.g. "John Doe" → "johndoe")
 *   2. If "$johndoe" is taken, try "$johndoe1", "$johndoe2", …
 *
 * @param {string} fullName
 * @returns {Promise<string>} e.g. "$johndoe" or "$johndoe3"
 */
async function generateCashtag(fullName) {
    const base = fullName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

    if (!base) throw new Error('Cannot generate cashtag from empty name');

    let candidate = `$${base}`;
    let suffix = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const existing = await userModel.findByCashtag(candidate);
        if (!existing) return candidate;
        suffix++;
        candidate = `$${base}${suffix}`;
    }
}

module.exports = { generateCashtag };
