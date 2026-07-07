const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    client: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    method: {
      type: String,
      enum: [
        "Credit Card",
        "Debit Card",
        "Bank Transfer",
        "PayPal",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Completed",
        "Pending",
        "Failed",
        "Processing",
      ],
      default: "Completed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);