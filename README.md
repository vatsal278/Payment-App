# FlowCash 💸

A **Cash App–inspired** peer-to-peer payment platform built with **Node.js**, **Express**, **PostgreSQL**, and a **Next.js** frontend (with Capacitor for mobile).

## Tech Stack

| Layer        | Technology                                    |
|--------------|-----------------------------------------------|
| **Backend**  | Node.js, Express, PostgreSQL                  |
| **Frontend** | Next.js (React), Tailwind CSS, Framer Motion  |
| **Mobile**   | Capacitor (iOS + Android wrapper)             |
| **Payments** | Stripe (card linking, cash-in/out, webhooks)  |
| **Trading**  | Alpaca Markets API (stocks + crypto)          |
| **Auth**     | JWT (access + refresh tokens), bcrypt         |
| **Docs**     | Swagger/OpenAPI at `/api-docs`                |

## Repository Structure

```
├── src/                    # Backend (Express API)
│   ├── app.js              # Express app setup, middleware, route mounting
│   ├── server.js           # Entry point — starts HTTP server
│   ├── config/             # Database pool (db.js), Swagger spec (swagger.js)
│   ├── controllers/        # Route handlers (auth, transfer, funding, trading, wallet, user, notification)
│   ├── models/             # Database query functions (user, wallet, transaction, ledger, etc.)
│   ├── routes/             # Express routers with validation schemas
│   ├── middleware/         # Auth (JWT), validation, rate limiting, caching, error handler
│   ├── utils/              # Shared helpers (JWT, password hashing, money formatting, Stripe, Alpaca)
│   └── database/           # SQL schema, migrations, seed data
│
├── frontend/               # Frontend (Next.js)
│   ├── app/                # Next.js App Router pages (home, login, register, pay, etc.)
│   ├── components/         # Reusable React components (Navbar, Modal, Keypad, Toast, etc.)
│   ├── context/            # React context (AuthContext)
│   ├── hooks/              # Custom hooks (useDebounce)
│   └── lib/                # API client, asset data, sound utilities
│
├── docker-compose.yml      # PostgreSQL + backend containers
├── Dockerfile              # Backend Docker image
└── FlowCash.postman_collection.json  # Full Postman API collection
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** (or use Docker)
- **Stripe** test keys (for funding features)
- **Alpaca** paper trading keys (for stock/crypto features)

### 1. Environment Setup

```bash
cp .env.example .env
# Edit .env with your database URL, Stripe keys, Alpaca keys, JWT secret
```

### 2. Start the Database

```bash
# Option A: Docker
docker compose up -d db

# Option B: Use your own PostgreSQL instance
```

### 3. Run Migrations & Seed

```bash
npm run migrate   # Creates all tables
npm run seed      # Inserts demo users (alice, bob, charlie)
```

### 4. Start the Backend

```bash
npm run dev       # Starts on http://localhost:3000 (with file watching)
```

### 5. Start the Frontend

```bash
cd frontend
npm install
npm run dev       # Starts on http://localhost:3001
```

## API Documentation

Once the backend is running, interactive Swagger docs are available at:

```
http://localhost:3000/api-docs
```

The raw OpenAPI spec is at `/api-docs.json`.

A **Postman collection** is included in the repo root: `FlowCash.postman_collection.json`.

## Key Features

- **P2P Transfers** — Send/request money via `$cashtag`, with real-time notifications
- **Wallet** — Balance tracking with full double-entry ledger
- **Funding** — Link cards, cash-in/cash-out via Stripe
- **Stock Trading** — Buy/sell fractional shares via Alpaca Markets
- **Crypto Trading** — BTC, ETH, SOL quotes and trading via Alpaca
- **Notifications** — In-app notification system with unread counts
- **Security** — JWT auth, bcrypt passwords, rate limiting, Helmet, input validation

## Environment Variables

See [`.env.example`](.env.example) for all required variables. Key ones:

| Variable              | Description                          |
|-----------------------|--------------------------------------|
| `DATABASE_URL`        | PostgreSQL connection string         |
| `JWT_SECRET`          | Secret for signing access tokens     |
| `STRIPE_SECRET_KEY`   | Stripe API secret key (test mode)    |
| `ALPACA_API_KEY`      | Alpaca paper trading API key         |
| `ALPACA_API_SECRET`   | Alpaca paper trading secret          |
| `FRONTEND_URL`        | Frontend URL for CORS                |
