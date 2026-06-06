const express = require("express");
const router = express.Router();

const { upload, convertToWebp } = require("../middlewares/upload");
const indexController = require("../controllers/index.controller");

// CREATE
router.post(
  "/create",
  upload.single("image"),
  convertToWebp,
  indexController.createIndex
);

// GET ALL
router.get("/all", indexController.getAllIndex);

// GET SINGLE
router.get("/:id", indexController.getSingleIndex);

// UPDATE
router.put(
  "/update/:id",
  upload.single("image"),
  convertToWebp,
  indexController.updateIndex
);

// DELETE
router.delete(
  "/delete/:id",
  indexController.deleteIndex
);

module.exports = router;