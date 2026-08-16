const mongoose = require("mongoose");

/* =========================================================
   AUTHOR SCHEMA
========================================================= */

const AuthorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  designation: {
    type: String,
    default: "",
  },

  organization: {
    type: String,
    default: "",
  },

  contactNumber: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    default: "",
  },
});

/* =========================================================
   REVISION SCHEMA
========================================================= */

const RevisionSchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true,
    },

    paperFile: {
      type: String,
      required: true,
    },

    remarks: {
      type: String,
      default: "",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   FEEDBACK SCHEMA
========================================================= */

const FeedbackSchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true,
    },

    remark: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      required: true,
    },

    editorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Editor",
      default: null,
    },

    editorName: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   PUBLICATION FILE SCHEMA
========================================================= */

const PublicationFileSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      default: "",
    },

    version: {
      type: Number,
      default: 1,
    },

    originalName: {
      type: String,
      default: "",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    uploadedByRole: {
      type: String,
      enum: ["Author", "Editor", "Admin"],
      default: null,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   AUTHOR PHOTOGRAPH SCHEMA
========================================================= */

const AuthorPhotographSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      default: "",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   SUPPORTING FILE SCHEMA
========================================================= */

const SupportingFileSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      default: "",
    },

    mimeType: {
      type: String,
      default: "",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   GALLEY PROOF HISTORY
========================================================= */

const GalleyProofHistorySchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true,
    },

    file: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      default: "",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    uploadedByRole: {
      type: String,
      enum: ["Author", "Editor", "Admin"],
      default: null,
    },

    remarks: {
      type: String,
      default: "",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   SUBMIT FORM SCHEMA
========================================================= */

const SubmitFormSchema = new mongoose.Schema(
  {
    /* =====================================================
       AUTHOR
    ===================================================== */

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },

    /* =====================================================
       PAPER INFORMATION
    ===================================================== */

    paperId: {
      type: String,
      unique: true,
    },

    paperTitle: {
      type: String,
      required: true,
      trim: true,
    },

    abstract: {
      type: String,
      required: true,
    },

    keywords: {
      type: [String],
      default: [],
    },

    researchArea: {
      type: String,
      default: "",
    },

    paperFile: {
      type: String,
      required: true,
    },

    version: {
      type: Number,
      default: 1,
    },

    editedPdf: {
      type: String,
      default: "",
    },

    /* =====================================================
       PAPER REVISIONS
    ===================================================== */

    revisions: {
      type: [RevisionSchema],
      default: [],
    },

    /* =====================================================
       FEEDBACK
    ===================================================== */

    feedbackHistory: {
      type: [FeedbackSchema],
      default: [],
    },

    /* =====================================================
       AUTHOR INFORMATION
    ===================================================== */

    authorCategory: {
      type: String,
      default: "",
    },

    totalAuthors: {
      type: Number,
      default: 1,
    },

    authors: {
      type: [AuthorSchema],
      default: [],
    },

    mobileCountryCode: {
      type: String,
      default: "",
    },

    address: {
      addressLine1: {
        type: String,
        default: "",
      },

      addressLine2: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "",
      },

      pincode: {
        type: String,
        default: "",
      },
    },

    referralCode: {
      type: String,
      default: "",
    },

    specialMessage: {
      type: String,
      default: "",
    },

    /* =====================================================
       EDITOR
    ===================================================== */

    editorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Editor",
      default: null,
    },

    editorName: {
      type: String,
      default: "",
    },

    editorAssignedAt: {
      type: Date,
      default: null,
    },

    /* =====================================================
       REVIEWER
    ===================================================== */

    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviewer",
      default: null,
    },

    reviewerName: {
      type: String,
      default: "",
    },

    reviewerAssignedAt: {
      type: Date,
      default: null,
    },

    /* =====================================================
       REMARKS
    ===================================================== */

    editorRemarks: {
      type: String,
      default: "",
    },

    reviewerRemarks: {
      type: String,
      default: "",
    },

    /* =====================================================
       PUBLICATION DOCUMENTS
       
       Simple workflow:
       
       Accepted
          ↓
       Documents Required
          ↓
       Author uploads documents
          ↓
       Documents Submitted
          ↓
       Editor approves
          ↓
       Published
    ===================================================== */

    publicationDocuments: {
      /* ---------------------------------------------------
         Corrected Galley Proof
      --------------------------------------------------- */

      correctedGalleyProof: {
        type: PublicationFileSchema,
        default: null,
      },

      /* ---------------------------------------------------
         Copyright Transfer Form
      --------------------------------------------------- */

      copyrightTransferForm: {
        type: PublicationFileSchema,
        default: null,
      },

      /* ---------------------------------------------------
         Publication Fee Payment Proof
         
         Frontend field:
         publicationFeePaymentProof
         
         Database field:
         publicationFeeProof
      --------------------------------------------------- */

      publicationFeeProof: {
        type: PublicationFileSchema,
        default: null,
      },

      /* ---------------------------------------------------
         Author Photographs
      --------------------------------------------------- */

      authorPhotographs: {
        type: [AuthorPhotographSchema],
        default: [],
      },

      /* ---------------------------------------------------
         Additional Supporting Files
         Optional
      --------------------------------------------------- */

      additionalSupportingFiles: {
        type: [SupportingFileSchema],
        default: [],
      },

      /* ---------------------------------------------------
         Publication submission information
      --------------------------------------------------- */

      submittedAt: {
        type: Date,
        default: null,
      },

      /* ---------------------------------------------------
         Editor approval information
      --------------------------------------------------- */

      approvedAt: {
        type: Date,
        default: null,
      },

      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Editor",
        default: null,
      },

      /* ---------------------------------------------------
         Final article
      --------------------------------------------------- */

      finalArticle: {
        type: String,
        default: "",
      },

      /* ---------------------------------------------------
         Abstract file
      --------------------------------------------------- */

      abstractFile: {
        type: String,
        default: "",
      },

      /* ---------------------------------------------------
         Publication certificates
      --------------------------------------------------- */

      publicationCertificates: {
        type: [String],
        default: [],
      },

      /* ---------------------------------------------------
         Published information
      --------------------------------------------------- */

      publishedAt: {
        type: Date,
        default: null,
      },

      publishedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        default: null,
      },
    },

    /* =====================================================
       PUBLICATION FLAGS
    ===================================================== */

    isPublished: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    /* =====================================================
       COMPLETION
    ===================================================== */

    completedAt: {
      type: Date,
      default: null,
    },

    /* =====================================================
       MAIN PAPER STATUS
       
       NORMAL WORKFLOW:
       
       Submitted
       ↓
       Editor Assigned
       ↓
       Editing
       ↓
       Reviewer Assigned
       ↓
       Review Pending
       ↓
       Revision Required
       ↓
       Accepted
       
       PUBLICATION WORKFLOW:
       
       Accepted
       ↓
       Documents Required
       ↓
       Documents Submitted
       ↓
       Published
    ===================================================== */
    status: {
      type: String,

      enum: [
        "Submitted",
        "Editor Assigned",
        "Under Review",
        "Accepted",
        "Rejected",

        "Documents Required",
        "Documents Submitted",
        "Approved and Forwarded to Admin",
        "Published",
      ],

      default: "Submitted",
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SubmitForm", SubmitFormSchema);
