const Index = require("../models/index.model");

// CREATE
exports.createIndex = async (req, res) => {
  try {
    const newIndex = new Index({
      title: req.body.title,
      subtitle: req.body.subtitle,
      status: req.body.status,
      image: req.file ? req.file.path : "",
    });

    await newIndex.save();

    res.status(201).json({
      success: true,
      data: newIndex,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
exports.getAllIndex = async (req, res) => {
  try {
    const data = await Index.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE
exports.getSingleIndex = async (req, res) => {
  try {
    const data = await Index.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
exports.updateIndex = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      status: req.body.status,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const data = await Index.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
exports.deleteIndex = async (req, res) => {
  try {
    await Index.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};