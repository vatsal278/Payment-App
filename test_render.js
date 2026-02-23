const https = require('https');

function request(path, method = 'GET', body = null, token = null) {
    return new Promise((resolve, reject) => {
        const options = { hostname: 'cashapp-fj4c.onrender.com', port: 443, path, method, headers: {} };
        if (body) {
            body = JSON.stringify(body);
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(body);
        }
        if (token) options.headers['Authorization'] = 'Bearer ' + token;

        const req = https.request(options, res => {
            let data = ''; res.on('data', d => data += d);
            res.on('end', () => {
                try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
                catch (e) { resolve({ status: res.statusCode, data }); }
            });
        });
        req.on('error', reject);
        if (body) req.write(body);
        req.end();
    });
}

(async () => {
    const stamp = Math.floor(Math.random() * 99999);
    const reg = await request('/api/auth/register', 'POST', { email: `rb${stamp}@test.com`, password: 'Password1!', fullName: 'Bot', cashtag: `bot${stamp}` });
    const token = reg.data?.data?.accessToken;
    if (!token) return console.log('Registration failed:', reg.data);

    const { Pool } = require('pg');
    require('dotenv').config();
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    await pool.query('UPDATE wallets SET balance = 500000 WHERE user_id = $1', [reg.data.data.user.id]);

    await request('/api/trading/order', 'POST', { symbol: 'NVDA', notional: 100, side: 'buy' }, token);
    await new Promise(r => setTimeout(r, 2000));

    console.log('Polling /api/trading/positions/NVDA...');
    for (let i = 0; i < 30; i++) {
        const pos = await request('/api/trading/positions/NVDA', 'GET', null, token);
        const market_value = pos.data?.data?.market_value;
        if (market_value > 0) {
            console.log('✅ Render Deployment is LIVE! Data:', JSON.stringify(pos.data.data, null, 2));
            return await pool.end();
        }
        console.log(`Still zero, Render hasn't restarted or fix failed. Market_value: ${market_value}. Retrying in 5s...`);
        await new Promise(r => setTimeout(r, 5000));
    }
    console.log('Timeout waiting for Render deployment to fix issue.');
    await pool.end();
})();
