const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a ledger entry.
 * @param {object} data — { transactionId, walletId, entryType, amount }
 * @param {object} [client] — optional pg client (for external DB transactions)
 * @returns {object} the new ledger entry row
 */
async function createEntry({ transactionId, walletId, entryType, amount }, client) {
    const conn = client || db;
    const id = uuidv4();
    const { rows } = await conn.query(
        `INSERT INTO ledger_entries (id, transaction_id, wallet_id, entry_type, amount)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [id, transactionId, walletId, entryType, amount]
    );
    return rows[0];
}

/**
 * Find all ledger entries for a given transaction.
 * @param {string} transactionId
 * @returns {object[]} array of ledger entry rows
 */
async function findByTransactionId(transactionId) {
    const { rows } = await db.query(
        `SELECT * FROM ledger_entries
     WHERE transaction_id = $1
     ORDER BY created_at ASC`,
        [transactionId]
    );
    return rows;
}

/**
 * Count all ledger entries for a wallet.
 * @param {string} walletId
 * @returns {number}
 */
async function countByWalletId(walletId) {
    const result = await db.query(
        'SELECT COUNT(*) AS total FROM ledger_entries WHERE wallet_id = $1',
        [walletId]
    );
    return parseInt(result.rows[0].total, 10);
}

/**
 * Find paginated ledger entries for a wallet with transaction and user details.
 * @param {string} walletId
 * @param {number} limit
 * @param {number} offset
 * @returns {object[]}
 */
async function findByWalletIdPaginated(walletId, limit, offset) {
    const { rows } = await db.query(
        `SELECT 
         le.id, le.transaction_id, le.wallet_id, le.entry_type, le.amount, le.created_at,
         t.type   AS transaction_type,
         t.note   AS transaction_note,
         t.status AS transaction_status,
         s.full_name AS sender_name,   s.cashtag AS sender_cashtag,
         r.full_name AS receiver_name, r.cashtag AS receiver_cashtag
       FROM ledger_entries le
       JOIN transactions t ON le.transaction_id = t.id
       JOIN users s ON t.sender_id   = s.id
       JOIN users r ON t.receiver_id = r.id
       WHERE le.wallet_id = $1
       ORDER BY le.created_at DESC
       LIMIT $2 OFFSET $3`,
        [walletId, limit, offset]
    );
    return rows;
}

module.exports = {
    createEntry,
    findByTransactionId,
    countByWalletId,
    findByWalletIdPaginated,
};
