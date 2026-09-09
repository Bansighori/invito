const express = require("express");

const {
  createGuest,
  getGuestsByInvitation
} = require("../controllers/guestController");

const router = express.Router();


// Submit RSVP
router.post(
  "/",
  createGuest
);


// Get guests for an invitation
router.get(
  "/invitation/:invitationId",
  getGuestsByInvitation
);


module.exports = router;