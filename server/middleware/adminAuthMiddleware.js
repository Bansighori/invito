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
    // GET TOKEN
    // ==========================================

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin authentication token"
      });
    }

    const token =
      authHeader.split(" ")[1];


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
    // MAKE SURE TOKEN IS ADMIN TOKEN
    // ==========================================

    if (decoded.type !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }


    // ==========================================
    // FIND ADMIN
    // ==========================================

    const admin = await Admin.findById(
      decoded.adminId || decoded.id
    ).select(
      "-password"
    );


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
      message: "Invalid or expired admin token"
    });
  }
};


module.exports = adminAuthMiddleware;