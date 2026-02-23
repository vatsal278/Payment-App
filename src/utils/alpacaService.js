/**
 * Alpaca Trading API Service
 *
 * Centralised client for the Alpaca paper-trading and market-data APIs.
 * Uses API-key auth (no OAuth) – keys live in .env.
 */

const axios = require('axios');
require('dotenv').config();

const TRADING_URL = process.env.ALPACA_BASE_URL || 'https://paper-api.alpaca.markets';
const DATA_URL = process.env.ALPACA_DATA_URL || 'https://data.alpaca.markets';

const headers = {
    'APCA-API-KEY-ID': process.env.ALPACA_API_KEY,
    'APCA-API-SECRET-KEY': process.env.ALPACA_API_SECRET,
    'Content-Type': 'application/json',
};

const trading = axios.create({ baseURL: TRADING_URL, headers });
const data = axios.create({ baseURL: DATA_URL, headers });

// ── Account ──────────────────────────────────────────
async function getAccount() {
    const res = await trading.get('/v2/account');
    return res.data;
}

async function getPortfolioHistory(period = '1M', timeframe = '1D') {
    const res = await trading.get('/v2/account/portfolio/history', {
        params: { period, timeframe, extended_hours: false }
    });
    return res.data;
}

// ── Stock Quotes ─────────────────────────────────────
async function getStockQuote(symbol) {
    const res = await data.get(`/v2/stocks/${symbol}/quotes/latest`);
    return res.data;
}

async function getStockSnapshot(symbol) {
    const res = await data.get(`/v2/stocks/${symbol}/snapshot`, {
        params: { feed: 'iex' }
    });
    return res.data;
}

async function getMultiStockSnapshots(symbols) {
    const res = await data.get('/v2/stocks/snapshots', {
        params: { symbols: symbols.join(','), feed: 'iex' },
    });
    return res.data;
}

// ── Crypto Quotes ────────────────────────────────────
async function getCryptoQuote(symbol) {
    // symbol format: "BTC/USD"
    const res = await data.get(`/v1beta3/crypto/us/latest/quotes`, {
        params: { symbols: symbol },
    });
    return res.data;
}

async function getCryptoSnapshot(symbol) {
    const res = await data.get(`/v1beta3/crypto/us/snapshots`, {
        params: { symbols: symbol },
    });
    return res.data;
}

// ── Stock Bars (historical) ──────────────────────────
async function getStockBars(symbol, timeframe = '1Day', start, end, limit = 200) {
    const params = { timeframe, limit };
    if (start) params.start = start;
    if (end) params.end = end;
    const res = await data.get(`/v2/stocks/${symbol}/bars`, { params });
    return res.data;
}

// ── Crypto Bars (historical) ─────────────────────────
async function getCryptoBars(symbol, timeframe = '1Day', start, end, limit = 200) {
    const params = { timeframe, limit };
    if (start) params.start = start;
    if (end) params.end = end;
    const res = await data.get(`/v1beta3/crypto/us/bars`, {
        params: { ...params, symbols: symbol },
    });
    return res.data;
}

// ── Orders ───────────────────────────────────────────
async function placeOrder({ symbol, notional, side, type = 'market', time_in_force = 'day' }) {
    const body = {
        symbol,
        notional: String(notional), // dollar amount
        side,       // "buy" | "sell"
        type,       // "market" (default)
        time_in_force,
    };
    const res = await trading.post('/v2/orders', body);
    return res.data;
}

async function cancelOrder(orderId) {
    const res = await trading.delete(`/v2/orders/${orderId}`);
    return res.data;
}

async function getOrders(status = 'all', limit = 50) {
    const res = await trading.get('/v2/orders', {
        params: { status, limit, direction: 'desc' },
    });
    return res.data;
}

async function getOrder(orderId) {
    const res = await trading.get(`/v2/orders/${orderId}`);
    return res.data;
}

// ── Positions ────────────────────────────────────────
async function getPositions() {
    const res = await trading.get('/v2/positions');
    return res.data;
}

async function getPosition(symbol) {
    const res = await trading.get(`/v2/positions/${symbol}`);
    return res.data;
}

// ── Market ───────────────────────────────────────────
async function getClock() {
    const res = await trading.get('/v2/clock');
    return res.data;
}

module.exports = {
    getAccount,
    getPortfolioHistory,
    getStockQuote,
    getStockSnapshot,
    getMultiStockSnapshots,
    getCryptoQuote,
    getCryptoSnapshot,
    getStockBars,
    getCryptoBars,
    placeOrder,
    cancelOrder,
    getOrders,
    getOrder,
    getPositions,
    getPosition,
    getClock,
};
