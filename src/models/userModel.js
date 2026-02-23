const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

/**
 * Find a user by their UUID.
 */
async function findById(id) {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] || null;
}

/**
 * Find a user by email address.
 */
async function findByEmail(email) {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] || null;
}

/**
 * Find a user by cashtag (e.g. "$alice").
 */
async function findByCashtag(cashtag) {
    const { rows } = await db.query('SELECT * FROM users WHERE cashtag = $1', [cashtag]);
    return rows[0] || null;
}

/**
 * Create a new user.
 * @param {object} data — { email, phone, cashtag, passwordHash, fullName, avatarUrl }
 * @returns {object} the newly created user row
 */
async function createUser({ email, phone, cashtag, passwordHash, fullName, avatarUrl }) {
    const id = uuidv4();
    const { rows } = await db.query(
        `INSERT INTO users (id, email, phone, cashtag, password_hash, full_name, avatar_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
        [id, email, phone || null, cashtag, passwordHash, fullName, avatarUrl || null]
    );
    return rows[0];
}

/**
 * Update an existing user.
 * @param {string} id   — user UUID
 * @param {object} data — partial object with fields to update
 * @returns {object} the updated user row
 */
async function updateUser(id, data) {
    // Build SET clause dynamically from provided fields
    const allowedFields = {
        email: 'email',
        phone: 'phone',
        cashtag: 'cashtag',
        passwordHash: 'password_hash',
        fullName: 'full_name',
        avatarUrl: 'avatar_url',
        isVerified: 'is_verified',
    };

    const setClauses = [];
    const values = [];
    let paramIndex = 1;

    for (const [jsKey, dbCol] of Object.entries(allowedFields)) {
        if (data[jsKey] !== undefined) {
            setClauses.push(`${dbCol} = $${paramIndex}`);
            values.push(data[jsKey]);
            paramIndex++;
        }
    }

    if (setClauses.length === 0) {
        return findById(id); // nothing to update
    }

    setClauses.push(`updated_at = NOW()`);
    values.push(id);

    const { rows } = await db.query(
        `UPDATE users SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
        values
    );
    return rows[0] || null;
}

/**
 * Search users by name or cashtag (case-insensitive, excludes a specific user).
 * @param {string} term — search term (without leading $)
 * @param {string} excludeUserId — user ID to exclude from results
 * @param {number} [limit=20] — max results
 * @returns {object[]} array of { id, full_name, cashtag, avatar_url }
 */
async function searchByNameOrCashtag(term, excludeUserId, limit = 20) {
    const pattern = `%${term}%`;
    const { rows } = await db.query(
        `SELECT id, full_name, cashtag, avatar_url
       FROM users
       WHERE id != $1
         AND (cashtag ILIKE $2 OR full_name ILIKE $2)
       ORDER BY
         CASE WHEN cashtag ILIKE $3 THEN 0 ELSE 1 END,
         full_name ASC
       LIMIT $4`,
        [excludeUserId, pattern, `$${term}%`, limit]
    );
    return rows;
}

module.exports = {
    findById,
    findByEmail,
    findByCashtag,
    createUser,
    updateUser,
    searchByNameOrCashtag,
};
