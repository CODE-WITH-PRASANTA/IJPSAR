import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./EditorLogin.css";

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

    try {
      setLoading(true);

      const res = await API.post("/editor/login", formData);

      localStorage.setItem("editorToken", res.data.token);

      localStorage.setItem("editorData", JSON.stringify(res.data.editor));

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message || "Login Failed");
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
