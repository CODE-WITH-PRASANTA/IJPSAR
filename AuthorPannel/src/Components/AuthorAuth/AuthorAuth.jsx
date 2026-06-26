import React, { useState } from "react";
import axios from "axios";
import "./AuthorAuth.css";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/Axios";

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
        const { data } = await API.post("/author/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        if (data.success) {
            localStorage.setItem("authorToken", data.token);
            localStorage.setItem("author", JSON.stringify(data.user));
          
            alert("Login Successful");
          
            navigate("/dashboard");
          }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        return alert("Passwords do not match");
      }

      try {
        const { data } = await API.post("/author/register",
          
          formData
        );

        if (data.success) {
          alert("Registration Successful");

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
          alert(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
  
        <div className="auth-left">
          <h1>Journal Portal</h1>
  
          <p>
            Submit your research papers, track the review process,
            communicate with editors and manage all your publications
            from one secure platform.
          </p>
  
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />
        </div>
  
        <div className="auth-right">
  
          <form onSubmit={handleSubmit}>
  
            <h2>
              {isLogin ? "Author Login" : "Create Account"}
            </h2>
  
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
  
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                />
  
                <input
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  value={formData.organization}
                  onChange={handleChange}
                />
  
                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </>
            )}
  
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
  
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
  
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}
  
            <button type="submit">
              {isLogin ? "Login" : "Register"}
            </button>
  
            <div className="toggle">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
  
              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? " Register" : " Login"}
              </span>
            </div>
  
          </form>
  
        </div>
  
      </div>
    </div>
  );
};

export default AuthorAuth;