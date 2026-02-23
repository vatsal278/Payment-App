const { Router } = require("express");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const controller = require("../controllers/transferController");

const router = Router();

// ── Validation schemas ───────────────────────────────

const sendSchema = {
  cashtag: {
    type: "string",
    required: true,
    message: "Receiver cashtag is required",
  },
  amount: {
    type: "number",
    required: true,
    min: 1,
    message: "Amount must be a positive number (in cents)",
  },
  note: { type: "string", required: false, max: 500 },
};

const requestSchema = {
  cashtag: {
    type: "string",
    required: true,
    message: "Cashtag to request from is required",
  },
  amount: {
    type: "number",
    required: true,
    min: 1,
    message: "Amount must be a positive number (in cents)",
  },
  note: { type: "string", required: false, max: 500 },
};

const respondSchema = {
  action: {
    type: "string",
    required: true,
    match: /^(accept|decline)$/,
    message: 'action must be "accept" or "decline"',
  },
};

// ── Routes ───────────────────────────────────────────

router.post("/send", auth, validate(sendSchema), controller.sendMoney);
router.post("/send-bitcoin", auth, controller.sendBitcoin);
router.post("/request", auth, validate(requestSchema), controller.requestMoney);
router.post(
  "/respond/:transactionId",
  auth,
  validate(respondSchema),
  controller.respondToRequest,
);
router.get("/history", auth, controller.getTransactionHistory);
router.get("/:transactionId", auth, controller.getTransactionById);

module.exports = router;
