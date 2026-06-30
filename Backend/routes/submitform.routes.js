const express = require("express");

const router = express.Router();

const { upload, convertToWebp } = require("../middlewares/upload");

const {
  createSubmission,
  getAllSubmissions,
  getSingleSubmission,
  updateSubmission,
  deleteSubmission,
  changeStatus,
  getMyPapers,
  uploadRevision,

  assignEditor,
  startEditing,
  assignReviewer,
  sendToReview,
  acceptPaper,
  rejectPaper,
  publishPaper,
  getEditorPapers,
  getUnassignedPapers,
  completePaper,unPublishPaper 

} = require("../controllers/submitform.controller");

const authorAuth=require("../middlewares/author.middleware");
const editorAuth = require("../middlewares/editor.middleware");
/* ================= CREATE SUBMISSION ================= */

router.post(
  "/create",
  authorAuth,
  upload.single("paperFile"),
  convertToWebp,
  createSubmission
  );

/* ================= GET ALL ================= */

router.get("/all", getAllSubmissions);

router.get("/editor/:editorId", getEditorPapers);

router.get("/unassigned", getUnassignedPapers);
/* ================= GET SINGLE ================= */
router.get("/my-papers", authorAuth, getMyPapers);

router.get("/:id", getSingleSubmission);

/* ================= UPDATE ================= */

router.put(
  "/update/:id",
  editorAuth,
  updateSubmission
);

router.put(
  "/revision/:id",
  authorAuth,
  upload.single("paperFile"),
  convertToWebp,
  uploadRevision
);

/* ================= CHANGE STATUS ================= */

router.put("/status/:id", changeStatus);

/* ================= ASSIGN EDITOR ================= */

router.put("/assign-editor/:id", assignEditor);

/* ================= START EDITING ================= */

router.put("/start-editing/:id", startEditing);

/* ================= ASSIGN REVIEWER ================= */

router.put("/assign-reviewer/:id", assignReviewer);

/* ================= SEND TO REVIEW ================= */

router.put("/send-review/:id", sendToReview);

/* ================= ACCEPT PAPER ================= */

router.put("/accept/:id", acceptPaper);

/* ================= REJECT PAPER ================= */

router.put("/reject/:id", rejectPaper);

/* ================= PUBLISH PAPER ================= */
router.put("/complete/:id", completePaper);

router.put("/publish/:id", publishPaper);

router.put("/unpublish/:id", unPublishPaper);

/* ================= DELETE ================= */

router.delete("/delete/:id", deleteSubmission);

module.exports = router;
