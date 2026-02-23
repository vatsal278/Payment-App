-- ============================================================
-- FlowCash — Add Funding (Cash In / Cash Out) tables
-- ============================================================
-- Run with:  psql flowcash < src/database/migrations/add_funding.sql
-- ============================================================

-- ── ENUMs ────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_method_type') THEN
    CREATE TYPE payment_method_type AS ENUM ('card', 'bank');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'fund_direction') THEN
    CREATE TYPE fund_direction AS ENUM ('cash_in', 'cash_out');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'fund_status') THEN
    CREATE TYPE fund_status AS ENUM ('pending', 'completed', 'failed');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'fund_speed') THEN
    CREATE TYPE fund_speed AS ENUM ('standard', 'instant');
  END IF;
END $$;

-- ── Payment Methods ──────────────────────────────────
CREATE TABLE IF NOT EXISTS payment_methods (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type                     payment_method_type NOT NULL,
  stripe_payment_method_id VARCHAR NOT NULL,
  last_four                CHAR(4),
  brand                    VARCHAR,
  nickname                 VARCHAR,
  is_default               BOOLEAN DEFAULT FALSE,
  status                   VARCHAR DEFAULT 'active',
  created_at               TIMESTAMPTZ DEFAULT NOW()
);

-- ── Fund Movements ───────────────────────────────────
CREATE TABLE IF NOT EXISTS fund_movements (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES users(id),
  payment_method_id   UUID REFERENCES payment_methods(id),
  direction           fund_direction NOT NULL,
  amount              BIGINT NOT NULL,
  fee                 BIGINT DEFAULT 0,
  net_amount          BIGINT NOT NULL,
  stripe_reference_id VARCHAR,
  status              fund_status DEFAULT 'pending',
  speed               fund_speed DEFAULT 'standard',
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ── Add stripe_customer_id to users ──────────────────
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR;

-- ── Indexes ──────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_payment_methods_user ON payment_methods(user_id);
CREATE INDEX IF NOT EXISTS idx_fund_movements_user  ON fund_movements(user_id);
CREATE INDEX IF NOT EXISTS idx_fund_movements_stripe ON fund_movements(stripe_reference_id);
