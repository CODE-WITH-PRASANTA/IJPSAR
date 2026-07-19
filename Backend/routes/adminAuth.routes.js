const express = require("express");

const router = express.Router();

const {
  createAdmin,
  adminLogin,
  adminLogout,
  getAdminProfile,
} = require("../controllers/adminAuth.controller");

const adminAuth = require("../middlewares/adminAuth.middleware");

router.post("/create", createAdmin);

router.post("/login", adminLogin);

router.post("/logout", adminLogout);

router.get("/profile", adminAuth, getAdminProfile);

module.exports = router;