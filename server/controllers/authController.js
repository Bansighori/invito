const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


const registerUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password
    } = req.body;


    // Validate required fields

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required"
      });

    }



    if (password.length < 6) {

      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters"
      });

    }

    const existingUser =
      await User.findOne({
        email
      });


    if (existingUser) {

      return res.status(400).json({
        success: false,
        message:
          "User with this email already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    const user =
      await User.create({

        name:
          name.trim(),

        email:
          email.toLowerCase().trim(),

        password:
          hashedPassword

      });


    

    const token =
      jwt.sign(
        {
          userId: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "15d"
        }
      );


    res.status(201).json({

      success: true,

      message:
        "Registration successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }

    });

  } catch (error) {

    console.error(
      "Registration error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Registration failed"

    });

  }
};



const loginUser = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;


    // Validate fields

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password are required"

      });

    }


    // Find user

    const user =
      await User.findOne({
        email:
          email.toLowerCase().trim()
      });


    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }


    // Compare password

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!isPasswordCorrect) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password"

      });

    }


    const token =
      jwt.sign(
        {
          userId: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "15d"
        }
      );


    res.status(200).json({

      success: true,

      message:
        "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }

    });

  } catch (error) {

    console.error(
      "Login error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Login failed"

    });

  }
};



const updateProfile = async (req, res) => {
  try {

    const {
      name
    } = req.body;


    // Validate name

    if (
      !name ||
      !name.trim()
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Name is required"

      });

    }


    // Find logged-in user

    const user =
      await User.findById(
        req.user.userId
      );


    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found"

      });

    }


    // Update name

    user.name =
      name.trim();


    await user.save();


    res.status(200).json({

      success: true,

      message:
        "Profile updated successfully",

      user: {

        id:
          user._id,

        name:
          user.name,

        email:
          user.email

      }

    });

  } catch (error) {

    console.error(
      "Update profile error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Failed to update profile"

    });

  }
};

const changePassword = async (req, res) => {
  try {

    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = req.body;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      return res.status(400).json({

        success: false,

        message:
          "All password fields are required"

      });

    }


    if (
      newPassword.length < 6
    ) {

      return res.status(400).json({

        success: false,

        message:
          "New password must be at least 6 characters"

      });

    }


    if (
      newPassword !== confirmPassword
    ) {

      return res.status(400).json({

        success: false,

        message:
          "New passwords do not match"

      });

    }


    const user =
      await User.findById(
        req.user.userId
      );


    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found"

      });

    }

    const isCurrentPasswordCorrect =
      await bcrypt.compare(
        currentPassword,
        user.password
      );


    if (!isCurrentPasswordCorrect) {

      return res.status(400).json({

        success: false,

        message:
          "Current password is incorrect"

      });

    }



    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );


    user.password =
      hashedPassword;


    await user.save();



    res.status(200).json({

      success: true,

      message:
        "Password changed successfully"

    });

  } catch (error) {

    console.error(
      "Change password error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Failed to change password"

    });

  }
};



module.exports = {

  registerUser,

  loginUser,

  updateProfile,

  changePassword

};