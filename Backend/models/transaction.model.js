const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },

    paperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubmitForm",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    paymentMode: {
      type: String,
      enum: ["Online", "Bank Transfer", "UPI"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["GPay", "PhonePe", "Paytm", "Bank"],
      required: true,
    },

    transactionId: {
      type: String,
      required: true,
      trim: true,
    },

    paymentScreenshot: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending Verification",
        "Received",
        "Rejected",
      ],
      default: "Pending Verification",
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    rejectedAt: {
      type: Date,
      default: null,
    },

    resubmittedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Transaction",
  transactionSchema
);