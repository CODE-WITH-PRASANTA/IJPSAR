const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // console.log("Authorization:", req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];

    // console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("Decoded:", decoded);

    req.editor = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};