import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaCog,
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";
import "./Password.css";

const Password = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className="Password">

      {/* Header */}
      <div className="PasswordHeader">
        <h1>Change Password</h1>

        <div className="PasswordBreadcrumb">
          <FaTachometerAlt />
          <span>Home</span>
          <span>&gt;</span>
          <span>Change Password</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="PasswordCard">

      

        <div className="PasswordForm">

          {/* Email */}
          <div className="PasswordRow">
            <label>Registered Email ID</label>

            <div className="PasswordInputWrapper PasswordReadOnly">
              <input
                type="text"
                value="popin4761@gmail.com"
                readOnly
              />
            </div>
          </div>

          {/* Old Password */}
          <div className="PasswordRow">
            <label>Old Password</label>

            <div className="PasswordInputWrapper PasswordReadOnly">
              <input
                type={showOldPassword ? "text" : "password"}
                value="12345678"
                readOnly
              />

              <button
                type="button"
                onClick={() =>
                  setShowOldPassword(!showOldPassword)
                }
              >
                {showOldPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="PasswordRow">
            <label>New Password</label>

            <div className="PasswordInputWrapper">
              <FaLock className="PasswordInputIcon" />

              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(!showNewPassword)
                }
              >
                {showNewPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button className="PasswordSubmitBtn">
            Change Password
          </button>

        </div>
      </div>
    </div>
  );
};

export default Password;