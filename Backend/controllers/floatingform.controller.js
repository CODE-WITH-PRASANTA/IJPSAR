const FloatingForm = require("../models/floatingform.model");

// CREATE LEAD
exports.createLead = async (req, res) => {
  try {
    const { name, address, phone, message } = req.body;

    if (!name || !address || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const lead = await FloatingForm.create({
      name,
      address,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      data: lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET ALL LEADS
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await FloatingForm.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET SINGLE LEAD
exports.getLeadById = async (req, res) => {
  try {
    const lead = await FloatingForm.findById(
      req.params.id
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// DELETE LEAD
exports.deleteLead = async (req, res) => {
  try {
    const lead = await FloatingForm.findByIdAndDelete(
      req.params.id
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};