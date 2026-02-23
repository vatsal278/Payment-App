const { Router } = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const controller = require('../controllers/fundingController');

const router = Router();

// ── Validation schemas ───────────────────────────────

const addMethodSchema = {
    stripe_payment_method_id: { type: 'string', required: true, message: 'stripe_payment_method_id is required' },
    nickname: { type: 'string', required: false, max: 100 },
};

const cashInSchema = {
    payment_method_db_id: { type: 'string', required: true, message: 'payment_method_db_id is required' },
    amount: { type: 'number', required: true, min: 100, message: 'Amount must be at least 100 cents ($1.00)' },
};

const cashOutSchema = {
    amount: { type: 'number', required: true, min: 100, message: 'Amount must be at least 100 cents ($1.00)' },
    speed: { type: 'string', required: false },
};

// ── Routes ───────────────────────────────────────────

router.get('/stripe-config', controller.getStripeConfig);
router.get('/methods', auth, controller.getPaymentMethods);
router.post('/methods', auth, validate(addMethodSchema), controller.addPaymentMethod);
router.post('/methods/link-card', auth, controller.linkCard);
router.delete('/methods/:id', auth, controller.removePaymentMethod);
router.post('/cash-in', auth, validate(cashInSchema), controller.cashIn);
router.post('/cash-out', auth, validate(cashOutSchema), controller.cashOut);
router.get('/history', auth, controller.getFundingHistory);
router.post('/sync/:stripeId', auth, controller.syncFundMovement);

// Webhook — PUBLIC (no jwt, raw body handled in app.js)
router.post('/webhook', controller.stripeWebhook);

module.exports = router;
