const https = require('https');
const { Pool } = require('pg');
require('dotenv').config();

const email = 'test_render_final4@example.com';
const data = JSON.stringify({ email, password: 'Password123!', fullName: 'Render Live Test 4', cashtag: '$renderfinal4' });

const req = https.request({
  hostname: 'cashapp-fj4c.onrender.com', port: 443, path: '/api/auth/register', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('API RESPONSE STATUS:', res.statusCode);
    console.log('API RESPONSE BODY:', body);

    // Check DB
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    pool.query('SELECT email, stripe_customer_id FROM users WHERE email = $1', [email])
      .then(dbRes => {
        console.table(dbRes.rows);
        pool.end();
      })
      .catch(e => { console.error('DB Error:', e); pool.end(); });
  });
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
