const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: String,

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      default: "",
    },

    organization: {
      type: String,
      default: "",
    },

    qualification: {
      type: String,
      default: "",
    },

    specialization: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },

    address2: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    zip: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "English",
    },

    bio: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["Admin", "Author", "Editor", "Reviewer"],
      default: "Editor",
    },

    status: {
      type: String,
      enum: ["Active", "Block"],
      default: "Active",
    },

    assignedPapers: [
      {
        paperId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SubmitForm",
        },

        assignedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Editor", editorSchema);
