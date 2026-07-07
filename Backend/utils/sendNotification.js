const Notification = require("../models/notification.model");

const sendNotification = async ({
  receiverId,
  receiverRole,
  title,
  message,
  paperId,
}) => {
  try {
    await Notification.create({
      receiverId,
      receiverRole,
      title,
      message,
      paperId,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendNotification;
