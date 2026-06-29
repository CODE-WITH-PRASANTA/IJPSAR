const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  designation: String,
  organization: String,
  contactNumber: String,
  email: String,
});

const RevisionSchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true,
    },

    paperFile: {
      type: String,
      required: true,
    },

    remarks: {
      type: String,
      default: "",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const FeedbackSchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true,
    },

    remark: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      required: true,
    },

    editorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Editor",
    },

    editorName: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const SubmitFormSchema = new mongoose.Schema(
  {
    /* ================= LOGGED IN AUTHOR ================= */

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },

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

    version: {
      type: Number,
      default: 1,
    },

    editedPdf: {
      type: String,
      default: "",
    },

    /* ================= REVISION HISTORY ================= */

    revisions: {
      type: [RevisionSchema],
      default: [],
    },

    /* ================= FEEDBACK HISTORY ================= */

   
    

    feedbackHistory: {
      type: [FeedbackSchema],
      default: [],
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

    /* ================= CURRENT REMARKS ================= */

    editorRemarks: {
      type: String,
      default: "",
    },

    reviewerRemarks: {
      type: String,
      default: "",
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
  },
);

module.exports = mongoose.model("SubmitForm", SubmitFormSchema);
