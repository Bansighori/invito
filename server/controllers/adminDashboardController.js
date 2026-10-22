const User = require("../models/User");
const Invitation = require("../models/Invitation");
const Guest = require("../models/Guest");
const Payment = require("../models/Payment");


// ==========================================
// ADMIN DASHBOARD STATS
// ==========================================

const getAdminDashboardStats = async (req, res) => {
  try {

    // ======================================
    // BASIC STATISTICS
    // ======================================

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


    // ======================================
    // LAST 12 MONTHS
    // ======================================

    const now = new Date();

    const startDate = new Date(
      now.getFullYear(),
      now.getMonth() - 11,
      1
    );


    // ======================================
    // MONTHLY USERS
    // ======================================

    const monthlyUsers = await User.aggregate([

      {
        $match: {
          createdAt: {
            $gte: startDate
          }
        }
      },

      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt"
            },

            month: {
              $month: "$createdAt"
            }
          },

          count: {
            $sum: 1
          }
        }
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }

    ]);


    // ======================================
    // MONTHLY INVITATIONS
    // ======================================

    const monthlyInvitations =
      await Invitation.aggregate([

        {
          $match: {
            createdAt: {
              $gte: startDate
            }
          }
        },

        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt"
              },

              month: {
                $month: "$createdAt"
              }
            },

            count: {
              $sum: 1
            }
          }
        },

        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1
          }
        }

      ]);


    // ======================================
    // MONTHLY GUESTS
    // ======================================

    const monthlyGuests =
      await Guest.aggregate([

        {
          $match: {
            createdAt: {
              $gte: startDate
            }
          }
        },

        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt"
              },

              month: {
                $month: "$createdAt"
              }
            },

            count: {
              $sum: 1
            }
          }
        },

        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1
          }
        }

      ]);


    // ======================================
    // MONTH NAMES
    // ======================================

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];


    // ======================================
    // BUILD 12 MONTHS
    // ======================================

    const monthlyUsage = [];

    for (let i = 0; i < 12; i++) {

      const date = new Date(
        now.getFullYear(),
        now.getMonth() - (11 - i),
        1
      );

      const year = date.getFullYear();

      const month = date.getMonth() + 1;


      // Find users for this month

      const userData =
        monthlyUsers.find(
          item =>
            item._id.year === year &&
            item._id.month === month
        );


      // Find invitations for this month

      const invitationData =
        monthlyInvitations.find(
          item =>
            item._id.year === year &&
            item._id.month === month
        );


      // Find guests for this month

      const guestData =
        monthlyGuests.find(
          item =>
            item._id.year === year &&
            item._id.month === month
        );


      monthlyUsage.push({

        month:
          monthNames[month - 1],

        year,

        users:
          userData?.count || 0,

        invitations:
          invitationData?.count || 0,

        guests:
          guestData?.count || 0

      });

    }


    // ======================================
    // RESPONSE
    // ======================================

    res.json({

      success: true,

      stats: {

        totalUsers,

        totalInvitations,

        totalGuests,

        totalPayments,

        premiumUsers,

        premiumPlusUsers

      },

      monthlyUsage

    });


  } catch (error) {

    console.error(
      "Admin dashboard stats error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to load admin dashboard statistics"

    });

  }
};


module.exports = {
  getAdminDashboardStats
};