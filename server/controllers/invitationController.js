const Invitation = require("../models/Invitation");

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

    // Create invitation
    const invitation =
      await Invitation.create({
        title,
        templateId,
        category,
        data: data || {},
        status: status || "draft",

        // IMPORTANT:
        // Attach invitation to logged-in user
        userId: req.user.userId
      });

    // Send response
    res.status(201).json({
      success: true,
      message:
        "Invitation created successfully",
      invitation
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

    // Find invitation belonging to logged-in user
    const invitation =
      await Invitation.findOne({
        _id: req.params.id,
        userId: req.user.userId
      });

    // Check if invitation exists
    if (!invitation) {
      return res.status(404).json({
        success: false,
        message:
          "Invitation not found"
      });
    }

    // Update only provided values
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

    // Save updated invitation
    await invitation.save();

    // Send response
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
    // Find invitation belonging to logged-in user
    const invitation =
      await Invitation.findOne({
        _id: req.params.id,
        userId: req.user.userId
      });

    // Check if invitation exists
    if (!invitation) {
      return res.status(404).json({
        success: false,
        message:
          "Invitation not found"
      });
    }

    // Create URL-friendly slug
    const baseSlug =
      invitation.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // Add last 6 characters of MongoDB ID
    // so every invitation gets a unique URL
    const slug =
      `${baseSlug}-${invitation._id
        .toString()
        .slice(-6)}`;

    // Save slug
    invitation.slug = slug;

    // Change status
    invitation.status =
      "published";

    // Save invitation
    await invitation.save();

    // Send response
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
    // IMPORTANT:
    // Only get invitations of logged-in user
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

      // Only allow owner to access invitation
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

      // PUBLIC ROUTE
      // No authentication required here
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

      // IMPORTANT:
      // Delete only if invitation belongs
      // to logged-in user
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