const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    console.log(
      "========== ADMIN AUTH =========="
    );

    const authHeader =
      req.headers.authorization;

    console.log(
      "AUTHORIZATION HEADER EXISTS:",
      Boolean(authHeader)
    );

    /* =====================================================
       GET BEARER TOKEN
    ===================================================== */

    const token =
      authHeader &&
      authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
      console.log(
        "ADMIN TOKEN NOT FOUND"
      );

      return res.status(401).json({
        success: false,
        message:
          "Admin authentication token not available.",
      });
    }

    /* =====================================================
       VERIFY TOKEN
    ===================================================== */

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    console.log(
      "ADMIN TOKEN VERIFIED"
    );

    console.log(
      "ADMIN ID:",
      decoded.adminId
    );

    console.log(
      "ADMIN ROLE:",
      decoded.role
    );

    /* =====================================================
       SAVE ADMIN INFORMATION
    ===================================================== */

    req.admin = decoded;

    next();
  } catch (error) {
    console.error(
      "ADMIN AUTH ERROR:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired admin token.",
    });
  }
};

module.exports = adminAuth;