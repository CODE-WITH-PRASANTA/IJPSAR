const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    receiverRole: {
      type: String,
      enum: ["Admin", "Editor", "Author"],
      required: true,
    },

    title: String,

    message: String,

    paperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubmitForm",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  NotificationSchema
);