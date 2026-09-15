const Invitation = require("../models/Invitation");
const Template = require("../models/Template");
const User = require("../models/User");

// =========================================
// CREATE INVITATION
// =========================================

const createInvitation = async (req, res) => {
  try {
    const {
      title,
      templateId,
      category,
      data,
      status
    } = req.body;

    // Validate required fields
    if (!title || !templateId || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Title, templateId and category are required"
      });
    }

    // =========================================
    // GET LOGGED-IN USER
    // =========================================

    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    console.log("CHECKING LIMIT:", {
  plan: user.plan,
  used: user.freeInvitationsUsed
});

if (user.plan !== "premium" && user.freeInvitationsUsed >= 3) {
  console.log("🚫 FREE LIMIT REACHED");

  return res.status(403).json({
    success: false,
    message: "Free users can create only 3 invitations. Upgrade to premium.",
    code: "FREE_LIMIT_REACHED"
  });
}

 
    // =========================================
    // GET TEMPLATE
    // =========================================

    const template =
      await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    // =========================================
    // PREMIUM USER
    // =========================================

    if (user.plan === "premium") {

      const invitation =
        await Invitation.create({
          title,
          templateId,
          category,
          data: data || {},
          status: status || "draft",

          userId: req.user.userId
        });

      return res.status(201).json({
        success: true,
        message:
          "Invitation created successfully",
        invitation
      });
    }

    // =========================================
    // FREE USER + PREMIUM TEMPLATE
    // =========================================

    if (template.isPremium) {
      return res.status(403).json({
        success: false,
        code: "PREMIUM_TEMPLATE",
        message:
          "This is a premium template. Please upgrade to premium to use it."
      });
    }

    // =========================================
    // FREE USER LIMIT
    // =========================================

    const FREE_INVITATION_LIMIT = 3;

    if (
      user.freeInvitationsUsed >=
      FREE_INVITATION_LIMIT
    ) {
      return res.status(403).json({
        success: false,
        code: "FREE_LIMIT_REACHED",
        message:
          "You have used all 3 free invitations. Please upgrade to premium to create more."
      });
    }

    // =========================================
    // CREATE FREE INVITATION
    // =========================================

    const invitation =
      await Invitation.create({
        title,
        templateId,
        category,
        data: data || {},
        status: status || "draft",

        userId: req.user.userId
      });

    // =========================================
    // INCREMENT FREE USAGE
    // =========================================

    user.freeInvitationsUsed += 1;

    await user.save();

    // =========================================
    // SEND RESPONSE
    // =========================================

    res.status(201).json({
      success: true,
      message:
        "Invitation created successfully",
      invitation,

      freeUsage: {
        used:
          user.freeInvitationsUsed,

        remaining:
          FREE_INVITATION_LIMIT -
          user.freeInvitationsUsed
      }
    });

  } catch (error) {
    console.error(
      "Create invitation error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create invitation"
    });
  }
};


// =========================================
// UPDATE INVITATION
// =========================================

const updateInvitation = async (req, res) => {
  try {
    const {
      title,
      templateId,
      category,
      data,
      status
    } = req.body;

    const invitation =
      await Invitation.findOne({
        _id: req.params.id,
        userId: req.user.userId
      });

    if (!invitation) {
      return res.status(404).json({
        success: false,
        message:
          "Invitation not found"
      });
    }

    if (title !== undefined) {
      invitation.title = title;
    }

    if (templateId !== undefined) {
      invitation.templateId =
        templateId;
    }

    if (category !== undefined) {
      invitation.category =
        category;
    }

    if (data !== undefined) {
      invitation.data = data;
    }

    if (status !== undefined) {
      invitation.status = status;
    }

    await invitation.save();

    res.json({
      success: true,
      message:
        "Invitation updated successfully",
      invitation
    });

  } catch (error) {
    console.error(
      "Update invitation error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update invitation"
    });
  }
};


// =========================================
// PUBLISH INVITATION
// =========================================

const publishInvitation = async (req, res) => {
  try {
    const invitation =
      await Invitation.findOne({
        _id: req.params.id,
        userId: req.user.userId
      });

    if (!invitation) {
      return res.status(404).json({
        success: false,
        message:
          "Invitation not found"
      });
    }

    const baseSlug =
      invitation.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const slug =
      `${baseSlug}-${invitation._id
        .toString()
        .slice(-6)}`;

    invitation.slug = slug;

    invitation.status =
      "published";

    await invitation.save();

    res.json({
      success: true,
      message:
        "Invitation published successfully",

      invitation,

      publicUrl:
        `/invite/${slug}`
    });

  } catch (error) {
    console.error(
      "Publish invitation error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to publish invitation"
    });
  }
};


// =========================================
// GET ALL INVITATIONS
// =========================================

const getInvitations = async (req, res) => {
  try {
    const invitations =
      await Invitation.find({
        userId: req.user.userId
      })
        .populate(
          "templateId",
          "title category component"
        )
        .sort({
          createdAt: -1
        });

    res.json({
      success: true,

      count:
        invitations.length,

      invitations
    });

  } catch (error) {
    console.error(
      "Get invitations error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch invitations"
    });
  }
};


// =========================================
// GET SINGLE INVITATION
// =========================================

const getInvitationById =
  async (req, res) => {
    try {
      const invitation =
        await Invitation.findOne({
          _id: req.params.id,
          userId: req.user.userId
        })
          .populate(
            "templateId"
          );

      if (!invitation) {
        return res.status(404).json({
          success: false,
          message:
            "Invitation not found"
        });
      }

      res.json({
        success: true,
        invitation
      });

    } catch (error) {
      console.error(
        "Get invitation error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch invitation"
      });
    }
  };


// =========================================
// GET PUBLIC INVITATION BY SLUG
// =========================================

const getPublicInvitation =
  async (req, res) => {
    try {
      const invitation =
        await Invitation.findOne({
          slug: req.params.slug,
          status: "published"
        })
          .populate(
            "templateId"
          );

      if (!invitation) {
        return res.status(404).json({
          success: false,
          message:
            "Published invitation not found"
        });
      }

      res.json({
        success: true,
        invitation
      });

    } catch (error) {
      console.error(
        "Get public invitation error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch public invitation"
      });
    }
  };


// =========================================
// DELETE INVITATION
// =========================================

const deleteInvitation =
  async (req, res) => {
    try {
      const invitation =
        await Invitation.findOneAndDelete({
          _id: req.params.id,
          userId: req.user.userId
        });

      if (!invitation) {
        return res.status(404).json({
          success: false,
          message:
            "Invitation not found"
        });
      }

      res.json({
        success: true,
        message:
          "Invitation deleted successfully"
      });

    } catch (error) {
      console.error(
        "Delete invitation error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete invitation"
      });
    }
  };


// =========================================
// EXPORT CONTROLLERS
// =========================================

module.exports = {
  createInvitation,
  updateInvitation,
  publishInvitation,
  getInvitations,
  getInvitationById,
  getPublicInvitation,
  deleteInvitation
};