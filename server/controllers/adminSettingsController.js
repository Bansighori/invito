const Admin = require("../models/Admin");

// ==========================================
// GET ADMIN PROFILE
// ==========================================
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select(
      "-password"
    );

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Get admin profile error:", error);

    res.status(500).json({
      message: "Failed to load admin profile",
    });
  }
};

// ==========================================
// UPDATE ADMIN PROFILE
// ==========================================
const updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
      _id: { $ne: req.admin._id },
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      {
        name: name.trim(),
        email: email.toLowerCase().trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin,
    });
  } catch (error) {
    console.error("Update admin profile error:", error);

    res.status(500).json({
      message: "Failed to update admin profile",
    });
  }
};

module.exports = {
  getAdminProfile,
  updateAdminProfile,
};