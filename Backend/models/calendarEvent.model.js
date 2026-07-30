const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      enum: ["black", "blue", "magenta", "green"],
      default: "blue",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CalendarEvent", calendarEventSchema);
