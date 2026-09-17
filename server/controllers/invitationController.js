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

    // =========================================
    // VALIDATE REQUIRED FIELDS
    // =========================================

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

    // =========================================
    // CHECK PLAN EXPIRY
    // =========================================

    let currentPlan = user.plan;

    if (
      user.plan !== "free" &&
      user.planExpiresAt &&
      new Date() > new Date(user.planExpiresAt)
    ) {
      user.plan = "free";
      user.planExpiresAt = null;

      await user.save();

      currentPlan = "free";
    }

    // =========================================
    // PLAN STATUS
    // =========================================

    const isFreeUser =
      currentPlan === "free";

    const isPremiumUser =
      currentPlan === "premium";

    const isPremiumPlusUser =
      currentPlan === "premium_plus";

    console.log("CHECKING INVITATION LIMIT:", {
      plan: currentPlan,
      used: user.freeInvitationsUsed
    });

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
    // FREE USER + PREMIUM TEMPLATE
    // =========================================

    if (
      isFreeUser &&
      template.isPremium
    ) {
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
      isFreeUser &&
      user.freeInvitationsUsed >=
        FREE_INVITATION_LIMIT
    ) {
      console.log(
        "🚫 FREE INVITATION LIMIT REACHED"
      );

      return res.status(403).json({
        success: false,
        code: "FREE_LIMIT_REACHED",
        message:
          "You have used all 3 free invitations. Please upgrade to Premium to create more."
      });
    }

    // =========================================
    // CREATE INVITATION
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
    // Only Free users consume their
    // 3 free invitations.
    //
    // Premium and Premium Plus users
    // have unlimited invitations.

    if (isFreeUser) {
      user.freeInvitationsUsed += 1;

      await user.save();
    }

    // =========================================
    // RESPONSE
    // =========================================

    const response = {
      success: true,
      message:
        "Invitation created successfully",
      invitation
    };

    // Send usage information only
    // for Free users.

    if (isFreeUser) {
      response.freeUsage = {
        used:
          user.freeInvitationsUsed,

        remaining:
          FREE_INVITATION_LIMIT -
          user.freeInvitationsUsed
      };
    }

    // =========================================
    // PREMIUM INFORMATION
    // =========================================

    if (isPremiumUser) {
      response.plan = "premium";
      response.unlimited = true;
    }

    if (isPremiumPlusUser) {
      response.plan = "premium_plus";
      response.unlimited = true;
    }

    return res.status(201).json(
      response
    );

  } catch (error) {
    console.error(
      "Create invitation error:",
      error
    );

    return res.status(500).json({
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

    // =========================================
    // UPDATE TITLE
    // =========================================

    if (title !== undefined) {
      invitation.title = title;
    }

    // =========================================
    // UPDATE TEMPLATE
    // =========================================

    if (templateId !== undefined) {
      invitation.templateId =
        templateId;
    }

    // =========================================
    // UPDATE CATEGORY
    // =========================================

    if (category !== undefined) {
      invitation.category =
        category;
    }

    // =========================================
    // UPDATE DATA
    // =========================================

    if (data !== undefined) {
      invitation.data = data;
    }

    // =========================================
    // UPDATE STATUS
    // =========================================

    if (status !== undefined) {
      invitation.status = status;
    }

    await invitation.save();

    return res.json({
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

    return res.status(500).json({
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

    // =========================================
    // CREATE SLUG
    // =========================================

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

    return res.json({
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

    return res.status(500).json({
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

    return res.json({
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

    return res.status(500).json({
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

      return res.json({
        success: true,
        invitation
      });

    } catch (error) {
      console.error(
        "Get invitation error:",
        error
      );

      return res.status(500).json({
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

      return res.json({
        success: true,
        invitation
      });

    } catch (error) {
      console.error(
        "Get public invitation error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch invitation"
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

      return res.json({
        success: true,
        message:
          "Invitation deleted successfully"
      });

    } catch (error) {
      console.error(
        "Delete invitation error:",
        error
      );

      return res.status(500).json({
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