const db = require("../config/db");
const userModel = require("../models/userModel");
const walletModel = require("../models/walletModel");
const transactionModel = require("../models/transactionModel");
const ledgerModel = require("../models/ledgerModel");
const notificationModel = require("../models/notificationModel");
const positionModel = require("../models/positionModel");
const ApiError = require("../utils/errors");
const { formatCurrency } = require("../utils/money");

// ────────────────────────────────────────────────────────
// POST /api/transfer/send
// ────────────────────────────────────────────────────────
async function sendMoney(req, res, next) {
  const client = await db.pool.connect();
  try {
    const { cashtag, amount, note } = req.body;
    const senderId = req.user.id;
    const idempotencyKey = req.header("X-Idempotency-Key");

    // ── Idempotency Check ──
    if (idempotencyKey) {
      const existing = await transactionModel.findByIdempotencyKey(
        senderId,
        idempotencyKey,
      );
      if (existing) {
        return res.status(200).json({
          success: true,
          data: { transaction: existing },
          message: `Duplicate request ignored. Transaction previously created on ${existing.created_at}.`,
          error: "",
        });
      }
    }

    if (!Number.isInteger(amount) || amount <= 0 || amount > 10000000) {
      throw ApiError.badRequest("Amount must be a positive integer in cents (max $100,000)");
    }

    if (note && note.length > 255) {
      throw ApiError.badRequest("Note cannot exceed 255 characters");
    }

    // ── Validate receiver ──
    const receiver = await userModel.findByCashtag(cashtag);
    if (!receiver) throw ApiError.notFound(`User ${cashtag} not found`);
    if (receiver.id === senderId)
      throw ApiError.badRequest("Cannot send money to yourself");

    // ── Validate sender wallet ──
    const senderWallet = await walletModel.findByUserId(senderId);
    if (!senderWallet) throw ApiError.internal("Sender wallet not found");
    if (Number(senderWallet.balance) < amount)
      throw ApiError.badRequest("Insufficient balance");

    const receiverWallet = await walletModel.findByUserId(receiver.id);
    if (!receiverWallet) throw ApiError.internal("Receiver wallet not found");

    // ── Atomic transfer ──
    await client.query("BEGIN");

    // 1. Debit sender
    await walletModel.debitWallet(senderWallet.id, amount, client);

    // 2. Credit receiver
    await walletModel.creditWallet(receiverWallet.id, amount, client);

    // 3. Create transaction record
    const tx = await transactionModel.createTransaction(
      {
        senderId,
        receiverId: receiver.id,
        amount,
        type: "send",
        note: note || null,
        status: "completed",
        idempotencyKey: idempotencyKey || null,
      },
      client,
    );

    // 4. Create ledger entries (debit for sender, credit for receiver)
    await ledgerModel.createEntry(
      {
        transactionId: tx.id,
        walletId: senderWallet.id,
        entryType: "debit",
        amount,
      },
      client,
    );

    await ledgerModel.createEntry(
      {
        transactionId: tx.id,
        walletId: receiverWallet.id,
        entryType: "credit",
        amount,
      },
      client,
    );

    // 5. Create notifications
    const sender = await userModel.findById(senderId);
    await notificationModel.createNotification({
      userId: receiver.id,
      message: `${sender.cashtag} sent you ${formatCurrency(amount)}`,
      type: "payment_received",
      referenceId: tx.id,
    }, client);

    await notificationModel.createNotification({
      userId: senderId,
      message: `You sent ${formatCurrency(amount)} to ${receiver.cashtag}`,
      type: "payment_sent",
      referenceId: tx.id,
    }, client);

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      data: { transaction: tx },
      message: `Sent ${formatCurrency(amount)} to ${receiver.cashtag}`,
      error: "",
    });
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
}

