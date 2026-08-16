const express = require("express");

const router = express.Router();

/* =========================================================
   UPLOAD MIDDLEWARE
========================================================= */

const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

/* =========================================================
   CONTROLLERS
========================================================= */

const {
  /* ================= SUBMISSION ================= */

  createSubmission,
  getAllSubmissions,
  getSingleSubmission,
  updateSubmission,
  deleteSubmission,
  changeStatus,
  getMyPapers,
  uploadRevision,

  /* ================= EDITOR WORKFLOW ================= */

  assignEditor,
  startEditing,
  acceptPaper,
  requestPublicationDocuments,
  rejectPaper,

  /* ================= PAPER LISTS ================= */

  getEditorPapers,
  getUnassignedPapers,
  getPublishedEditorPapers,
  getPublishedAuthorPapers,
  getPublishedArchive,
  getAllPublishedPapers,

  /* ================= PUBLICATION WORKFLOW ================= */

  uploadAuthorPublicationDocuments,
  submitPublicationToEditor,
  approveAndForwardToAdmin,

  /* ================= ADMIN PUBLISH ================= */

  publishPaper,
  unPublishPaper,
} = require("../controllers/submitform.controller");

/* =========================================================
   AUTH MIDDLEWARE
========================================================= */

const authorAuth = require("../middlewares/author.middleware");

const editorAuth = require("../middlewares/editor.middleware");

const adminAuth = require("../middlewares/adminAuth.middleware");


/* =========================================================
   CREATE SUBMISSION
=========================================================

   Author
      ↓
   Submitted

========================================================= */

router.post(
  "/create",
  authorAuth,
  upload.single("paperFile"),
  convertToWebp,
  createSubmission
);


/* =========================================================
   GET ALL SUBMISSIONS
=========================================================

   Admin can see all submissions.

========================================================= */

router.get(
  "/all",
  adminAuth,
  getAllSubmissions
);


/* =========================================================
   GET ALL PUBLISHED PAPERS
=========================================================

   Public

========================================================= */

router.get(
  "/published/all",
  getAllPublishedPapers
);


/* =========================================================
   PUBLICATION ARCHIVE
=========================================================

   Public

========================================================= */

router.get(
  "/published/archive",
  getPublishedArchive
);


/* =========================================================
   PUBLISHED PAPERS BY EDITOR
=========================================================

   Public

========================================================= */

router.get(
  "/editor/:editorId/published",
  getPublishedEditorPapers
);


/* =========================================================
   PUBLISHED PAPERS BY AUTHOR
=========================================================

   Author can see own published papers.

========================================================= */

router.get(
  "/author/published",
  authorAuth,
  getPublishedAuthorPapers
);


/* =========================================================
   EDITOR PAPERS
=========================================================

   Editor can see papers assigned to them.

========================================================= */

router.get(
  "/editor/:editorId",
  editorAuth,
  getEditorPapers
);


/* =========================================================
   UNASSIGNED PAPERS
=========================================================

   Admin needs this list to assign an Editor.

   Submitted
       ↓
   Unassigned

========================================================= */

router.get(
  "/unassigned",
  adminAuth,
  getUnassignedPapers
);


/* =========================================================
   AUTHOR MY PAPERS
=========================================================

   Author can see their submitted papers.

========================================================= */

router.get(
  "/my-papers",
  authorAuth,
  getMyPapers
);


/* =========================================================
   GET SINGLE PAPER
=========================================================

   Get complete paper details.

========================================================= */

router.get(
  "/:id",
  getSingleSubmission
);


/* =========================================================
   UPDATE SUBMISSION
=========================================================

   Editor updates:

   - Paper title
   - Abstract
   - Editor remarks
   - Feedback link
   - Editor version

   IMPORTANT:
   Status should NOT be changed here.

========================================================= */

router.put(
  "/update/:id",
  editorAuth,
  updateSubmission
);


/* =========================================================
   UPLOAD PAPER REVISION
=========================================================

   Author uploads revised paper.

   Existing paper
        ↓
   New revision/version

========================================================= */

router.put(
  "/revision/:id",
  authorAuth,
  upload.single("paperFile"),
  convertToWebp,
  uploadRevision
);


/* =========================================================
   NORMAL STATUS
=========================================================

   Editor can update normal editorial statuses.

   Allowed:

   Submitted
   Editor Assigned
   Under Review
   Rejected

   Publication workflow statuses are handled
   through dedicated APIs below.

========================================================= */

router.put(
  "/status/:id",
  editorAuth,
  changeStatus
);


/* =========================================================
   ADMIN ASSIGNS EDITOR
=========================================================

   Submitted
       ↓
   Editor Assigned

========================================================= */

router.put(
  "/assign-editor/:id",
  adminAuth,
  assignEditor
);


/* =========================================================
   EDITOR STARTS REVIEW
=========================================================

   Editor Assigned
       ↓
   Under Review

========================================================= */

router.put(
  "/start-editing/:id",
  editorAuth,
  startEditing
);


/* =========================================================
   EDITOR ACCEPTS PAPER
=========================================================

   Under Review
       ↓
   Accepted

========================================================= */

router.put(
  "/accept/:id",
  editorAuth,
  acceptPaper
);


/* =========================================================
   EDITOR REQUESTS PUBLICATION DOCUMENTS
=========================================================

   Accepted
       ↓
   Documents Required

========================================================= */

router.put(
  "/request-publication-documents/:id",
  editorAuth,
  requestPublicationDocuments
);


/* =========================================================
   EDITOR REJECTS PAPER
=========================================================

   Under Review
       ↓
   Rejected

========================================================= */

router.put(
  "/reject/:id",
  editorAuth,
  rejectPaper
);


/* =========================================================
   AUTHOR UPLOADS PUBLICATION DOCUMENTS
=========================================================

   Documents Required
          ↓
   Author uploads documents

   Required:

   - correctedGalleyProof
   - copyrightTransferForm
   - publicationFeePaymentProof
   - authorPhotographs

   Optional:

   - additionalSupportingFiles

========================================================= */

router.put(
  "/publication/documents/:id",

  authorAuth,

  upload.fields([
    {
      name: "correctedGalleyProof",
      maxCount: 1,
    },

    {
      name: "copyrightTransferForm",
      maxCount: 1,
    },

    {
      name: "publicationFeePaymentProof",
      maxCount: 1,
    },

    {
      name: "authorPhotographs",
      maxCount: 10,
    },

    {
      name: "additionalSupportingFiles",
      maxCount: 10,
    },
  ]),

  convertToWebp,

  uploadAuthorPublicationDocuments
);


/* =========================================================
   AUTHOR SUBMITS DOCUMENTS TO EDITOR
=========================================================

   Documents Required
          ↓
   Documents Submitted

========================================================= */

router.put(
  "/publication/submit/:id",
  authorAuth,
  submitPublicationToEditor
);


/* =========================================================
   EDITOR APPROVES PUBLICATION DOCUMENTS
=========================================================

   Documents Submitted
          ↓
   Approved and Forwarded to Admin

========================================================= */

router.put(
  "/publication/approve/:id",
  editorAuth,
  approveAndForwardToAdmin
);


/* =========================================================
   ADMIN PUBLISHES PAPER
=========================================================

   Approved and Forwarded to Admin
              ↓
           Published

========================================================= */

router.put(
  "/publish/:id",
  adminAuth,
  publishPaper
);


/* =========================================================
   ADMIN UNPUBLISHES PAPER
=========================================================

   Published
       ↓
   Approved and Forwarded to Admin

========================================================= */

router.put(
  "/unpublish/:id",
  adminAuth,
  unPublishPaper
);


/* =========================================================
   ADMIN DELETE SUBMISSION
========================================================= */

router.delete(
  "/delete/:id",
  adminAuth,
  deleteSubmission
);


/* =========================================================
   EXPORT ROUTER
========================================================= */

module.exports = router;