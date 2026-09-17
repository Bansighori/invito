const Razorpay = require("razorpay");
const crypto = require("crypto");

const User = require("../models/User");
const Payment = require("../models/Payment");


// =====================================================
// RAZORPAY
// =====================================================

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


// =====================================================
// HELPER — CHECK ACTIVE PLAN
// =====================================================

const hasActivePlan = (user) => {

  if (
    user.plan === "free" ||
    !user.planExpiresAt
  ) {
    return false;
  }

  return (
    new Date(user.planExpiresAt) >
    new Date()
  );

};


// =====================================================
// CREATE PREMIUM ₹199 ONE-TIME ORDER
// =====================================================

const createPremiumOrder = async (
  req,
  res
) => {

  try {

    // -----------------------------------------------
    // FIND USER
    // -----------------------------------------------

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


    // -----------------------------------------------
    // PREVENT BUYING PREMIUM PLUS WHILE ACTIVE
    // -----------------------------------------------

    if (
      user.plan === "premium_plus" &&
      user.planExpiresAt &&
      new Date(user.planExpiresAt) >
        new Date()
    ) {

      return res.status(400).json({
        success: false,
        message:
          "You already have an active Premium Plus plan.",
        plan: user.plan,
        planExpiresAt:
          user.planExpiresAt
      });

    }


    // -----------------------------------------------
    // CREATE RAZORPAY ORDER
    // -----------------------------------------------

    const options = {

      amount: 19900,

      currency: "INR",

      receipt:
        `premium_${user._id}_${Date.now()}`,

      notes: {

        userId:
          user._id.toString(),

        plan:
          "premium"

      }

    };


    const order =
      await razorpay.orders.create(
        options
      );


    // -----------------------------------------------
    // SAVE PAYMENT RECORD
    // -----------------------------------------------

    await Payment.create({

      user:
        user._id,

      plan:
        "premium",

      amount:
        199,

      currency:
        "INR",

      razorpayOrderId:
        order.id,

      status:
        "created"

    });


    // -----------------------------------------------
    // RESPONSE
    // -----------------------------------------------

    return res.status(200).json({

      success: true,

      order,

      key:
        process.env.RAZORPAY_KEY_ID

    });


  } catch (error) {

    console.error(
      "Create Premium Order Error:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Unable to create Premium payment order."

    });

  }

};


// =====================================================
// CREATE PREMIUM PLUS ₹299 ONE-TIME ORDER
// =====================================================

const createPremiumPlusOrder =
  async (
    req,
    res
  ) => {

    try {

      // -----------------------------------------------
      // FIND USER
      // -----------------------------------------------

      const user =
        await User.findById(
          req.user.userId
        );


      console.log(
        "Premium Plus Order - User:",
        user?._id,
        user?.plan
      );


      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found."
        });

      }


      // -----------------------------------------------
      // PREVENT PREMIUM PLUS PURCHASE
      // WHILE PREMIUM PLUS IS ACTIVE
      // -----------------------------------------------

      if (
        user.plan === "premium_plus" &&
        user.planExpiresAt &&
        new Date(user.planExpiresAt) >
          new Date()
      ) {

        return res.status(400).json({

          success: false,

          message:
            "You already have an active Premium Plus plan.",

          plan:
            user.plan,

          planExpiresAt:
            user.planExpiresAt

        });

      }


      // -----------------------------------------------
      // CREATE RAZORPAY ORDER
      // -----------------------------------------------

      const options = {

        amount:
          29900,

        currency:
          "INR",

        receipt:
          `premium_plus_${user._id}_${Date.now()}`,

        notes: {

          userId:
            user._id.toString(),

          plan:
            "premium_plus"

        }

      };


      console.log(
        "Creating Premium Plus Razorpay order..."
      );


      const order =
        await razorpay.orders.create(
          options
        );


      console.log(
        "Premium Plus Razorpay order created:",
        order.id
      );


      // -----------------------------------------------
      // SAVE PAYMENT
      // -----------------------------------------------

      await Payment.create({

        user:
          user._id,

        plan:
          "premium_plus",

        amount:
          299,

        currency:
          "INR",

        razorpayOrderId:
          order.id,

        status:
          "created"

      });


      // -----------------------------------------------
      // RESPONSE
      // -----------------------------------------------

      return res.status(200).json({

        success:
          true,

        order,

        key:
          process.env.RAZORPAY_KEY_ID

      });


    } catch (error) {

      console.error(
        "Create Premium Plus Order Error:",
        error
      );


      return res.status(500).json({

        success:
          false,

        message:
          "Unable to create Premium Plus payment order."

      });

    }

  };


// =====================================================
// VERIFY PREMIUM ₹199 PAYMENT
// =====================================================

