import React from "react";
import {
  FaCamera,
  FaCheckCircle,
} from "react-icons/fa";

import "./SettingProfile.css";

const SettingProfile = () => {
  return (
    <div className="SettingProfile">
      <div className="SettingProfile-container">
        <div className="SettingProfile-card">

          <div className="SettingProfile-header">
            <h2>Profile</h2>
          </div>

          <div className="SettingProfile-cover">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="cover"
            />
          </div>

          <div className="SettingProfile-profileSection">
            <div className="SettingProfile-avatarWrapper">
              <img
                src="https://i.pravatar.cc/200?img=32"
                alt="profile"
                className="SettingProfile-avatar"
              />

              <button className="SettingProfile-cameraBtn">
                <FaCamera />
              </button>
            </div>

            <h3 className="SettingProfile-name">
              Ninfa Monaldo
              <FaCheckCircle className="SettingProfile-verified" />
            </h3>

            <p className="SettingProfile-role">
              Web designer & Developer
            </p>
          </div>

          <form className="SettingProfile-form">

            {/* User Info */}

            <div className="SettingProfile-section">
              <h2>User Info</h2>

              <div className="SettingProfile-group">
                <label>Username</label>
                <input
                  type="text"
                  defaultValue="Maria C. Eck"
                />
              </div>

              <div className="SettingProfile-group">
                <label>Email address</label>
                <input
                  type="email"
                  defaultValue="MariaCEck@teleworm.us"
                />
              </div>

              <div className="SettingProfile-row">
                <div className="SettingProfile-group">
                  <label>Password</label>
                  <input
                    type="password"
                    defaultValue="12345678"
                  />
                </div>

                <div className="SettingProfile-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    defaultValue="12345678"
                  />
                </div>
              </div>
            </div>

            <hr />

            {/* Personal Info */}

            <div className="SettingProfile-section">
              <h2>Personal Info</h2>

              <div className="SettingProfile-group">
                <label>Address</label>
                <textarea
                  rows="3"
                  defaultValue="1098 Asylum Avenue New Haven, CT 06510"
                />
              </div>

              <div className="SettingProfile-group">
                <label>Address 2</label>
                <textarea
                  rows="3"
                  defaultValue="51244 Ankunding Villages, Reicheltown, IL 84366"
                />
              </div>

              <div className="SettingProfile-row SettingProfile-rowThree">
                <div className="SettingProfile-group">
                  <label>City</label>
                  <input
                    type="text"
                    defaultValue="oregon"
                  />
                </div>

                <div className="SettingProfile-group">
                  <label>State</label>
                  <select>
                    <option>Choose...</option>
                    <option>California</option>
                    <option>Texas</option>
                    <option>Florida</option>
                  </select>
                </div>

                <div className="SettingProfile-group">
                  <label>Zip</label>
                  <input
                    type="text"
                    defaultValue="CT 06510"
                  />
                </div>
              </div>

              <div className="SettingProfile-languageRow">
                <div className="SettingProfile-group">
                  <label>language</label>
                  <select>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="SettingProfile-btnWrapper">
              <button
                type="submit"
                className="SettingProfile-submitBtn"
              >
                Submit
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default SettingProfile;