const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  fullName: String,
  designation: String,
  organization: String,
  contactNumber: String,
  email: String,
});

const SubmitFormSchema = new mongoose.Schema(
  {
    paperTitle: {
      type: String,
      required: true,
      trim: true,
    },

    abstract: {
      type: String,
      required: true,
    },

    keywords: [String],

    mobileCountryCode: String,

    researchArea: String,

    paperFile: {
      type: String,
      required: true,
    },

    authorCategory: String,

    totalAuthors: Number,

    authors: [AuthorSchema],

    address: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    referralCode: String,

    specialMessage: String,

    status: {
      type: String,
      enum: [
        "Pending",
        "Under Review",
        "Accepted",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SubmitForm",
  SubmitFormSchema
);