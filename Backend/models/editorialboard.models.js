
const mongoose = require("mongoose");

const editorialBoardSchema = new mongoose.Schema(
  {
    // =====================================================
    // NAME
    // =====================================================

    name: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },

    // =====================================================
    // DESIGNATION
    // =====================================================

    designation: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },

    // =====================================================
    // INSTITUTION
    // =====================================================

    institution: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },

    // =====================================================
    // CATEGORY
    // =====================================================

    category: {
      type: String,
      enum: [
        "Patron & Management",
        "Editor-in-Chief",
        "International Editorial Advisory Board",
        "Editorial Board",
      ],
      default: "Editorial Board",
    },

    // =====================================================
    // EMAIL
    // =====================================================

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    // =====================================================
    // PHONE
    // =====================================================

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    // =====================================================
    // ORCID ID
    // =====================================================

    orcid: {
      type: String,
      trim: true,
      default: "",
    },

    // =====================================================
    // BIOGRAPHY
    // =====================================================

    biography: {
      type: String,
      trim: true,
      default: "",
    },

    // =====================================================
    // TAGS
    // =====================================================

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // =====================================================
    // PROFILE IMAGE
    // =====================================================

    profileImage: {
      type: String,
      default: "",
    },

    // =====================================================
    // STATUS
    // =====================================================

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "EditorialBoard",
  editorialBoardSchema
);

