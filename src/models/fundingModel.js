const db = require('../config/db');

// ═══════════════════════════════════════════════════════
// Payment Methods
// ═══════════════════════════════════════════════════════

async function createPaymentMethod(data) {
    const { rows } = await db.query(
        `INSERT INTO payment_methods
       (user_id, type, stripe_payment_method_id, last_four, brand, nickname, is_default)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
        [data.userId, data.type, data.stripePaymentMethodId, data.lastFour, data.brand, data.nickname || null, data.isDefault || false]
    );
    return rows[0];
}

async function findPaymentMethodById(id) {
    const { rows } = await db.query('SELECT * FROM payment_methods WHERE id = $1', [id]);
    return rows[0] || null;
}

async function findPaymentMethodsByUserId(userId) {
    const { rows } = await db.query(
        "SELECT * FROM payment_methods WHERE user_id = $1 AND status = 'active' ORDER BY is_default DESC, created_at DESC",
        [userId]
    );
    return rows;
}

async function setDefaultPaymentMethod(id, userId) {
    // Unset all others first, then set the target
    await db.query("UPDATE payment_methods SET is_default = FALSE WHERE user_id = $1", [userId]);
    const { rows } = await db.query(
        "UPDATE payment_methods SET is_default = TRUE WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, userId]
    );
    return rows[0] || null;
}

async function removePaymentMethod(id, userId) {
    const { rows } = await db.query(
        "UPDATE payment_methods SET status = 'removed' WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, userId]
    );
    return rows[0] || null;
}

// ═══════════════════════════════════════════════════════
// Fund Movements
// ═══════════════════════════════════════════════════════

async function createFundMovement(data) {
    const { rows } = await db.query(
        `INSERT INTO fund_movements
       (user_id, payment_method_id, direction, amount, fee, net_amount, stripe_reference_id, status, speed)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
        [
            data.userId, data.paymentMethodId || null, data.direction,
            data.amount, data.fee || 0, data.netAmount,
            data.stripeReferenceId || null, data.status || 'pending', data.speed || 'standard',
        ]
    );
    return rows[0];
}

async function findFundMovementByStripeRef(stripeReferenceId) {
    const { rows } = await db.query(
        'SELECT * FROM fund_movements WHERE stripe_reference_id = $1',
        [stripeReferenceId]
    );
    return rows[0] || null;
}

async function updateFundMovementStatus(id, status) {
    const { rows } = await db.query(
        'UPDATE fund_movements SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
    );
    return rows[0] || null;
}

async function findFundMovementsByUserId(userId, { page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;

    const countResult = await db.query(
        'SELECT COUNT(*) AS total FROM fund_movements WHERE user_id = $1',
        [userId]
    );
    const total = parseInt(countResult.rows[0].total, 10);

    const { rows } = await db.query(
        `SELECT fm.*, pm.last_four, pm.brand, pm.nickname
     FROM fund_movements fm
     LEFT JOIN payment_methods pm ON fm.payment_method_id = pm.id
     WHERE fm.user_id = $1
     ORDER BY fm.created_at DESC
     LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
    );

    return {
        movements: rows,
        pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
}

module.exports = {
    createPaymentMethod,
    findPaymentMethodById,
    findPaymentMethodsByUserId,
    setDefaultPaymentMethod,
    removePaymentMethod,
    createFundMovement,
    findFundMovementByStripeRef,
    updateFundMovementStatus,
    findFundMovementsByUserId,
};
