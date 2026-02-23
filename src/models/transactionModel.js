const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a new transaction.
 * @param {object} data — { senderId, receiverId, amount, type, note, status, idempotencyKey }
 * @param {object} [client] — optional pg client (for external DB transactions)
 * @returns {object} the new transaction row
 */
async function createTransaction({ senderId, receiverId, amount, type, note, status, idempotencyKey }, client) {
    const conn = client || db;
    const id = uuidv4();
    const { rows } = await conn.query(
        `INSERT INTO transactions (id, sender_id, receiver_id, amount, type, note, status, idempotency_key)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
        [id, senderId, receiverId, amount, type, note || null, status || 'pending', idempotencyKey || null]
    );
    return rows[0];
}

/**
 * Find a transaction by its UUID.
 */
async function findById(id) {
    const { rows } = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);
    return rows[0] || null;
}

/**
 * Find a transaction by sender and idempotency key.
 */
async function findByIdempotencyKey(senderId, idempotencyKey) {
    if (!idempotencyKey) return null;
    const { rows } = await db.query(
        'SELECT * FROM transactions WHERE sender_id = $1 AND idempotency_key = $2',
        [senderId, idempotencyKey]
    );
    return rows[0] || null;
}

/**
 * Find transactions involving a user (as sender or receiver) with pagination.
 *
 * @param {string}  userId
 * @param {object}  options
 * @param {number}  [options.page=1]    — 1-indexed page number
 * @param {number}  [options.limit=20]  — rows per page
 * @param {string}  [options.type]      — optional filter: 'send' | 'request'
 * @param {string}  [options.status]    — optional filter
 * @returns {{ transactions: object[], total: number, page: number, totalPages: number }}
 */
async function findByUserId(userId, { page = 1, limit = 20, type, status } = {}) {
    const conditions = ['(sender_id = $1 OR receiver_id = $1)'];
    const values = [userId];
    let paramIdx = 2;

    if (type) {
        conditions.push(`type = $${paramIdx}`);
        values.push(type);
        paramIdx++;
    }
    if (status) {
        conditions.push(`status = $${paramIdx}`);
        values.push(status);
        paramIdx++;
    }

    const whereClause = conditions.join(' AND ');

    // Total count
    const countResult = await db.query(
        `SELECT COUNT(*) AS total FROM transactions WHERE ${whereClause}`,
        values
    );
    const total = parseInt(countResult.rows[0].total, 10);

    // Paginated results
    const offset = (page - 1) * limit;
    const { rows: transactions } = await db.query(
        `SELECT * FROM transactions
     WHERE ${whereClause}
     ORDER BY created_at DESC
     LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
        [...values, limit, offset]
    );

    return {
        transactions,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
}

/**
 * Update a transaction's status.
 * @param {string} id     — transaction UUID
 * @param {string} status — new status (pending/completed/failed/cancelled)
 * @param {object} [client] — optional pg client
 * @returns {object} the updated transaction row
 */
async function updateStatus(id, status, client) {
    const conn = client || db;
    const { rows } = await conn.query(
        `UPDATE transactions SET status = $1, updated_at = NOW()
     WHERE id = $2 RETURNING *`,
        [status, id]
    );
    return rows[0] || null;
}

/**
 * Get transaction history with counterparty info and type filtering.
 * @param {string} userId
 * @param {object} options
 * @param {string} [options.typeFilter] — 'sent' | 'received' | 'requests' | 'bitcoin'
 * @param {number} [options.page=1]
 * @param {number} [options.limit=20]
 * @returns {{ transactions: object[], total: number, page: number, totalPages: number }}
 */
async function getHistory(userId, { typeFilter, page = 1, limit = 20 } = {}) {
    let conditions = [];
    const values = [userId];
    let paramIdx = 2;

    if (typeFilter === 'sent') {
        conditions.push('t.sender_id = $1');
        conditions.push("t.type = 'send'");
    } else if (typeFilter === 'received') {
        conditions.push('t.receiver_id = $1');
        conditions.push("t.type = 'send'");
    } else if (typeFilter === 'requests') {
        conditions.push('(t.sender_id = $1 OR t.receiver_id = $1)');
        conditions.push("t.type = 'request'");
    } else if (typeFilter === 'bitcoin') {
        conditions.push('(t.sender_id = $1 OR t.receiver_id = $1)');
        conditions.push("t.type = 'bitcoin_send'");
    } else {
        conditions.push('(t.sender_id = $1 OR t.receiver_id = $1)');
    }

    const whereClause = conditions.join(' AND ');
    const offset = (page - 1) * limit;

    // Count — use base conditions on the raw transactions table
    const rawWhere = whereClause.replace(/t\./g, '');
    const countResult = await db.query(
        `SELECT COUNT(*) AS total FROM transactions WHERE ${rawWhere}`,
        values,
    );
    const total = parseInt(countResult.rows[0].total, 10);

    // Fetch transactions with counterparty info joined
    const { rows: transactions } = await db.query(
        `SELECT
           t.id, t.sender_id, t.receiver_id, t.amount, t.type, t.note,
           t.status, t.idempotency_key, t.created_at, t.updated_at,
           s.full_name  AS sender_name,
           s.cashtag    AS sender_cashtag,
           r.full_name  AS receiver_name,
           r.cashtag    AS receiver_cashtag
         FROM transactions t
         JOIN users s ON t.sender_id   = s.id
         JOIN users r ON t.receiver_id = r.id
         WHERE ${whereClause}
         ORDER BY t.created_at DESC
         LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
        [...values, limit, offset],
    );

    return {
        transactions,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
}

/**
 * Find a single transaction by ID with sender/receiver details.
 * @param {string} transactionId
 * @returns {object|null}
 */
async function findByIdWithDetails(transactionId) {
    const { rows } = await db.query(
        `SELECT
           t.id, t.sender_id, t.receiver_id, t.amount, t.type, t.note,
           t.status, t.idempotency_key, t.created_at, t.updated_at,
           s.full_name AS sender_name,   s.cashtag AS sender_cashtag,
           r.full_name AS receiver_name, r.cashtag AS receiver_cashtag
         FROM transactions t
         JOIN users s ON t.sender_id   = s.id
         JOIN users r ON t.receiver_id = r.id
         WHERE t.id = $1`,
        [transactionId],
    );
    return rows[0] || null;
}

module.exports = {
    createTransaction,
    findById,
    findByIdempotencyKey,
    findByUserId,
    updateStatus,
    getHistory,
    findByIdWithDetails,
};
