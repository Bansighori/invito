const User = require("../models/User");

const allowRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      // Authentication check
      if (!req.user?.id) {
        return res.status(401).json({
          success: false,
          message: "Authentication required"
        });
      }

      // Get current user from database
      const user = await User.findById(req.user.id).select(
        "_id name email role"
      );

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }

      // Role check
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }

      // Store user for next middleware/controller
      req.admin = user;

      next();

    } catch (error) {
      console.error("Admin authorization error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  };
};

module.exports = allowRoles;