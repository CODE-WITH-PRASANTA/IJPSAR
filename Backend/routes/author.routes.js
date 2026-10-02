const express = require("express");
const router = express.Router();

const authorAuth = require("../middlewares/author.middleware");
const {
  register,
  login,
  getAllAuthors,
  clearAllAuthorNotifications,
  deleteAuthorNotification,
  deleteAuthorByAdmin
} = require("../controllers/auther.controller");

router.post("/register", register);

router.post("/login", login);


router.get("/all", getAllAuthors);

router.delete("/author/clear-all", authorAuth, clearAllAuthorNotifications);

router.delete("/author/:id", authorAuth, deleteAuthorNotification);

router.delete("/admin/:id", deleteAuthorByAdmin);

module.exports = router;
