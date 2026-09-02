const sendNotification = require("../utils/sendNotification");
const SubmitForm = require("../models/submitform.model");

const getFilePath = (file) => {
  if (!file) return "";

  return (
    file.path ||
    file.url ||
    file.location ||
    file.secure_url ||
    file.filename ||
    ""
  );
};

const getMultipleFilePaths = (req, fieldName) => {
  const files = req.files?.[fieldName] || [];

  return files.map((file) => getFilePath(file)).filter(Boolean);
};

const getAdminNotificationId = (req) => {
  return req.admin?.id || process.env.ADMIN_ID || null;
};

exports.createSubmission = async (req, res) => {
  try {
    const authors = JSON.parse(req.body.authors || "[]");
    const keywords = JSON.parse(req.body.keywords || "[]");

    const paperFile = req.file ? getFilePath(req.file) : "";

    if (!paperFile) {
      return res.status(400).json({
        success: false,
        message: "Paper file is required",
      });
    }

    const newSubmission = new SubmitForm({
      authorId: req.author.id,

      paperTitle: req.body.paperTitle,

      abstract: req.body.abstract,

      keywords,

      mobileCountryCode: req.body.mobileCountryCode,

      researchArea: req.body.researchArea,

      paperFile,

      version: 1,

      revisions: [
        {
          version: 1,
          paperFile,
          remarks: "Original submission",
          uploadedAt: new Date(),
        },
      ],

      authorCategory: req.body.authorCategory,

      totalAuthors: authors.length,

      authors,

      address: {
        addressLine1: req.body.address1,

        addressLine2: req.body.address2,

        city: req.body.city,

        state: req.body.state,

        country: req.body.country,

        pincode: req.body.pincode,
      },

      referralCode: req.body.referralCode,

      specialMessage: req.body.editorMessage,

      status: "Submitted",
    });

    const shortId = newSubmission._id.toString().slice(-6).toUpperCase();

    newSubmission.paperId = `PAPER-${new Date().getFullYear()}-${shortId}`;

    const submission = await newSubmission.save();

    return res.status(201).json({
      success: true,
      message: "Paper Submitted Successfully",
      data: submission,
    });
  } catch (error) {
    console.error("CREATE SUBMISSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllSubmissions = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const data = await SubmitForm.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await SubmitForm.countDocuments();

    return res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    console.error("GET ALL SUBMISSIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleSubmission = async (req, res) => {
  try {
    const data = await SubmitForm.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET SINGLE SUBMISSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEditorPapers = async (req, res) => {
  try {
    const papers = await SubmitForm.find({
      editorId: req.params.editorId,

      status: {
        $nin: ["Published"],
      },
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: papers,
    });
  } catch (error) {
    console.error("GET EDITOR PAPERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPublishedEditorPapers = async (req, res) => {
  try {
    const papers = await SubmitForm.find({
      editorId: req.params.editorId,

      status: "Published",

      isPublished: true,
    }).sort({
      publishedAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: papers.length,
      data: papers,
    });
  } catch (error) {
    console.error("GET PUBLISHED EDITOR PAPERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPublishedAuthorPapers = async (req, res) => {
  try {
    const papers = await SubmitForm.find({
      authorId: req.author.id,

      status: "Published",
    }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: papers.length,
      data: papers,
    });
  } catch (error) {
    console.error("GET PUBLISHED AUTHOR PAPERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUnassignedPapers = async (req, res) => {
  try {
    const papers = await SubmitForm.find({
      $or: [
        {
          editorId: null,
        },
        {
          editorId: {
            $exists: false,
          },
        },
      ],

      status: {
        $nin: ["Published", "Rejected"],
      },
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: papers,
    });
  } catch (error) {
    console.error("GET UNASSIGNED PAPERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPapers = async (req, res) => {
  try {
    const papers = await SubmitForm.find({
      authorId: req.author.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: papers,
    });
  } catch (error) {
    console.error("GET MY PAPERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPublishedArchive = async (req, res) => {
  try {
    const papers = await SubmitForm.find({
      status: "Published",
      isPublished: true,
    })
      .select("paperTitle publishedAt createdAt status isPublished")
      .sort({
        publishedAt: -1,
      });

    const archive = {};

    papers.forEach((paper) => {
      const publishDate = paper.publishedAt || paper.createdAt;

      const date = new Date(publishDate);

      const year = date.getFullYear();

      const month = date.getMonth() + 1;

      if (!archive[year]) {
        archive[year] = {
          year,
          issues: new Set(),
          articles: 0,
        };
      }

      archive[year].issues.add(month);

      archive[year].articles += 1;
    });

    const years = Object.keys(archive).sort((a, b) => Number(a) - Number(b));

    const data = years
      .map((year, index) => ({
        year: Number(year),

        volume: index + 1,

        issues: archive[year].issues.size,

        articles: archive[year].articles,
      }))
      .sort((a, b) => b.year - a.year);

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("ARCHIVE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllPublishedPapers = async (req, res) => {
  try {
    const papers = await SubmitForm.find({
      status: "Published",
      isPublished: true,
    }).sort({
      publishedAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: papers.length,
      data: papers,
    });
  } catch (error) {
    console.error("GET PUBLISHED PAPERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const submission = await SubmitForm.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    const previousRemark = submission.editorRemarks || "";

    if (req.body.paperTitle !== undefined) {
      submission.paperTitle = req.body.paperTitle;
    }

    if (req.body.abstract !== undefined) {
      submission.abstract = req.body.abstract;
    }

    if (req.body.status !== undefined) {
      const protectedStatuses = [
        "Accepted",
        "Documents Required",
        "Documents Submitted",
        "Approved and Forwarded to Admin",
        "Published",
      ];

      if (protectedStatuses.includes(req.body.status)) {
        return res.status(400).json({
          success: false,
          message:
            "This workflow status cannot be changed through the generic update endpoint.",
          currentStatus: submission.status,
        });
      }

      submission.status = req.body.status;
    }

    const newRemark = req.body.editorRemarks?.trim() || "";
    const feedbackLink = req.body.feedbackLink || "";

    if (newRemark !== "" && newRemark !== previousRemark) {
      submission.feedbackHistory.push({
        version: submission.version,

        remark: newRemark,

        link: feedbackLink,

        status: req.body.status || submission.status,

        editorId: submission.editorId || null,

        editorName: submission.editorName || "",

        createdAt: new Date(),
      });

      try {
        await sendNotification({
          receiverId: submission.authorId,
          receiverRole: "Author",
          title: "New Feedback",
          message: "Editor has provided feedback for your paper.",
          paperId: submission._id,
        });
      } catch (notificationError) {
        console.error("FEEDBACK NOTIFICATION ERROR:", notificationError);
      }

      submission.editorRemarks = newRemark;
    }

    await submission.save();

    return res.status(200).json({
      success: true,
      message: "Paper Updated Successfully",
      data: submission,
    });
  } catch (error) {
    console.error("UPDATE SUBMISSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadRevision = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a new paper document.",
      });
    }

    const paper = await SubmitForm.findById(id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found.",
      });
    }

    const newPaperFile = getFilePath(req.file);

    if (!newPaperFile) {
      return res.status(400).json({
        success: false,
        message: "Uploaded file path could not be found.",
      });
    }

    const oldVersion = Number(paper.version || 1);

    const oldPaperFile = paper.paperFile;

    if (oldPaperFile) {
      paper.revisions.push({
        version: oldVersion,

        paperFile: oldPaperFile,

        remarks: paper.editorRemarks || "",

        uploadedAt: paper.updatedAt || new Date(),
      });
    }

    const newVersion = oldVersion + 1;

    paper.paperFile = newPaperFile;

    paper.version = newVersion;

    paper.editorRemarks = "";

    paper.status = "Editor Assigned";

    await paper.save();

    return res.status(200).json({
      success: true,

      message: "Paper revision uploaded successfully.",

      data: {
        _id: paper._id,

        paperId: paper.paperId,

        version: paper.version,

        paperFile: paper.paperFile,

        revisions: paper.revisions,

        status: paper.status,
      },
    });
  } catch (error) {
    console.error("UPLOAD REVISION ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to upload paper revision.",

      error: error.message,
    });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const deleted = await SubmitForm.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.error("DELETE SUBMISSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.assignEditor = async (req, res) => {
  try {
    const { editorId, editorName } = req.body;

    const paper = await SubmitForm.findByIdAndUpdate(
      req.params.id,
      {
        editorId,

        editorName,

        editorAssignedAt: new Date(),

        status: "Editor Assigned",
      },
      {
        new: true,
      },
    );

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: paper,
    });
  } catch (error) {
    console.error("ASSIGN EDITOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.startEditing = async (req, res) => {
  try {
    const paper = await SubmitForm.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    if (paper.status !== "Editor Assigned") {
      return res.status(400).json({
        success: false,
        message: "Paper must be assigned to an editor first.",
        currentStatus: paper.status,
      });
    }

    paper.status = "Under Review";

    await paper.save();

    return res.status(200).json({
      success: true,
      message: "Paper is now Under Review.",
      data: paper,
    });
  } catch (error) {
    console.error("START REVIEW ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.acceptPaper = async (req, res) => {
  try {
    
    const paper = await SubmitForm.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found.",
      });
    }

    /* =====================================================
       EDITOR AUTHORIZATION
    ===================================================== */

    if (
      req.editor?.id &&
      paper.editorId?.toString() !== req.editor.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to accept this paper.",
      });
    }

    /* =====================================================
       STATUS CHECK

       Under Review
            ↓
         Accepted
    ===================================================== */

    if (paper.status !== "Under Review") {
      return res.status(400).json({
        success: false,
        message: "Only papers currently Under Review can be accepted.",
        currentStatus: paper.status,
      });
    }

    /* =====================================================
       ACCEPT PAPER
    ===================================================== */

    paper.status = "Accepted";

    /* =====================================================
       SAVE
    ===================================================== */

    await paper.save();

   

    /* =====================================================
       NOTIFY AUTHOR
    ===================================================== */

    try {
      await sendNotification({
        receiverId: paper.authorId,
        receiverRole: "Author",

        title: "Paper Accepted",

        message: `Your paper "${paper.paperTitle}" has been accepted by the Editor. Publication documents are now required.`,

        paperId: paper._id,
      });
    } catch (notificationError) {
      console.error("ACCEPT PAPER NOTIFICATION ERROR:", notificationError);
    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({
      success: true,

      message:
        "Paper accepted successfully. Publication documents are now required.",

      data: paper,
    });
  } catch (error) {
    console.error("ACCEPT PAPER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to accept paper.",
      error: error.message,
    });
  }
};

exports.rejectPaper = async (req, res) => {
  try {
    const data = await SubmitForm.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
      },
      {
        new: true,
      },
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Paper Rejected",
      data,
    });
  } catch (error) {
    console.error("REJECT PAPER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.requestPublicationDocuments = async (req, res) => {
  try {
    

    const paper = await SubmitForm.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found.",
      });
    }

    /* =====================================================
       EDITOR AUTHORIZATION
    ===================================================== */

    if (
      req.editor?.id &&
      paper.editorId?.toString() !== req.editor.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to request publication documents.",
      });
    }

    /* =====================================================
       STATUS CHECK

       Accepted
          ↓
       Documents Required
    ===================================================== */

    if (paper.status !== "Accepted") {
      return res.status(400).json({
        success: false,

        message:
          "Publication documents can only be requested after the paper is accepted.",

        currentStatus: paper.status,
      });
    }

    /* =====================================================
       CHANGE STATUS
    ===================================================== */

    paper.status = "Documents Required";

    await paper.save();

    

    /* =====================================================
       NOTIFY AUTHOR
    ===================================================== */

    try {
      await sendNotification({
        receiverId: paper.authorId,

        receiverRole: "Author",

        title: "Publication Documents Required",

        message:
          `Your paper "${paper.paperTitle}" has been accepted. Please upload the required publication documents.`,

        paperId: paper._id,
      });
    } catch (notificationError) {
      console.error(
        "DOCUMENT REQUEST NOTIFICATION ERROR:",
        notificationError
      );
    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({
      success: true,

      message:
        "Paper accepted. Publication documents are now required.",

      data: paper,
    });
  } catch (error) {
    console.error(
      "REQUEST PUBLICATION DOCUMENTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to request publication documents.",

      error: error.message,
    });
  }
};

/* =========================================================
   EDITOR PUBLICATION DOCUMENT UPLOAD
   =========================================================
   
   IMPORTANT:
   Editor does NOT upload publication documents anymore.

   New workflow:
   Accepted
      ↓
   Documents Required
      ↓
   Author uploads publication documents
      ↓
   Documents Submitted
      ↓
   Editor approves
      ↓
   Approved and Forwarded to Admin
   ========================================================= */

exports.uploadAuthorPublicationDocuments = async (req, res) => {
  try {
    console.log(
      "========== AUTHOR PUBLICATION DOCUMENTS =========="
    );

    const paperId = req.params.id;

    console.log("Paper ID:", paperId);
    console.log("Author ID:", req.author?.id);
    console.log("Files:", req.files);

    /* =====================================================
       FIND PAPER
    ===================================================== */

    const paper = await SubmitForm.findById(paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found.",
      });
    }

    /* =====================================================
       AUTHOR OWNERSHIP CHECK
    ===================================================== */

    if (
      req.author?.id &&
      paper.authorId?.toString() !== req.author.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to upload documents for this paper.",
      });
    }

    /* =====================================================
       STATUS CHECK
       
       Normal workflow:

       Accepted
          ↓
       Documents Required
          ↓
       Author uploads documents

       If the paper is still Accepted, we automatically
       move it to Documents Required when the author
       starts uploading.
    ===================================================== */

    if (
      paper.status !== "Accepted" &&
      paper.status !== "Documents Required"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Publication documents can only be uploaded when the paper is Accepted or Documents Required.",
        currentStatus: paper.status,
      });
    }

    /* =====================================================
       GET FILE PATHS
    ===================================================== */

    const correctedGalleyProof = getFilePath(
      req.files?.correctedGalleyProof?.[0]
    );

    const copyrightTransferForm = getFilePath(
      req.files?.copyrightTransferForm?.[0]
    );

    const publicationFeePaymentProof = getFilePath(
      req.files?.publicationFeePaymentProof?.[0]
    );

    const authorPhotographs = getMultipleFilePaths(
      req,
      "authorPhotographs"
    );

    const supportingFiles = getMultipleFilePaths(
      req,
      "additionalSupportingFiles"
    );

    /* =====================================================
       CHECK AT LEAST ONE FILE
    ===================================================== */

    const hasAnyFile =
      !!correctedGalleyProof ||
      !!copyrightTransferForm ||
      !!publicationFeePaymentProof ||
      authorPhotographs.length > 0 ||
      supportingFiles.length > 0;

    if (!hasAnyFile) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload at least one publication document.",
      });
    }

    /* =====================================================
       INITIALIZE PUBLICATION DOCUMENTS
    ===================================================== */

    if (!paper.publicationDocuments) {
      paper.publicationDocuments = {};
    }

    const existingDocuments =
      paper.publicationDocuments;

    /* =====================================================
       UPLOADED BY
    ===================================================== */

    const uploadedBy =
      req.author?.id || paper.authorId;

    /* =====================================================
       CORRECTED GALLEY PROOF
    ===================================================== */

    if (correctedGalleyProof) {
      const currentVersion = Number(
        existingDocuments?.correctedGalleyProof?.version || 0
      );

      const newVersion =
        currentVersion + 1;

      const originalName =
        req.files?.correctedGalleyProof?.[0]
          ?.originalname || "";

      existingDocuments.correctedGalleyProof = {
        file: correctedGalleyProof,
        version: newVersion,
        originalName,
        uploadedBy,
        uploadedByRole: "Author",
        uploadedAt: new Date(),
      };

      /* =================================================
         GALLEY PROOF HISTORY
      ================================================= */

      if (
        !Array.isArray(
          existingDocuments.galleyProofHistory
        )
      ) {
        existingDocuments.galleyProofHistory = [];
      }

      existingDocuments.galleyProofHistory.push({
        version: newVersion,
        file: correctedGalleyProof,
        originalName,
        uploadedBy,
        uploadedByRole: "Author",
        remarks:
          "Corrected galley proof uploaded by author.",
        uploadedAt: new Date(),
      });
    }

    /* =====================================================
       COPYRIGHT TRANSFER FORM
    ===================================================== */

    if (copyrightTransferForm) {
      const currentVersion = Number(
        existingDocuments?.copyrightTransferForm
          ?.version || 0
      );

      existingDocuments.copyrightTransferForm = {
        file: copyrightTransferForm,
        version: currentVersion + 1,

        originalName:
          req.files?.copyrightTransferForm?.[0]
            ?.originalname || "",

        uploadedBy,
        uploadedByRole: "Author",
        uploadedAt: new Date(),
      };
    }

    /* =====================================================
       PUBLICATION FEE PAYMENT PROOF
    ===================================================== */

    if (publicationFeePaymentProof) {
      const currentVersion = Number(
        existingDocuments?.publicationFeeProof
          ?.version || 0
      );

      existingDocuments.publicationFeeProof = {
        file: publicationFeePaymentProof,
        version: currentVersion + 1,

        originalName:
          req.files?.publicationFeePaymentProof?.[0]
            ?.originalname || "",

        uploadedBy,
        uploadedByRole: "Author",
        uploadedAt: new Date(),
      };
    }

    /* =====================================================
       AUTHOR PHOTOGRAPHS
       
       EVERY AUTHOR PHOTOGRAPH UPLOAD REPLACES THE
       CURRENT PHOTOGRAPH COLLECTION.
    ===================================================== */

    if (authorPhotographs.length > 0) {
      existingDocuments.authorPhotographs =
        authorPhotographs.map(
          (file, index) => ({
            file,

            originalName:
              req.files?.authorPhotographs?.[index]
                ?.originalname || "",

            uploadedBy,

            uploadedByRole:
              "Author",

            uploadedAt:
              new Date(),
          })
        );
    }

    /* =====================================================
       ADDITIONAL SUPPORTING FILES
       
       OPTIONAL
    ===================================================== */

    if (supportingFiles.length > 0) {
      existingDocuments.additionalSupportingFiles =
        supportingFiles.map(
          (file, index) => ({
            file,

            originalName:
              req.files
                ?.additionalSupportingFiles?.[index]
                ?.originalname || "",

            mimeType:
              req.files
                ?.additionalSupportingFiles?.[index]
                ?.mimetype || "",

            uploadedBy,

            uploadedByRole:
              "Author",

            uploadedAt:
              new Date(),
          })
        );
    }

    /* =====================================================
       MOVE ACCEPTED → DOCUMENTS REQUIRED
       
       This is important for your current issue.
    ===================================================== */

    if (paper.status === "Accepted") {
      paper.status = "Documents Required";

      console.log(
        "Paper status changed: Accepted → Documents Required"
      );
    }

    /* =====================================================
       CLEAR OLD CORRECTION REMARKS
    ===================================================== */

    existingDocuments.correctionRemarks = "";

    /* =====================================================
       SAVE PAPER
    ===================================================== */

    await paper.save();

    console.log(
      "Publication documents saved successfully:",
      paper._id
    );

    /* =====================================================
       DOCUMENT STATUS
    ===================================================== */

    const documents =
      paper.publicationDocuments || {};

    const uploadedDocuments = {
      correctedGalleyProof:
        !!documents?.correctedGalleyProof?.file,

      copyrightTransferForm:
        !!documents?.copyrightTransferForm?.file,

      publicationFeePaymentProof:
        !!documents?.publicationFeeProof?.file,

      authorPhotographs:
        Array.isArray(
          documents?.authorPhotographs
        ) &&
        documents.authorPhotographs.length > 0,

      additionalSupportingFiles:
        Array.isArray(
          documents?.additionalSupportingFiles
        ) &&
        documents.additionalSupportingFiles.length > 0,
    };

    /* =====================================================
       REQUIRED DOCUMENT CHECK
       
       Required:
       1. Galley Proof
       2. Copyright Transfer Form
       3. Payment Proof
       4. Author Photograph

       Optional:
       5. Additional Supporting Files
    ===================================================== */

    const allRequiredDocumentsUploaded =
      uploadedDocuments.correctedGalleyProof &&
      uploadedDocuments.copyrightTransferForm &&
      uploadedDocuments.publicationFeePaymentProof &&
      uploadedDocuments.authorPhotographs;

    /* =====================================================
       LOG
    ===================================================== */

    console.log(
      "------------------------------------------"
    );

    console.log(
      "Corrected Galley Proof:",
      uploadedDocuments.correctedGalleyProof
    );

    console.log(
      "Copyright Transfer Form:",
      uploadedDocuments.copyrightTransferForm
    );

    console.log(
      "Publication Fee Proof:",
      uploadedDocuments.publicationFeePaymentProof
    );

    console.log(
      "Author Photographs:",
      documents?.authorPhotographs?.length || 0
    );

    console.log(
      "Additional Supporting Files:",
      documents?.additionalSupportingFiles
        ?.length || 0
    );

    console.log(
      "All Required Documents Uploaded:",
      allRequiredDocumentsUploaded
    );

    console.log(
      "Current Paper Status:",
      paper.status
    );

    console.log(
      "------------------------------------------"
    );

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({
      success: true,

      message:
        "Publication document uploaded successfully.",

      data: paper,

      documentStatus: {
        correctedGalleyProof:
          uploadedDocuments.correctedGalleyProof,

        copyrightTransferForm:
          uploadedDocuments.copyrightTransferForm,

        publicationFeePaymentProof:
          uploadedDocuments.publicationFeePaymentProof,

        authorPhotographs:
          uploadedDocuments.authorPhotographs,

        additionalSupportingFiles:
          uploadedDocuments.additionalSupportingFiles,

        allRequiredDocumentsUploaded,
      },

      nextStep:
        allRequiredDocumentsUploaded
          ? "All required documents are uploaded. You can now submit the publication documents to the Editor."
          : "Upload the remaining required publication documents.",
    });
  } catch (error) {
    console.error(
      "UPLOAD AUTHOR PUBLICATION DOCUMENTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload publication documents.",
      error: error.message,
    });
  }
};
exports.submitPublicationToEditor = async (req, res) => {
  try {
    console.log("========== SUBMIT PUBLICATION TO EDITOR ==========");

    const paperId = req.params.id;

    console.log("Paper ID:", paperId);
    console.log("Author ID:", req.author?.id);

    /* =====================================================
       FIND PAPER
    ===================================================== */

    const paper = await SubmitForm.findById(paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found.",
      });
    }

    /* =====================================================
       AUTHOR OWNERSHIP CHECK
    ===================================================== */

    if (
      req.author?.id &&
      paper.authorId?.toString() !== req.author.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to submit this paper.",
      });
    }

    /* =====================================================
       STATUS CHECK

       Documents Required
              ↓
       Documents Submitted
    ===================================================== */

    if (paper.status !== "Documents Required") {
      return res.status(400).json({
        success: false,

        message: "Paper is not ready for publication document submission.",

        currentStatus: paper.status,
      });
    }

    /* =====================================================
       PUBLICATION DOCUMENTS
    ===================================================== */

    const documents = paper.publicationDocuments || {};

    const missing = [];

    /* =====================================================
       REQUIRED DOCUMENT 1
    ===================================================== */

    if (!documents?.correctedGalleyProof?.file) {
      missing.push("Corrected Galley Proof");
    }

    /* =====================================================
       REQUIRED DOCUMENT 2
    ===================================================== */

    if (!documents?.copyrightTransferForm?.file) {
      missing.push("Copyright Transfer Form");
    }

    /* =====================================================
       REQUIRED DOCUMENT 3
    ===================================================== */

    if (!documents?.publicationFeeProof?.file) {
      missing.push("Publication Fee Payment Proof");
    }

    /* =====================================================
       REQUIRED DOCUMENT 4
    ===================================================== */

    if (
      !Array.isArray(documents?.authorPhotographs) ||
      documents.authorPhotographs.length === 0
    ) {
      missing.push("Author Photograph(s)");
    }

    /*
      IMPORTANT:

      Additional Supporting Files are OPTIONAL.

      Therefore we DO NOT check:

      documents.additionalSupportingFiles
    */

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (missing.length > 0) {
      console.log("MISSING PUBLICATION DOCUMENTS:", missing);

      return res.status(400).json({
        success: false,

        message: "Required publication documents are missing.",

        missingDocuments: missing,
      });
    }

    /* =====================================================
       SUBMISSION INFORMATION
    ===================================================== */

    const submittedAt = new Date();

    documents.submittedAt = submittedAt;

    /*
      Clear old correction remarks if any.
    */

    documents.correctionRemarks = "";

    /* =====================================================
       CHANGE STATUS

       Documents Required
              ↓
       Documents Submitted
    ===================================================== */

    paper.status = "Documents Submitted";

    await paper.save();

    console.log("Publication documents submitted successfully.");

    /* =====================================================
       NOTIFY EDITOR
    ===================================================== */

    try {
      if (paper.editorId) {
        await sendNotification({
          receiverId: paper.editorId,

          receiverRole: "Editor",

          title: "Publication Documents Submitted",

          message: `${paper.paperTitle} publication documents have been submitted and are ready for checking.`,

          paperId: paper._id,
        });
      }
    } catch (notificationError) {
      console.error(
        "SUBMIT PUBLICATION NOTIFICATION ERROR:",
        notificationError,
      );
    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({
      success: true,

      message: "Publication documents submitted to Editor successfully.",

      data: paper,
    });
  } catch (error) {
    console.error("SUBMIT PUBLICATION ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to submit publication documents.",

      error: error.message,
    });
  }
};
exports.approveAndForwardToAdmin = async (req, res) => {
  try {
    console.log("========== APPROVE & FORWARD TO ADMIN ==========");

    const paperId = req.params.id;

    console.log("Paper ID:", paperId);
    console.log("Editor ID:", req.editor?.id);

    /* =====================================================
       FIND PAPER
    ===================================================== */

    const paper = await SubmitForm.findById(paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found.",
      });
    }

    /* =====================================================
       EDITOR OWNERSHIP CHECK
    ===================================================== */

    if (
      req.editor?.id &&
      paper.editorId?.toString() !== req.editor.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to approve this paper.",
      });
    }

    /* =====================================================
       STATUS CHECK

       Documents Submitted
              ↓
       Approved and Forwarded to Admin
    ===================================================== */

    if (paper.status !== "Documents Submitted") {
      return res.status(400).json({
        success: false,

        message:
          "Paper must have submitted publication documents before approval.",

        currentStatus: paper.status,
      });
    }

    /* =====================================================
       PUBLICATION DOCUMENTS
    ===================================================== */

    const documents = paper.publicationDocuments || {};

    const missing = [];

    /* =====================================================
       REQUIRED DOCUMENT 1
    ===================================================== */

    if (!documents?.correctedGalleyProof?.file) {
      missing.push("Corrected Galley Proof");
    }

    /* =====================================================
       REQUIRED DOCUMENT 2
    ===================================================== */

    if (!documents?.copyrightTransferForm?.file) {
      missing.push("Copyright Transfer Form");
    }

    /* =====================================================
       REQUIRED DOCUMENT 3
    ===================================================== */

    if (!documents?.publicationFeeProof?.file) {
      missing.push("Publication Fee Payment Proof");
    }

    /* =====================================================
       REQUIRED DOCUMENT 4
    ===================================================== */

    if (
      !Array.isArray(documents?.authorPhotographs) ||
      documents.authorPhotographs.length === 0
    ) {
      missing.push("Author Photograph(s)");
    }

    /*
      Additional Supporting Files are OPTIONAL.
    */

    /* =====================================================
       DOCUMENT VALIDATION
    ===================================================== */

    if (missing.length > 0) {
      console.log("MISSING PUBLICATION DOCUMENTS:", missing);

      return res.status(400).json({
        success: false,

        message:
          "Cannot forward to Admin. Required publication documents are missing.",

        missingDocuments: missing,
      });
    }

    /* =====================================================
       EDITOR APPROVAL INFORMATION
    ===================================================== */

    const now = new Date();

    documents.reviewedAt = now;

    documents.approvedAt = now;

    documents.approvedBy = req.editor?.id || paper.editorId || null;

    documents.approvedByRole = "Editor";

    /* =====================================================
       FINAL WORKFLOW STATUS

       Documents Submitted
              ↓
       Approved and Forwarded to Admin
    ===================================================== */

    paper.status = "Approved and Forwarded to Admin";

    paper.isPublished = false;

    await paper.save();

    console.log("Paper approved and forwarded to Admin.");

    /* =====================================================
       ADMIN NOTIFICATION
    ===================================================== */

    try {
      const adminId = getAdminNotificationId(req);

      if (adminId) {
        await sendNotification({
          receiverId: adminId,

          receiverRole: "Admin",

          title: "Paper Ready for Publication",

          message: `${paper.paperTitle} has been checked and approved by the Editor. It is ready for publication.`,

          paperId: paper._id,
        });
      } else {
        console.warn("ADMIN ID NOT FOUND - ADMIN NOTIFICATION SKIPPED");
      }
    } catch (notificationError) {
      console.error("ADMIN NOTIFICATION ERROR:", notificationError);
    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({
      success: true,

      message: "Paper approved and forwarded to Admin successfully.",

      data: paper,
    });
  } catch (error) {
    console.error("APPROVE AND FORWARD ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to approve and forward paper.",

      error: error.message,
    });
  }
};
exports.publishPaper = async (req, res) => {
  try {
    console.log("========== PUBLISH PAPER ==========");

    const paperId = req.params.id;

    console.log("Paper ID:", paperId);
    console.log("Admin ID:", req.admin?.id);

    /* =====================================================
       FIND PAPER
    ===================================================== */

    const paper = await SubmitForm.findById(paperId);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found.",
      });
    }

    console.log("Paper Title:", paper.paperTitle);
    console.log("Current Status:", paper.status);

    /* =====================================================
       STATUS CHECK

       Approved and Forwarded to Admin
                    ↓
                Published
    ===================================================== */

    if (paper.status !== "Approved and Forwarded to Admin") {
      return res.status(400).json({
        success: false,

        message:
          "Only papers approved and forwarded by the Editor can be published.",

        currentStatus: paper.status,
      });
    }

    /* =====================================================
       PUBLICATION DOCUMENTS
    ===================================================== */

    const documents = paper.publicationDocuments || {};

    const missing = [];

    /* =====================================================
       REQUIRED DOCUMENT 1
    ===================================================== */

    if (!documents?.correctedGalleyProof?.file) {
      missing.push("Corrected Galley Proof");
    }

    /* =====================================================
       REQUIRED DOCUMENT 2
    ===================================================== */

    if (!documents?.copyrightTransferForm?.file) {
      missing.push("Copyright Transfer Form");
    }

    /* =====================================================
       REQUIRED DOCUMENT 3
    ===================================================== */

    if (!documents?.publicationFeeProof?.file) {
      missing.push("Publication Fee Payment Proof");
    }

    /* =====================================================
       REQUIRED DOCUMENT 4
    ===================================================== */

    if (
      !Array.isArray(documents?.authorPhotographs) ||
      documents.authorPhotographs.length === 0
    ) {
      missing.push("Author Photograph(s)");
    }

    /*
      Additional Supporting Files are OPTIONAL.
    */

    /* =====================================================
       VALIDATE PUBLICATION PACKAGE
    ===================================================== */

    if (missing.length > 0) {
      console.log("MISSING PUBLICATION DOCUMENTS:", missing);

      return res.status(400).json({
        success: false,

        message: "Publication package is incomplete.",

        missingDocuments: missing,
      });
    }

    /* =====================================================
       PUBLISH PAPER
    ===================================================== */

    const publishedDate = new Date();

    paper.status = "Published";

    paper.isPublished = true;

    paper.publishedAt = publishedDate;

    /* =====================================================
       PUBLICATION DOCUMENT INFORMATION
    ===================================================== */

    if (!paper.publicationDocuments) {
      paper.publicationDocuments = {};
    }

    paper.publicationDocuments.publishedAt = publishedDate;

    paper.publicationDocuments.publishedBy = req.admin?.id || null;

    paper.publicationDocuments.publishedByRole = "Admin";

    /* =====================================================
       SAVE
    ===================================================== */

    await paper.save();

    console.log("PAPER PUBLISHED SUCCESSFULLY");

    /* =====================================================
       AUTHOR NOTIFICATION
    ===================================================== */

    try {
      if (paper.authorId) {
        await sendNotification({
          receiverId: paper.authorId,

          receiverRole: "Author",

          title: "Paper Published",

          message:
            "Congratulations! Your paper has been published successfully.",

          paperId: paper._id,
        });
      }
    } catch (notificationError) {
      console.error("PUBLISH NOTIFICATION ERROR:", notificationError);
    }

    /* =====================================================
       EDITOR NOTIFICATION
    ===================================================== */

    try {
      if (paper.editorId) {
        await sendNotification({
          receiverId: paper.editorId,

          receiverRole: "Editor",

          title: "Paper Published",

          message: `${paper.paperTitle} has been published successfully by Admin.`,

          paperId: paper._id,
        });
      }
    } catch (notificationError) {
      console.error("EDITOR PUBLISH NOTIFICATION ERROR:", notificationError);
    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({
      success: true,

      message: "Paper Published Successfully.",

      data: paper,
    });
  } catch (error) {
    console.error("PUBLISH PAPER ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to publish paper.",

      error: error.message,
    });
  }
};
exports.unPublishPaper = async (req, res) => {
  try {
    const paper = await SubmitForm.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    if (paper.status !== "Published") {
      return res.status(400).json({
        success: false,
        message: "Only published papers can be unpublished.",
        currentStatus: paper.status,
      });
    }

    paper.status = "Approved and Forwarded to Admin";
    paper.isPublished = false;
    paper.publishedAt = null;

    if (paper.publicationDocuments) {
      paper.publicationDocuments.publishedAt = null;
    }

    await paper.save();

    return res.status(200).json({
      success: true,
      message:
        "Paper unpublished successfully and returned to Admin publication queue.",
      data: paper,
    });
  } catch (error) {
    console.error("UNPUBLISH PAPER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Submitted",
      "Editor Assigned",
      "Under Review",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid normal workflow status. Use the dedicated endpoint for special workflow actions.",
        allowedStatuses,
      });
    }

    const data = await SubmitForm.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Paper status updated successfully.",
      data,
    });
  } catch (error) {
    console.error("CHANGE STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
