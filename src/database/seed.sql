-- ============================================================
-- FlowCash — Seed Data (3 test users + wallets)
-- ============================================================
-- Run with:  npm run seed
--
-- All passwords are "password123" hashed with bcryptjs (10 rounds).
-- Each wallet starts with 100 000 cents = $1,000.00.
-- ============================================================

INSERT INTO users (id, email, phone, cashtag, password_hash, full_name, is_verified)
VALUES
  (
    'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    'alice@example.com',
    '+15551234001',
    '$alice',
    '$2a$10$1QOqQu9pthy8OxREJ4awT.6OawnCpYuw6eA4G4UOFyyL.SmegBJLy',
    'Alice Johnson',
    TRUE
  ),
  (
    'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    'bob@example.com',
    '+15551234002',
    '$bob',
    '$2a$10$1QOqQu9pthy8OxREJ4awT.6OawnCpYuw6eA4G4UOFyyL.SmegBJLy',
    'Bob Smith',
    TRUE
  ),
  (
    'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
    'charlie@example.com',
    '+15551234003',
    '$charlie',
    '$2a$10$1QOqQu9pthy8OxREJ4awT.6OawnCpYuw6eA4G4UOFyyL.SmegBJLy',
    'Charlie Davis',
    FALSE
  )
ON CONFLICT (email) DO NOTHING;

INSERT INTO wallets (id, user_id, balance, currency)
VALUES
  (
    'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80',
    'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    100000,
    'USD'
  ),
  (
    'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091',
    'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    100000,
    'USD'
  ),
  (
    'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f809102',
    'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
    100000,
    'USD'
  )
ON CONFLICT DO NOTHING;
