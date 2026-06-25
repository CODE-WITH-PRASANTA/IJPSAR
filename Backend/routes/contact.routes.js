const express = require("express");

const router = express.Router();

const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contact.controller");

// Create Contact
router.post("/create", createContact);

// Get All Contacts
router.get("/all", getContacts);

// Get Single Contact
router.get("/:id", getContact);

// Update Contact
router.put("/update/:id", updateContact);

// Delete Contact
router.delete("/delete/:id", deleteContact);

module.exports = router;