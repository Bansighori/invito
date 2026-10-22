const mongoose = require("mongoose");
require("dotenv").config();

const Plan = require("./models/Plan");

const plans = [
  {
    key: "free",
    name: "Free",
    price: 0,
    duration: "Forever",
    invitationLimit: 3,
    description:
      "Basic features for users getting started.",
    features: [
      "3 invitations total",
      "Free templates",
      "Basic invitation customization",
      "Public invitation link",
      "RSVP management"
    ],
    active: true
  },

  {
    key: "premium",
    name: "Premium",
    price: 199,
    duration: "30 Days",
    invitationLimit: "Unlimited",
    description:
      "More invitations and premium features.",
    features: [
      "Unlimited invitations",
      "All premium templates",
      "PDF download",
      "Custom invitation details",
      "RSVP management",
      "Premium features"
    ],
    active: true
  },

  {
    key: "premium_plus",
    name: "Premium Plus",
    price: 299,
    duration: "30 Days",
    invitationLimit: "Unlimited",
    description:
      "Everything in Premium with extra features.",
    features: [
      "Everything in Premium",
      "Premium Plus templates",
      "Photo gallery",
      "Guest PDF export",
      "Advanced invitation features",
      "Extra customization"
    ],
    active: true
  }
];

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const planData of plans) {
      const existingPlan = await Plan.findOne({
        key: planData.key
      });

      if (existingPlan) {
        await Plan.findOneAndUpdate(
          { key: planData.key },
          planData,
          { new: true }
        );

        console.log(
          `${planData.name} plan updated`
        );
      } else {
        await Plan.create(planData);

        console.log(
          `${planData.name} plan created`
        );
      }
    }

    console.log("Plans seeded successfully");

    await mongoose.disconnect();

  } catch (error) {
    console.error(
      "Plan seed error:",
      error
    );

    process.exit(1);
  }
};

seedPlans();