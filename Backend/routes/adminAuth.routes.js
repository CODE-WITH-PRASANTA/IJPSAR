const express = require("express");

const router = express.Router();

const {
  createAdmin,
  adminLogin,
  adminLogout,
  getAdminProfile,
  adminExists
} = require("../controllers/adminAuth.controller");

const adminAuth = require("../middlewares/adminAuth.middleware");

router.post("/create", createAdmin);

router.post("/login", adminLogin);

router.post("/logout", adminLogout);

router.get("/profile", adminAuth, getAdminProfile);

router.get("/exists", adminExists);

module.exports = router;