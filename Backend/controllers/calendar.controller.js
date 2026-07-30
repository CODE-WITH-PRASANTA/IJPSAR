const CalendarEvent = require("../models/calendarEvent.model");

const getEventPayload = (body) => {
  const title = body.title?.trim();
  const allDay = Boolean(body.allDay);
  const start = new Date(body.start);
  const end = new Date(body.end);

  if (!title) {
    return { error: "Event title is required" };
  }

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return { error: "A valid start and end date are required" };
  }

  if (end <= start) {
    return { error: "The event end time must be after its start time" };
  }

  return {
    data: {
      title,
      start,
      end,
      allDay,
      color: body.color || "blue",
    },
  };
};

exports.getEvents = async (req, res) => {
  try {
    const query = {};

    if (req.query.start || req.query.end) {
      const start = new Date(req.query.start);
      const end = new Date(req.query.end);

      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid calendar date range",
        });
      }

      query.start = {};

      if (req.query.start) query.start.$gte = start;
      if (req.query.end) query.start.$lt = end;
    }

    const data = await CalendarEvent.find(query).sort({ start: 1 }).lean();

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to load calendar events",
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const payload = getEventPayload(req.body);

    if (payload.error) {
      return res.status(400).json({ success: false, message: payload.error });
    }

    const data = await CalendarEvent.create(payload.data);

    return res.status(201).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create calendar event",
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const payload = getEventPayload(req.body);

    if (payload.error) {
      return res.status(400).json({ success: false, message: payload.error });
    }

    const data = await CalendarEvent.findByIdAndUpdate(
      req.params.id,
      payload.data,
      { new: true, runValidators: true },
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Calendar event not found",
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update calendar event",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const data = await CalendarEvent.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Calendar event not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Calendar event deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete calendar event",
    });
  }
};
