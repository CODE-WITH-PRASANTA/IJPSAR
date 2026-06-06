const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    primaryEmail: {
      type: String,
      required: true,
    },
    secondaryEmail: {
      type: String,
    },
    website: {
      type: String,
      required: true,
    },
    responseTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);