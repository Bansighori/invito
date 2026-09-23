import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Lock,
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";

import api from "../../api/axios";

import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/admin/auth/login",
        formData
      );

      localStorage.setItem(
        "invitoAdminToken",
        response.data.token
      );

      localStorage.setItem(
        "invitoAdmin",
        JSON.stringify(response.data.admin)
      );

      navigate("/admin/dashboard");

    } catch (error) {
      console.error(
        "Admin login error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Invalid admin credentials"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-glow admin-glow-one" />
      <div className="admin-login-glow admin-glow-two" />
      <div className="admin-login-glow admin-glow-three" />

      <div className="admin-login-card">

        <div className="admin-login-logo">
          <div className="admin-logo-icon">
            <Sparkles size={21} />
          </div>

          <span>
            Invito
          </span>
        </div>

        <div className="admin-login-icon">
          <ShieldCheck size={30} />
        </div>

        <div className="admin-login-heading">
          <p className="admin-login-label">
            ADMIN PORTAL
          </p>

          <h1>
            Welcome back
          </h1>

          <p>
            Sign in to manage your Invito platform.
          </p>
        </div>

        {error && (
          <div className="admin-login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="admin-input-group">

            <label>
              Admin Email
            </label>

            <div className="admin-input-wrapper">

              <Mail size={18} />

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="admin-input-group">

            <label>
              Password
            </label>

            <div className="admin-input-wrapper">

              <Lock size={18} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter admin password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In to Admin Panel"}
          </button>

        </form>

        <div className="admin-login-footer">
          <ShieldCheck size={14} />

          <span>
            Authorized administrators only
          </span>
        </div>

      </div>

    </div>
  );
}

export default AdminLogin;