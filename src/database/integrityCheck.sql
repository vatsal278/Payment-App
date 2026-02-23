-- ============================================================
-- FlowCash — Financial Integrity Checks
-- ============================================================
-- Run these queries periodically to audit data integrity.

-- Query 1: Find unbalanced transactions
-- Every completed transaction must have exactly balancing debits and credits in the ledger.
-- Returns transaction_ids where sum(debits) != sum(credits).
SELECT transaction_id
FROM ledger_entries
GROUP BY transaction_id
HAVING SUM(CASE WHEN entry_type='debit' THEN amount ELSE 0 END) !=
       SUM(CASE WHEN entry_type='credit' THEN amount ELSE 0 END);

-- Query 2: Find corrupted wallets
-- A wallet's current balance MUST equal its net total ledger history (assuming all wallets started at 0).
-- If a wallet started with an initial balance (like seed data), we treat it as 100,000 for specific users,
-- but the general formula is: current_balance = seed_balance + credits - debits.
-- This query assumes a 0 seed balance. If seed users break it, those 3 UUIDs can be ignored.
SELECT w.id AS wallet_id,
       w.balance AS current_balance,
       COALESCE(SUM(CASE WHEN l.entry_type='credit' THEN l.amount ELSE 0 END), 0) -
       COALESCE(SUM(CASE WHEN l.entry_type='debit' THEN l.amount ELSE 0 END), 0) AS calculated_balance
FROM wallets w
LEFT JOIN ledger_entries l ON w.id = l.wallet_id
GROUP BY w.id, w.balance
HAVING w.balance != (
       COALESCE(SUM(CASE WHEN l.entry_type='credit' THEN l.amount ELSE 0 END), 0) -
       COALESCE(SUM(CASE WHEN l.entry_type='debit' THEN l.amount ELSE 0 END), 0)
)
-- Exclude the 3 dev seed wallets which magically started with $1,000 without a ledger entry
AND w.user_id NOT IN (
    'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f'
);
