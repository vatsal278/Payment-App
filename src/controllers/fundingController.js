const stripe = require("../utils/stripe");
const db = require("../config/db");
const fundingModel = require("../models/fundingModel");
const walletModel = require("../models/walletModel");
const ledgerModel = require("../models/ledgerModel");
const userModel = require("../models/userModel");
const notificationModel = require("../models/notificationModel");
const ApiError = require("../utils/errors");
const { formatCurrency } = require("../utils/money");

// ────────────────────────────────────────────────────────
// POST /api/funding/methods
// ────────────────────────────────────────────────────────
async function addPaymentMethod(req, res, next) {
  try {
    const { stripe_payment_method_id, nickname } = req.body;
    const user = await userModel.findById(req.user.id);
    if (!user) throw ApiError.notFound("User not found");
    if (!user.stripe_customer_id)
      throw ApiError.badRequest(
        "User has no Stripe customer — re-register or contact support",
      );

    // Attach the PaymentMethod to the Stripe Customer
    await stripe.paymentMethods.attach(stripe_payment_method_id, {
      customer: user.stripe_customer_id,
    });

    // Retrieve full details from Stripe
    const pm = await stripe.paymentMethods.retrieve(stripe_payment_method_id);
    const pmType = pm.type === "us_bank_account" ? "bank" : "card";
    const lastFour = pm.card?.last4 || pm.us_bank_account?.last4 || null;
    const brand = pm.card?.brand || pm.us_bank_account?.bank_name || null;

    // Check if this is the user's first payment method
    const existing = await fundingModel.findPaymentMethodsByUserId(user.id);
    const isDefault = existing.length === 0;

    const saved = await fundingModel.createPaymentMethod({
      userId: user.id,
      type: pmType,
      stripePaymentMethodId: stripe_payment_method_id,
      lastFour,
      brand,
      nickname,
      isDefault,
    });

    res.status(201).json({
      success: true,
      data: { paymentMethod: saved },
      message: "Payment method added" + (isDefault ? " (set as default)" : ""),
      error: "",
    });
  } catch (err) {
    next(err);
  }
}

// ────────────────────────────────────────────────────────
// DELETE /api/funding/methods/:id
// ────────────────────────────────────────────────────────
async function removePaymentMethod(req, res, next) {
  try {
    const pm = await fundingModel.findPaymentMethodById(req.params.id);
    if (!pm) throw ApiError.notFound("Payment method not found");
    if (pm.user_id !== req.user.id)
      throw ApiError.forbidden("Not your payment method");

    // Detach from Stripe
    try {
      await stripe.paymentMethods.detach(pm.stripe_payment_method_id);
    } catch (stripeErr) {
      // If already detached in Stripe, still soft-delete locally
      console.warn("Stripe detach warning:", stripeErr.message);
    }

    // Soft delete
    await fundingModel.removePaymentMethod(pm.id, req.user.id);

    res.json({
      success: true,
      data: null,
      message: "Payment method removed",
      error: "",
    });
  } catch (err) {
    next(err);
  }
}

// ────────────────────────────────────────────────────────
// GET /api/funding/methods
// ────────────────────────────────────────────────────────
async function getPaymentMethods(req, res, next) {
  try {
    const methods = await fundingModel.findPaymentMethodsByUserId(req.user.id);
    res.json({
      success: true,
      data: { paymentMethods: methods },
      message: "",
      error: "",
    });
  } catch (err) {
    next(err);
  }
}