const verifyPremiumPayment =
  async (
    req,
    res
  ) => {

    try {

      const {

        razorpay_payment_id,

        razorpay_order_id,

        razorpay_signature

      } = req.body;


      // -----------------------------------------------
      // CHECK REQUIRED DATA
      // -----------------------------------------------

      if (
        !razorpay_payment_id ||
        !razorpay_order_id ||
        !razorpay_signature
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Missing payment verification details."

        });

      }


      // -----------------------------------------------
      // GENERATE SIGNATURE
      // -----------------------------------------------

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
          )
          .update(
            `${razorpay_order_id}|${razorpay_payment_id}`
          )
          .digest("hex");


      // -----------------------------------------------
      // VERIFY SIGNATURE
      // -----------------------------------------------

      if (
        generatedSignature !==
        razorpay_signature
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Invalid payment signature."

        });

      }


      // -----------------------------------------------
      // FIND PAYMENT
      // -----------------------------------------------

      const payment =
        await Payment.findOne({

          razorpayOrderId:
            razorpay_order_id

        });


      if (!payment) {

        return res.status(404).json({

          success:
            false,

          message:
            "Payment record not found."

        });

      }


      // -----------------------------------------------
      // CHECK PLAN
      // -----------------------------------------------

      if (
        payment.plan !==
        "premium"
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Invalid Premium payment."

        });

      }


      // -----------------------------------------------
      // FIND USER
      // -----------------------------------------------

      const user =
        await User.findById(
          req.user.userId
        );


      if (!user) {

        return res.status(404).json({

          success:
            false,

          message:
            "User not found."

        });

      }


      // -----------------------------------------------
      // GET PAYMENT FROM RAZORPAY
      // -----------------------------------------------

      const razorpayPayment =
        await razorpay.payments.fetch(
          razorpay_payment_id
        );


      // -----------------------------------------------
      // UPDATE PAYMENT
      // -----------------------------------------------

      payment.razorpayPaymentId =
        razorpay_payment_id;

      payment.status =
        "success";

      payment.paymentMethod =
        razorpayPayment.method ||
        null;


      await payment.save();


      // -----------------------------------------------
      // SET PREMIUM FOR 30 DAYS
      // -----------------------------------------------

      const expiresAt =
        new Date();

      expiresAt.setDate(
        expiresAt.getDate() + 30
      );


      user.plan =
        "premium";

      user.planExpiresAt =
        expiresAt;


      await user.save();


      // -----------------------------------------------
      // RESPONSE
      // -----------------------------------------------

      return res.status(200).json({

        success:
          true,

        message:
          "Premium activated successfully for 30 days.",

        plan:
          user.plan,

        planExpiresAt:
          user.planExpiresAt,

        paymentId:
          razorpay_payment_id

      });


    } catch (error) {

      console.error(
        "Premium Payment Verification Error:",
        error
      );


      return res.status(500).json({

        success:
          false,

        message:
          "Unable to verify Premium payment."

      });

    }

  };


// =====================================================
// VERIFY PREMIUM PLUS ₹299 PAYMENT
// =====================================================

const verifyPremiumPlusPayment =
  async (
    req,
    res
  ) => {

    try {

      const {

        razorpay_payment_id,

        razorpay_order_id,

        razorpay_signature

      } = req.body;


      // -----------------------------------------------
      // CHECK REQUIRED DATA
      // -----------------------------------------------

      if (
        !razorpay_payment_id ||
        !razorpay_order_id ||
        !razorpay_signature
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Missing payment verification details."

        });

      }


      // -----------------------------------------------
      // GENERATE SIGNATURE
      // -----------------------------------------------

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
          )
          .update(
            `${razorpay_order_id}|${razorpay_payment_id}`
          )
          .digest("hex");


      // -----------------------------------------------
      // VERIFY SIGNATURE
      // -----------------------------------------------

      if (
        generatedSignature !==
        razorpay_signature
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Invalid payment signature."

        });

      }


      // -----------------------------------------------
      // FIND PAYMENT
      // -----------------------------------------------

      const payment =
        await Payment.findOne({

          razorpayOrderId:
            razorpay_order_id

        });


      if (!payment) {

        return res.status(404).json({

          success:
            false,

          message:
            "Payment record not found."

        });

      }


      // -----------------------------------------------
      // CHECK PLAN
      // -----------------------------------------------

      if (
        payment.plan !==
        "premium_plus"
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Invalid Premium Plus payment."

        });

      }


      // -----------------------------------------------
      // FIND USER
      // -----------------------------------------------

      const user =
        await User.findById(
          req.user.userId
        );


      if (!user) {

        return res.status(404).json({

          success:
            false,

          message:
            "User not found."

        });

      }


      // -----------------------------------------------
      // GET PAYMENT
      // -----------------------------------------------

      const razorpayPayment =
        await razorpay.payments.fetch(
          razorpay_payment_id
        );


      // -----------------------------------------------
      // UPDATE PAYMENT
      // -----------------------------------------------

      payment.razorpayPaymentId =
        razorpay_payment_id;

      payment.status =
        "success";

      payment.paymentMethod =
        razorpayPayment.method ||
        null;


      await payment.save();


      // -----------------------------------------------
      // SET PREMIUM PLUS FOR 30 DAYS
      // -----------------------------------------------

      const expiresAt =
        new Date();

      expiresAt.setDate(
        expiresAt.getDate() + 30
      );


      user.plan =
        "premium_plus";

      user.planExpiresAt =
        expiresAt;


      await user.save();


      // -----------------------------------------------
      // RESPONSE
      // -----------------------------------------------

      return res.status(200).json({

        success:
          true,

        message:
          "Premium Plus activated successfully for 30 days.",

        plan:
          user.plan,

        planExpiresAt:
          user.planExpiresAt,

        paymentId:
          razorpay_payment_id

      });


    } catch (error) {

      console.error(
        "Premium Plus Payment Verification Error:",
        error
      );


      return res.status(500).json({

        success:
          false,

        message:
          "Unable to verify Premium Plus payment."

      });

    }

  };


