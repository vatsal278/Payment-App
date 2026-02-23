const userModel = require('../models/userModel');
const walletModel = require('../models/walletModel');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwt');
const { generateCashtag } = require('../utils/cashtag');
const ApiError = require('../utils/errors');
const db = require('../config/db');
const stripe = require('../utils/stripe');

/**
 * Strip sensitive fields from a user row before sending to the client.
 */
function sanitizeUser(user) {
    const { password_hash, ...safe } = user;
    return safe;
}

// ────────────────────────────────────────────────────────
// POST /api/auth/register
// ────────────────────────────────────────────────────────
async function register(req, res, next) {
    try {
        const { email, password, fullName, phone, cashtag: requestedCashtag } = req.body;

        // Check for existing email
        const existingEmail = await userModel.findByEmail(email);
        if (existingEmail) throw ApiError.conflict('Email already registered');

        // Resolve cashtag — use requested or auto-generate
        let cashtag = requestedCashtag;
        if (cashtag) {
            // Ensure it starts with $
            if (!cashtag.startsWith('$')) cashtag = `$${cashtag}`;

            const rawTag = cashtag.slice(1);
            if (!/^[a-zA-Z0-9_]{3,20}$/.test(rawTag)) {
                throw ApiError.badRequest('Cashtag must be 3-20 characters long and contain only letters, numbers, and underscores');
            }

            const existingTag = await userModel.findByCashtag(cashtag);
            if (existingTag) throw ApiError.conflict(`Cashtag ${cashtag} is already taken`);
        } else {
            cashtag = await generateCashtag(fullName);
        }

        const passwordHash = await hashPassword(password);

        // ── Atomic: create user + wallet inside a DB transaction ──
        const client = await db.pool.connect();
        let user;
        try {
            await client.query('BEGIN');

            const { rows: [newUser] } = await client.query(
                `INSERT INTO users (id, email, phone, cashtag, password_hash, full_name)
         VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5)
         RETURNING *`,
                [email, phone || null, cashtag, passwordHash, fullName]
            );

            await client.query(
                `INSERT INTO wallets (id, user_id, balance)
         VALUES (uuid_generate_v4(), $1, 0)`,
                [newUser.id]
            );

            await client.query('COMMIT');
            user = newUser;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }

        // ── Create Stripe Customer (non-blocking — registration still succeeds if Stripe is down) ──
        try {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.full_name,
                metadata: { flowcash_user_id: user.id },
            });
            await db.query('UPDATE users SET stripe_customer_id = $1 WHERE id = $2', [customer.id, user.id]);
            user.stripe_customer_id = customer.id;
        } catch (stripeErr) {
            console.warn('Stripe customer creation failed (non-fatal):', stripeErr.message);
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(201).json({
            success: true,
            data: {
                user: sanitizeUser(user),
                accessToken,
                refreshToken,
            },
            message: 'Registration successful',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// POST /api/auth/login
// ────────────────────────────────────────────────────────
async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findByEmail(email);
        if (!user) throw ApiError.unauthorized('Invalid email or password');

        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) throw ApiError.unauthorized('Invalid email or password');

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({
            success: true,
            data: {
                user: sanitizeUser(user),
                accessToken,
                refreshToken,
            },
            message: 'Login successful',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// GET /api/auth/me  (protected)
// ────────────────────────────────────────────────────────
async function getMe(req, res, next) {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) throw ApiError.notFound('User not found');

        const balance = await walletModel.getBalance(user.id);

        res.json({
            success: true,
            data: {
                user: sanitizeUser(user),
                balance, // in cents
            },
            message: '',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// POST /api/auth/logout  (protected)
// ────────────────────────────────────────────────────────
async function logout(_req, res) {
    // Stateless JWT — there is no server-side session to destroy.
    // The client should simply discard the token.
    // A production system could maintain a token blacklist in Redis,
    // but that is beyond the scope of this MVP.
    res.json({
        success: true,
        data: null,
        message: 'Logged out successfully. Discard your token on the client side.',
        error: '',
    });
}

// ────────────────────────────────────────────────────────
// POST /api/auth/refresh
// ────────────────────────────────────────────────────────
async function refreshTokenHandler(req, res, next) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw ApiError.badRequest('refreshToken is required');

        let decoded;
        try {
            decoded = verifyToken(refreshToken, 'refresh');
        } catch {
            throw ApiError.unauthorized('Invalid or expired refresh token');
        }

        if (decoded.type !== 'refresh') {
            throw ApiError.unauthorized('Invalid token type');
        }

        // Fetch the latest user data (they may have changed cashtag, etc.)
        const user = await userModel.findById(decoded.id);
        if (!user) throw ApiError.unauthorized('User no longer exists');

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        res.json({
            success: true,
            data: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            },
            message: 'Token refreshed',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login,
    getMe,
    logout,
    refreshToken: refreshTokenHandler,
};
