const express = require("express");

const router = express.Router();

const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

const {
  createSubmission,
  getAllSubmissions,
  getSingleSubmission,
  updateSubmission,
  deleteSubmission,
  changeStatus,
} = require("../controllers/submitform.controller");

/* ================= CREATE SUBMISSION ================= */

router.post(
  "/create",
  (req, res, next) => {
    console.log("ROUTE HIT");
    next();
  },
  upload.single("paperFile"),
  (req, res, next) => {
    console.log("UPLOAD DONE");
    next();
  },
  convertToWebp,
  (req, res, next) => {
    console.log("WEBP DONE");
    next();
  },
  createSubmission
);

/* ================= GET ALL ================= */

router.get(
  "/all",
  getAllSubmissions
);

/* ================= GET SINGLE ================= */

router.get(
  "/:id",
  getSingleSubmission
);

/* ================= UPDATE ================= */

router.put(
  "/update/:id",
  updateSubmission
);

/* ================= STATUS UPDATE ================= */

router.patch(
  "/status/:id",
  changeStatus
);

/* ================= DELETE ================= */

router.delete(
  "/delete/:id",
  deleteSubmission
);

module.exports = router;