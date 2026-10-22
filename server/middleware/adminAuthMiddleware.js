const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuthMiddleware = async (req, res, next) => {
  try {

    // ==========================================
    // GET AUTHORIZATION HEADER
    // ==========================================

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required"
      });
    }


    // ==========================================
    // CHECK BEARER TOKEN
    // ==========================================

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin authentication token"
      });
    }


    // ==========================================
    // GET TOKEN
    // ==========================================

    const token =
      authHeader.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Admin token missing"
      });
    }


    // ==========================================
    // VERIFY TOKEN
    // ==========================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // ==========================================
    // MAKE SURE IT IS ADMIN TOKEN
    // ==========================================

    if (decoded.type !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }


    // ==========================================
    // GET ADMIN ID
    // ==========================================

    const adminId =
      decoded.adminId || decoded.id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin token"
      });
    }


    // ==========================================
    // FIND ADMIN
    // ==========================================

    const admin =
      await Admin.findById(adminId)
        .select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found"
      });
    }


    // ==========================================
    // CHECK ACTIVE STATUS
    // ==========================================

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is disabled"
      });
    }


    // ==========================================
    // ATTACH ADMIN TO REQUEST
    // ==========================================

    req.admin = admin;

    next();

  } catch (error) {

    console.error(
      "Admin authentication error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired admin token"
    });
  }
};

module.exports = adminAuthMiddleware;