const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Author = require("../models/author.model");

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  const exist = await Author.findOne({ email });

  if (exist) {
    return res.json({
      success: false,
      message: "Email already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const author = await Author.create({
    fullName,
    email,
    password: hash,
  });

  res.json({
    success: true,
    author,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Author.findOne({ email });

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid Email",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.json({
      success: false,
      message: "Wrong Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: "author",
    },
    process.env.JWT_SECRET,
  );

  res.json({
    success: true,
    token,
    user,
  });
};

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().select("-password");

    return res.status(200).json({
      success: true,
      data: authors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// DELETE SINGLE AUTHOR NOTIFICATION
exports.deleteAuthorNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const authorId = req.user._id;

    const notification = await Notification.findOneAndDelete({
      _id: id,
      recipient: authorId,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete author notification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete notification",
      error: error.message,
    });
  }
};


// DELETE ALL AUTHOR NOTIFICATIONS
exports.clearAllAuthorNotifications = async (req, res) => {
  try {
    const authorId = req.user._id;

    const result = await Notification.deleteMany({
      recipient: authorId,
    });

    return res.status(200).json({
      success: true,
      message: "All notifications cleared successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(
      "Clear all author notifications error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to clear notifications",
      error: error.message,
    });
  }
};