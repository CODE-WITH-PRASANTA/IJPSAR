import React from "react";
import { FaCamera, FaCheckCircle } from "react-icons/fa";
import { IMG_URL } from "../../API/axios";
import "./SettingProfile.css";
// if (!editor) {
//   return <h2>Loading...</h2>;
// }
const SettingProfile = ({ editor }) => {
  return (
    <div className="SettingProfile">
      <div className="SettingProfile-container">
        <div className="SettingProfile-card">
          <div className="SettingProfile-header">
            <h2>Profile</h2>
          </div>

          <div className="SettingProfile-cover">
            <img
              src={
                editor.profileImage
                  ? `http://localhost:5000${editor.profileImage}`
                  : "https://i.pravatar.cc/200?img=32"
              }
              alt="profile"
              className="SettingProfile-avatar"
            />
          </div>

          <div className="SettingProfile-profileSection">
            <div className="SettingProfile-avatarWrapper">
              <img
                src={
                  editor.profileImage
                    ? `${IMG_URL}${editor.profileImage}`
                    : "https://i.pravatar.cc/200?img=32"
                }
                alt="profile"
                className="SettingProfile-avatar"
              />

              <button className="SettingProfile-cameraBtn">
                <FaCamera />
              </button>
            </div>

            <h3 className="SettingProfile-name">
              {editor.name}
              <FaCheckCircle className="SettingProfile-verified" />
            </h3>

            <p className="SettingProfile-role">
              {editor.designation || "Editor"}
            </p>
          </div>

          <form className="SettingProfile-form">
            {/* User Info */}

            <div className="SettingProfile-section">
              <h2>User Info</h2>

              <div className="SettingProfile-group">
                <label>Username</label>
                <input type="text" value={editor.name || ""} readOnly />
              </div>

              <div className="SettingProfile-group">
                <label>Email address</label>
                <input type="email" value={editor.email || ""} readOnly />
              </div>

              <div className="SettingProfile-row">
                <div className="SettingProfile-group">
                  <label>Password</label>
                  <input type="password" value="********" readOnly />
                </div>

                <div className="SettingProfile-group">
                  <label>Confirm Password</label>
                  <input type="password" value="********" readOnly />
                </div>
              </div>
            </div>

            <hr />

            {/* Personal Info */}

            <div className="SettingProfile-section">
              <h2>Personal Info</h2>

              <div className="SettingProfile-group">
                <label>Address</label>
                <textarea rows="3" value={editor.address || ""} readOnly />
              </div>

              <div className="SettingProfile-group">
                <label>Address 2</label>
                <textarea rows="3" value={editor.address2 || ""} readOnly />
              </div>

              <div className="SettingProfile-row SettingProfile-rowThree">
                <div className="SettingProfile-group">
                  <label>City</label>
                  <input type="text" value={editor.city || ""} readOnly />
                </div>

                <div className="SettingProfile-group">
                  <label>State</label>
                  <input type="text" value={editor.state || ""} readOnly />
                </div>

                <div className="SettingProfile-group">
                  <label>Zip</label>
                  <input type="text" value={editor.zip || ""} readOnly />
                </div>
              </div>

              <div className="SettingProfile-languageRow">
                <div className="SettingProfile-group">
                  <label>language</label>
                  <input
                    type="text"
                    value={editor.language || "English"}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="SettingProfile-btnWrapper">
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
