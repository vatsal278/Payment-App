-- ============================================================
-- FlowCash — Add Trading tables (Stocks & Crypto)
-- ============================================================

-- ── ENUMs ────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'asset_type') THEN
    CREATE TYPE asset_type AS ENUM ('crypto', 'equity');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_side') THEN
    CREATE TYPE order_side AS ENUM ('buy', 'sell');
  END IF;
END $$;

-- ── Positions ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS positions (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symbol         VARCHAR(20) NOT NULL,
  asset_type     VARCHAR(20) NOT NULL,
  quantity       NUMERIC(18, 8) NOT NULL DEFAULT 0,
  avg_cost_cents BIGINT NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, symbol)
);

-- ── Orders ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symbol       VARCHAR(20) NOT NULL,
  asset_type   VARCHAR(20) NOT NULL,
  side         VARCHAR(10) NOT NULL,
  amount_cents BIGINT,
  quantity     NUMERIC(18, 8),
  price_cents  BIGINT,
  status       VARCHAR(50) NOT NULL DEFAULT 'pending',
  dw_order_id  VARCHAR(100),
  fee_cents    BIGINT DEFAULT 0,
  note         TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_positions_user ON positions(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
