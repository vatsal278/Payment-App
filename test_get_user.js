const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
    try {
        const { rows } = await pool.query("SELECT user_id, symbol FROM positions WHERE symbol = 'NVDA' LIMIT 1");
        if (!rows.length) return console.log('No NVDA holders in DB');
        const userId = rows[0].user_id;

        const { rows: users } = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
        console.log('Got user:', users[0].email);
    } catch (e) { console.error('DB Error:', e); }
    finally { await pool.end(); }
}
check();
