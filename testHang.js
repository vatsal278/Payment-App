const https = require('https');
require('dotenv').config();

const req = https.request({
  hostname: 'cashapp-fj4c.onrender.com', port: 443, path: '/api/auth/register', method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, (res) => {
  let body = ''; res.on('data', d => body += d);
  res.on('end', () => {
    const token = JSON.parse(body).data?.accessToken;
    if (!token) return console.log('NO TOKEN', body);
    console.log('Got token, fetching 6 requests...');

    const fetch = (path) => new Promise((resolve) => {
      const start = Date.now();
      const req2 = https.request({
        hostname: 'cashapp-fj4c.onrender.com', port: 443, path, method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      }, (res2) => {
        let b2 = ''; res2.on('data', d => b2 += d);
        res2.on('end', () => resolve({ path, ms: Date.now() - start, status: res2.statusCode }));
      });
      req2.on('error', e => resolve({ path, err: e.message }));
      req2.end();
    });

    Promise.all([
      fetch("/api/wallet/balance"),
      fetch("/api/transfer/history?limit=10"),
      fetch("/api/funding/methods"),
      fetch("/api/notifications?limit=10"),
      fetch("/api/funding/history?limit=10"),
      fetch("/api/trading/orders?limit=10")
    ]).then(r => console.log(r));
  });
});
req.write(JSON.stringify({ email: 'test_hang12@example.com', password: 'Password123!', fullName: 'Hang Tester', cashtag: '$hang12' }));
req.end();
