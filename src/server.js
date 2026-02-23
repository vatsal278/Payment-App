require('dotenv').config();

const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 FlowCash server running on http://localhost:${PORT}`);
    console.log(`📚 API Docs available at http://localhost:${PORT}/api-docs`);
});

// ── Graceful Shutdown ────────────────────────────────
// Handles SIGINT (Ctrl+C) and SIGTERM (Docker/K8s stop)
function shutdown(signal) {
    console.log(`\n⏳ ${signal} received — shutting down gracefully…`);
    server.close(async () => {
        try {
            await db.pool.end();
            console.log('✅ Database pool closed');
        } catch (err) {
            console.error('Error closing database pool:', err.message);
        }
        console.log('👋 Server stopped');
        process.exit(0);
    });

    // Force exit if graceful shutdown takes too long (10s)
    setTimeout(() => {
        console.error('⚠️  Forced shutdown after timeout');
        process.exit(1);
    }, 10000);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Handle unhandled rejections
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});
