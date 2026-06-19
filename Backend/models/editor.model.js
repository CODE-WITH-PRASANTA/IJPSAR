const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
      unique: true,
      required: true,
    },

    phone: String,

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Admin", "Author", "Editor", "Reviewer"],
      default: "Author",
    },

    status: {
      type: String,
      enum: ["Active", "Block"],
      default: "Active",
    },

    // Assigned Documents
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
  }
);

module.exports = mongoose.model("Editor", UserSchema);