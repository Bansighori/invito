const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const createAdminNotification =
  require("../utils/createAdminNotification");


// ==========================================
// ADMIN LOGIN
// ==========================================

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find admin
    const admin = await Admin.findOne({
      email: email.trim().toLowerCase()
    });
    console.log("Login email:", email.trim().toLowerCase());
console.log("Admin found:", !!admin);

if (admin) {
  console.log("Admin role:", admin.role);
  console.log("Admin active:", admin.isActive);
}

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials"
      });
    }

    // Check active status
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is disabled"
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );
    console.log("Password matches:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials"
      });
    }
    console.log("Login email:", email.trim().toLowerCase());
console.log("Admin found:", !!admin);

if (admin) {
  console.log("Admin role:", admin.role);
  console.log("Admin active:", admin.isActive);

  const passwordMatch = await bcrypt.compare(
    password,
    admin.password
  );

  console.log("Password matches:", passwordMatch);
}

    // Create admin JWT
    const token = jwt.sign(
      {
        id: admin._id,
        adminId: admin._id,
        role: admin.role,
        type: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );
    await createAdminNotification({
  title: "Admin Login 🔐",
  message: `${admin.email} logged in to the Invito admin panel.`,
  type: "security",
  link: "/admin/dashboard"
});

    return res.json({
      success: true,
      message: "Admin login successful",

      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {

    console.error(
      "Admin login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = {
  adminLogin
};