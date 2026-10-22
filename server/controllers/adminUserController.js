const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select(
        "-password -emailOtp -emailOtpExpires -resetOtp -resetOtpExpires"
      )
      .sort({
        createdAt: -1
      });

    res.json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {
    console.error(
      "Get admin users error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load users"
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select(
      "-password -emailOtp -emailOtpExpires -resetOtp -resetOtpExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error("Get user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load user"
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById
};