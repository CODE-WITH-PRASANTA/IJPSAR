import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import api from "../../api/axios";
import { useAuth } from "../../Context/AuthContext";

import "./AdminAuth.css";
import logo from "../../assets/p-2.jpeg"

const AdminAuth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const switchForm = () => {
    setIsLogin((prev) => !prev);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError("Email and password are required");
        return;
      }

      try {
        setLoading(true);

        await login(formData.email, formData.password);

        navigate("/dashboard", {
          replace: true,
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to login. Please try again."
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please complete all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/admin/create", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(response.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setIsLogin(true);
        setSuccess("");
      }, 1200);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="premiumAuthPage">
      <div className="authGlow authGlowOne"></div>
      <div className="authGlow authGlowTwo"></div>

      <section className="premiumAuthContainer">
        {/* LEFT CONTENT */}

        <div className="authBrandSection">
          <div className="authBrandContent">
            <div className="authLogo">
             <img src={logo} alt="" />
            </div>

            <span className="authBrandName">IJPASR</span>

            <h1>
              Manage your journal
              <span> smarter.</span>
            </h1>

            <p>
              A powerful administration workspace designed for
              editorial management, publications and academic
              operations.
            </p>

            <div className="authFeatures">
              <div>
                <span>01</span>
                Editorial Management
              </div>

              <div>
                <span>02</span>
                Publication Control
              </div>

              <div>
                <span>03</span>
                Secure Administration
              </div>
            </div>
          </div>

          <p className="authCopyright">
            © 2026 IJPASR. All rights reserved.
          </p>
        </div>

        {/* RIGHT FORM */}

        <div className="authFormSection">
          <div className="premiumAuthCard">
            <div className="premiumAuthHeader">
              <span className="authWelcome">
                {isLogin ? "WELCOME BACK" : "GET STARTED"}
              </span>

              <h2>
                {isLogin
                  ? "Sign in to your account"
                  : "Create admin account"}
              </h2>

              <p>
                {isLogin
                  ? "Enter your credentials to access the admin dashboard."
                  : "Complete the details below to create your account."}
              </p>
            </div>

            {error && (
              <div className="premiumAuthMessage error">
                {error}
              </div>
            )}

            {success && (
              <div className="premiumAuthMessage success">
                {success}
              </div>
            )}

            <form
              className="premiumAuthForm"
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <div className="premiumInputGroup">
                  <label>Full name</label>

                  <div className="premiumInput">
                    <FaUser />

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="premiumInputGroup">
                <label>Email address</label>

                <div className="premiumInput">
                  <MdEmail />

                  <input
                    type="email"
                    name="email"
                    placeholder="admin@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="premiumInputGroup">
                <label>Password</label>

                <div className="premiumInput">
                  <FaLock />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="premiumInputGroup">
                  <label>Confirm password</label>

                  <div className="premiumInput">
                    <FaLock />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="passwordToggle"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="premiumSubmitBtn"
                disabled={loading}
              >
                <span>
                  {loading
                    ? isLogin
                      ? "Signing in..."
                      : "Creating account..."
                    : isLogin
                      ? "Sign in"
                      : "Create account"}
                </span>

                {!loading && <FaArrowRight />}
              </button>
            </form>

            <div className="premiumAuthFooter" >
              <span>
                {isLogin
                  ? "New to IJPASR?"
                  : "Already have an account?"}
              </span>

              <button type="button" onClick={switchForm}>
                {isLogin ? "Create account" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminAuth;