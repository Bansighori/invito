const User = require("../models/User");
const Invitation = require("../models/Invitation");
const Guest = require("../models/Guest");
const Payment = require("../models/Payment");

const getAdminDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalInvitations,
      totalGuests,
      totalPayments,
      premiumUsers,
      premiumPlusUsers
    ] = await Promise.all([
      User.countDocuments(),

      Invitation.countDocuments(),

      Guest.countDocuments(),

      Payment.countDocuments(),

      User.countDocuments({
        plan: "premium"
      }),

      User.countDocuments({
        plan: "premium_plus"
      })
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalInvitations,
        totalGuests,
        totalPayments,
        premiumUsers,
        premiumPlusUsers
      }
    });

  } catch (error) {
    console.error(
      "Admin dashboard stats error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard statistics"
    });
  }
};

module.exports = {
  getAdminDashboardStats
};