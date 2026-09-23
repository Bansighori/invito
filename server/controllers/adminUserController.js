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

module.exports = {
  getAllUsers
};