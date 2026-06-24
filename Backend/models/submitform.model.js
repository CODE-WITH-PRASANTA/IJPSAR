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
    /* ================= PAPER INFO ================= */

    paperId: {
      type: String,
      unique: true,
    },

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

    researchArea: String,

    paperFile: {
      type: String,
      required: true,
    },

    /* ================= AUTHOR INFO ================= */

    authorCategory: String,

    totalAuthors: Number,

    authors: [AuthorSchema],

    mobileCountryCode: String,

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

    /* ================= EDITOR ================= */

    editorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Editor",
      default: null,
    },

    editorName: {
      type: String,
      default: "",
    },

    editorAssignedAt: {
      type: Date,
      default: null,
    },

    /* ================= REVIEWER ================= */

    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviewer",
      default: null,
    },

    reviewerName: {
      type: String,
      default: "",
    },

    reviewerAssignedAt: {
      type: Date,
      default: null,
    },

    /* ================= REVIEW ================= */

    editorRemarks: {
      type: String,
      default: "",
    },

    reviewerRemarks: {
      type: String,
      default: "",
    },

    /* ================= VERSION ================= */

    version: {
      type: Number,
      default: 1,
    },

    /* ================= STATUS ================= */

    status: {
      type: String,
      enum: [
        "Submitted",
        "Editor Assigned",
        "Editing",
        "Reviewer Assigned",
        "Review Pending",
        "Revision Required",
        "Accepted",
        "Rejected",
        "Published",
      ],
      default: "Submitted",
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