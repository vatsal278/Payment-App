const https = require('https');
const req = https.request({
    hostname: 'cashapp-fj4c.onrender.com', port: 443, path: '/api/auth/register', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}, (res) => {
    let body = ''; res.on('data', d => body += d);
    res.on('end', () => {
        const token = JSON.parse(body).data?.accessToken;
        if (!token) return console.log('NO TOKEN', body);

        // Test Alpaca Crypto endpoint
        const req2 = https.request({
            hostname: 'cashapp-fj4c.onrender.com', port: 443, path: '/api/trading/crypto/quote/BTC%2FUSD', method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        }, (res2) => {
            let b2 = ''; res2.on('data', d => b2 += d);
            res2.on('end', () => console.log('BTC QUOTE STATUS:', res2.statusCode, '\nBTC JSON:', b2));
        });
        req2.end();
    });
});
req.write(JSON.stringify({ email: 'test_alpaca3@example.com', password: 'Password123!', fullName: 'Alpaca Tester', cashtag: '$alp_test3' }));
req.end();
