const jwt = require("jsonwebtoken");

const authorAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // console.log(
    //   "REQUEST:",
    //   req.method,
    //   req.originalUrl
    // );
    // console.log(
    //   "AUTH HEADER:",
    //   authHeader ? "AVAILABLE" : "MISSING"
    // );

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Author token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "author") {
      return res.status(403).json({
        success: false,
        message: "Author access only",
      });
    }

    req.author = decoded;

    // console.log("AUTHOR ID:", req.author.id);

    next();
  } catch (error) {
    console.log(
      "AUTHOR AUTH ERROR:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid author token",
    });
  }
};

module.exports = authorAuth;