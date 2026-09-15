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


function Register() {

  const navigate = useNavigate();


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });


  // ==========================================
  // OTP
  // ==========================================

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);


  // ==========================================
  // ERROR + LOADING
  // ==========================================

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

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


  // ==========================================
  // SEND REGISTER OTP
  // ==========================================

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


  // ==========================================
  // VERIFY OTP + REGISTER
  // ==========================================

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


      // ========================================
      // SAVE JWT
      // ========================================

      localStorage.setItem(
        "invitoToken",
        response.data.token
      );


      // ========================================
      // SAVE USER
      // ========================================

      localStorage.setItem(
        "invitoUser",
        JSON.stringify(
          response.data.user
        )
      );


      // ========================================
      // GO TO DASHBOARD
      // ========================================

      navigate("/dashboard");

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


  // ==========================================
  // BACK TO REGISTER FORM
  // ==========================================

  const handleBack = () => {

    setOtpSent(false);
    setOtp("");
    setError("");

  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Logo */}

        <div className="auth-logo">
          Invito
        </div>


        {/* ==================================
            REGISTER FORM
            ================================== */}

        {!otpSent ? (

          <>

            <div className="auth-header">

              <p className="auth-label">
                GET STARTED
              </p>

              <h1>
                Create your account
              </h1>

              <p>
                Start creating beautiful invitations
                with Invito.
              </p>

            </div>


            {/* Error */}

            {error && (

              <div className="auth-error">
                {error}
              </div>

            )}


            <form
              onSubmit={handleSendOtp}
              className="auth-form"
            >

              {/* Name */}

              <div className="auth-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />

              </div>


              {/* Email */}

              <div className="auth-field">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>


              {/* Password */}

              <div className="auth-field">

                <label>
                  Password
                </label>

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


              {/* Send OTP */}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >

                {loading
                  ? "Sending OTP..."
                  : "Send OTP"}

              </button>

            </form>


            {/* Login */}

            <p className="auth-switch">

              Already have an account?

              {" "}

              <Link to="/login">
                Login
              </Link>

            </p>

          </>

        ) : (

          /* ==================================
             OTP FORM
             ================================== */

          <>

            <div className="auth-header">

              <p className="auth-label">
                VERIFY EMAIL
              </p>

              <h1>
                Enter OTP
              </h1>

              <p>
                We sent a 4-digit OTP to
                <br />
                <strong>
                  {formData.email}
                </strong>
              </p>

            </div>


            {/* Error */}

            {error && (

              <div className="auth-error">
                {error}
              </div>

            )}


            <form
              onSubmit={handleVerifyOtp}
              className="auth-form"
            >

              {/* OTP */}

              <div className="auth-field">

                <label>
                  4-Digit OTP
                </label>

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


              {/* Verify */}

              <button
                type="submit"
                className="auth-submit"
                disabled={
                  loading ||
                  otp.length !== 4
                }
              >

                {loading
                  ? "Creating account..."
                  : "Verify & Create Account"}

              </button>


              {/* Back */}

              <button
                type="button"
                className="auth-submit"
                onClick={handleBack}
                disabled={loading}
              >
                Back
              </button>

            </form>


            {/* Resend */}

            <p className="auth-switch">

              Didn't receive the OTP?

              {" "}

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "inherit",
                  font: "inherit",
                  fontWeight: "600"
                }}
              >
                Resend OTP
              </button>

            </p>

          </>

        )}

      </div>

    </div>
  );

}


export default Register;