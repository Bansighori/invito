
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";

import { login } from "../api/authApi";
import api from "../api/axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Return to the page requested before login.
  const getUserDestination = () => {
    const from = location.state?.from;

    if (
      from?.pathname &&
      from.pathname !== "/login" &&
      !from.pathname.startsWith("/admin")
    ) {
      return `${from.pathname}${from.search || ""}${from.hash || ""}`;
    }

    return "/dashboard";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const credentials = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      // Check admin login first.
      try {
        const adminResponse = await api.post(
          "/admin/auth/login",
          credentials
        );

        if (
          adminResponse.data.success &&
          adminResponse.data.token &&
          adminResponse.data.admin
        ) {
          localStorage.removeItem("invitoToken");
          localStorage.removeItem("invitoUser");

          localStorage.setItem(
            "invitoAdminToken",
            adminResponse.data.token
          );

          localStorage.setItem(
            "invitoAdmin",
            JSON.stringify(adminResponse.data.admin)
          );

          navigate("/admin/dashboard", { replace: true });
          return;
        }
      } catch (adminError) {
        // If admin login fails, try regular user login.
        console.log(
          "Admin login failed:",
          adminError.response?.data?.message
        );
      }

      // Regular user login.
      const userResponse = await login(credentials);

      if (!userResponse.data?.token || !userResponse.data?.user) {
        throw new Error("Login response is missing user information.");
      }

      localStorage.removeItem("invitoAdminToken");
      localStorage.removeItem("invitoAdmin");

      localStorage.setItem("invitoToken", userResponse.data.token);
      localStorage.setItem(
        "invitoUser",
        JSON.stringify(userResponse.data.user)
      );

      navigate(getUserDestination(), { replace: true });
    } catch (userError) {
      console.error("Login failed:", userError);

      setError(
        userError.response?.data?.message ||
          userError.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setError("");

      if (!credentialResponse?.credential) {
        setError("Google login failed. Please try again.");
        return;
      }

      const response = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      if (!response.data?.token || !response.data?.user) {
        throw new Error("Google login response is incomplete.");
      }

      localStorage.removeItem("invitoAdminToken");
      localStorage.removeItem("invitoAdmin");

      localStorage.setItem("invitoToken", response.data.token);
      localStorage.setItem(
        "invitoUser",
        JSON.stringify(response.data.user)
      );

      navigate(getUserDestination(), { replace: true });
    } catch (googleError) {
      console.error("Google Login Error:", googleError);

      setError(
        googleError.response?.data?.message ||
          googleError.message ||
          "Google login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="login-bg-shape login-bg-one" />
      <div className="login-bg-shape login-bg-two" />
      <div className="login-bg-shape login-bg-three" />

      <div className="login-sparkle sparkle-one">✦</div>
      <div className="login-sparkle sparkle-two">✧</div>
      <div className="login-sparkle sparkle-three">✦</div>

      {/* Left showcase */}
      <div className="login-showcase">
        <Link to="/home" className="showcase-logo">
          <div className="showcase-logo-icon">
            <Sparkles size={23} />
          </div>
          <span>Invito</span>
        </Link>

        <div className="showcase-content">
          <p className="showcase-label">
            CREATE • CELEBRATE • SHARE
          </p>

          <h1>
            Your special moments
            <span> deserve beautiful invitations.</span>
          </h1>

          <p className="showcase-description">
            Design elegant invitations, manage your guests
            and make every celebration memorable.
          </p>

          <div className="showcase-cards">
            <div className="mini-card mini-card-one">
              <div className="mini-card-icon">💍</div>
              <div>
                <strong>Wedding</strong>
                <small>Elegant moments</small>
              </div>
            </div>

            <div className="mini-card mini-card-two">
              <div className="mini-card-icon">🎂</div>
              <div>
                <strong>Birthday</strong>
                <small>Celebrate together</small>
              </div>
            </div>

            <div className="mini-card mini-card-three">
              <div className="mini-card-icon">🎉</div>
              <div>
                <strong>Events</strong>
                <small>Make it memorable</small>
              </div>
            </div>
          </div>
        </div>

        <div className="showcase-footer">
          Beautifully crafted for your special moments.
        </div>
      </div>

      {/* Login panel */}
      <div className="login-panel">
        <div className="login-card">
          <div className="mobile-login-logo">
            <div className="mobile-logo-icon">
              <Sparkles size={19} />
            </div>
            <span>Invito</span>
          </div>

          <div className="login-header">
            <p className="login-label">WELCOME BACK</p>
            <h2>Login to Invito</h2>
            <p>Continue creating beautiful invitations.</p>
          </div>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="login-email">Email address</label>

              <div className="login-input-wrapper">
                <Mail size={18} />

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <div className="password-label">
                <label htmlFor="login-password">Password</label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <div className="login-input-wrapper">
                <Lock size={18} />

                <input
                  id="login-password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              <span>
                {loading ? "Logging in..." : "Login"}
              </span>

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="login-divider">
            <span />
            <p>OR CONTINUE WITH</p>
            <span />
          </div>

          <div className="google-login-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() =>
                setError("Google login was cancelled or failed.")
              }
              theme="outline"
              shape="rectangular"
              size="large"
              width="100%"
              text="continue_with"
            />
          </div>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>

          <p className="register-text">
            <Link to="/home">Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
