const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

/**
 * Find the wallet belonging to a user.
 */
async function findByUserId(userId) {
    const { rows } = await db.query('SELECT * FROM wallets WHERE user_id = $1', [userId]);
    return rows[0] || null;
}

/**
 * Get the balance (in cents) for a user's wallet.
 * @returns {number|null} balance in cents, or null if wallet not found
 */
async function getBalance(userId) {
    const wallet = await findByUserId(userId);
    return wallet ? wallet.balance : null;
}

/**
 * Create a wallet for a user.
 * @param {string} userId
 * @param {number} [initialBalance=100000] — cents (default $1,000)
 * @returns {object} the new wallet row
 */
async function createWallet(userId, initialBalance = 100000) {
    const id = uuidv4();
    const { rows } = await db.query(
        `INSERT INTO wallets (id, user_id, balance)
     VALUES ($1, $2, $3)
     RETURNING *`,
        [id, userId, initialBalance]
    );
    return rows[0];
}

/**
 * Debit (subtract) an amount from a wallet.
 * Uses a DB transaction + row-level lock (FOR UPDATE) to prevent races.
 *
 * @param {string} walletId
 * @param {number} amount — positive integer in cents
 * @param {object} [client] — optional pg client (for external transactions)
 * @returns {object} the updated wallet row
 * @throws if insufficient balance
 */
async function debitWallet(walletId, amount, client) {
    const conn = client || (await db.pool.connect());
    const isOwnTx = !client;
    try {
        if (isOwnTx) await conn.query('BEGIN');

        // Lock the row to prevent concurrent modifications
        const { rows: [wallet] } = await conn.query(
            'SELECT * FROM wallets WHERE id = $1 FOR UPDATE',
            [walletId]
        );

        if (!wallet) throw new Error(`Wallet ${walletId} not found`);
        if (Number(wallet.balance) < amount) throw new Error('Insufficient balance');

        const { rows: [updated] } = await conn.query(
            `UPDATE wallets SET balance = balance - $1, updated_at = NOW()
       WHERE id = $2 RETURNING *`,
            [amount, walletId]
        );

        if (isOwnTx) await conn.query('COMMIT');
        return updated;
    } catch (err) {
        if (isOwnTx) await conn.query('ROLLBACK');
        throw err;
    } finally {
        if (isOwnTx) conn.release();
    }
}

/**
 * Credit (add) an amount to a wallet.
 * Uses a DB transaction + row-level lock (FOR UPDATE) to prevent races.
 *
 * @param {string} walletId
 * @param {number} amount — positive integer in cents
 * @param {object} [client] — optional pg client (for external transactions)
 * @returns {object} the updated wallet row
 */
async function creditWallet(walletId, amount, client) {
    const conn = client || (await db.pool.connect());
    const isOwnTx = !client;
    try {
        if (isOwnTx) await conn.query('BEGIN');

        // Lock the row
        const { rows: [wallet] } = await conn.query(
            'SELECT * FROM wallets WHERE id = $1 FOR UPDATE',
            [walletId]
        );

        if (!wallet) throw new Error(`Wallet ${walletId} not found`);

        const { rows: [updated] } = await conn.query(
            `UPDATE wallets SET balance = balance + $1, updated_at = NOW()
       WHERE id = $2 RETURNING *`,
            [amount, walletId]
        );

        if (isOwnTx) await conn.query('COMMIT');
        return updated;
    } catch (err) {
        if (isOwnTx) await conn.query('ROLLBACK');
        throw err;
    } finally {
        if (isOwnTx) conn.release();
    }
}

module.exports = {
    findByUserId,
    getBalance,
    createWallet,
    debitWallet,
    creditWallet,
};
