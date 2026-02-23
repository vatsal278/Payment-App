const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

async function getPositionsByUserId(userId, assetClass = null) {
  let query = "SELECT * FROM positions WHERE user_id = $1";
  const params = [userId];

  if (assetClass) {
    // Map Alpaca asset class to our DB expected values (if using ENUMs)
    // Usually: "us_equity" -> "equity", "crypto" -> "crypto"
    const dbAssetType = assetClass === "us_equity" ? "equity" : "crypto";
    query += " AND asset_type = $2";
    params.push(dbAssetType);
  }

  const { rows } = await db.query(query, params);
  return rows;
}

async function getPosition(userId, symbol) {
  const { rows } = await db.query(
    "SELECT * FROM positions WHERE user_id = $1 AND symbol = $2",
    [userId, symbol.toUpperCase()],
  );
  return rows[0] || null;
}

async function upsertPosition(
  userId,
  symbol,
  assetType,
  quantityDelta,
  avgCostCents = 0,
  client,
) {
  const conn = client || db;

  const existing = await getPosition(userId, symbol);

  if (existing) {
    // Update
    const newQty = Number(existing.quantity) + Number(quantityDelta);
    if (newQty <= 0) {
      // Delete position if liquidated
      await conn.query("DELETE FROM positions WHERE id = $1", [existing.id]);
      return null;
    }

    // Simple moving average cost base
    let newAvgCost = Number(existing.avg_cost_cents);
    if (Number(quantityDelta) > 0) {
      const totalCostBefore =
        Number(existing.quantity) * Number(existing.avg_cost_cents);
      const totalCostAdded = Number(quantityDelta) * avgCostCents;
      newAvgCost = Math.round((totalCostBefore + totalCostAdded) / newQty);
    }

    const { rows } = await conn.query(
      "UPDATE positions SET quantity = $1, avg_cost_cents = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [newQty, newAvgCost, existing.id],
    );
    return rows[0];
  } else {
    // Insert
    if (Number(quantityDelta) <= 0) return null; // Can't start with short/negative for now

    const id = uuidv4();
    const { rows } = await conn.query(
      `INSERT INTO positions (id, user_id, symbol, asset_type, quantity, avg_cost_cents)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        id,
        userId,
        symbol.toUpperCase(),
        assetType,
        quantityDelta,
        avgCostCents,
      ],
    );
    return rows[0];
  }
}

module.exports = {
  getPositionsByUserId,
  getPosition,
  upsertPosition,
};
