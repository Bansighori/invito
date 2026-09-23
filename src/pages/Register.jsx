import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  sendRegisterOtp,
  verifyRegisterOtp
} from "../api/authApi";

import {
  Sparkles,
  User,
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

import "./Register.css";


function Register() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });


  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  /* ==========================================
     HANDLE INPUT
  ========================================== */

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  /* ==========================================
     SEND OTP
  ========================================== */

  const handleSendOtp = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      await sendRegisterOtp(formData);

      setOtpSent(true);

    } catch (error) {

      console.error(
        "Send Register OTP error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to send OTP. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  /* ==========================================
     VERIFY OTP
  ========================================== */

  const handleVerifyOtp = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response =
        await verifyRegisterOtp({
          ...formData,
          otp
        });


      localStorage.setItem(
        "invitoToken",
        response.data.token
      );


      localStorage.setItem(
        "invitoUser",
        JSON.stringify(
          response.data.user
        )
      );


      navigate("/home");

    } catch (error) {

      console.error(
        "Verify Register OTP error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Invalid OTP. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  /* ==========================================
     BACK
  ========================================== */

  const handleBack = () => {

    setOtpSent(false);

    setOtp("");

    setError("");

  };


  return (

    <div className="register-page">


      {/* ==========================================
          BACKGROUND
      ========================================== */}

      <div className="register-bg register-bg-one" />

      <div className="register-bg register-bg-two" />

      <div className="register-bg register-bg-three" />


      <div className="register-sparkle sparkle-one">
        ✦
      </div>

      <div className="register-sparkle sparkle-two">
        ✧
      </div>

      <div className="register-sparkle sparkle-three">
        ✦
      </div>


      {/* ==========================================
          LEFT SHOWCASE
      ========================================== */}

      <div className="register-showcase">


        {/* Logo */}

        <div className="register-logo">

          <div className="register-logo-icon">

            <Sparkles size={23} />

          </div>

          <span>
            Invito
          </span>

        </div>


        {/* Content */}

        <div className="register-showcase-content">

          <p className="register-showcase-label">
            YOUR CELEBRATION STARTS HERE
          </p>

          <h1>

            Create.
            <br />

            <span>
              Celebrate.
            </span>

            <br />

            Remember.

          </h1>


          <p className="register-description">

            Create beautiful invitations,
            manage your guests and bring
            your special moments to life.

          </p>


          {/* Feature cards */}

          <div className="register-features">


            <div className="register-feature feature-pink">

              <div className="register-feature-icon">
                🎨
              </div>

              <div>

                <strong>
                  Beautiful Designs
                </strong>

                <small>
                  Create stunning invitations
                </small>

              </div>

            </div>


            <div className="register-feature feature-purple">

              <div className="register-feature-icon">
                👥
              </div>

              <div>

                <strong>
                  Manage Guests
                </strong>

                <small>
                  Keep track of every RSVP
                </small>

              </div>

            </div>


            <div className="register-feature feature-orange">

              <div className="register-feature-icon">
                💌
              </div>

              <div>

                <strong>
                  Share Easily
                </strong>

                <small>
                  Share your special moments
                </small>

              </div>

            </div>


          </div>

        </div>


        <div className="register-showcase-footer">
          Beautifully crafted for your special moments.
        </div>


      </div>


      {/* ==========================================
          RIGHT PANEL
      ========================================== */}

      <div className="register-panel">

        <div className="register-card">


          {/* Mobile logo */}

          <div className="register-mobile-logo">

            <div className="register-mobile-icon">
              <Sparkles size={19} />
            </div>

            <span>
              Invito
            </span>

          </div>


          {!otpSent ? (

            <>


              {/* Header */}

              <div className="register-header">

                <p className="register-label">
                  GET STARTED
                </p>

                <h2>
                  Create your account
                </h2>

                <p>
                  Start creating beautiful
                  invitations with Invito.
                </p>

              </div>


              {/* Error */}

              {error && (

                <div className="register-error">
                  {error}
                </div>

              )}


              {/* Form */}

              <form
                onSubmit={handleSendOtp}
                className="register-form"
              >


                {/* Name */}

                <div className="register-field">

                  <label>
                    Full Name
                  </label>

                  <div className="register-input">

                    <User size={18} />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />

                  </div>

                </div>


                {/* Email */}

                <div className="register-field">

                  <label>
                    Email address
                  </label>

                  <div className="register-input">

                    <Mail size={18} />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />

                  </div>

                </div>


                {/* Password */}

                <div className="register-field">

                  <label>
                    Password
                  </label>

                  <div className="register-input">

                    <Lock size={18} />

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
                      minLength="6"
                      required
                    />

                  </div>

                </div>


                {/* Submit */}

                <button
                  type="submit"
                  className="register-submit"
                  disabled={loading}
                >

                  <span>
                    {loading
                      ? "Sending OTP..."
                      : "Create Account"}
                  </span>

                  {!loading && (
                    <ArrowRight size={18} />
                  )}

                </button>


              </form>


              {/* Login */}

              <p className="register-switch">

                Already have an account?

                {" "}

                <Link to="/login">
                  Login
                </Link>

              </p>


            </>

          ) : (

            <>


              {/* OTP header */}

              <div className="register-header">

                <div className="otp-icon">

                  <ShieldCheck size={25} />

                </div>

                <p className="register-label">
                  VERIFY EMAIL
                </p>

                <h2>
                  Enter your OTP
                </h2>

                <p>

                  We sent a 4-digit OTP to

                  <strong>
                    {formData.email}
                  </strong>

                </p>

              </div>


              {/* Error */}

              {error && (

                <div className="register-error">
                  {error}
                </div>

              )}


              <form
                onSubmit={handleVerifyOtp}
                className="register-form"
              >


                {/* OTP */}

                <div className="register-field">

                  <label>
                    4-Digit OTP
                  </label>

                  <div className="register-input otp-input">

                    <ShieldCheck size={18} />

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength="4"
                      value={otp}
                      onChange={(event) => {

                        const value =
                          event.target.value.replace(
                            /\D/g,
                            ""
                          );

                        setOtp(value);

                      }}
                      placeholder="Enter 4-digit OTP"
                      required
                    />

                  </div>

                </div>


                {/* Verify */}

                <button
                  type="submit"
                  className="register-submit"
                  disabled={
                    loading ||
                    otp.length !== 4
                  }
                >

                  <span>

                    {loading
                      ? "Creating account..."
                      : "Verify & Create Account"}

                  </span>

                  {!loading && (
                    <ArrowRight size={18} />
                  )}

                </button>


                {/* Back */}

                <button
                  type="button"
                  className="register-back"
                  onClick={handleBack}
                  disabled={loading}
                >

                  <ArrowLeft size={16} />

                  Back

                </button>


              </form>


              {/* Resend */}

              <p className="register-switch">

                Didn't receive the OTP?

                {" "}

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="resend-button"
                >
                  Resend OTP
                </button>

              </p>


            </>

          )}

        </div>

      </div>

    </div>

  );

}


export default Register;