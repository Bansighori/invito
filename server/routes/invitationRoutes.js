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

const router = express.Router();


// =========================
// PUBLIC ROUTE
// =========================
router.get(
  "/public/:slug",
  getPublicInvitation
);



// Get logged-in user's invitations
router.get(
  "/",
  authMiddleware,
  getInvitations
);


// Create invitation
router.post(
  "/",
  authMiddleware,
  createInvitation
);


// Get invitation by ID
router.get(
  "/:id",
  authMiddleware,
  getInvitationById
);


// Update invitation
router.put(
  "/:id",
  authMiddleware,
  updateInvitation
);


// Delete invitation
router.delete(
  "/:id",
  authMiddleware,
  deleteInvitation
);


// Publish invitation
router.put(
  "/:id/publish",
  authMiddleware,
  publishInvitation
);


module.exports = router;