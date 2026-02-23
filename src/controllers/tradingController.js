const alpaca = require("../utils/alpacaService");
const ApiError = require("../utils/errors");
const walletModel = require("../models/walletModel");
const db = require("../config/db");

// ── Account ──────────────────────────────────────────
exports.getAccount = async (req, res, next) => {
  try {
    const account = await alpaca.getAccount();
    res.json({
      success: true,
      data: {
        buying_power: account.buying_power,
        portfolio_value: account.portfolio_value,
        cash: account.cash,
        equity: account.equity,
      },
    });
  } catch (err) {
    next(
      ApiError.internal(
        "Failed to fetch Alpaca account: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};

exports.getPortfolioHistory = async (req, res, next) => {
  try {
    const { period, timeframe } = req.query; // e.g. period=1M, timeframe=1D
    const history = await alpaca.getPortfolioHistory(period, timeframe);
    res.json({ success: true, data: history });
  } catch (err) {
    next(
      ApiError.internal(
        "Failed to fetch Alpaca portfolio history: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};

// ── Stock Quote ──────────────────────────────────────
exports.getStockQuote = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const snapshot = await alpaca.getStockSnapshot(symbol.toUpperCase());
    const quote = snapshot;

    res.json({
      success: true,
      data: {
        symbol: symbol.toUpperCase(),
        price: parseFloat(quote.latestTrade?.p || quote.minuteBar?.c || 0),
        bid: parseFloat(quote.latestQuote?.bp || 0),
        ask: parseFloat(quote.latestQuote?.ap || 0),
        open: parseFloat(quote.dailyBar?.o || 0),
        high: parseFloat(quote.dailyBar?.h || 0),
        low: parseFloat(quote.dailyBar?.l || 0),
        close: parseFloat(quote.dailyBar?.c || 0),
        prevClose: parseFloat(quote.prevDailyBar?.c || 0),
        volume: parseInt(quote.dailyBar?.v || 0),
      },
    });
  } catch (err) {
    if (err.response?.status === 404 || err.response?.status === 422) {
      return next(ApiError.notFound(`Symbol ${req.params.symbol} not found`));
    }
    next(
      ApiError.internal(
        "Failed to fetch stock quote: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};

// ── Multi-Stock Quotes ───────────────────────────────
exports.getMultiStockQuotes = async (req, res, next) => {
  try {
    const { symbols } = req.query; // comma-separated
    if (!symbols)
      return next(ApiError.badRequest("symbols query param required"));

    const symbolArr = symbols.split(",").map((s) => s.trim().toUpperCase());
    const snapshots = await alpaca.getMultiStockSnapshots(symbolArr);

    const results = {};
    for (const [sym, snap] of Object.entries(snapshots)) {
      results[sym] = {
        symbol: sym,
        price: parseFloat(snap.latestTrade?.p || snap.minuteBar?.c || 0),
        open: parseFloat(snap.dailyBar?.o || 0),
        high: parseFloat(snap.dailyBar?.h || 0),
        low: parseFloat(snap.dailyBar?.l || 0),
        close: parseFloat(snap.dailyBar?.c || 0),
        prevClose: parseFloat(snap.prevDailyBar?.c || 0),
        volume: parseInt(snap.dailyBar?.v || 0),
      };
    }

    res.json({ success: true, data: results });
  } catch (err) {
    next(
      ApiError.internal(
        "Failed to fetch multi-stock quotes: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};

// ── Crypto Quote ─────────────────────────────────────
exports.getCryptoQuote = async (req, res, next) => {
  try {
    const { symbol } = req.params; // e.g. "BTC/USD"
    const snapshot = await alpaca.getCryptoSnapshot(symbol);
    const snap = snapshot.snapshots?.[symbol] || {};

    res.json({
      success: true,
      data: {
        symbol,
        price: parseFloat(snap.latestTrade?.p || snap.minuteBar?.c || 0),
        bid: parseFloat(snap.latestQuote?.bp || 0),
        ask: parseFloat(snap.latestQuote?.ap || 0),
        open: parseFloat(snap.dailyBar?.o || 0),
        high: parseFloat(snap.dailyBar?.h || 0),
        low: parseFloat(snap.dailyBar?.l || 0),
        close: parseFloat(snap.dailyBar?.c || 0),
        prevClose: parseFloat(snap.prevDailyBar?.c || 0),
      },
    });
  } catch (err) {
    next(
      ApiError.internal(
        "Failed to fetch crypto quote: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};

// ── Stock Bars (historical) ──────────────────────────
exports.getStockBars = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const { timeframe, start, end, limit } = req.query;

    const result = await alpaca.getStockBars(
      symbol.toUpperCase(),
      timeframe || "1Day",
      start || undefined,
      end || undefined,
      limit ? parseInt(limit) : 200,
    );

    // Flatten bars array
    const bars = (result.bars || []).map((b) => ({
      t: b.t, // timestamp
      o: b.o, // open
      h: b.h, // high
      l: b.l, // low
      c: b.c, // close
      v: b.v, // volume
    }));

    res.json({ success: true, data: { symbol: symbol.toUpperCase(), bars } });
  } catch (err) {
    next(
      ApiError.internal(
        "Failed to fetch stock bars: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};

// ── Crypto Bars (historical) ─────────────────────────
exports.getCryptoBars = async (req, res, next) => {
  try {
    const { symbol } = req.params; // e.g. "BTC/USD"
    const { timeframe, start, end, limit } = req.query;

    const result = await alpaca.getCryptoBars(
      symbol,
      timeframe || "1Day",
      start || undefined,
      end || undefined,
      limit ? parseInt(limit) : 200,
    );

    // The crypto bars response nests under the symbol key
    const rawBars = result.bars?.[symbol] || [];
    const bars = rawBars.map((b) => ({
      t: b.t,
      o: b.o,
      h: b.h,
      l: b.l,
      c: b.c,
      v: b.v,
    }));

    res.json({ success: true, data: { symbol, bars } });
  } catch (err) {
    next(
      ApiError.internal(
        "Failed to fetch crypto bars: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};

const orderModel = require("../models/orderModel");
const positionModel = require("../models/positionModel");

function mapAlpacaStatus(status) {
  if (!status) return "pending";
  switch (status.toLowerCase()) {
    case "filled":
      return "filled";
    case "partially_filled":
      return "partial";
    case "canceled":
    case "expired":
    case "replaced":
      return "cancelled";
    case "rejected":
      return "failed";
    default:
      return "pending";
  }
}

// ── Place Order ──────────────────────────────────────
exports.placeOrder = async (req, res, next) => {
  try {
    const { symbol, notional, side } = req.body;

    if (!symbol || !notional || !side) {
      return next(
        ApiError.badRequest("symbol, notional, and side are required"),
      );
    }

    if (!["buy", "sell"].includes(side)) {
      return next(ApiError.badRequest('side must be "buy" or "sell"'));
    }

    const amountParsed = parseFloat(notional);
    if (isNaN(amountParsed) || amountParsed <= 0) {
      return next(ApiError.badRequest("notional must be a positive number"));
    }
    const amountCents = Math.round(amountParsed * 100);
    const orderDollars = (amountCents / 100).toFixed(2);

    // Verify/deduct local FlowCash balance
    const wallet = await walletModel.findByUserId(req.user.id);
    if (!wallet) return next(ApiError.notFound("Wallet not found"));

    if (side === "buy" && Number(wallet.balance) < amountCents) {
      return next(
        ApiError.badRequest(
          `Insufficient funds. Your balance is $${(wallet.balance / 100).toFixed(2)}`,
        ),
      );
    }

    const isCrypto =
      symbol.includes("/") || symbol.includes("BTC") || symbol.includes("ETH");

    const normalizedSym =
      isCrypto && !symbol.includes("/")
        ? symbol.replace(/(BTC|ETH|LTC|BCH|UNI|LINK|AAVE)(USD)/i, "$1/$2").toUpperCase()
        : symbol.toUpperCase();

    // Fetch quote to estimate price and quantity
    let estPrice = 0;
    const quote = isCrypto
      ? await alpaca.getCryptoSnapshot(normalizedSym).catch(() => ({}))
      : await alpaca.getStockSnapshot(normalizedSym).catch(() => ({}));

    if (isCrypto && quote.snapshots?.[normalizedSym]) {
      const snap = quote.snapshots[normalizedSym];
      estPrice = parseFloat(snap.latestTrade?.p || snap.minuteBar?.c || 0);
    } else if (!isCrypto) {
      estPrice = parseFloat(quote.latestTrade?.p || quote.minuteBar?.c || 0);
    }

    if (!estPrice || isNaN(estPrice) || estPrice <= 0) {
      estPrice = isCrypto ? 68000 : 150; // Fallback
    }

    // Verify local position if selling (Prevent short selling in pooled account)
    if (side === "sell") {
      const position = await positionModel.getPosition(req.user.id, normalizedSym);
      if (!position || Number(position.quantity) <= 0) {
        return next(ApiError.badRequest(`You do not own any ${normalizedSym} to sell.`));
      }
      const estQty = (amountCents / 100) / estPrice;
      if (estQty > Number(position.quantity) * 1.05) {
        return next(ApiError.badRequest(`Insufficient ${normalizedSym} balance to sell $${orderDollars}.`));
      }
    }

    const order = await alpaca.placeOrder({
      symbol: normalizedSym,
      notional: Number(orderDollars),
      side,
      time_in_force: isCrypto ? "ioc" : "day",
    });

    let dbStatus = mapAlpacaStatus(order.status);
    let qtyDelta = 0;

    const clock = !isCrypto ? await alpaca.getClock().catch(() => ({ is_open: true })) : null;
    const shouldForceFill = isCrypto || (clock && clock.is_open);

    if (
      shouldForceFill &&
      (order.status === "accepted" ||
        order.status === "new" ||
        order.status === "pending_new")
    ) {
      const estQty = (amountCents / 100) / estPrice;
      qtyDelta = side === "buy" ? estQty : -estQty;
      dbStatus = "filled"; // Force DB status to filled
    } else if (!shouldForceFill && !isCrypto) {
      // MARKET IS CLOSED: Force status to pending even if Alpaca paper-fills it
      dbStatus = "pending";
      qtyDelta = 0; // Don't credit position in DB until it physically fills on market open
    }

    // Update local wallet balance seamlessly alongside Alpaca
    if (side === "buy") {
      await walletModel.debitWallet(wallet.id, amountCents);
    } else if (side === "sell" && dbStatus === "filled") {
      // Only credit wallet if the sell order actually filled
      await walletModel.creditWallet(wallet.id, amountCents);
    }

    const assetType = isCrypto ? "crypto" : "equity";
    const finalQty = isNaN(qtyDelta) ? 0 : Math.abs(qtyDelta);
    const finalPriceCents =
      estPrice && !isNaN(estPrice) ? Math.round(estPrice * 100) : 0;

    // Save order locally
    await orderModel.createOrder({
      userId: req.user.id,
      symbol: normalizedSym,
      assetType: assetType,
      side: side,
      amountCents: amountCents,
      quantity: finalQty,
      priceCents: finalPriceCents,
      status: dbStatus,
      dwOrderId: order.id,
    });

    await positionModel.upsertPosition(
      req.user.id,
      normalizedSym,
      assetType,
      qtyDelta,
      finalPriceCents,
    );

    res.json({
      success: true,
      data: {
        id: order.id,
        symbol: normalizedSym,
        side: order.side,
        type: order.type,
        notional: order.notional,
        status: order.status,
        submitted_at: order.submitted_at,
      },
    });
  } catch (err) {
    const msg =
      err.response?.data?.message || err.response?.data?.code || err.message;
    if (err.response?.status === 403) {
      return next(
        ApiError.forbidden(
          "Insufficient buying power or trading not enabled: " + msg,
        ),
      );
    }
    if (err.response?.status === 422) {
      return next(ApiError.badRequest("Invalid order: " + msg));
    }
    next(ApiError.internal("Failed to place order: " + msg));
  }
};

// ── Positions ────────────────────────────────────────
exports.getPositions = async (req, res, next) => {
  try {
    const { asset_class } = req.query;
    const positions = await positionModel.getPositionsByUserId(
      req.user.id,
      asset_class,
    );

    // Live price mapping
    const cleaned = await Promise.all(
      positions.map(async (p) => {
        let currentPrice = 0;
        try {
          if (p.asset_type === "crypto") {
            // Alpaca v1beta3 requires slash format (BTC/USD)
            const sym = p.symbol.includes("/")
              ? p.symbol
              : p.symbol.replace(/(BTC|ETH|LTC|BCH|UNI|LINK|AAVE)(USD)/, "$1/$2");

            const q = await alpaca.getCryptoSnapshot(sym);
            const snap = q.snapshots?.[sym];
            currentPrice = parseFloat(
              snap?.latestTrade?.p || snap?.minuteBar?.c || 0,
            );
          } else {
            const q = await alpaca.getStockSnapshot(p.symbol);
            currentPrice = parseFloat(q.latestTrade?.p || q.minuteBar?.c || 0);
          }
        } catch (e) {
          console.error(`Price fetch failed for ${p.symbol}:`, e.message);
        }

        const qty = parseFloat(p.quantity);
        const avgEntry = p.avg_cost_cents / 100;
        const marketValue = qty * currentPrice;
        const costBasis = qty * avgEntry;
        const unrealizedPl = marketValue - costBasis;
        const unrealizedPlpc = costBasis > 0 ? unrealizedPl / costBasis : 0;

        return {
          symbol: p.symbol,
          qty: qty,
          avg_entry_price: avgEntry,
          market_value: marketValue,
          current_price: currentPrice,
          unrealized_pl: unrealizedPl,
          unrealized_plpc: unrealizedPlpc,
          cost_basis: costBasis,
          asset_class: p.asset_type === "crypto" ? "crypto" : "us_equity",
          side: "long",
        };
      }),
    );

    res.json({ success: true, data: cleaned });
  } catch (err) {
    next(
      ApiError.internal(
        "Failed to fetch positions: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};

exports.getPosition = async (req, res, next) => {
  try {
    let { symbol } = req.params;
    // Normalize crypto symbol for DB lookup (e.g. BTCUSD -> BTC/USD)
    const isLikelyCrypto =
      symbol.includes("BTC") ||
      symbol.includes("ETH") ||
      symbol.includes("LTC") ||
      symbol.includes("BCH") ||
      symbol.includes("UNI") ||
      symbol.includes("LINK") ||
      symbol.includes("AAVE");

    if (isLikelyCrypto && !symbol.includes("/")) {
      symbol = symbol.replace(
        /(BTC|ETH|LTC|BCH|UNI|LINK|AAVE)(USD)/,
        "$1/$2",
      );
    }

    const p = await positionModel.getPosition(req.user.id, symbol);

    if (!p) {
      return res.json({
        success: true,
        data: {
          symbol: symbol.toUpperCase(),
          qty: 0,
          avg_entry_price: 0,
          market_value: 0,
          current_price: 0,
          unrealized_pl: 0,
          unrealized_plpc: 0,
          side: "none",
        },
      });
    }

    let currentPrice = 0;
    try {
      if (p.asset_type === "crypto") {
        const sym = p.symbol.includes("/")
          ? p.symbol
          : p.symbol.replace(/(BTC|ETH|LTC|BCH|UNI|LINK|AAVE)(USD)/, "$1/$2");

        const q = await alpaca.getCryptoSnapshot(sym);
        const snap = q.snapshots?.[sym];
        currentPrice = parseFloat(
          snap?.latestTrade?.p || snap?.minuteBar?.c || 0,
        );
      } else {
        const q = await alpaca.getStockSnapshot(p.symbol);
        currentPrice = parseFloat(q.latestTrade?.p || q.minuteBar?.c || 0);
      }
    } catch (e) {
      console.error(`Price fetch failed for ${p.symbol}:`, e.message);
      if (e.response) {
        console.error(`Alpaca API Error Status: ${e.response.status}`);
        console.error(`Alpaca API Error Data:`, JSON.stringify(e.response.data));
      }
    }

    const qty = parseFloat(p.quantity);
    const avgEntry = p.avg_cost_cents / 100;
    const marketValue = qty * currentPrice;
    const costBasis = qty * avgEntry;
    const unrealizedPl = marketValue - costBasis;
    const unrealizedPlpc = costBasis > 0 ? unrealizedPl / costBasis : 0;

    res.json({
      success: true,
      data: {
        symbol: p.symbol,
        qty: qty,
        avg_entry_price: avgEntry,
        market_value: marketValue,
        current_price: currentPrice,
        unrealized_pl: unrealizedPl,
        unrealized_plpc: unrealizedPlpc,
        asset_class: p.asset_type === "crypto" ? "crypto" : "us_equity",
        side: "long",
      },
    });
  } catch (err) {
    next(
      ApiError.internal(
        "Failed to fetch position: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};

// ── Orders ───────────────────────────────────────────
exports.getOrders = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;

    // 1) Fetch local orders
    let orders = await orderModel.getOrdersByUserId(req.user.id, limit);

    // 2) Sync any pending orders with Alpaca
    const pendingOrders = orders.filter((o) => o.status === "pending" && o.dw_order_id);
    if (pendingOrders.length > 0) {
      let syncOccurred = false;
      const wallet = await walletModel.findByUserId(req.user.id);

      for (const po of pendingOrders) {
        try {
          const alpacaOrder = await alpaca.getOrder(po.dw_order_id);
          const newStatus = mapAlpacaStatus(alpacaOrder.status);

          if (newStatus !== "pending") {
            // Update local DB status
            await db.query("UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2", [newStatus, po.id]);
            syncOccurred = true;

            if (newStatus === "filled") {
              const filledPrice = parseFloat(alpacaOrder.filled_avg_price || 0) * 100;
              const filledQty = parseFloat(alpacaOrder.filled_qty || 0);

              // Only credit wallet if it was a SELL. If it was a BUY, we already debited their wallet at submission time.
              if (po.side === "sell") {
                await walletModel.creditWallet(wallet.id, Math.round(filledQty * filledPrice));
              }

              // Add to portfolio positions
              const qtyDelta = po.side === "buy" ? filledQty : -filledQty;
              await positionModel.upsertPosition(
                req.user.id,
                po.symbol,
                po.asset_type,
                qtyDelta,
                Math.round(filledPrice)
              );
            } else if (newStatus === "cancelled" || newStatus === "failed") {
              // If a BUY order failed/cancelled, refund the pre-deducted cash back to their wallet
              if (po.side === "buy") {
                await walletModel.creditWallet(wallet.id, po.amount_cents);
              }
            }
          }
        } catch (e) {
          console.error(`Failed to sync order ${po.id} from Alpaca:`, e.message);
          // If Alpaca returns 404 Not Found (e.g. order was wiped during developer testing)
          // we must forcefully cancel it locally to prevent infinite pending loops
          if (e.response && e.response.status === 404) {
            await db.query("UPDATE orders SET status = 'cancelled', updated_at = NOW() WHERE id = $1", [po.id]);
            syncOccurred = true;
            if (po.side === "buy") {
              await walletModel.creditWallet(wallet.id, po.amount_cents);
            }
          }
        }
      }

      // If we synced any statuses, re-fetch the cleaned list so the UI gets the updated statuses
      if (syncOccurred) {
        orders = await orderModel.getOrdersByUserId(req.user.id, limit);
      }
    }

    // 3) Format for UI
    const cleaned = orders.map((o) => ({
      id: o.id,
      symbol: o.symbol,
      asset_class: o.asset_type === "crypto" ? "crypto" : "us_equity",
      side: o.side,
      type: "market",
      notional: (o.amount_cents / 100).toString(),
      qty: o.quantity,
      filled_qty: o.quantity,
      filled_avg_price: (o.price_cents / 100).toString(),
      status: o.status === "filled" ? "filled" : o.status,
      submitted_at: o.created_at,
      filled_at: o.created_at,
    }));
    res.json({ success: true, data: cleaned });
  } catch (err) {
    next(
      ApiError.internal(
        "Failed to fetch orders: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);

    if (!order) return next(ApiError.notFound("Order not found"));
    if (order.user_id !== req.user.id) return next(ApiError.forbidden("Order not found"));
    if (order.status !== "pending") {
      return next(ApiError.badRequest("Only pending orders can be cancelled"));
    }

    // Cancel on Alpaca if a DW order ID is present
    if (order.dw_order_id) {
      await alpaca.cancelOrder(order.dw_order_id).catch(err => {
        console.warn("Alpaca order cancellation failed:", err.message);
      });
    }

    // Refund wallet if it was a buy order (sell orders don't debit stock until filled in this app's logic)
    if (order.side === "buy") {
      const wallet = await walletModel.findByUserId(req.user.id);
      await walletModel.creditWallet(wallet.id, order.amount_cents);
    }

    const updated = await orderModel.updateOrderStatus(id, "cancelled");
    res.json({ success: true, data: updated });
  } catch (err) {
    next(
      ApiError.internal(
        "Failed to cancel order: " +
        (err.response?.data?.message || err.message),
      ),
    );
  }
};