// =====================================================
// MARK PAYMENT AS FAILED
// =====================================================

const markPaymentFailed =
  async (
    req,
    res
  ) => {

    try {

      const {

        razorpay_order_id,

        error_description,

        error_code

      } = req.body;


      // -----------------------------------------------
      // CHECK ORDER ID
      // -----------------------------------------------

      if (
        !razorpay_order_id
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Razorpay order ID is required."

        });

      }


      // -----------------------------------------------
      // FIND PAYMENT
      // -----------------------------------------------

      const payment =
        await Payment.findOne({

          razorpayOrderId:
            razorpay_order_id,

          user:
            req.user.userId

        });


      if (!payment) {

        return res.status(404).json({

          success:
            false,

          message:
            "Payment record not found."

        });

      }


      // -----------------------------------------------
      // DON'T CHANGE SUCCESS
      // -----------------------------------------------

      if (
        payment.status ===
        "success"
      ) {

        return res.status(200).json({

          success:
            true,

          message:
            "Payment was already successful."

        });

      }


      // -----------------------------------------------
      // UPDATE FAILED PAYMENT
      // -----------------------------------------------

      payment.status =
        "failed";

      payment.failureReason =
        error_description ||
        "Payment failed.";

      payment.failureCode =
        error_code ||
        null;


      await payment.save();


      // -----------------------------------------------
      // RESPONSE
      // -----------------------------------------------

      return res.status(200).json({

        success:
          true,

        message:
          "Payment marked as failed."

      });


    } catch (error) {

      console.error(
        "Mark Payment Failed Error:",
        error
      );


      return res.status(500).json({

        success:
          false,

        message:
          "Unable to record failed payment."

      });

    }

  };


// =====================================================
// CONTINUE PENDING PAYMENT
// =====================================================

const continuePayment =
  async (
    req,
    res
  ) => {

    try {

      const {
        paymentId
      } = req.body;


      // -----------------------------------------------
      // CHECK PAYMENT ID
      // -----------------------------------------------

      if (!paymentId) {

        return res.status(400).json({

          success:
            false,

          message:
            "Payment ID is required."

        });

      }


      // -----------------------------------------------
      // FIND PAYMENT
      // -----------------------------------------------

      const payment =
        await Payment.findOne({

          _id:
            paymentId,

          user:
            req.user.userId

        });


      if (!payment) {

        return res.status(404).json({

          success:
            false,

          message:
            "Payment not found."

        });

      }


      // -----------------------------------------------
      // ONLY PENDING PAYMENT
      // -----------------------------------------------

      if (
        payment.status !==
        "created"
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "This payment cannot be continued."

        });

      }


      // -----------------------------------------------
      // GET RAZORPAY ORDER
      // -----------------------------------------------

      const order =
        await razorpay.orders.fetch(
          payment.razorpayOrderId
        );


      if (!order) {

        return res.status(404).json({

          success:
            false,

          message:
            "Razorpay order not found."

        });

      }


      // -----------------------------------------------
      // CHECK ORDER AMOUNT
      // -----------------------------------------------

      if (
        order.amount !==
        payment.amount * 100
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Payment amount does not match."

        });

      }


      // -----------------------------------------------
      // RESPONSE
      // -----------------------------------------------

      return res.status(200).json({

        success:
          true,

        order,

        key:
          process.env.RAZORPAY_KEY_ID

      });


    } catch (error) {

      console.error(
        "Continue Payment Error:",
        error
      );


      return res.status(500).json({

        success:
          false,

        message:
          "Unable to continue payment."

      });

    }

  };


// =====================================================
// GET PAYMENT HISTORY
// =====================================================

const getPaymentHistory =
  async (
    req,
    res
  ) => {

    try {

      const payments =
        await Payment.find({

          user:
            req.user.userId

        })
          .sort({
            createdAt: -1
          })
          .select(
            "plan amount currency razorpayOrderId razorpayPaymentId status failureReason failureCode paymentMethod createdAt"
          );


      return res.status(200).json({

        success:
          true,

        payments

      });


    } catch (error) {

      console.error(
        "Get Payment History Error:",
        error
      );


      return res.status(500).json({

        success:
          false,

        message:
          "Unable to get payment history."

      });

    }

  };


// =====================================================
// EXPORT
// =====================================================

module.exports = {

  createPremiumOrder,

  createPremiumPlusOrder,

  verifyPremiumPayment,

  verifyPremiumPlusPayment,

  markPaymentFailed,

  continuePayment,

  getPaymentHistory

};