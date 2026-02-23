/**
 * FlowCash — End-to-end CRUD test script.
 *
 * Run:  node src/database/testCrud.js
 *
 * This script exercises every model without a test framework:
 *   1. Creates a new user
 *   2. Creates their wallet
 *   3. Debits and credits the wallet
 *   4. Creates a transaction between the new user and a seeded user
 *   5. Reads everything back and logs results
 */

require('dotenv').config();

const userModel = require('../models/userModel');
const walletModel = require('../models/walletModel');
const transactionModel = require('../models/transactionModel');
const ledgerModel = require('../models/ledgerModel');
const notificationModel = require('../models/notificationModel');
const { formatCurrency, centsToDollars, dollarsToCents } = require('../utils/money');
const db = require('../config/db');

const DIVIDER = '─'.repeat(50);

function log(title, data) {
    console.log(`\n${DIVIDER}`);
    console.log(`  ${title}`);
    console.log(DIVIDER);
    if (data !== undefined) {
        console.log(typeof data === 'object' ? JSON.stringify(data, null, 2) : data);
    }
}

async function run() {
    try {
        // ────────────────────────────────────────────────────
        // 0. Money utils sanity check
        // ────────────────────────────────────────────────────
        log('Money Utils');
        console.log(`  centsToDollars(1050)  → "${centsToDollars(1050)}"`);
        console.log(`  dollarsToCents(10.50) → ${dollarsToCents(10.50)}`);
        console.log(`  formatCurrency(1050)  → "${formatCurrency(1050)}"`);

        // ────────────────────────────────────────────────────
        // 1. Create a new user
        // ────────────────────────────────────────────────────
        const newUser = await userModel.createUser({
            email: `testuser_${Date.now()}@flowcash.dev`,
            phone: '+15559999999',
            cashtag: `$testuser_${Date.now()}`,
            passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
            fullName: 'Test User',
        });
        log('1. Created User', { id: newUser.id, email: newUser.email, cashtag: newUser.cashtag });

        // Read back by different lookups
        const byId = await userModel.findById(newUser.id);
        const byEmail = await userModel.findByEmail(newUser.email);
        const byTag = await userModel.findByCashtag(newUser.cashtag);
        console.log(`  findById:      ${byId?.email}`);
        console.log(`  findByEmail:   ${byEmail?.cashtag}`);
        console.log(`  findByCashtag: ${byTag?.full_name}`);

        // Update the user
        const updated = await userModel.updateUser(newUser.id, { fullName: 'Test User Updated', isVerified: true });
        log('   Updated User', { fullName: updated.full_name, isVerified: updated.is_verified });

        // ────────────────────────────────────────────────────
        // 2. Create a wallet for the new user
        // ────────────────────────────────────────────────────
        const wallet = await walletModel.createWallet(newUser.id, 100000); // $1,000
        log('2. Created Wallet', { id: wallet.id, balance: formatCurrency(wallet.balance) });

        // ────────────────────────────────────────────────────
        // 3. Debit and credit the wallet
        // ────────────────────────────────────────────────────
        const afterDebit = await walletModel.debitWallet(wallet.id, 25000); // −$250
        log('3a. Debited $250', { balance: formatCurrency(afterDebit.balance) });

        const afterCredit = await walletModel.creditWallet(wallet.id, 10000); // +$100
        log('3b. Credited $100', { balance: formatCurrency(afterCredit.balance) });

        const finalBalance = await walletModel.getBalance(newUser.id);
        log('3c. Final Balance', formatCurrency(finalBalance));

        // ────────────────────────────────────────────────────
        // 4. Create a transaction between new user → seeded Alice
        // ────────────────────────────────────────────────────
        const alice = await userModel.findByCashtag('$alice');
        if (!alice) throw new Error('Seeded user $alice not found — run npm run seed first');

        const tx = await transactionModel.createTransaction({
            senderId: newUser.id,
            receiverId: alice.id,
            amount: 5000, // $50
            type: 'send',
            note: 'Coffee money ☕',
        });
        log('4a. Created Transaction', {
            id: tx.id,
            amount: formatCurrency(tx.amount),
            status: tx.status,
            type: tx.type,
            note: tx.note,
        });

        // Mark it completed
        const completedTx = await transactionModel.updateStatus(tx.id, 'completed');
        log('4b. Updated Status → completed', { status: completedTx.status });

        // Read it back
        const readTx = await transactionModel.findById(tx.id);
        log('4c. Read Transaction Back', {
            id: readTx.id,
            amount: formatCurrency(readTx.amount),
            status: readTx.status,
        });

        // Paginated lookup
        const { transactions, total, page, totalPages } = await transactionModel.findByUserId(newUser.id, { page: 1, limit: 5 });
        log('4d. User Transactions (paginated)', { total, page, totalPages, count: transactions.length });

        // ────────────────────────────────────────────────────
        // 5. Ledger entries
        // ────────────────────────────────────────────────────
        const debitEntry = await ledgerModel.createEntry({
            transactionId: tx.id,
            walletId: wallet.id,
            entryType: 'debit',
            amount: 5000,
        });
        log('5a. Ledger Debit Entry', { id: debitEntry.id, entryType: debitEntry.entry_type, amount: formatCurrency(debitEntry.amount) });

        const aliceWallet = await walletModel.findByUserId(alice.id);
        const creditEntry = await ledgerModel.createEntry({
            transactionId: tx.id,
            walletId: aliceWallet.id,
            entryType: 'credit',
            amount: 5000,
        });
        log('5b. Ledger Credit Entry', { id: creditEntry.id, entryType: creditEntry.entry_type, amount: formatCurrency(creditEntry.amount) });

        const ledgerEntries = await ledgerModel.findByTransactionId(tx.id);
        log('5c. All Ledger Entries for Tx', ledgerEntries.map(e => ({
            entryType: e.entry_type,
            walletId: e.wallet_id,
            amount: formatCurrency(e.amount),
        })));

        // ────────────────────────────────────────────────────
        // 6. Notifications
        // ────────────────────────────────────────────────────
        const notif = await notificationModel.createNotification({
            userId: alice.id,
            message: `You received ${formatCurrency(5000)} from ${newUser.cashtag}`,
            type: 'payment_received',
            referenceId: tx.id,
        });
        log('6a. Created Notification', { id: notif.id, message: notif.message, isRead: notif.is_read });

        const unread = await notificationModel.findByUserId(alice.id, { unreadOnly: true });
        log('6b. Unread Notifications for Alice', { count: unread.length });

        await notificationModel.markAsRead(notif.id);
        const afterMark = await notificationModel.findByUserId(alice.id, { unreadOnly: true });
        log('6c. After markAsRead', { unreadCount: afterMark.length });

        // ────────────────────────────────────────────────────
        log('✅ ALL CRUD TESTS PASSED');

        // ── Cleanup: delete the test user (cascades to wallet, etc.)
        await db.query('DELETE FROM users WHERE id = $1', [newUser.id]);
        console.log('  (test user cleaned up)\n');
    } catch (err) {
        console.error('\n❌ TEST FAILED:', err.message);
        console.error(err.stack);
        process.exitCode = 1;
    } finally {
        await db.pool.end();
    }
}

run();
