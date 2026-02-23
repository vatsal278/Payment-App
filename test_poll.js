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
    const stamp = Date.now();
    const reg = await request('/api/auth/register', 'POST', { email: `t${stamp}@test.com`, password: 'Password1!', fullName: 'Bot', cashtag: `a${stamp}` });
    const token = reg.data?.data?.accessToken;
    if (!token) return console.log('Reg failed', reg);

    const { Pool } = require('pg');
    require('dotenv').config();
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    await pool.query('UPDATE wallets SET balance = 500000 WHERE user_id = $1', [reg.data.data.user.id]);

    await request('/api/trading/order', 'POST', { symbol: 'NVDA', notional: 100, side: 'buy' }, token);
    await new Promise(r => setTimeout(r, 2000));

    const pos = await request('/api/trading/positions/NVDA', 'GET', null, token);
    console.log('LIVE POSITION VALUE:', pos.data?.data?.market_value);

    await pool.end();
})();
