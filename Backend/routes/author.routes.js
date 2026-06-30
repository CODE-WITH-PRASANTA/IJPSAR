const express = require("express");
const router = express.Router();

const authorAuth = require("../middlewares/author.middleware");
const {
  register,
  login,
  getAllAuthors
} = require("../controllers/auther.controller");

router.post("/register", register);

router.post("/login", login);

router.get("/all", getAllAuthors);

module.exports = router;