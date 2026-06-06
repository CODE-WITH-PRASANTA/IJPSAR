const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, default: "—" },
    organization: { type: String, default: "—" },
    country: { type: String, default: "—" },

    image: { type: String, default: "" }, // base64 or URL
    initial: { type: String },

    rating: { type: Number, default: 5, min: 1, max: 5 },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active",
    },

    order: { type: Number, default: 0 },

    feedback: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);