require('dotenv').config();
const controller = require('./src/controllers/tradingController');
const req = { user: { id: '137b84b1-8189-4530-8458-5d9c91bf7a5e' }, params: { symbol: 'NVDA' } };
const res = { json: (data) => console.log('CONTROLLER OUTPUT:', JSON.stringify(data, null, 2)) };
controller.getPosition(req, res, (err) => { if (err) console.error('NEXT CALLED WITH ERROR:', err); });
