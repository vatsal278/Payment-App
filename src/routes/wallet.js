const { Router } = require('express');
const auth = require('../middleware/auth');
const { cacheFor } = require('../middleware/cache');
const controller = require('../controllers/walletController');

const router = Router();

router.get('/balance', auth, cacheFor(15), controller.getBalance);
router.get('/statement', auth, cacheFor(30), controller.getStatement);
router.post('/debit', auth, controller.debitForSavings);
router.post('/credit', auth, controller.creditForSavings);

module.exports = router;
