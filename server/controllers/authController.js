const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");
const Otp = require("../models/Otp");

// =====================================================
// GMAIL TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// =====================================================
// GENERATE 4 DIGIT OTP
// =====================================================

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// =====================================================
// REGISTER - SEND OTP
// =====================================================

const sendRegisterOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }

    // Generate OTP
    const otp = generateOtp();

    // Delete previous registration OTP
    await Otp.deleteMany({
      email: normalizedEmail,
      purpose: "register"
    });

    // Save OTP
    await Otp.create({
      email: normalizedEmail,
      otp,
      purpose: "register",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: normalizedEmail,
      subject: "Invito - Email Verification OTP",
      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 500px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          border-radius: 12px;
        ">

          <h2 style="color: #6c5ce7;">
            Welcome to Invito 🎉
          </h2>

          <p>
            Hi ${name},
          </p>

          <p>
            Use the OTP below to verify your email address.
          </p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            text-align: center;
            padding: 20px;
            background: #f5f3ff;
            border-radius: 10px;
            margin: 20px 0;
          ">
            ${otp}
          </div>

          <p>
            This OTP will expire in <strong>5 minutes</strong>.
          </p>

          <p>
            If you did not create an Invito account, you can ignore this email.
          </p>

          <p>
            Regards,<br />
            <strong>Invito Team</strong>
          </p>

        </div>
      `
    });

    return res.status(200).json({
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("Send Register OTP Error:", error);

    return res.status(500).json({
      message: "Failed to send OTP"
    });
  }
};

// =====================================================
// VERIFY REGISTER OTP + CREATE USER
// =====================================================

const verifyRegisterOtp = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      otp
    } = req.body;

    if (!name || !email || !password || !otp) {
      return res.status(400).json({
        message: "Name, email, password and OTP are required"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find OTP
    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
      otp,
      purpose: "register",
      verified: false
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    // Check expiration
    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({
        _id: otpRecord._id
      });

      return res.status(400).json({
        message: "OTP has expired"
      });
    }

    // Check again if user exists
    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      isEmailVerified: true,
      plan: "free"
    });

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan
      }
    });

  } catch (error) {
    console.error("Verify Register OTP Error:", error);

    return res.status(500).json({
      message: "Registration failed"
    });
  }
};
// =====================================================
// FORGOT PASSWORD - SEND OTP
// =====================================================

const sendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email"
      });
    }

    // Generate 4-digit OTP
    const otp = generateOtp();

    // Delete previous forgot-password OTP
    await Otp.deleteMany({
      email: normalizedEmail,
      purpose: "forgot_password"
    });

    // Save new OTP
    await Otp.create({
      email: normalizedEmail,
      otp,
      purpose: "forgot_password",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    // Send OTP to user's email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: normalizedEmail,
      subject: "Invito - Password Reset OTP",
      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 500px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          border-radius: 12px;
        ">

          <h2 style="color: #6c5ce7;">
            Invito Password Reset
          </h2>

          <p>
            We received a request to reset your Invito password.
          </p>

          <p>
            Use the OTP below:
          </p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            text-align: center;
            padding: 20px;
            background: #f5f3ff;
            border-radius: 10px;
            margin: 20px 0;
          ">
            ${otp}
          </div>

          <p>
            This OTP will expire in <strong>5 minutes</strong>.
          </p>

          <p>
            If you did not request a password reset, you can safely ignore this email.
          </p>

          <p>
            Regards,<br />
            <strong>Invito Team</strong>
          </p>

        </div>
      `
    });

    return res.status(200).json({
      message: "Password reset OTP sent successfully"
    });

  } catch (error) {
    console.error(
      "Send Forgot Password OTP Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to send password reset OTP"
    });
  }
};

// =====================================================
// FORGOT PASSWORD - VERIFY OTP
// =====================================================

const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find OTP
    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
      otp,
      purpose: "forgot_password",
      verified: false
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    // Check expiration
    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({
        _id: otpRecord._id
      });

      return res.status(400).json({
        message: "OTP has expired"
      });
    }

    // Mark OTP as verified
    otpRecord.verified = true;

    await otpRecord.save();

    return res.status(200).json({
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error(
      "Verify Forgot Password OTP Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to verify OTP"
    });
  }
};

// =====================================================
// RESET PASSWORD
// =====================================================

const resetPassword = async (req, res) => {
  try {
    const {
      email,
      newPassword
    } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check whether OTP was verified
    const verifiedOtp = await Otp.findOne({
      email: normalizedEmail,
      purpose: "forgot_password",
      verified: true
    }).sort({
      createdAt: -1
    });

    if (!verifiedOtp) {
      return res.status(400).json({
        message: "Please verify OTP first"
      });
    }

    // Find user
    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // Update password
    user.password = hashedPassword;

    await user.save();

    // Delete used OTP
    await Otp.deleteMany({
      email: normalizedEmail,
      purpose: "forgot_password"
    });

    return res.status(200).json({
      message: "Password reset successfully"
    });

  } catch (error) {
    console.error(
      "Reset Password Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to reset password"
    });
  }
};
// =====================================================
// LOGIN
// =====================================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan
      }
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Login failed"
    });
  }
};

// =====================================================
// GOOGLE LOGIN
// =====================================================

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required"
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const googleEmail = payload.email;
    const googleName = payload.name;

    if (!googleEmail) {
      return res.status(400).json({
        message: "Google email not found"
      });
    }

    const normalizedEmail =
      googleEmail.toLowerCase().trim();

    let user = await User.findOne({
      email: normalizedEmail
    });

    // Create new user
    if (!user) {
      user = await User.create({
        name: googleName || "Invito User",
        email: normalizedEmail,
        password: await bcrypt.hash(
          Math.random().toString(36) + Date.now(),
          10
        ),
        isEmailVerified: true,
        plan: "free"
      });
    }

    // Create Invito JWT
    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan
      }
    });

  } catch (error) {
    console.error(
      "Google Login Error:",
      error
    );

    return res.status(401).json({
      message: "Google authentication failed"
    });
  }
};

// =====================================================
// UPDATE PROFILE
// =====================================================

const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (name) {
      user.name = name;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan
      }
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      message: "Failed to update profile"
    });
  }
};

// =====================================================
// CHANGE PASSWORD
// =====================================================

const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully"
    });

  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      message: "Failed to change password"
    });
  }
};

// =====================================================
// GET CURRENT USER
// =====================================================

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // ============================================
    // CHECK PLAN EXPIRY
    // ============================================

    if (
      user.plan !== "free" &&
      user.planExpiresAt &&
      new Date() > new Date(user.planExpiresAt)
    ) {
      user.plan = "free";
      user.planExpiresAt = null;

      await user.save();
    }

    // ============================================
    // RETURN CURRENT USER
    // ============================================

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        planExpiresAt: user.planExpiresAt,
        freeInvitationsUsed:
          user.freeInvitationsUsed
      }
    });

  } catch (error) {
    console.error(
      "Get Current User Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to get current user."
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  sendRegisterOtp,
  verifyRegisterOtp,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPassword,
  loginUser,
  googleLogin,
  updateProfile,
  changePassword,
  getCurrentUser
};