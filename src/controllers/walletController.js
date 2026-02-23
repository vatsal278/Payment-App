const walletModel = require('../models/walletModel');
const ledgerModel = require('../models/ledgerModel');
const ApiError = require('../utils/errors');
const { formatCurrency } = require('../utils/money');

// ────────────────────────────────────────────────────────
// GET /api/wallet/balance
// ────────────────────────────────────────────────────────
async function getBalance(req, res, next) {
    try {
        const wallet = await walletModel.findByUserId(req.user.id);
        if (!wallet) throw ApiError.notFound('Wallet not found');

        res.json({
            success: true,
            data: {
                walletId: wallet.id,
                balance: wallet.balance,
                formatted: formatCurrency(wallet.balance),
                currency: wallet.currency,
            },
            message: '',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// GET /api/wallet/statement?page=1&limit=20
// ────────────────────────────────────────────────────────
async function getStatement(req, res, next) {
    try {
        const wallet = await walletModel.findByUserId(req.user.id);
        if (!wallet) throw ApiError.notFound('Wallet not found');

        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
        const offset = (page - 1) * limit;

        const total = await ledgerModel.countByWalletId(wallet.id);
        const entries = await ledgerModel.findByWalletIdPaginated(wallet.id, limit, offset);

        res.json({
            success: true,
            data: {
                walletId: wallet.id,
                balance: wallet.balance,
                formatted: formatCurrency(wallet.balance),
                entries,
                pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
            },
            message: '',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// POST /api/wallet/debit  (for savings goals)
// ────────────────────────────────────────────────────────
async function debitForSavings(req, res, next) {
    try {
        const { amount, description } = req.body;

        if (!amount || amount < 1) {
            throw ApiError.badRequest('Amount must be at least 1 cent');
        }

        const wallet = await walletModel.findByUserId(req.user.id);
        if (!wallet) throw ApiError.notFound('Wallet not found');
        if (wallet.balance < amount) {
            throw ApiError.badRequest('Insufficient balance');
        }

        await walletModel.debitWallet(wallet.id, amount);

        const updated = await walletModel.findByUserId(req.user.id);

        res.json({
            success: true,
            data: {
                balance: updated.balance,
                formatted: formatCurrency(updated.balance),
                deducted: amount,
                description: description || 'Savings transfer',
            },
            message: `Saved ${formatCurrency(amount)} to your goal`,
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// POST /api/wallet/credit  (withdraw from savings)
// ────────────────────────────────────────────────────────
async function creditForSavings(req, res, next) {
    try {
        const { amount, description } = req.body;

        if (!amount || amount < 1) {
            throw ApiError.badRequest('Amount must be at least 1 cent');
        }

        const wallet = await walletModel.findByUserId(req.user.id);
        if (!wallet) throw ApiError.notFound('Wallet not found');

        await walletModel.creditWallet(wallet.id, amount);

        const updated = await walletModel.findByUserId(req.user.id);

        res.json({
            success: true,
            data: {
                balance: updated.balance,
                formatted: formatCurrency(updated.balance),
                credited: amount,
                description: description || 'Savings withdrawal',
            },
            message: `Withdrew ${formatCurrency(amount)} from savings`,
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { getBalance, getStatement, debitForSavings, creditForSavings };

