const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function refundGhosts() {
    try {
        const { rows: pendingOrders } = await pool.query("SELECT * FROM orders WHERE status = 'pending'");
        console.log('Ghost orders found:', pendingOrders.length);
        let totalRefund = 0;

        for (const po of pendingOrders) {
            if (po.side === 'buy') totalRefund += Number(po.amount_cents);
            await pool.query("UPDATE orders SET status = 'cancelled', updated_at = NOW() WHERE id = $1", [po.id]);
        }

        if (totalRefund > 0) {
            const { rows: wallets } = await pool.query('SELECT id, balance FROM wallets LIMIT 1');
            if (wallets.length > 0) {
                const newBalance = Number(wallets[0].balance) + totalRefund;
                await pool.query('UPDATE wallets SET balance = $1 WHERE id = $2', [newBalance, wallets[0].id]);
                console.log('✅ Refunded wallet by:', totalRefund / 100, 'USD. New balance:', newBalance / 100);
            }
        } else {
            console.log('No refunds required.');
        }

    } catch (e) { console.error('Error:', e); }
    finally { pool.end(); }
}
refundGhosts();
