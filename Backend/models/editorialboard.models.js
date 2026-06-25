const mongoose = require("mongoose");

const editorialBoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
    },

    institution: {
      type: String,
      required: true,
    },

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

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    biography: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

    profileImage: {
      type: String,
      default: "",
    },

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