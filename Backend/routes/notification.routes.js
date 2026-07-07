const express = require("express");

const router = express.Router();

const {
  getMyNotifications,
  markAsRead,
  markAllRead,
  deleteNotification,
} = require("../controllers/notification.controller");

const authorAuth = require("../middlewares/author.middleware");
const editorAuth = require("../middlewares/editor.middleware");

/* AUTHOR */

router.get("/author", authorAuth, (req, res, next) => {
  req.user = req.author;
  next();
}, getMyNotifications);

router.put("/author/read-all", authorAuth, (req, res, next) => {
  req.user = req.author;
  next();
}, markAllRead);

/* EDITOR */

router.get("/editor", editorAuth, (req, res, next) => {
  req.user = req.editor;
  next();
}, getMyNotifications);

router.put("/editor/read-all", editorAuth, (req, res, next) => {
  req.user = req.editor;
  next();
}, markAllRead);

/* COMMON */

router.put("/read/:id", markAsRead);

router.delete("/:id", deleteNotification);

module.exports = router;