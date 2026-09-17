const express = require("express");

const {
  createInvitation,
  getInvitations,
  getInvitationById,
  updateInvitation,
  deleteInvitation,
  publishInvitation,
  getPublicInvitation
} = require("../controllers/invitationController");

const authMiddleware =
  require("../middleware/authMiddleware");

const upload =
  require("../middleware/uploadMiddleware");
const User =
  require("../models/User");
const cloudinary =
  require("../config/cloudinary");

const Invitation =
  require("../models/Invitation");

const uploadTemplatePhoto =
  require(
    "../middleware/uploadTemplatePhoto"
  );

const router = express.Router();


// =========================
// PUBLIC ROUTE
// =========================

router.get(
  "/public/:slug",
  getPublicInvitation
);


// =========================
// GET USER INVITATIONS
// =========================

router.get(
  "/",
  authMiddleware,
  getInvitations
);


// =========================
// UPLOAD GALLERY PHOTOS
// =========================

// =====================================================
// PREMIUM PLUS - GALLERY IMAGE UPLOAD
// =====================================================

router.post(
  "/upload-gallery",
  authMiddleware,

  async (req, res, next) => {
    try {
      const User =
        require("../models/User");

      const user =
        await User.findById(
          req.user.userId
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found."
        });
      }

      const isPremiumPlus =
        user.plan === "premium_plus" &&
        user.planExpiresAt &&
        new Date(user.planExpiresAt) >
          new Date();

      if (!isPremiumPlus) {
        return res.status(403).json({
          success: false,
          code:
            "PREMIUM_PLUS_REQUIRED",
          message:
            "Photo Gallery is available only for Premium Plus users."
        });
      }

      next();

    } catch (error) {

      console.error(
        "Premium Plus check error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to verify Premium Plus access."
      });

    }
  },

  upload.array("gallery", 10),

  (req, res) => {

    try {

      if (
        !req.files ||
        req.files.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please select at least one image."
        });
      }


      const images =
        req.files.map((file) => ({

          url:
            file.path,

          // IMPORTANT
          publicId:
            file.filename ||
            file.public_id

        }));


      console.log(
        "UPLOADED CLOUDINARY IMAGES:",
        images
      );


      return res.status(200).json({

        success: true,

        message:
          "Gallery images uploaded successfully.",

        images

      });


    } catch (error) {

      console.error(
        "Gallery upload error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Failed to upload gallery images."

      });

    }

  }
);


// =========================
// CREATE INVITATION
// =========================

router.post(
  "/",
  authMiddleware,
  createInvitation
);


// =========================
// GET INVITATION BY ID
// =========================

router.get(
  "/:id",
  authMiddleware,
  getInvitationById
);


// =========================
// UPDATE INVITATION
// =========================

router.put(
  "/:id",
  authMiddleware,
  updateInvitation
);


// =========================
// DELETE INVITATION
// =========================

// ==========================================
// DELETE GALLERY IMAGE
// ==========================================

router.delete(
  "/gallery-image",
  authMiddleware,

  async (req, res) => {

    try {

      const {
        publicId
      } = req.body;


      console.log(
        "DELETE REQUEST PUBLIC ID:",
        publicId
      );


      if (!publicId) {

        return res.status(400).json({

          success: false,

          message:
            "Cloudinary publicId is required."

        });

      }


      // Delete from Cloudinary

      const result =
        await cloudinary.uploader.destroy(
          publicId,
          {
            resource_type: "image",
            invalidate: true
          }
        );


      console.log(
        "CLOUDINARY DELETE RESULT:",
        result
      );


      if (
        result.result === "ok" ||
        result.result === "not found"
      ) {

        return res.status(200).json({

          success: true,

          message:
            "Gallery image deleted successfully.",

          result:
            result.result

        });

      }


      return res.status(500).json({

        success: false,

        message:
          "Cloudinary could not delete the image.",

        result:
          result.result

      });


    } catch (error) {

      console.error(
        "CLOUDINARY DELETE ERROR:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to delete gallery image."

      });

    }

  }
);
// ============================================
// PHOTO TEMPLATE IMAGE UPLOAD
// PREMIUM PLUS ONLY
// ============================================

router.post(
  "/upload-template-photo",

  authMiddleware,

  async (req, res, next) => {

    try {

      const user =
        await User.findById(
          req.user.userId
        );


      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found."
        });

      }


      // ======================================
      // CHECK PREMIUM PLUS
      // ======================================

      const isPremiumPlus =
        user.plan === "premium_plus" &&
        user.planExpiresAt &&
        new Date(
          user.planExpiresAt
        ) > new Date();


      if (!isPremiumPlus) {

        return res.status(403).json({
          success: false,

          code:
            "PREMIUM_PLUS_REQUIRED",

          message:
            "Photo templates are available only for Premium Plus users."
        });

      }


      next();

    } catch (error) {

      console.error(
        "Template photo access error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Unable to verify Premium Plus access."
      });

    }

  },

  uploadTemplatePhoto.single(
    "photo"
  ),

  (req, res) => {

    try {

      // ======================================
      // CHECK FILE
      // ======================================

      if (!req.file) {

        return res.status(400).json({
          success: false,

          message:
            "Please select a photo."
        });

      }


      // ======================================
      // RESPONSE
      // ======================================

      return res.status(200).json({

        success: true,

        message:
          "Photo uploaded successfully.",

        image: {

          url:
            req.file.path,

          publicId:
            req.file.filename

        }

      });

    } catch (error) {

      console.error(
        "Template photo upload error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Failed to upload photo."

      });

    }

  }
);      
router.delete(
  "/:id",
  authMiddleware,
  deleteInvitation
);


// =========================
// PUBLISH INVITATION
// =========================

router.put(
  "/:id/publish",
  authMiddleware,
  publishInvitation
);
// ==========================================
// DELETE GALLERY IMAGE FROM CLOUDINARY
// ==========================================

// ==========================================
// DELETE GALLERY IMAGE FROM CLOUDINARY
// IMPORTANT: KEEP THIS BEFORE /:id
// ==========================================



module.exports = router;