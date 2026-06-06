const express = require("express");

const router = express.Router();

const {
  createLead,
  getAllLeads,
  getLeadById,
  deleteLead,
} = require("../controllers/floatingform.controller");

// CREATE
router.post("/create", createLead);

// GET ALL
router.get("/", getAllLeads);

// GET SINGLE
router.get("/:id", getLeadById);

// DELETE
router.delete("/:id", deleteLead);

module.exports = router;