// ────────────────────────────────────────────────────────
// POST /api/transfer/request
// ────────────────────────────────────────────────────────
async function requestMoney(req, res, next) {
  try {
    const { cashtag, amount, note } = req.body;
    const requesterId = req.user.id;
    const idempotencyKey = req.header("X-Idempotency-Key");

    // ── Idempotency Check ──
    if (idempotencyKey) {
      const existing = await transactionModel.findByIdempotencyKey(
        requesterId,
        idempotencyKey,
      );
      if (existing) {
        return res.status(200).json({
          success: true,
          data: { transaction: existing },
          message: `Duplicate request ignored (Transaction ID: ${existing.id})`,
          error: "",
        });
      }
    }

    if (!Number.isInteger(amount) || amount <= 0 || amount > 10000000) {
      throw ApiError.badRequest("Amount must be a positive integer in cents (max $100,000)");
    }

    if (note && note.length > 255) {
      throw ApiError.badRequest("Note cannot exceed 255 characters");
    }

    const requestedUser = await userModel.findByCashtag(cashtag);
    if (!requestedUser) throw ApiError.notFound(`User ${cashtag} not found`);
    if (requestedUser.id === requesterId)
      throw ApiError.badRequest("Cannot request money from yourself");

    // Create a pending request transaction
    // In a request: sender = the person being asked to pay, receiver = the person requesting
    const tx = await transactionModel.createTransaction({
      senderId: requestedUser.id,
      receiverId: requesterId,
      amount,
      type: "request",
      note: note || null,
      status: "pending",
      idempotencyKey: idempotencyKey || null,
    });

    const requester = await userModel.findById(requesterId);
    await notificationModel.createNotification({
      userId: requestedUser.id,
      message: `${requester.cashtag} requested ${formatCurrency(amount)} from you`,
      type: "payment_request",
      referenceId: tx.id,
    });

    res.status(201).json({
      success: true,
      data: { transaction: tx },
      message: `Requested ${formatCurrency(amount)} from ${requestedUser.cashtag}`,
      error: "",
    });
  } catch (err) {
    next(err);
  }
}

// ────────────────────────────────────────────────────────
// POST /api/transfer/respond/:transactionId
// Body: { action: "accept" | "decline" }
// ────────────────────────────────────────────────────────
async function respondToRequest(req, res, next) {
  const client = await db.pool.connect();
  try {
    const { transactionId } = req.params;
    const { action } = req.body;
    const userId = req.user.id;

    // ── Begin Transaction to Lock Row ──
    await client.query("BEGIN");

    const { rows: [tx] } = await client.query(
      "SELECT * FROM transactions WHERE id = $1 FOR UPDATE",
      [transactionId]
    );

    if (!tx) {
      throw ApiError.notFound("Transaction not found");
    }
    if (tx.type !== "request") {
      throw ApiError.badRequest("This is not a payment request");
    }
    if (tx.status !== "pending") {
      throw ApiError.badRequest(`Request already ${tx.status}`);
    }

    // The sender_id is the person being asked to pay
    if (tx.sender_id !== userId) {
      throw ApiError.forbidden("You are not the recipient of this request");
    }

    if (action === "decline") {
      const cancelled = await transactionModel.updateStatus(tx.id, "cancelled", client);

      // Notify the requester
      const decliner = await userModel.findById(userId);
      await notificationModel.createNotification({
        userId: tx.receiver_id,
        message: `${decliner.cashtag} declined your ${formatCurrency(tx.amount)} request`,
        type: "request_declined",
        referenceId: tx.id,
      }, client);

      await client.query("COMMIT");

      return res.json({
        success: true,
        data: { transaction: cancelled },
        message: "Request declined",
        error: "",
      });
    }

    // ── Accept: execute the transfer atomically ──
    const senderWallet = await walletModel.findByUserId(tx.sender_id);
    if (!senderWallet) throw ApiError.internal("Sender wallet not found");
    if (Number(senderWallet.balance) < Number(tx.amount))
      throw ApiError.badRequest("Insufficient balance");

    const receiverWallet = await walletModel.findByUserId(tx.receiver_id);
    if (!receiverWallet) throw ApiError.internal("Receiver wallet not found");

    // 1. Debit sender (the person accepting the request)
    await walletModel.debitWallet(senderWallet.id, tx.amount, client);

    // 2. Credit receiver (the person who requested)
    await walletModel.creditWallet(receiverWallet.id, tx.amount, client);

    // 3. Update transaction status
    const completed = await transactionModel.updateStatus(
      tx.id,
      "completed",
      client,
    );

    // 4. Create ledger entries
    await ledgerModel.createEntry(
      {
        transactionId: tx.id,
        walletId: senderWallet.id,
        entryType: "debit",
        amount: tx.amount,
      },
      client,
    );

    await ledgerModel.createEntry(
      {
        transactionId: tx.id,
        walletId: receiverWallet.id,
        entryType: "credit",
        amount: tx.amount,
      },
      client,
    );

    // 5. Notifications
    const sender = await userModel.findById(tx.sender_id);
    const receiver = await userModel.findById(tx.receiver_id);

    await notificationModel.createNotification({
      userId: tx.receiver_id,
      message: `${sender.cashtag} accepted your ${formatCurrency(tx.amount)} request`,
      type: "request_accepted",
      referenceId: tx.id,
    }, client);

    await notificationModel.createNotification({
      userId: tx.sender_id,
      message: `You paid ${formatCurrency(tx.amount)} to ${receiver.cashtag}`,
      type: "payment_sent",
      referenceId: tx.id,
    }, client);

    await client.query("COMMIT");

    res.json({
      success: true,
      data: { transaction: completed },
      message: `Accepted — sent ${formatCurrency(tx.amount)} to ${receiver.cashtag}`,
      error: "",
    });
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
}

// ────────────────────────────────────────────────────────
// GET /api/transfer/history?page=1&limit=20&type=sent|received|requests
// ────────────────────────────────────────────────────────
async function getTransactionHistory(req, res, next) {
  try {
    const userId = req.user.id;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 20),
    );
    const typeFilter = req.query.type;

    const result = await transactionModel.getHistory(userId, {
      typeFilter,
      page,
      limit,
    });

    res.json({
      success: true,
      data: {
        transactions: result.transactions,
        pagination: {
          total: result.total,
          page: result.page,
          limit,
          totalPages: result.totalPages,
        },
      },
      message: "",
      error: "",
    });
  } catch (err) {
    next(err);
  }
}

