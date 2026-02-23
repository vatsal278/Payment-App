const alpaca = require('./src/utils/alpacaService');
const { Pool } = require('pg');
require('dotenv').config();

async function testController() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    try {
        const { rows } = await pool.query("SELECT * FROM positions WHERE user_id = $1 AND symbol = 'NVDA'", ['137b84b1-8189-4530-8458-5d9c91bf7a5e']);
        const p = rows[0];
        let currentPrice = 0;

        console.log('--- FETCHING ALPACA ---');
        console.log('Using function: getStockSnapshot(NVDA)');
        const q = await alpaca.getStockSnapshot('NVDA');
        console.log('Snapshot keys:', Object.keys(q));

        currentPrice = parseFloat(q.latestTrade?.p || q.minuteBar?.c || 0);
        console.log('Raw currentPrice parsed:', currentPrice);

        const qty = parseFloat(p.quantity);
        console.log('qty parsed:', qty);

        const marketValue = qty * currentPrice;
        console.log('FINAL MARKET VALUE:', marketValue);
    } catch (e) {
        console.error('MATH ERROR:', e.message);
        if (e.response) console.error('RESPONSE DATA:', e.response.data);
    }
    finally { await pool.end(); }
}
testController();
