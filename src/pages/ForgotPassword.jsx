import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPassword
} from "../api/authApi";


function ForgotPassword() {

  const navigate = useNavigate();


  // ==========================================
  // FORM DATA
  // ==========================================

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");


  // ==========================================
  // STEP
  // ==========================================

  const [step, setStep] =
    useState(1);


  // ==========================================
  // ERROR + LOADING
  // ==========================================

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // SEND OTP
  // ==========================================

  const handleSendOtp = async (event) => {

    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {

      const response =
        await sendForgotPasswordOtp({
          email
        });

      setMessage(
        response.data.message
      );

      setStep(2);

    } catch (error) {

      console.error(
        "Send forgot password OTP error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to send OTP."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // VERIFY OTP
  // ==========================================

  const handleVerifyOtp = async (event) => {

    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {

      const response =
        await verifyForgotPasswordOtp({
          email,
          otp
        });

      setMessage(
        response.data.message
      );

      setStep(3);

    } catch (error) {

      console.error(
        "Verify forgot password OTP error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Invalid OTP."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // RESET PASSWORD
  // ==========================================

  const handleResetPassword = async (event) => {

    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {

      const response =
        await resetPassword({
          email,
          newPassword
        });

      setMessage(
        response.data.message
      );

      // Go to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      console.error(
        "Reset password error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to reset password."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* ==================================
            LOGO
            ================================== */}

        <div className="auth-logo">
          Invito
        </div>


        {/* ==================================
            STEP 1 - EMAIL
            ================================== */}

        {step === 1 && (

          <>

            <div className="auth-header">

              <p className="auth-label">
                PASSWORD RESET
              </p>

              <h1>
                Forgot Password?
              </h1>

              <p>
                Enter your email and we'll
                send you a 4-digit OTP.
              </p>

            </div>


            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            <form
              onSubmit={handleSendOtp}
              className="auth-form"
            >

              <div className="auth-field">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter your email"
                  required
                />

              </div>


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


            <p className="auth-switch">

              Remember your password?

              {" "}

              <Link to="/login">
                Login
              </Link>

            </p>

          </>

        )}


        {/* ==================================
            STEP 2 - OTP
            ================================== */}

        {step === 2 && (

          <>

            <div className="auth-header">

              <p className="auth-label">
                VERIFY OTP
              </p>

              <h1>
                Enter OTP
              </h1>

              <p>
                We sent a 4-digit OTP to
                <br />
                <strong>
                  {email}
                </strong>
              </p>

            </div>


            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            {message && (
              <div
                style={{
                  color: "#16a34a",
                  marginBottom: "15px"
                }}
              >
                {message}
              </div>
            )}


            <form
              onSubmit={handleVerifyOtp}
              className="auth-form"
            >

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


              <button
                type="submit"
                className="auth-submit"
                disabled={
                  loading ||
                  otp.length !== 4
                }
              >

                {loading
                  ? "Verifying..."
                  : "Verify OTP"}

              </button>

            </form>


            <p className="auth-switch">

              <button
                type="button"
                onClick={() => {

                  setStep(1);
                  setOtp("");
                  setError("");
                  setMessage("");

                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  font: "inherit"
                }}
              >
                Change email
              </button>

            </p>

          </>

        )}


        {/* ==================================
            STEP 3 - NEW PASSWORD
            ================================== */}

        {step === 3 && (

          <>

            <div className="auth-header">

              <p className="auth-label">
                NEW PASSWORD
              </p>

              <h1>
                Reset your password
              </h1>

              <p>
                Create a new password for
                your Invito account.
              </p>

            </div>


            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            {message && (
              <div
                style={{
                  color: "#16a34a",
                  marginBottom: "15px"
                }}
              >
                {message}
              </div>
            )}


            <form
              onSubmit={handleResetPassword}
              className="auth-form"
            >

              <div className="auth-field">

                <label>
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(
                      event.target.value
                    )
                  }
                  placeholder="Minimum 6 characters"
                  minLength="6"
                  required
                />

              </div>


              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >

                {loading
                  ? "Resetting Password..."
                  : "Reset Password"}

              </button>

            </form>

          </>

        )}

      </div>

    </div>
  );

}


export default ForgotPassword;