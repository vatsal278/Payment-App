require('dotenv').config();
const alpaca = require('./src/utils/alpacaService');
alpaca.getStockSnapshot('NVDA').then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
