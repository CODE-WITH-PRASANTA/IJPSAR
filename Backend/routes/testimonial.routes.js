const express = require("express");
const router = express.Router();

const controller = require("../controllers/testimonial.controller");

// CREATE
router.post("/", controller.createTestimonial);

// GET ALL
router.get("/", controller.getAllTestimonials);

// GET ONE
router.get("/:id", controller.getTestimonialById);

// UPDATE
router.put("/:id", controller.updateTestimonial);

// DELETE
router.delete("/:id", controller.deleteTestimonial);

module.exports = router;