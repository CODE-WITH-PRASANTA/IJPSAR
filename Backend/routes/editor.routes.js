const express = require("express");

const router = express.Router();

const {
  createEditor,
  loginEditor,
  getAllEditors,
  getSingleEditor,
  updateEditor,
  deleteEditor,
  blockEditor,
  activateEditor,

  // NEW
  assignPaperToEditor,
  getAssignedPapers,
  removeAssignedPaper,
  deleteAssignedPaper,
  getProfile,
  updateProfile
} = require("../controllers/editor.controller");

const editorAuth = require("../middlewares/editor.middleware");
const {
    upload,
    convertToWebp
} = require("../middlewares/upload");

/* ================= AUTH ================= */

router.post(
  "/create",
  createEditor
);

router.post(
  "/login",
  loginEditor
);

/* ================= GET ================= */

router.get(
  "/all",
  getAllEditors
);

router.get(
  "/profile",
  editorAuth,
  getProfile
);


router.get(
  "/:id",
  getSingleEditor
);

/* ================= UPDATE ================= */
router.put(
    "/profile",
    editorAuth,
    upload.single("profileImage"),
    convertToWebp,
    updateProfile
);

router.put(
  "/update/:id",
  updateEditor
);

/* ================= STATUS ================= */

router.put(
  "/block/:id",
  blockEditor
);

router.put(
  "/activate/:id",
  activateEditor
);

/* ================= PAPER MANAGEMENT ================= */

/**
 * Assign Paper To Editor
 */
router.post(
  "/assign-paper",
  assignPaperToEditor
);

/**
 * Get All Papers Assigned To Editor
 */
router.get(
  "/assigned-papers/:id",
  getAssignedPapers
);

/**
 * Remove Paper From Editor Only
 */
router.delete(
  "/remove-paper/:editorId/:paperId",
  removeAssignedPaper
);

/**
 * Delete Paper From Entire System
 * Removes from Editor collection
 * Removes from SubmitForm collection
 */
router.delete(
  "/delete-paper/:paperId",
  deleteAssignedPaper
);

/* ================= DELETE EDITOR ================= */

router.delete(
  "/delete/:id",
  deleteEditor
);

module.exports = router;