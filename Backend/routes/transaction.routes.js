const express = require("express");

const router = express.Router();

const {
  createTransaction,
  getMyTransactions,
  getAllTransactions,
  getSingleTransaction,
  receiveTransaction,
  rejectTransaction,
  resubmitTransaction,
} = require("../controllers/transaction.controller");

const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

const authorAuth = require(
  "../middlewares/author.middleware"
);

/* ================= AUTHOR ================= */

router.post(
  "/create",
  authorAuth,
  upload.single("screenshot"),
  convertToWebp,
  createTransaction
);

router.get(
  "/my-transactions",
  authorAuth,
  getMyTransactions
);

router.put(
  "/resubmit/:id",
  authorAuth,
  upload.single("screenshot"),
  convertToWebp,
  resubmitTransaction
);

/* ================= EDITOR / ADMIN ================= */

router.get("/all", getAllTransactions);

router.get("/:id", getSingleTransaction);

router.put(
  "/receive/:id",
  receiveTransaction
);

router.put(
  "/reject/:id",
  rejectTransaction
);

module.exports = router;