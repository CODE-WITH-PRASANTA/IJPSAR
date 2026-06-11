const SubmitForm = require("../models/submitform.model");

/* ================= CREATE SUBMISSION ================= */

exports.createSubmission = async (req, res) => {
  try {
    console.log("BODY =>", req.body);

    const authors = JSON.parse(req.body.authors || "[]");
    const keywords = JSON.parse(req.body.keywords || "[]");

    const submission = await SubmitForm.create({
      paperTitle: req.body.paperTitle,
      abstract: req.body.abstract,

      keywords,

      mobileCountryCode: req.body.mobileCountryCode,
      researchArea: req.body.researchArea,

      // Saved by convertToWebp middleware
      paperFile: req.body.paperFile,

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
    });

    return res.status(201).json({
      success: true,
      message: "Paper Submitted Successfully",
      data: submission,
    });
  } catch (error) {
    console.error("===== CREATE SUBMISSION ERROR =====");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
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

/* ================= GET SINGLE SUBMISSION ================= */

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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE SUBMISSION ================= */

exports.updateSubmission = async (req, res) => {
  try {
    const updated = await SubmitForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE SUBMISSION ================= */

exports.deleteSubmission = async (req, res) => {
  try {
    const deleted = await SubmitForm.findByIdAndDelete(
      req.params.id
    );

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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
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
      {
        new: true,
      }
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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};