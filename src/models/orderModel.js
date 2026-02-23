const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

async function createOrder(
  {
    userId,
    symbol,
    assetType,
    side,
    amountCents,
    quantity,
    priceCents,
    status,
    note,
    dwOrderId,
  },
  client,
) {
  const conn = client || db;
  const id = uuidv4();

  const { rows } = await conn.query(
    `INSERT INTO orders (id, user_id, symbol, asset_type, side, amount_cents, quantity, price_cents, status, note, fee_cents, dw_order_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    [
      id,
      userId,
      symbol.toUpperCase(),
      assetType,
      side,
      amountCents,
      quantity,
      priceCents,
      status || "pending",
      note || null,
      0,
      dwOrderId || null,
    ],
  );
  return rows[0];
}

async function getOrdersByUserId(userId, limit = 50) {
  const { rows } = await db.query(
    "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2",
    [userId, limit],
  );
  return rows;
}

async function findById(id) {
  const { rows } = await db.query("SELECT * FROM orders WHERE id = $1", [id]);
  return rows[0];
}

async function updateOrderStatus(id, status, client) {
  const conn = client || db;
  const { rows } = await conn.query(
    "UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    [status, id],
  );
  return rows[0];
}

module.exports = {
  createOrder,
  getOrdersByUserId,
  findById,
  updateOrderStatus,
};
