-- Add idempotency_key to transactions to prevent duplicate processing
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS idempotency_key VARCHAR(255);

-- Ensure idempotency_key is unique per sender to prevent cross-user collisions
-- and allow the same key to be used by DIFFERENT users safely (if somehow generated poorly)
-- but typically a UUID is unique enough globally. 
-- However, for robustness:
CREATE UNIQUE INDEX IF NOT EXISTS idx_transactions_idempotency_key ON transactions (sender_id, idempotency_key) WHERE idempotency_key IS NOT NULL;
