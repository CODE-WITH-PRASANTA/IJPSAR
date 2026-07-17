const Notification = require("../models/notification.model");

/* ================= GET MY NOTIFICATIONS ================= */

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiverId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate("paperId", "paperTitle paperId status");

    return res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= MARK AS READ ================= */

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    return res.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= READ ALL ================= */

exports.markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        receiverId: req.user.id,
      },
      {
        isRead: true,
      }
    );

    return res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */

exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};