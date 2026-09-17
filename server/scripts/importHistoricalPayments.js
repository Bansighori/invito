const dotenv = require("dotenv");
const path = require("path");
const Razorpay = require("razorpay");

const connectDB = require("../config/db");
const User = require("../models/User");
const Payment = require("../models/Payment");

dotenv.config({
  path: path.join(__dirname, "../.env")
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const importHistoricalPayments = async () => {
  try {
    await connectDB();

    console.log("MongoDB connected.");

    // -----------------------------------------
    // GET USER
    // -----------------------------------------

    const email = process.argv[2];

    if (!email) {
      console.log(
        "Please provide user email."
      );

      console.log(
        "Example: node scripts/importHistoricalPayments.js your@email.com"
      );

      process.exit(1);
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      console.log(
        `User not found: ${email}`
      );

      process.exit(1);
    }

    console.log(
      `User found: ${user.name} (${user.email})`
    );

    // -----------------------------------------
    // FETCH RAZORPAY PAYMENTS
    // -----------------------------------------

    let allPayments = [];
    let skip = 0;

    const count = 100;

    while (true) {
      const response =
        await razorpay.payments.all({
          count,
          skip
        });

      const payments =
        response.items || [];

      allPayments.push(...payments);

      if (payments.length < count) {
        break;
      }

      skip += count;
    }

    console.log(
      `Total Razorpay payments found: ${allPayments.length}`
    );

    // -----------------------------------------
    // FILTER USER'S SUCCESSFUL PAYMENTS
    // -----------------------------------------

    const userPayments =
      allPayments.filter((payment) => {
        const paymentEmail =
          payment.email?.toLowerCase();

        const correctUser =
          paymentEmail ===
          user.email.toLowerCase();

        const successful =
          payment.status === "captured";

        const validAmount =
          payment.amount === 19900 ||
          payment.amount === 29900;

        return (
          correctUser &&
          successful &&
          validAmount &&
          payment.order_id
        );
      });

    console.log(
      `Matching old payments: ${userPayments.length}`
    );

    // -----------------------------------------
    // IMPORT PAYMENTS
    // -----------------------------------------

    let imported = 0;
    let skipped = 0;

    for (const razorpayPayment of userPayments) {

      // ---------------------------------------
      // CHECK PAYMENT ALREADY EXISTS
      // ---------------------------------------

      const existingPayment =
        await Payment.findOne({
          $or: [
            {
              razorpayPaymentId:
                razorpayPayment.id
            },
            {
              razorpayOrderId:
                razorpayPayment.order_id
            }
          ]
        });

      if (existingPayment) {
        console.log(
          `Skipped existing payment: ${razorpayPayment.id}`
        );

        skipped++;
        continue;
      }

      // ---------------------------------------
      // DETERMINE PLAN
      // ---------------------------------------

      let plan;

      if (razorpayPayment.amount === 19900) {
        plan = "premium";
      }

      if (razorpayPayment.amount === 29900) {
        plan = "premium_plus";
      }

      // ---------------------------------------
      // PAYMENT DATE
      // ---------------------------------------

      const paymentDate =
        new Date(
          razorpayPayment.created_at * 1000
        );

      // ---------------------------------------
      // CREATE PAYMENT RECORD
      // ---------------------------------------

      await Payment.create({
        user: user._id,

        plan,

        amount:
          razorpayPayment.amount / 100,

        currency:
          razorpayPayment.currency || "INR",

        razorpayOrderId:
          razorpayPayment.order_id,

        razorpayPaymentId:
          razorpayPayment.id,

        status: "success",

        paymentMethod:
          razorpayPayment.method || null,

        createdAt: paymentDate,

        updatedAt: paymentDate
      });

      console.log(
        `Imported: ${plan} | ₹${
          razorpayPayment.amount / 100
        } | ${razorpayPayment.id}`
      );

      imported++;
    }

    // -----------------------------------------
    // SUMMARY
    // -----------------------------------------

    console.log("");
    console.log(
      "================================="
    );
    console.log(
      "Historical Payment Import Complete"
    );
    console.log(
      "================================="
    );

    console.log(
      `Imported: ${imported}`
    );

    console.log(
      `Skipped: ${skipped}`
    );

    console.log(
      `Total matching payments: ${userPayments.length}`
    );

    console.log(
      "================================="
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "Historical Payment Import Error:",
      error
    );

    process.exit(1);
  }
};

importHistoricalPayments();