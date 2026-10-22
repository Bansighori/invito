const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// ==========================================
// AVAILABLE ADMIN ROLES
// ==========================================

const ADMIN_ROLES = [
  "super_admin",
  "user_admin",
  "template_admin",
  "payment_admin",
  "support_admin"
];
0

// ==========================================
// GET ALL ROLES
// GET /api/admin/roles
// ==========================================

const getRoles = async (req, res) => {
  try {
    return res.json({
      success: true,
      roles: ADMIN_ROLES
    });

  } catch (error) {
    console.error(
      "Get roles error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load admin roles"
    });
  }
};


// ==========================================
// GET ALL ADMINS
// ==========================================

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      admins
    });

  } catch (error) {
    console.error(
      "Get all admins error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load admins"
    });
  }
};


// ==========================================
// GET SINGLE ADMIN
// ==========================================

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id)
      .select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    return res.json({
      success: true,
      admin
    });

  } catch (error) {
    console.error(
      "Get admin error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load admin"
    });
  }
};


// ==========================================
// CREATE ADMIN
// ==========================================

const createAdmin = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, password and role are required"
      });
    }

    if (!ADMIN_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid admin role"
      });
    }

    const existingAdmin =
      await Admin.findOne({
        email: email.toLowerCase().trim()
      });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message:
          "An admin with this email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
      isActive: true
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        createdAt: admin.createdAt
      }
    });

  } catch (error) {
    console.error(
      "Create admin error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create admin"
    });
  }
};


// ==========================================
// UPDATE ADMIN ROLE
// ==========================================

const updateAdminRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!ADMIN_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid admin role"
      });
    }

    const admin =
      await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    // Prevent removing the last Super Admin
    if (
      admin.role === "super_admin" &&
      role !== "super_admin"
    ) {
      const superAdminCount =
        await Admin.countDocuments({
          role: "super_admin",
          isActive: true
        });

      if (superAdminCount <= 1) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot change the role of the last active Super Admin"
        });
      }
    }

    admin.role = role;

    await admin.save();

    return res.json({
      success: true,
      message:
        "Admin role updated successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive
      }
    });

  } catch (error) {
    console.error(
      "Update admin role error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update admin role"
    });
  }
};


// ==========================================
// ACTIVATE / DEACTIVATE ADMIN
// ==========================================

const updateAdminStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const admin =
      await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    // Prevent deactivating the last Super Admin
    if (
      admin.role === "super_admin" &&
      isActive === false
    ) {
      const activeSuperAdmins =
        await Admin.countDocuments({
          role: "super_admin",
          isActive: true
        });

      if (activeSuperAdmins <= 1) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot deactivate the last active Super Admin"
        });
      }
    }

    admin.isActive = Boolean(isActive);

    await admin.save();

    return res.json({
      success: true,
      message:
        admin.isActive
          ? "Admin activated successfully"
          : "Admin deactivated successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive
      }
    });

  } catch (error) {
    console.error(
      "Update admin status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update admin status"
    });
  }
};


// ==========================================
// DELETE ADMIN
// ==========================================

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting yourself
    if (
      req.admin._id.toString() === id
    ) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot delete your own admin account"
      });
    }

    const admin =
      await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    // Prevent deleting the last Super Admin
    if (admin.role === "super_admin") {
      const superAdminCount =
        await Admin.countDocuments({
          role: "super_admin",
          isActive: true
        });

      if (superAdminCount <= 1) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot delete the last active Super Admin"
        });
      }
    }

    await Admin.findByIdAndDelete(id);

    return res.json({
      success: true,
      message:
        "Admin deleted successfully"
    });

  } catch (error) {
    console.error(
      "Delete admin error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete admin"
    });
  }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getRoles,
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdminRole,
  updateAdminStatus,
  deleteAdmin
};