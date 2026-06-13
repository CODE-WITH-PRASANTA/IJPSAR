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

  assignEditor,
  startEditing,
  assignReviewer,
  sendToReview,
  acceptPaper,
  rejectPaper,
  publishPaper,
  getEditorPapers,
  getUnassignedPapers
} = require("../controllers/submitform.controller");

/* ================= CREATE SUBMISSION ================= */

router.post(
  "/create",
  upload.single("paperFile"),
  convertToWebp,
  createSubmission
);

/* ================= GET ALL ================= */

router.get(
  "/all",
  getAllSubmissions
);

router.get(
  "/editor/:editorId",
  getEditorPapers
);


router.get(
  "/unassigned",
  getUnassignedPapers
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

/* ================= CHANGE STATUS ================= */

router.put(
  "/status/:id",
  changeStatus
);

/* ================= ASSIGN EDITOR ================= */

router.put(
  "/assign-editor/:id",
  assignEditor
);

/* ================= START EDITING ================= */

router.put(
  "/start-editing/:id",
  startEditing
);

/* ================= ASSIGN REVIEWER ================= */

router.put(
  "/assign-reviewer/:id",
  assignReviewer
);

/* ================= SEND TO REVIEW ================= */

router.put(
  "/send-review/:id",
  sendToReview
);

/* ================= ACCEPT PAPER ================= */

router.put(
  "/accept/:id",
  acceptPaper
);

/* ================= REJECT PAPER ================= */

router.put(
  "/reject/:id",
  rejectPaper
);

/* ================= PUBLISH PAPER ================= */

router.put(
  "/publish/:id",
  publishPaper
);

/* ================= DELETE ================= */

router.delete(
  "/delete/:id",
  deleteSubmission
);

module.exports = router;