const orderModel = require("../models/orderModel");

// ────────────────────────────────────────────────────────
// GET /api/transfer/:transactionId
// ────────────────────────────────────────────────────────
async function getTransactionById(req, res, next) {
  try {
    const userId = req.user.id;
    const { transactionId } = req.params;

    // 1. First search standard transactions (P2P, Cash In/Out)
    let tx = await transactionModel.findByIdWithDetails(transactionId);

    // 2. If not found, check the orders table (Crypto / Stocks)
    if (!tx) {
      const order = await orderModel.findById(transactionId);
      if (order) {
        if (order.user_id !== userId) {
          throw ApiError.forbidden("You are not part of this transaction");
        }

        // Map order to transaction structure
        tx = {
          id: order.id,
          sender_id: order.side === 'buy' ? order.user_id : null,
          receiver_id: order.side === 'sell' ? order.user_id : null,
          amount: order.amount_cents,
          type: 'trade',
          status: order.status,
          created_at: order.created_at,
          symbol: order.symbol,
          asset_type: order.asset_type,
          side: order.side,
          quantity: order.quantity,
          price_cents: order.price_cents,
          note: order.note || `${order.side === 'buy' ? 'Bought' : 'Sold'} ${order.symbol.split('/')[0]}`,
          // Fake names for display
          sender_name: order.side === 'buy' ? 'Cash App' : order.symbol.split('/')[0],
          receiver_name: order.side === 'sell' ? 'Cash App' : order.symbol.split('/')[0]
        };
      }
    }

    if (!tx) throw ApiError.notFound("Transaction not found");

    // Only allow participants to view (already checked for orders above)
    if (tx.type !== 'trade' && tx.sender_id !== userId && tx.receiver_id !== userId) {
      throw ApiError.forbidden("You are not part of this transaction");
    }

    // Include ledger entries
    const ledgerEntries = await ledgerModel.findByTransactionId(transactionId);

    res.json({
      success: true,
      data: { transaction: tx, ledgerEntries },
      message: "",
      error: "",
    });
  } catch (err) {
    next(err);
  }
}
// ────────────────────────────────────────────────────────
// POST /api/transfer/send-bitcoin
// Body: { cashtag, btcAmount }  OR  { cashtag, usdAmount }
// ────────────────────────────────────────────────────────
async function sendBitcoin(req, res, next) {
  const client = await db.pool.connect();
  try {
    const { cashtag, btcAmount, usdAmount, note } = req.body;
    const senderId = req.user.id;

    if (!cashtag) throw ApiError.badRequest("Recipient $cashtag is required");
    if (!btcAmount && !usdAmount)
      throw ApiError.badRequest("Either btcAmount or usdAmount is required");

    // ── Fetch live BTC price ──
    let btcPrice;
    try {
      const axios = require("axios");
      const cgRes = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
      );
      btcPrice = cgRes.data.bitcoin.usd;
    } catch (priceErr) {
      // Fallback: try Alpaca
      try {
        const alpaca = require("../utils/alpacaService");
        const snap = await alpaca.getCryptoQuote("BTC/USD");
        btcPrice = parseFloat(snap.latestTrade?.p || snap.ask || 60000);
      } catch {
        btcPrice = 60000; // Emergency fallback
      }
    }

    // ── Calculate amounts ──
    let finalBtcAmount, finalUsdCents;
    if (btcAmount) {
      finalBtcAmount = parseFloat(btcAmount);
      finalUsdCents = Math.round(finalBtcAmount * btcPrice * 100);
    } else {
      finalUsdCents = Math.round(parseFloat(usdAmount) * 100);
      finalBtcAmount = parseFloat(usdAmount) / btcPrice;
    }

    if (finalBtcAmount <= 0 || finalUsdCents <= 0) {
      throw ApiError.badRequest("Amount must be positive");
    }

    // ── Validate receiver ──
    const receiver = await userModel.findByCashtag(cashtag);
    if (!receiver) throw ApiError.notFound(`User ${cashtag} not found`);
    if (receiver.id === senderId)
      throw ApiError.badRequest("Cannot send bitcoin to yourself");

    // ── Validate sender BTC position ──
    const senderPosition = await positionModel.getPosition(senderId, "BTC/USD");
    if (!senderPosition || Number(senderPosition.quantity) < finalBtcAmount) {
      throw ApiError.badRequest(
        `Insufficient Bitcoin. You are trying to send ${finalBtcAmount.toFixed(8)} BTC.`,
      );
    }

    // ── Atomic transfer ──
    await client.query("BEGIN");

    // 1. Debit sender's Bitcoin position
    await positionModel.upsertPosition(
      senderId,
      "BTC/USD",
      "crypto",
      -finalBtcAmount,
      0,
      client
    );

    // 2. Credit receiver's Bitcoin position (Crypto)
    await positionModel.upsertPosition(
      receiver.id,
      "BTC/USD",
      "crypto",
      finalBtcAmount,
      Math.round(btcPrice * 100),
      client
    );

    // 3. Create transaction record
    const btcFormatted = finalBtcAmount.toFixed(8);
    const usdFormatted = (finalUsdCents / 100).toFixed(2);
    const tx = await transactionModel.createTransaction(
      {
        senderId,
        receiverId: receiver.id,
        amount: finalUsdCents,
        type: "bitcoin_send",
        note: note || `${btcFormatted} BTC ($${usdFormatted})`,
        status: "completed",
      },
      client,
    );

    /* 
       Neither party is moving USD in this transfer (pure crypto),
       so no ledger entry is created in the USD-only ledger table.
    */

    // 5. Create notifications
    const sender = await userModel.findById(senderId);
    await notificationModel.createNotification({
      userId: receiver.id,
      message: `${sender.cashtag} sent you ${btcFormatted} BTC ($${usdFormatted})`,
      type: "bitcoin_received",
      referenceId: tx.id,
    }, client);

    await notificationModel.createNotification({
      userId: senderId,
      message: `You sent ${btcFormatted} BTC ($${usdFormatted}) to ${receiver.cashtag}`,
      type: "bitcoin_sent",
      referenceId: tx.id,
    }, client);

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      data: {
        transaction: tx,
        btcAmount: btcFormatted,
        usdAmount: usdFormatted,
        btcPrice,
      },
      message: `Sent ${btcFormatted} BTC ($${usdFormatted}) to ${receiver.cashtag}`,
      error: "",
    });
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
}

module.exports = {
  sendMoney,
  requestMoney,
  respondToRequest,
  getTransactionHistory,
  getTransactionById,
  sendBitcoin,
};
