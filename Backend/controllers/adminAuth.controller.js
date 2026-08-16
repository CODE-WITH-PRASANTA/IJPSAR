const Admin = require("../models/admin.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================================================
   CREATE ADMIN
========================================================= */

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    /* =====================================================
       ONLY ONE ADMIN
    ===================================================== */

    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message:
          "Admin account already exists. Only one admin is allowed.",
      });
    }

    /* =====================================================
       HASH PASSWORD
    ===================================================== */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    /* =====================================================
       CREATE ADMIN
    ===================================================== */

    const admin = await Admin.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(
      "CREATE ADMIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


/* =========================================================
   ADMIN LOGIN
========================================================= */

exports.adminLogin = async (req, res) => {
  try {
    console.log(
      "========== ADMIN LOGIN =========="
    );

    const { email, password } = req.body;

    console.log(
      "LOGIN EMAIL:",
      email
    );

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    /* =====================================================
       FIND ADMIN
    ===================================================== */

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    /* =====================================================
       CHECK PASSWORD
    ===================================================== */

    const isPasswordMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    /* =====================================================
       CREATE JWT
    ===================================================== */

    const token = jwt.sign(
      {
        adminId: admin._id,
        role: admin.role || "Admin",
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log(
      "ADMIN TOKEN CREATED:",
      Boolean(token)
    );

    /* =====================================================
       COOKIE
    ===================================================== */

    res.cookie(
      "adminToken",
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          process.env.NODE_ENV ===
          "production"
            ? "none"
            : "lax",

        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      }
    );

    /* =====================================================
       ADMIN RESPONSE DATA
    ===================================================== */

    const adminData = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role || "Admin",
    };

    /* =====================================================
       IMPORTANT

       RETURN TOKEN TO FRONTEND

       Frontend will save it as:

       localStorage.adminToken
    ===================================================== */

    return res.status(200).json({
      success: true,

      message:
        "Admin login successful",

      admin: adminData,

      token,
    });
  } catch (error) {
    console.error(
      "ADMIN LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


/* =========================================================
   ADMIN LOGOUT
========================================================= */

exports.adminLogout = async (req, res) => {
  try {
    res.clearCookie(
      "adminToken",
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          process.env.NODE_ENV ===
          "production"
            ? "none"
            : "lax",
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Admin logout successful",
    });
  } catch (error) {
    console.error(
      "ADMIN LOGOUT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/* =========================================================
   GET ADMIN PROFILE
========================================================= */

exports.getAdminProfile = async (
  req,
  res
) => {
  try {
    /* =====================================================
       adminAuth creates:

       req.admin = decoded JWT

       decoded contains:

       adminId
       role
       email
    ===================================================== */

    if (!req.admin?.adminId) {
      return res.status(401).json({
        success: false,
        message:
          "Admin authentication information not found.",
      });
    }

    const admin =
      await Admin.findById(
        req.admin.adminId
      ).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error(
      "GET ADMIN PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


/* =========================================================
   CHECK ADMIN EXISTS
========================================================= */

exports.adminExists = async (
  req,
  res
) => {
  try {
    const admin =
      await Admin.findOne();

    return res.status(200).json({
      success: true,
      exists: Boolean(admin),
    });
  } catch (error) {
    console.error(
      "ADMIN EXISTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};