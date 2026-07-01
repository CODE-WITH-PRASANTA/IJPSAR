import React from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaLanguage,
} from "react-icons/fa";
import { IMG_URL } from "../../API/axios";
import "./SettingProfile.css";

const SettingProfile = ({ editor }) => {
  return (
    <div className="SettingProfile">
      <div className="SettingProfile-container">

        <div className="SettingProfile-card">

          {/* ===========================
                  Header
          =========================== */}

          <div className="SettingProfile-header">

            <div className="SettingProfile-headerLeft">
              <h2>Profile Settings</h2>
              <p>
                View your profile information and personal details.
              </p>
            </div>

          </div>

          {/* ===========================
                Cover Section
          =========================== */}

          <div className="SettingProfile-cover">

            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800"
              alt="Cover"
              className="SettingProfile-coverImage"
            />

            <div className="SettingProfile-coverOverlay"></div>

          </div>

          {/* ===========================
                Profile Card
          =========================== */}

          <div className="SettingProfile-profileSection">

            <div className="SettingProfile-avatarWrapper">

              <img
                src={
                  editor.profileImage
                    ? `${IMG_URL}${editor.profileImage}`
                    : "https://i.pravatar.cc/300?img=32"
                }
                alt="Profile"
                className="SettingProfile-avatar"
              />

              <button
                className="SettingProfile-cameraBtn"
                type="button"
              >
                <FaCamera />
              </button>

            </div>

            <div className="SettingProfile-userContent">

              <h3 className="SettingProfile-name">
                {editor.name || "Editor"}

                <FaCheckCircle className="SettingProfile-verified" />

              </h3>

              <p className="SettingProfile-role">
                {editor.designation || "Editor"}
              </p>

              <span className="SettingProfile-status">
                Active Account
              </span>

            </div>

          </div>

          {/* ===========================
                  FORM
          =========================== */}

          <form className="SettingProfile-form">

            {/* ===========================
                  USER INFO
            =========================== */}

            <div className="SettingProfile-section">

              <div className="SettingProfile-sectionTitle">

                <h2>User Information</h2>

                <p>
                  Basic account information
                </p>

              </div>

              {/* Username + Email */}

              <div className="SettingProfile-row">

                <div className="SettingProfile-group">

                  <label>
                    <FaUser />
                    Username
                  </label>

                  <input
                    type="text"
                    value={editor.name || ""}
                    readOnly
                  />

                </div>

                <div className="SettingProfile-group">

                  <label>
                    <FaEnvelope />
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={editor.email || ""}
                    readOnly
                  />

                </div>

              </div>

              {/* Password + Confirm Password */}

              <div className="SettingProfile-row">

                <div className="SettingProfile-group">

                  <label>
                    <FaLock />
                    Password
                  </label>

                  <input
                    type="password"
                    value="********"
                    readOnly
                  />

                </div>

                <div className="SettingProfile-group">

                  <label>
                    <FaLock />
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    value="********"
                    readOnly
                  />

                </div>

              </div>

            </div>

            <hr />

            {/* ===========================
                Personal Information
            =========================== */}

            <div className="SettingProfile-section">

              <div className="SettingProfile-sectionTitle">

                <h2>Personal Information</h2>

                <p>
                  Address and location information
                </p>

              </div>
                            {/* Address + Address 2 */}

              <div className="SettingProfile-row">

                <div className="SettingProfile-group">

                  <label>
                    <FaMapMarkerAlt />
                    Address
                  </label>

                  <textarea
                    rows="4"
                    value={editor.address || ""}
                    readOnly
                  />

                </div>

                <div className="SettingProfile-group">

                  <label>
                    <FaMapMarkerAlt />
                    Address 2
                  </label>

                  <textarea
                    rows="4"
                    value={editor.address2 || ""}
                    readOnly
                  />

                </div>

              </div>

              {/* City + State */}

              <div className="SettingProfile-row">

                <div className="SettingProfile-group">

                  <label>
                    <FaCity />
                    City
                  </label>

                  <input
                    type="text"
                    value={editor.city || ""}
                    readOnly
                  />

                </div>

                <div className="SettingProfile-group">

                  <label>
                    <FaGlobe />
                    State
                  </label>

                  <input
                    type="text"
                    value={editor.state || ""}
                    readOnly
                  />

                </div>

              </div>

              {/* Zip + Language */}

              <div className="SettingProfile-row">

                <div className="SettingProfile-group">

                  <label>
                    <FaMapMarkerAlt />
                    ZIP Code
                  </label>

                  <input
                    type="text"
                    value={editor.zip || ""}
                    readOnly
                  />

                </div>

                <div className="SettingProfile-group">

                  <label>
                    <FaLanguage />
                    Language
                  </label>

                  <input
                    type="text"
                    value={editor.language || "English"}
                    readOnly
                  />

                </div>

              </div>

            </div>

            {/* Footer Buttons */}

            <div className="SettingProfile-btnWrapper">

              <button
                type="button"
                className="SettingProfile-cancelBtn"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="SettingProfile-submitBtn"
                disabled
              >
                Update Profile
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default SettingProfile;