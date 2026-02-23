const { Router } = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/tradingController');

const router = Router();

// ── Account ──────────────────────────────────────────
router.get('/account', auth, controller.getAccount);
router.get('/portfolio/history', auth, controller.getPortfolioHistory); // ?period=1M&timeframe=1D

// ── Quotes (stocks) ──────────────────────────────────
router.get('/quotes', auth, controller.getMultiStockQuotes);        // ?symbols=AAPL,TSLA,...
router.get('/quote/:symbol', auth, controller.getStockQuote);       // /quote/AAPL

// ── Quotes (crypto) ──────────────────────────────────
router.get('/crypto/quote/:symbol(*)', auth, controller.getCryptoQuote);  // /crypto/quote/BTC/USD

// ── Bars (stocks) ────────────────────────────────────
router.get('/bars/:symbol', auth, controller.getStockBars);         // ?timeframe=1Day&start=...&limit=200

// ── Bars (crypto) ────────────────────────────────────
router.get('/crypto/bars/:symbol(*)', auth, controller.getCryptoBars);  // /crypto/bars/BTC/USD

// ── Orders ───────────────────────────────────────────
router.post('/order', auth, controller.placeOrder);                 // { symbol, notional, side }
router.delete('/order/:id', auth, controller.cancelOrder);
router.get('/orders', auth, controller.getOrders);                  // ?status=all&limit=20

// ── Positions ────────────────────────────────────────
router.get('/positions', auth, controller.getPositions);
router.get('/positions/:symbol', auth, controller.getPosition);     // /positions/AAPL

// ── Debug ────────────────────────────────────────────
router.get('/healthcheck-alpaca', async (req, res) => {
    try {
        const alpaca = require('../utils/alpacaService');
        const q = await alpaca.getStockSnapshot('NVDA');
        res.json({ live_code: true, snapshot: q });
    } catch (e) {
        res.status(500).json({ live_code: true, error: e.message, data: e.response?.data });
    }
});

module.exports = router;
