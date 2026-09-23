import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { login } from "../api/authApi";
import api from "../api/axios";

import {
  GoogleLogin
} from "@react-oauth/google";

import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight
} from "lucide-react";

import "./Login.css";


function Login() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


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


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      localStorage.removeItem("invitoToken");
      localStorage.removeItem("invitoUser");


      const response = await login(formData);


      localStorage.setItem(
        "invitoToken",
        response.data.token
      );


      localStorage.setItem(
        "invitoUser",
        JSON.stringify(response.data.user)
      );


      navigate("/home");

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  const handleGoogleLogin = async (
    credentialResponse
  ) => {

    try {

      setError("");

      localStorage.removeItem("invitoToken");
      localStorage.removeItem("invitoUser");


      const response = await api.post(
        "/auth/google",
        {
          credential:
            credentialResponse.credential
        }
      );


      localStorage.setItem(
        "invitoToken",
        response.data.token
      );


      localStorage.setItem(
        "invitoUser",
        JSON.stringify(response.data.user)
      );


      navigate("/home");

    } catch (error) {

      console.error(
        "Google Login Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Google login failed. Please try again."
      );

    }

  };


  return (

    <div className="login-page">


      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div className="login-bg-shape login-bg-one" />

      <div className="login-bg-shape login-bg-two" />

      <div className="login-bg-shape login-bg-three" />

      <div className="login-sparkle sparkle-one">
        ✦
      </div>

      <div className="login-sparkle sparkle-two">
        ✧
      </div>

      <div className="login-sparkle sparkle-three">
        ✦
      </div>


      {/* =================================================
          LEFT SIDE
      ================================================= */}

      <div className="login-showcase">


        <div className="showcase-logo">

          <div className="showcase-logo-icon">
            <Sparkles size={23} />
          </div>

          <span>
            Invito
          </span>

        </div>


        <div className="showcase-content">

          <p className="showcase-label">
            CREATE • CELEBRATE • SHARE
          </p>

          <h1>
            Your special moments
            <span>
              deserve beautiful invitations.
            </span>
          </h1>

          <p className="showcase-description">
            Design elegant invitations, manage your
            guests and make every celebration memorable.
          </p>


          <div className="showcase-cards">

            <div className="mini-card mini-card-one">

              <div className="mini-card-icon">
                💍
              </div>

              <div>
                <strong>
                  Wedding
                </strong>

                <small>
                  Elegant moments
                </small>
              </div>

            </div>


            <div className="mini-card mini-card-two">

              <div className="mini-card-icon">
                🎂
              </div>

              <div>
                <strong>
                  Birthday
                </strong>

                <small>
                  Celebrate together
                </small>
              </div>

            </div>


            <div className="mini-card mini-card-three">

              <div className="mini-card-icon">
                🎉
              </div>

              <div>
                <strong>
                  Events
                </strong>

                <small>
                  Make it memorable
                </small>
              </div>

            </div>

          </div>

        </div>


        <div className="showcase-footer">
          Beautifully crafted for your special moments.
        </div>

      </div>


      {/* =================================================
          LOGIN SIDE
      ================================================= */}

      <div className="login-panel">

        <div className="login-card">


          {/* Mobile Logo */}

          <div className="mobile-login-logo">

            <div className="mobile-logo-icon">
              <Sparkles size={19} />
            </div>

            <span>
              Invito
            </span>

          </div>


          {/* Header */}

          <div className="login-header">

            <p className="login-label">
              WELCOME BACK
            </p>

            <h2>
              Login to Invito
            </h2>

            <p>
              Continue creating beautiful
              invitations.
            </p>

          </div>


          {/* Error */}

          {error && (

            <div className="login-error">
              {error}
            </div>

          )}


          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >


            {/* Email */}

            <div className="login-field">

              <label>
                Email address
              </label>

              <div className="login-input-wrapper">

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

            <div className="login-field">

              <div className="password-label">

                <label>
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>


              <div className="login-input-wrapper">

                <Lock size={18} />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />

              </div>

            </div>


            {/* Login */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Logging in..."
                  : "Login"}
              </span>

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>


          </form>


          {/* Divider */}

          <div className="login-divider">

            <span />

            <p>
              OR CONTINUE WITH
            </p>

            <span />

          </div>


          {/* Google */}

          <div className="google-login-wrapper">

            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                setError(
                  "Google login was cancelled or failed."
                );
              }}
              theme="outline"
              shape="rectangular"
              size="large"
              width="100%"
              text="continue_with"
            />

          </div>


          {/* Register */}

          <p className="register-text">

            Don't have an account?

            {" "}

            <Link to="/register">
              Create an account
            </Link>

          </p>


        </div>

      </div>

    </div>

  );

}


export default Login;