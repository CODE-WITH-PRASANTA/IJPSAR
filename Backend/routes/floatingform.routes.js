const express = require("express");

const router = express.Router();

const {
  createLead,
  getAllLeads,
  getLeadById,
  deleteLead,
} = require("../controllers/floatingform.controller");

// ================= CREATE LEAD =================
router.post("/create", createLead);

// ================= GET ALL LEADS =================
router.get("/", getAllLeads);

// ================= GET SINGLE LEAD =================
router.get("/:id", getLeadById);

// ================= DELETE LEAD =================
router.delete("/:id", deleteLead);

module.exports = router;