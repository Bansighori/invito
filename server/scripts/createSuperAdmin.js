require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const email = "admin@invito.com";
    const password = "Admin@12345";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create admin
    const admin = await Admin.create({
      name: "Invito Admin",
      email,
      password: hashedPassword,
      role: "super_admin",
      isActive: true
    });

    console.log("");
    console.log("================================");
    console.log("Super Admin created successfully");
    console.log("================================");
    console.log("Name:", admin.name);
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("Password:", password);
    console.log("================================");

    process.exit(0);

  } catch (error) {

    console.error(
      "Error creating admin:",
      error.message
    );

    process.exit(1);
  }
};

createSuperAdmin();