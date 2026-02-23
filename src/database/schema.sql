-- ============================================================
-- FlowCash — Database Schema
-- ============================================================
-- Run with:  npm run migrate
-- ============================================================

-- ── Extensions ───────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENUMs ────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_status') THEN
    CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
    CREATE TYPE transaction_type AS ENUM ('send', 'request', 'bitcoin_send');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ledger_entry_type') THEN
    CREATE TYPE ledger_entry_type AS ENUM ('debit', 'credit');
  END IF;
END $$;

-- ── Users ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         VARCHAR(255) NOT NULL UNIQUE,
  phone         VARCHAR(20),
  cashtag       VARCHAR(50)  NOT NULL UNIQUE,   -- e.g. $john
  password_hash VARCHAR(255) NOT NULL,
  full_name     VARCHAR(255) NOT NULL,
  avatar_url    TEXT,
  is_verified   BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Wallets ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wallets (
  id         UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID    NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  balance    BIGINT  NOT NULL DEFAULT 0 CHECK (balance >= 0),   -- cents → $0.00
  currency   VARCHAR(3) NOT NULL DEFAULT 'USD',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Transactions ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS transactions (
  id          UUID               PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id   UUID               NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  receiver_id UUID               NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  amount      BIGINT             NOT NULL CHECK (amount > 0),
  status      transaction_status NOT NULL DEFAULT 'pending',
  note        TEXT,
  type        transaction_type   NOT NULL,
  created_at  TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
  CHECK (sender_id != receiver_id)
);

-- ── Ledger Entries ───────────────────────────────────
CREATE TABLE IF NOT EXISTS ledger_entries (
  id             UUID             PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID             NOT NULL REFERENCES transactions(id) ON DELETE RESTRICT,
  wallet_id      UUID             NOT NULL REFERENCES wallets(id) ON DELETE RESTRICT,
  entry_type     ledger_entry_type NOT NULL,
  amount         BIGINT           NOT NULL CHECK (amount > 0),
  created_at     TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

-- ── Notifications ────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message      TEXT        NOT NULL,
  is_read      BOOLEAN     NOT NULL DEFAULT FALSE,
  type         VARCHAR(50),
  reference_id UUID,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_cashtag          ON users(cashtag);
CREATE INDEX IF NOT EXISTS idx_users_email            ON users(email);
CREATE INDEX IF NOT EXISTS idx_transactions_sender    ON transactions(sender_id);
CREATE INDEX IF NOT EXISTS idx_transactions_receiver  ON transactions(receiver_id);
CREATE INDEX IF NOT EXISTS idx_wallets_user           ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_ledger_transaction     ON ledger_entries(transaction_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user     ON notifications(user_id);

-- ── Triggers ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_wallets_updated_at ON wallets;
CREATE TRIGGER trg_wallets_updated_at
BEFORE UPDATE ON wallets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_transactions_updated_at ON transactions;
CREATE TRIGGER trg_transactions_updated_at
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