// ────────────────────────────────────────────────────────
// POST /api/funding/cash-in
// ────────────────────────────────────────────────────────
async function cashIn(req, res, next) {
  try {
    const { payment_method_db_id, amount } = req.body;

    // Validate amount
    if (!Number.isInteger(amount) || amount < 100 || amount > 10000000) {
      throw ApiError.badRequest(
        "Amount must be an integer between $1.00 (100 cents) and $100,000 (10000000 cents)",
      );
    }

    // Look up payment method
    const pm = await fundingModel.findPaymentMethodById(payment_method_db_id);
    if (!pm) throw ApiError.notFound("Payment method not found");
    if (pm.user_id !== req.user.id)
      throw ApiError.forbidden("Not your payment method");

    const user = await userModel.findById(req.user.id);
    if (!user || !user.stripe_customer_id)
      throw ApiError.badRequest("No Stripe customer found");

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: user.stripe_customer_id,
      payment_method: pm.stripe_payment_method_id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    // Create fund_movement record
    const movement = await fundingModel.createFundMovement({
      userId: user.id,
      paymentMethodId: pm.id,
      direction: "cash_in",
      amount,
      fee: 0,
      netAmount: amount,
      stripeReferenceId: paymentIntent.id,
      status: "pending",
    });

    // Handle immediate success
    if (paymentIntent.status === "succeeded") {
      await processCashInSuccess(movement, user);

      return res.status(201).json({
        success: true,
        data: {
          movement: await fundingModel.findFundMovementByStripeRef(
            paymentIntent.id,
          ),
        },
        message: `Added ${formatCurrency(amount)} to your balance`,
        error: "",
      });
    }

    // Handle requires_action (3DS)
    if (paymentIntent.status === "requires_action") {
      return res.status(202).json({
        success: true,
        data: {
          movement,
          requiresAction: true,
          clientSecret: paymentIntent.client_secret,
        },
        message: "Additional authentication required",
        error: "",
      });
    }

    // Handle failure
    await fundingModel.updateFundMovementStatus(movement.id, "failed");
    throw ApiError.badRequest(
      `Payment failed with status: ${paymentIntent.status}`,
    );
  } catch (err) {
    next(err);
  }
}

