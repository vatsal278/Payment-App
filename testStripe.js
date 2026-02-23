require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' });
stripe.customers.create({ email: 'test_stripe_debug@example.com', name: 'Debug Tester' })
    .then(c => console.log('✅ Created:', c.id))
    .catch(e => console.error('❌ Failed:', e.message));
