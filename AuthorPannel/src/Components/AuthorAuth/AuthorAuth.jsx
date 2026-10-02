import React, { useState } from "react";
import "./AuthorAuth.css";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/Axios";
import Swal from "sweetalert2";

// Helper function to extract and format error messages from various backend formats
const getErrorMessage = (error) => {
  const data = error.response?.data;

  if (!data) {
    return error.message || "Network error. Please verify your connection.";
  }

  // Case 1: Backend sends an array of validation errors (e.g., express-validator)
  if (Array.isArray(data.errors)) {
    return data.errors
      .map((err) => `• ${err.msg || err.message || err}`)
      .join("<br/>");
  }

  // Case 2: Backend sends an object of field errors (e.g., Mongoose validation)
  if (typeof data.errors === "object" && data.errors !== null) {
    return Object.values(data.errors)
      .map((val) => `• ${val.message || val}`)
      .join("<br/>");
  }

  // Case 3: Standard single string response: data.message or data.error
  if (data.message) return data.message;
  if (data.error) {
    return typeof data.error === "string" ? data.error : JSON.stringify(data.error);
  }

  return "An unexpected error occurred. Please try again.";
};

const initialFormData = {
  fullName: "",
  email: "",
  mobile: "",
  organization: "",
  designation: "",
  password: "",
  confirmPassword: "",
};

const AuthorAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        setLoading(true);
        const { data } = await API.post("/author/login", {
          email: formData.email,
          password: formData.password,
        });

        // 1. Success case
        if (data.success) {
          localStorage.setItem("authorToken", data.token);
          localStorage.setItem("author", JSON.stringify(data.user));

          Swal.fire({
            icon: "success",
            title: "Welcome Back!",
            text: "Login Successful",
            background: "#ffffff",
            confirmButtonColor: "#2563EB",
            iconColor: "#10B981",
            timer: 1800,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            navigate("/dashboard");
          });
        } else {
          // 2. Handles HTTP 200 responses returning { success: false, message: "..." }
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: data.message || "Invalid credentials, please check your input.",
            confirmButtonColor: "#EF4444",
            background: "#ffffff",
          });
        }
      } catch (error) {
        // 3. Handles standard HTTP error codes (400, 401, 500) and network failures
        console.error("Login Error:", error);

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          html: `<div style="text-align: center; padding: 4px 8px; font-size: 14px; line-height: 1.6; color: #374151;">${getErrorMessage(error)}</div>`,
          confirmButtonColor: "#EF4444",
          background: "#ffffff",
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Registration field validations
      if (formData.password !== formData.confirmPassword) {
        return Swal.fire({
          icon: "warning",
          title: "Password Mismatch",
          text: "Confirm password does not match your entered password.",
          confirmButtonColor: "#F59E0B",
          background: "#ffffff",
        });
      }

      if (formData.password.length < 6) {
        return Swal.fire({
          icon: "warning",
          title: "Weak Password",
          text: "Password must be at least 6 characters long.",
          confirmButtonColor: "#F59E0B",
          background: "#ffffff",
        });
      }

      try {
        setLoading(true);
        const { data } = await API.post("/author/register", formData);

        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: data.message || "Registration Successful. Please sign in.",
            background: "#ffffff",
            confirmButtonColor: "#2563EB",
            iconColor: "#10B981",
            timer: 2200,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          setIsLogin(true);
          setFormData(initialFormData);
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            html: `<div style="text-align: center; font-size: 14px; color: #374151;">${data.message || "Could not complete registration."}</div>`,
            confirmButtonColor: "#EF4444",
            background: "#ffffff",
          });
        }
      } catch (error) {
        console.error("Registration Error:", error);

        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          html: `<div style="text-align: left; padding: 4px 8px; font-size: 14px; line-height: 1.6; color: #374151;">${getErrorMessage(error)}</div>`,
          confirmButtonColor: "#EF4444",
          background: "#ffffff",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        {/* Left Branding Side */}
        <div className="auth-left">
          <div className="floating-bg-glow"></div>
          <h1>Journal Portal</h1>
          <p>
            Submit your research papers, track the review process, communicate
            with editors and manage all your publications from one secure
            platform.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Journal Illustration"
            className="premium-illustration"
          />
        </div>

        {/* Right Form Side */}
        <div className="auth-right">
          <form onSubmit={handleSubmit} className="modern-form">
            <h2>{isLogin ? "Author Login" : "Create Account"}</h2>
            <p className="form-subtitle">
              {isLogin
                ? "Please sign in to access your dashboard"
                : "Join our community of elite researchers"}
            </p>

            {!isLogin && (
              <div className="input-grid">
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-wrapper">
                  <input
                    type="text"
                    name="organization"
                    placeholder="Organization"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-wrapper">
                  <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="input-wrapper">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button type="submit" className="premium-btn" disabled={loading}>
              <span>
                {loading ? "Processing..." : isLogin ? "Sign In" : "Get Started"}
              </span>
              <div className="btn-glow"></div>
            </button>

            <div className="toggle">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={handleToggleMode}>
                {isLogin ? "Register Here" : "Login Here"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthorAuth;