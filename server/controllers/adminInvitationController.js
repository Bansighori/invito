const Invitation = require("../models/Invitation");

const getAdminInvitations = async (req, res) => {
  try {
    const [
      totalInvitations,
      publishedInvitations,
      draftInvitations
    ] = await Promise.all([
      Invitation.countDocuments(),

      Invitation.countDocuments({
        status: "published"
      }),

      Invitation.countDocuments({
        status: "draft"
      })
    ]);

    // Category statistics
    const categoryStats =
      await Invitation.aggregate([
        {
          $group: {
            _id: "$category",
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        }
      ]);

    // Recent invitations
    const invitations =
      await Invitation.find()
        .populate(
          "userId",
          "name email"
        )
        .populate(
          "templateId",
          "title component category isPremium"
        )
        .sort({
          createdAt: -1
        })
        .limit(20);

    res.json({
      success: true,

      stats: {
        totalInvitations,
        publishedInvitations,
        draftInvitations
      },

      categoryStats,

      invitations
    });

  } catch (error) {
    console.error(
      "Admin invitations error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to load invitations"
    });
  }
};

module.exports = {
  getAdminInvitations
};