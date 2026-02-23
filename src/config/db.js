const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Log pool errors so they don't crash the process silently
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});

/**
 * Convenience wrapper — use like:
 *   const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
 */
module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
