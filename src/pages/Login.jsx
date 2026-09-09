import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import axios from "axios";


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

      const response =
        await axios.post(
          "http://localhost:5000/api/auth/login",
          formData
        );


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

        </form>


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