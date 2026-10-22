const Payment = require("../models/Payment");
const User = require("../models/User");

// ==========================================
// GET ALL PAYMENTS
// ==========================================

const getAdminPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      payments
    });

  } catch (error) {
    console.error(
      "Get admin payments error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payments"
    });
  }
};


// ==========================================
// PAYMENT STATISTICS
// ==========================================

const getAdminPaymentStats = async (req, res) => {
  try {

    const [
      totalPayments,
      successfulPayments,
      failedPayments,
      pendingPayments,
      revenueResult,
      premiumResult,
      premiumPlusResult
    ] = await Promise.all([

      Payment.countDocuments(),

      Payment.countDocuments({
        status: "success"
      }),

      Payment.countDocuments({
        status: "failed"
      }),

      Payment.countDocuments({
        status: "created"
      }),

      Payment.aggregate([
        {
          $match: {
            status: "success"
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount"
            }
          }
        }
      ]),

      Payment.countDocuments({
        plan: "premium",
        status: "success"
      }),

      Payment.countDocuments({
        plan: "premium_plus",
        status: "success"
      })
    ]);


    const totalRevenue =
      revenueResult[0]?.total || 0;


    return res.json({
      success: true,

      stats: {
        totalPayments,
        successfulPayments,
        failedPayments,
        pendingPayments,
        totalRevenue,
        premiumPayments: premiumResult,
        premiumPlusPayments: premiumPlusResult
      }
    });

  } catch (error) {

    console.error(
      "Get admin payment stats error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment statistics"
    });
  }
};


// ==========================================
// GET SINGLE PAYMENT
// ==========================================

const getAdminPayment = async (req, res) => {
  try {

    const { id } = req.params;

    const payment = await Payment.findById(id)
      .populate(
        "user",
        "name email plan planExpiresAt"
      )
      .lean();

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    return res.json({
      success: true,
      payment
    });

  } catch (error) {

    console.error(
      "Get admin payment error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment"
    });
  }
};


module.exports = {
  getAdminPayments,
  getAdminPaymentStats,
  getAdminPayment
};