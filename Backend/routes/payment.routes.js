const express = require("express");

const router = express.Router();

const {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  completePayment,
} = require("../controllers/payment.controller");

router.get("/", getPayments);

router.post("/", createPayment);

router.put("/:id", updatePayment);

router.delete("/:id", deletePayment);

router.patch("/status/:id", completePayment);

module.exports = router;