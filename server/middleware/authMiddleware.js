const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log("========== AUTH DEBUG ==========");

    const authHeader = req.headers.authorization;

    console.log("Authorization:", authHeader ? "TOKEN RECEIVED" : "NO TOKEN");
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication format"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded JWT:", decoded);

    const userId =
      decoded.id ||
      decoded._id ||
      decoded.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID missing from token"
      });
    }

    req.user = {
      _id: userId,
      id: userId,
      userId: userId
    };

    console.log(
      "Authenticated user:",
      userId
    );

    console.log("================================");

    next();

  } catch (error) {

    console.error(
      "Authentication error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = authMiddleware;