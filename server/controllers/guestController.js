const Guest = require("../models/Guest");
const Invitation = require("../models/Invitation");


const createGuest = async (req, res) => {
  try {

    const {
      invitationId,
      name,
      attendance,
      numberOfGuests,
      message
    } = req.body;


    // Check invitation
    const invitation =
      await Invitation.findById(
        invitationId
      );

    if (!invitation) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found"
      });
    }

    if (
      invitation.status !== "published"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "RSVP is not available for this invitation"
      });
    }


    // Validate name
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Guest name is required"
      });
    }

    if (
      ![
        "yes",
        "no",
        "maybe"
      ].includes(attendance)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid attendance status"
      });
    }


    // Create guest
    const guest =
      await Guest.create({
        invitationId,
        name: name.trim(),
        attendance,
        numberOfGuests:
          Number(numberOfGuests) || 1,
        message:
          message?.trim() || ""
      });


    res.status(201).json({
      success: true,
      message:
        "RSVP submitted successfully",
      guest
    });

  } catch (error) {

    console.error(
      "Create guest error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to submit RSVP"
    });

  }
};



const getGuestsByInvitation =
  async (req, res) => {

    try {

      const guests =
        await Guest.find({
          invitationId:
            req.params.invitationId
        })
        .sort({
          createdAt: -1
        });


      res.json({
        success: true,
        guests
      });

    } catch (error) {

      console.error(
        "Get guests error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch guests"
      });

    }

  };


module.exports = {
  createGuest,
  getGuestsByInvitation
};