import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import axios from "axios";


function Register() {

  const navigate = useNavigate();


  const [formData, setFormData] =
    useState({
      name: "",
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
    Handle registration
  */
  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);


    try {

      const response =
        await axios.post(
          "http://localhost:5000/api/auth/register",
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
        "Registration error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
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


        {/* Form */}

        <form
          onSubmit={handleSubmit}
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


          {/* Submit */}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >

            {loading
              ? "Creating account..."
              : "Create Account"}

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

      </div>

    </div>
  );

}


export default Register;