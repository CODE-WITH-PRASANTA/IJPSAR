import React, { useState } from "react";
import "./AuthorAuth.css";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/Axios";
import Swal from "sweetalert2";

const AuthorAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    organization: "",
    designation: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const { data } = await API.post("/author/login", {
          email: formData.email,
          password: formData.password,
        });
        if (data.success) {
          localStorage.setItem("authorToken", data.token);
          localStorage.setItem("author", JSON.stringify(data.user));
          
          // Premium SweetAlert for Success Login
          Swal.fire({
            icon: "success",
            title: "Welcome Back!",
            text: "Login Successful",
            background: "#ffffff",
            confirmButtonColor: "#2563EB",
            iconColor: "#10B981",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            navigate("/dashboard");
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response?.data?.message || "Invalid credentials, please try again.",
          confirmButtonColor: "#EF4444",
        });
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        return Swal.fire({
          icon: "warning",
          title: "Password Mismatch",
          text: "Passwords do not match",
          confirmButtonColor: "#F59E0B",
        });
      }

      try {
        const { data } = await API.post("/author/register", formData);

        if (data.success) {
          // Premium SweetAlert for Success Registration
          Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: "Registration Successful",
            background: "#ffffff",
            confirmButtonColor: "#2563EB",
            iconColor: "#10B981",
            timer: 2500,
            timerProgressBar: true,
          });

          setIsLogin(true);

          setFormData({
            fullName: "",
            email: "",
            mobile: "",
            organization: "",
            designation: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: data.message || "Something went wrong.",
            confirmButtonColor: "#EF4444",
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred during registration.",
          confirmButtonColor: "#EF4444",
        });
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        
        <div className="auth-left">
          <div className="floating-bg-glow"></div>
          <h1>Journal Portal</h1>
          <p>
            Submit your research papers, track the review process,
            communicate with editors and manage all your publications
            from one secure platform.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Journal Illustration"
            className="premium-illustration"
          />
        </div>

        <div className="auth-right">
          <form onSubmit={handleSubmit} className="modern-form">
            <h2>
              {isLogin ? "Author Login" : "Create Account"}
            </h2>
            <p className="form-subtitle">
              {isLogin ? "Please sign in to access your dashboard" : "Join our community of elite researchers"}
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
                    type="text"
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

            <button type="submit" className="premium-btn">
              <span>{isLogin ? "Sign In" : "Get Started"}</span>
              <div className="btn-glow"></div>
            </button>

            <div className="toggle">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setIsLogin(!isLogin)}>
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