// ────────────────────────────────────────────────────────
// POST /api/funding/cash-out
// ────────────────────────────────────────────────────────
async function cashOut(req, res, next) {
  const client = await db.pool.connect();
  try {
    const { amount, speed = "standard" } = req.body;

    if (!["standard", "instant"].includes(speed)) {
      throw ApiError.badRequest('Speed must be "standard" or "instant"');
    }

    // Validate amount
    if (!Number.isInteger(amount) || amount < 100 || amount > 10000000) {
      throw ApiError.badRequest("Minimum withdrawal is $1.00 (100 cents), Maximum is $100,000");
    }

    const wallet = await walletModel.findByUserId(req.user.id);
    if (!wallet) throw ApiError.notFound("Wallet not found");
    if (wallet.balance < amount)
      throw ApiError.badRequest("Insufficient balance");

    // Fee calculation
    const fee =
      speed === "instant"
        ? Math.max(25, Math.round(amount * 0.015)) // 1.5%, min $0.25
        : 0;
    const netAmount = amount - fee;

    // Atomically debit wallet for full amount
    await client.query("BEGIN");
    await walletModel.debitWallet(wallet.id, amount, client);

    // Create fund_movement
    const movement = await fundingModel.createFundMovement({
      userId: req.user.id,
      direction: "cash_out",
      amount,
      fee,
      netAmount,
      status: "pending",
      speed,
    });

    // Create Stripe Payout (or simulate in test mode)
    let payout;
    const isTestMode = (process.env.STRIPE_SECRET_KEY || "").startsWith(
      "sk_test_",
    );

    if (isTestMode) {
      // In Stripe test mode, payouts require an external bank account
      // which is complex to set up. Simulate a successful payout instead.
      payout = {
        id: `po_test_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
        object: "payout",
        amount: netAmount,
        currency: "usd",
        status: "paid",
        method: speed === "instant" ? "instant" : "standard",
      };
    } else {
      try {
        payout = await stripe.payouts.create({
          amount: netAmount,
          currency: "usd",
          method: speed === "instant" ? "instant" : "standard",
        });
      } catch (stripeErr) {
        // Stripe payout failed — reverse the wallet debit
        await walletModel.creditWallet(wallet.id, amount, client);
        await client.query("COMMIT");
        await fundingModel.updateFundMovementStatus(movement.id, "failed");

        await notificationModel.createNotification({
          userId: req.user.id,
          message: `Your withdrawal of ${formatCurrency(amount)} failed: ${stripeErr.message}`,
          type: "cashout_failed",
          referenceId: movement.id,
        });

        throw ApiError.badRequest(`Payout failed: ${stripeErr.message}`);
      }
    }

    // Save Stripe payout ID
    await db.query(
      "UPDATE fund_movements SET stripe_reference_id = $1 WHERE id = $2",
      [payout.id, movement.id],
    );

    // Create ledger entry for the withdrawal
    // First we need to find a transaction context — create a pseudo-transaction or just log ledger
    await fundingModel.updateFundMovementStatus(movement.id, "completed");

    await notificationModel.createNotification({
      userId: req.user.id,
      message: `You withdrew ${formatCurrency(amount)}${fee > 0 ? ` (fee: ${formatCurrency(fee)})` : ""} from your FlowCash balance`,
      type: "cashout_completed",
      referenceId: movement.id,
    });

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      data: {
        movement: {
          ...movement,
          stripe_reference_id: payout.id,
          status: "completed",
        },
      },
      message: `Withdrew ${formatCurrency(netAmount)}${fee > 0 ? ` (fee: ${formatCurrency(fee)})` : ""}`,
      error: "",
    });
  } catch (err) {
    await client.query("ROLLBACK").catch(() => { });
    next(err);
  } finally {
    client.release();
  }
}

// ────────────────────────────────────────────────────────
// GET /api/funding/history
// ────────────────────────────────────────────────────────
async function getFundingHistory(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 20),
    );

    const result = await fundingModel.findFundMovementsByUserId(req.user.id, {
      page,
      limit,
    });

    res.json({
      success: true,
      data: result,
      message: "",
      error: "",
    });
  } catch (err) {
    next(err);
  }
}

// ────────────────────────────────────────────────────────
// POST /api/funding/webhook  (PUBLIC — raw body, no JWT)
// ────────────────────────────────────────────────────────
async function stripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw Buffer (express.raw)
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ received: false, error: err.message });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const pi = event.data.object;
        const movement = await fundingModel.findFundMovementByStripeRef(pi.id);
        if (!movement) break; // Not ours
        if (movement.status === "completed") break; // Idempotent

        const user = await userModel.findById(movement.user_id);
        if (user) await processCashInSuccess(movement, user);
        break;
      }

      case "payment_intent.payment_failed": {
        const pi = event.data.object;
        const movement = await fundingModel.findFundMovementByStripeRef(pi.id);
        if (!movement) break;
        if (movement.status === "failed") break; // Idempotent

        await fundingModel.updateFundMovementStatus(movement.id, "failed");
        await notificationModel.createNotification({
          userId: movement.user_id,
          message: `Your cash in of ${formatCurrency(movement.amount)} failed`,
          type: "cashin_failed",
          referenceId: movement.id,
        });
        break;
      }

      case "payout.paid": {
        const po = event.data.object;
        const movement = await fundingModel.findFundMovementByStripeRef(po.id);
        if (!movement) break;
        if (movement.status === "completed") break;
        await fundingModel.updateFundMovementStatus(movement.id, "completed");
        break;
      }

      case "payout.failed": {
        const po = event.data.object;
        const movement = await fundingModel.findFundMovementByStripeRef(po.id);
        if (!movement) break;
        if (movement.status === "failed") break;

        await fundingModel.updateFundMovementStatus(movement.id, "failed");

        // Reverse the wallet debit atomically
        const wallet = await walletModel.findByUserId(movement.user_id);
        if (wallet) {
          await walletModel.creditWallet(wallet.id, movement.amount);
        }

        await notificationModel.createNotification({
          userId: movement.user_id,
          message: `Your withdrawal of ${formatCurrency(movement.amount)} failed. Your balance has been restored.`,
          type: "cashout_failed",
          referenceId: movement.id,
        });
        break;
      }

      default:
        // Unhandled event type — ignore
        break;
    }
  } catch (err) {
    // Log but don't fail — Stripe requires 200
    console.error("Webhook handler error:", err.message);
  }

  // Always return 200 to Stripe
  res.json({ received: true });
}

// ────────────────────────────────────────────────────────
// POST /api/funding/sync/:stripeId
// ────────────────────────────────────────────────────────
async function syncFundMovement(req, res, next) {
  try {
    const { stripeId } = req.params;
    let movement = await fundingModel.findFundMovementByStripeRef(stripeId);

    // Retrieve from Stripe
    let stripeObj;
    if (stripeId.startsWith("pi_")) {
      stripeObj = await stripe.paymentIntents.retrieve(stripeId);
    } else if (stripeId.startsWith("po_") || stripeId.startsWith("tr_")) {
      stripeObj = await stripe.payouts.retrieve(stripeId);
    } else {
      throw ApiError.badRequest("Invalid Stripe ID format (pi_ or po_)");
    }

    if (!stripeObj) throw ApiError.notFound("Stripe object not found");

    // If movement doesn't exist, we might need to find it by user or just fail
    if (!movement) {
      throw ApiError.notFound(
        `No fund movement found in database for ${stripeId}. Manual intervention required.`,
      );
    }

    // Only allow the owner or admin to sync
    if (movement.user_id !== req.user.id) {
      throw ApiError.forbidden(
        "You do not have permission to sync this transaction",
      );
    }

    // Handle based on object type
    if (stripeObj.object === "payment_intent") {
      if (stripeObj.status === "succeeded" && movement.status !== "completed") {
        const user = await userModel.findById(movement.user_id);
        await processCashInSuccess(movement, user);
      } else if (
        stripeObj.status === "requires_payment_method" ||
        stripeObj.status === "canceled"
      ) {
        await fundingModel.updateFundMovementStatus(movement.id, "failed");
      }
    } else if (stripeObj.object === "payout") {
      if (stripeObj.status === "paid" && movement.status !== "completed") {
        await fundingModel.updateFundMovementStatus(movement.id, "completed");
      } else if (
        stripeObj.status === "failed" &&
        movement.status !== "failed"
      ) {
        await fundingModel.updateFundMovementStatus(movement.id, "failed");
        const wallet = await walletModel.findByUserId(movement.user_id);
        if (wallet) await walletModel.creditWallet(wallet.id, movement.amount);
      }
    }

    const updated = await fundingModel.findFundMovementByStripeRef(stripeId);

    res.json({
      success: true,
      data: { movement: updated },
      message: `Synced with Stripe. Current status: ${updated.status}`,
      error: "",
    });
  } catch (err) {
    next(err);
  }
}

// ════════════════════════════════════════════════════════
// Helper: process a successful cash-in
// ════════════════════════════════════════════════════════
async function processCashInSuccess(movement, user) {
  const wallet = await walletModel.findByUserId(user.id);
  if (!wallet) throw new Error("Wallet not found for user " + user.id);

  // Credit wallet atomically
  await walletModel.creditWallet(wallet.id, movement.amount);

  // Update movement status
  await fundingModel.updateFundMovementStatus(movement.id, "completed");

  // Notify
  await notificationModel.createNotification({
    userId: user.id,
    message: `You added ${formatCurrency(movement.amount)} to your FlowCash balance`,
    type: "cashin_completed",
    referenceId: movement.id,
  });
}

// ────────────────────────────────────────────────────────
// POST /api/funding/methods/link-card
// Accept raw card details (for demo purposes) and save to DB
// ────────────────────────────────────────────────────────
async function linkCard(req, res, next) {
  try {
    const { cardNumber, expiry, cvv, nickname } = req.body;

    if (!cardNumber || !expiry || !cvv) {
      throw ApiError.badRequest("Card number, expiry, and CVV are required");
    }

    // Sanitize card number (remove spaces/dashes)
    const cleaned = cardNumber.replace(/[\s-]/g, "");
    if (cleaned.length < 13 || cleaned.length > 19) {
      throw ApiError.badRequest("Invalid card number");
    }

    // Detect brand from first digits
    let brand = "Card";
    if (cleaned.startsWith("4")) brand = "Visa";
    else if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) brand = "Mastercard";
    else if (cleaned.startsWith("37") || cleaned.startsWith("34")) brand = "Amex";
    else if (cleaned.startsWith("6011") || cleaned.startsWith("65")) brand = "Discover";

    const lastFour = cleaned.slice(-4);

    const user = await userModel.findById(req.user.id);
    if (!user) throw ApiError.notFound("User not found");

    // Check if this is the user's first payment method
    const existing = await fundingModel.findPaymentMethodsByUserId(user.id);
    const isDefault = existing.length === 0;

    // Generate a fake stripe PM id for demo purposes
    const fakePmId = `pm_demo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const saved = await fundingModel.createPaymentMethod({
      userId: user.id,
      type: "card",
      stripePaymentMethodId: fakePmId,
      lastFour,
      brand,
      nickname: nickname || `${brand} •••• ${lastFour}`,
      isDefault,
    });

    res.status(201).json({
      success: true,
      data: { paymentMethod: saved },
      message: `${brand} card ending in ${lastFour} linked successfully`,
      error: "",
    });
  } catch (err) {
    next(err);
  }
}

// ────────────────────────────────────────────────────────
// GET /api/funding/stripe-config
// ────────────────────────────────────────────────────────
function getStripeConfig(_req, res) {
  res.json({
    success: true,
    data: { publishableKey: process.env.STRIPE_PUBLISHABLE_KEY },
    message: "",
    error: "",
  });
}

module.exports = {
  addPaymentMethod,
  removePaymentMethod,
  getPaymentMethods,
  cashIn,
  cashOut,
  getFundingHistory,
  stripeWebhook,
  syncFundMovement,
  linkCard,
  getStripeConfig,
};
