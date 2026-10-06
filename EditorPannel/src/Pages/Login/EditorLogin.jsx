import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API/axios";
import Swal from "sweetalert2";
import "./EditorLogin.css";

/* =========================================================
   ERROR MESSAGE EXTRACTOR
   Handles: array errors, object errors, {message}, {error},
   network failures, and generic fallbacks.
========================================================= */
const getErrorMessage = (error) => {
  const data = error.response?.data;

  if (!data) {
    return error.message || "Network error. Please verify your connection.";
  }

  if (Array.isArray(data.errors)) {
    return data.errors
      .map((err) => `• ${err.msg || err.message || err}`)
      .join("<br/>");
  }

  if (typeof data.errors === "object" && data.errors !== null) {
    return Object.values(data.errors)
      .map((val) => `• ${val.message || val}`)
      .join("<br/>");
  }

  if (data.message) return data.message;
  if (data.error) {
    return typeof data.error === "string"
      ? data.error
      : JSON.stringify(data.error);
  }

  return "An unexpected error occurred. Please try again.";
};

const EditorLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.email || !formData.password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both email and password.",
        confirmButtonColor: "#F59E0B",
        background: "#ffffff",
      });
    }

    try {
      setLoading(true);

      const res = await API.post("/editor/login", formData);

      // Success case
      if (res.data?.success !== false && res.data?.token) {
        localStorage.setItem("editorToken", res.data.token);
        localStorage.setItem(
          "editorData",
          JSON.stringify(res.data.editor)
        );

        Swal.fire({
          icon: "success",
          title: "Welcome Back, Editor!",
          text: "Login Successful",
          background: "#ffffff",
          confirmButtonColor: "#2563EB",
          iconColor: "#10B981",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      } else {
        // Backend returned success:false with 200
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text:
            res.data?.message ||
            "Invalid credentials, please check your input.",
          confirmButtonColor: "#EF4444",
          background: "#ffffff",
        });
      }
    } catch (error) {
      console.error("Editor Login Error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        html: `<div style="text-align: center; padding: 4px 8px; font-size: 14px; line-height: 1.6; color: #374151;">${getErrorMessage(
          error
        )}</div>`,
        confirmButtonColor: "#EF4444",
        background: "#ffffff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editorLogin">
      <div className="editorLoginOverlay">
        <div className="editorLoginLeft">
          <h1>Research Journal</h1>
          <p>Editorial Management System</p>

          <div className="editorLoginInfo">
            <h3>Welcome Back Editor</h3>

            <p>
              Manage papers, reviews, publications, and editorial workflows from
              a single dashboard.
            </p>
          </div>
        </div>

        <div className="editorLoginCard">
          <div className="loginLogo">
            <h2>Editor Login</h2>
            <p>Sign in to continue</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="formGroup">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="loginBtn" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditorLogin;