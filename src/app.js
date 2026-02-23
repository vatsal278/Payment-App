const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./config/db');
const compression = require('compression');
const startedAt = new Date();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');
const { globalLimiter, authLimiter, transferLimiter } = require('./middleware/rateLimiter');

// ── Route imports ────────────────────────────────────
const authRoutes = require('./routes/auth');
const transferRoutes = require('./routes/transfer');
const walletRoutes = require('./routes/wallet');
const userRoutes = require('./routes/users');
const notificationRoutes = require('./routes/notifications');
const fundingRoutes = require('./routes/funding');
const tradingRoutes = require('./routes/trading');

const app = express();

// ── Global Middleware ────────────────────────────────
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:3001'],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
        },
    },
}));

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3001').split(',').map(o => o.trim());
// Add Capacitor native app origins
const capacitorOrigins = ['http://localhost', 'https://localhost', 'capacitor://localhost'];
const allAllowedOrigins = [...allowedOrigins, ...capacitorOrigins];
app.use(cors({
    origin: (origin, cb) => {
        // Allow requests with no origin (server-to-server, curl, mobile apps)
        if (!origin || allAllowedOrigins.includes(origin)) return cb(null, true);
        cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.use(compression());
// Stripe webhook needs raw body — MUST be before express.json()
app.use('/api/funding/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(globalLimiter);

// ── Slow query / request logger ──────────────────────
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        if (duration > 500) {
            console.warn(`[SLOW REQUEST] ${req.method} ${req.originalUrl} — ${duration}ms (status ${res.statusCode})`);
        }
    });
    next();
});

// ── Swagger UI ───────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'FlowCash API Docs',
}));
// Raw OpenAPI spec as JSON
app.get('/api-docs.json', (_req, res) => res.json(swaggerSpec));

// ── Welcome/Home ─────────────────────────────────────
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the FlowCash API!',
        docs: '/api-docs',
        health: '/health'
    });
});

app.get('/health', async (_req, res) => {
    const uptimeSeconds = Math.floor((Date.now() - startedAt.getTime()) / 1000);
    let dbStatus = 'connected';
    let serverTime = null;
    try {
        const { rows } = await db.query('SELECT NOW() AS server_time');
        serverTime = rows[0].server_time;
    } catch (err) {
        dbStatus = 'disconnected';
    }
    const healthy = dbStatus === 'connected';
    res.status(healthy ? 200 : 503).json({
        success: healthy,
        data: {
            status: healthy ? 'ok' : 'degraded',
            uptime: uptimeSeconds,
            startedAt: startedAt.toISOString(),
            serverTime,
            database: dbStatus,
            version: require('../package.json').version,
        },
        message: healthy ? 'OK' : 'Database unreachable',
        error: '',
    });
});

app.get('/api/health', (req, res, next) => {
    req.url = '/health';
    app.handle(req, res, next);
});

// ── API Routes ───────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/transfer', transferLimiter, transferRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/funding', fundingRoutes);
app.use('/api/trading', tradingRoutes);

// ── 404 catch-all ────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ success: false, data: null, message: 'Route not found', error: 'Not found' });
});

// ── Global Error Handler (must be last) ──────────────
app.use(errorHandler);

module.exports = app;
