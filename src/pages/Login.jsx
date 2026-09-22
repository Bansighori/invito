import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { login } from "../api/authApi";
import api from "../api/axios";

import { GoogleLogin } from "@react-oauth/google";

function Login() {

  const navigate = useNavigate();


  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });


  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  /*
    Handle input changes
  */
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


  /*
    Handle login
  */
  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);


    try {
      localStorage.removeItem("invitoToken");
      localStorage.removeItem("invitoUser");

      const response =
        await login(formData);


      /*
        Save JWT token
      */
      localStorage.setItem(
        "invitoToken",
        response.data.token
      );


      /*
        Save logged-in user
      */
      localStorage.setItem(
        "invitoUser",
        JSON.stringify(
          response.data.user
        )
      );


      /*
        Go to dashboard
      */
      navigate("/dashboard");

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


  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Logo */}

        <div className="auth-logo">
          Invito
        </div>


        {/* Heading */}

        <div className="auth-header">

          <p className="auth-label">
            WELCOME BACK
          </p>

          <h1>
            Login to Invito
          </h1>

          <p>
            Continue creating beautiful
            invitations.
          </p>

        </div>


        {/* Error */}

        {error && (

          <div className="auth-error">
            {error}
          </div>

        )}


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

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
              placeholder="Enter your password"
              required
            />

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>
          <p
  className="auth-switch"
  style={{
    textAlign: "right",
    marginTop: "10px"
  }}
>
  <Link to="/forgot-password">
    Forgot Password?
  </Link>
</p>

        </form>

{/* Google Login */}

<div
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center"
  }}
>
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
  try {
    setError("");

    localStorage.removeItem("invitoToken");
    localStorage.removeItem("invitoUser");

    const response = await api.post("/auth/google", {
      credential: credentialResponse.credential
    });

    localStorage.setItem(
      "invitoToken",
      response.data.token
    );

    localStorage.setItem(
      "invitoUser",
      JSON.stringify(response.data.user)
    );

    navigate("/dashboard");

  } catch (error) {
    console.error("Google Login Error:", error);

    setError(
      error.response?.data?.message ||
      "Google login failed. Please try again."
    );
  }
}}
onError={() => {
  setError("Google login was cancelled or failed.");
}}
  />
</div>

        {/* Register */}

        <p className="auth-switch">

          Don't have an account?

          {" "}

          <Link to="/register">
            Create an account
          </Link>

        </p>

      </div>

    </div>
  );

}


export default Login;