const Editor = require("../models/editor.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= CREATE EDITOR ================= */

exports.createEditor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
    } = req.body;

    const existingEditor =
      await Editor.findOne({ email });

    if (existingEditor) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const count =
      await Editor.countDocuments();

    const editor = await Editor.create({
      userId: `EDT-${String(
        count + 1
      ).padStart(4, "0")}`,

      name,
      email,
      phone,

      password: hashedPassword,

      role: role || "Editor",

      status: "Active",
    });

    return res.status(201).json({
      success: true,
      message: "Editor Created Successfully",
      data: editor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= LOGIN ================= */

exports.loginEditor = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const editor =
      await Editor.findOne({ email });

    if (!editor) {
      return res.status(404).json({
        success: false,
        message: "Editor not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        editor.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: editor._id,
        role: editor.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
      editor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL ================= */

exports.getAllEditors = async (req, res) => {
  try {
    const editors =
      await Editor.find().sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: editors.length,
      data: editors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET SINGLE ================= */

exports.getSingleEditor = async (
  req,
  res
) => {
  try {
    const editor =
      await Editor.findById(
        req.params.id
      );

    if (!editor) {
      return res.status(404).json({
        success: false,
        message: "Editor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: editor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */

exports.updateEditor = async (
  req,
  res
) => {
  try {
    const editor =
      await Editor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    return res.status(200).json({
      success: true,
      data: editor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */

exports.deleteEditor = async (
  req,
  res
) => {
  try {
    await Editor.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Editor Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= BLOCK ================= */

exports.blockEditor = async (
  req,
  res
) => {
  try {
    const editor =
      await Editor.findByIdAndUpdate(
        req.params.id,
        {
          status: "Block",
        },
        {
          new: true,
        }
      );

    return res.status(200).json({
      success: true,
      data: editor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= ACTIVATE ================= */

exports.activateEditor = async (
  req,
  res
) => {
  try {
    const editor =
      await Editor.findByIdAndUpdate(
        req.params.id,
        {
          status: "Active",
        },
        {
          new: true,
        }
      );

    return res.status(200).json({
      success: true,
      data: editor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};