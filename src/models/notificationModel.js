const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a notification for a user.
 * @param {object} data — { userId, message, type, referenceId }
 * @returns {object} the new notification row
 */
async function createNotification({ userId, message, type, referenceId }, client) {
    const conn = client || db;
    const id = uuidv4();
    const { rows } = await conn.query(
        `INSERT INTO notifications (id, user_id, message, type, reference_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [id, userId, message, type || null, referenceId || null]
    );
    return rows[0];
}

/**
 * Count unread notifications for a user.
 * @param {string} userId
 * @returns {number}
 */
async function countUnread(userId) {
    const result = await db.query(
        'SELECT COUNT(*) AS count FROM notifications WHERE user_id = $1 AND is_read = FALSE',
        [userId]
    );
    return parseInt(result.rows[0].count, 10);
}

/**
 * Count all notifications for a user.
 * @param {string} userId
 * @returns {number}
 */
async function countAll(userId) {
    const result = await db.query(
        'SELECT COUNT(*) AS count FROM notifications WHERE user_id = $1',
        [userId]
    );
    return parseInt(result.rows[0].count, 10);
}

/**
 * Find paginated notifications for a user with explicit columns (no SELECT *).
 * @param {string} userId
 * @param {number} limit
 * @param {number} offset
 * @returns {object[]}
 */
async function findPaginated(userId, limit, offset) {
    const { rows } = await db.query(
        `SELECT id, user_id, message, type, reference_id, is_read, created_at
       FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
    );
    return rows;
}

/**
 * Find all notifications for a user, most recent first.
 * @param {string} userId
 * @param {object} options
 * @param {boolean} [options.unreadOnly=false]
 * @returns {object[]}
 */
async function findByUserId(userId, { unreadOnly = false } = {}) {
    const where = unreadOnly
        ? 'WHERE user_id = $1 AND is_read = FALSE'
        : 'WHERE user_id = $1';

    const { rows } = await db.query(
        `SELECT id, user_id, message, type, reference_id, is_read, created_at
       FROM notifications ${where} ORDER BY created_at DESC`,
        [userId]
    );
    return rows;
}

/**
 * Mark a single notification as read.
 * @param {string} notificationId
 * @returns {object} the updated notification row
 */
async function markAsRead(notificationId, userId) {
    const { rows } = await db.query(
        `UPDATE notifications SET is_read = TRUE WHERE id = $1 AND user_id = $2 RETURNING *`,
        [notificationId, userId]
    );
    return rows[0] || null;
}

/**
 * Mark all notifications as read for a user.
 * @param {string} userId
 * @returns {number} count of notifications updated
 */
async function markAllAsRead(userId) {
    const result = await db.query(
        `UPDATE notifications SET is_read = TRUE WHERE user_id = $1 AND is_read = FALSE`,
        [userId]
    );
    return result.rowCount;
}

module.exports = {
    createNotification,
    countUnread,
    countAll,
    findPaginated,
    findByUserId,
    markAsRead,
    markAllAsRead,
};

