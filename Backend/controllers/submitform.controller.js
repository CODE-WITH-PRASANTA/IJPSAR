const sendNotification = require("../utils/sendNotification");
const SubmitForm = require("../models/submitform.model");

/* ================= CREATE SUBMISSION ================= */

exports.createSubmission = async (req, res) => {
  try {
    // console.log("Decoded Author:", req.author);

    const authors = JSON.parse(req.body.authors || "[]");
    const keywords = JSON.parse(req.body.keywords || "[]");

    const count = await SubmitForm.countDocuments();

    const paperId = `PAPER-${new Date().getFullYear()}-${String(
      count + 1,
    ).padStart(4, "0")}`;

    const submission = await SubmitForm.create({
      authorId: req.author.id, // <-- Add this

      paperId,
      paperTitle: req.body.paperTitle,
      abstract: req.body.abstract,
      keywords,

      mobileCountryCode: req.body.mobileCountryCode,
      researchArea: req.body.researchArea,

      // Better to use uploaded file path
      paperFile: req.file ? req.file.path : "",

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

    return res.status(201).json({
      success: true,
      message: "Paper Submitted Successfully",
      data: submission,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL SUBMISSIONS ================= */

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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET SINGLE ================= */

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
        $nin: ["Completed", "Published"],
      },
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: papers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUnassignedPapers = async (req, res) => {
  try {
    const papers = await SubmitForm.find({
      $or: [{ editorId: null }, { editorId: { $exists: false } }],
      status: {
        $nin: ["Published", "Rejected"],
      },
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: papers,
    });
  } catch (error) {
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
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: papers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* ================= UPDATE ================= */

exports.updateSubmission = async (req, res) => {
  try {
    const submission = await SubmitForm.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    // Keep previous values
    const previousStatus = submission.status;
    const previousRemark = submission.editorRemarks;

    // Update paper information
    submission.paperTitle = req.body.paperTitle;
    submission.abstract = req.body.abstract;
    submission.status = req.body.status;

    // Increase version only once when revision is requested
    if (
      req.body.status === "Revision Required" &&
      previousStatus !== "Revision Required"
    ) {
      submission.version += 1;
    }

    // Save feedback history only if remark changed
    if (
      req.body.editorRemarks &&
      req.body.editorRemarks.trim() !== "" &&
      req.body.editorRemarks !== previousRemark
    ) {
      submission.feedbackHistory.push({
        version: submission.version,
        remark: req.body.editorRemarks,
        link: req.body.feedbackLink,
        status: req.body.status,
        editorId: submission.editorId,
        editorName: submission.editorName,
      });

      await sendNotification({
        receiverId: submission.authorId,
        receiverRole: "Author",
        title: "New Feedback",
        message: "Editor has provided feedback for your paper.",
        paperId: submission._id,
      });

      // Update current remark
      submission.editorRemarks = req.body.editorRemarks;
      submission.feedbackLink = req.body.feedbackLink;
    }

    await submission.save();

    return res.status(200).json({
      success: true,
      message: "Paper Updated Successfully",
      data: submission,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* ================= DELETE ================= */
exports.uploadRevision = async (req, res) => {
  try {
    const paper = await SubmitForm.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    paper.version += 1;

    if (req.file) {
      paper.paperFile = req.file.path;
    }

    paper.paperTitle = req.body.paperTitle;
    paper.abstract = req.body.abstract;
    paper.keywords = JSON.parse(req.body.keywords);

    paper.status = "Editing";

    paper.revisions.push({
      version: paper.version,
      paperFile: paper.paperFile,
      remarks: "Revision uploaded by author",
    });

    await paper.save();

    res.json({
      success: true,
      message: "Revision Uploaded Successfully",
      data: paper,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.deleteSubmission = async (req, res) => {
  try {
    const deleted = await SubmitForm.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= ASSIGN EDITOR ================= */

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

    await Editor.findByIdAndUpdate(editorId, {
      $addToSet: {
        assignedPapers: {
          paperId: paper._id,
          assignedAt: new Date(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: paper,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= START EDITING ================= */

exports.startEditing = async (req, res) => {
  try {
    const data = await SubmitForm.findByIdAndUpdate(
      req.params.id,
      {
        status: "Editing",
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Editing Started",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= ASSIGN REVIEWER ================= */

exports.assignReviewer = async (req, res) => {
  try {
    const { reviewerId, reviewerName } = req.body;

    const paper = await SubmitForm.findByIdAndUpdate(
      req.params.id,
      {
        reviewerId,
        reviewerName,
        reviewerAssignedAt: new Date(),
        status: "Reviewer Assigned",
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      data: paper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= SEND TO REVIEW ================= */

exports.sendToReview = async (req, res) => {
  try {
    const data = await SubmitForm.findByIdAndUpdate(
      req.params.id,
      {
        status: "Review Pending",
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Sent To Reviewer",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= ACCEPT PAPER ================= */

exports.acceptPaper = async (req, res) => {
  try {
    const data = await SubmitForm.findByIdAndUpdate(
      req.params.id,
      {
        status: "Accepted",
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Paper Accepted",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= REJECT PAPER ================= */

exports.rejectPaper = async (req, res) => {
  try {
    const data = await SubmitForm.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Paper Rejected",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= PUBLISH PAPER ================= */
exports.completePaper = async (req, res) => {
  try {
    const paper = await SubmitForm.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    paper.status = "Completed";
    paper.completedAt = new Date();
    paper.isPublished = false;

    await paper.save();

    await sendNotification({
      receiverId: "ADMIN_ID",
      receiverRole: "Admin",
      title: "Paper Ready",
      message: `${paper.paperTitle} is ready for publication.`,
      paperId: paper._id,
    });

    return res.json({
      success: true,
      message: "Paper moved to Publication Management",
      data: paper,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.publishPaper = async (req, res) => {
  try {
    const paper = await SubmitForm.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    paper.status = "Published";
    paper.isPublished = true;
    paper.publishedAt = new Date();

    await paper.save();

    await sendNotification({
      receiverId: paper.authorId,
      receiverRole: "Author",
      title: "Paper Published",
      message: "Congratulations! Your paper has been published.",
      paperId: paper._id,
    });

    return res.json({
      success: true,
      message: "Paper Published Successfully",
      data: paper,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
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

    paper.status = "Completed";
    paper.isPublished = false;
    paper.publishedAt = null;

    await paper.save();

    return res.json({
      success: true,
      message: "Paper Unpublished",
      data: paper,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
/* ================= CHANGE STATUS ================= */

exports.changeStatus = async (req, res) => {
  try {
    const data = await SubmitForm.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
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
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
