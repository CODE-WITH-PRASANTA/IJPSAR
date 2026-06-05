import React, { useState } from "react";
import {
  FaArrowLeft,
  FaUserCircle,
  FaUser,
  FaHeartbeat,
} from "react-icons/fa";
import "./NewsProfile.css";

const NewsProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="newsProfile">

      {/* Breadcrumb */}
      <div className="newsProfile__breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>User Management</span>
        <span>/</span>
        <span className="newsProfile__breadcrumbActive">
          Users
        </span>
      </div>

      {/* Header */}
      <div className="newsProfile__header">

        <div className="newsProfile__userInfo">

          <div className="newsProfile__avatar">
            G
          </div>

          <div className="newsProfile__details">
            <h2>ggf</h2>

            <p>gfgf@dd.com</p>

            <div className="newsProfile__userId">
              User ID: 90e0b5fa-0a49-4e89-8327-c7f180aa31b2
            </div>
          </div>
        </div>

        <button className="newsProfile__backBtn">
          <FaArrowLeft />
          Back to users
        </button>

      </div>

      {/* Tabs */}

      <div className="newsProfile__tabs">

        <button
          className={`newsProfile__tab ${
            activeTab === "profile"
              ? "newsProfile__tab--active"
              : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <FaUser />
          Profile
        </button>

        <button
          className={`newsProfile__tab ${
            activeTab === "activity"
              ? "newsProfile__tab--active"
              : ""
          }`}
          onClick={() => setActiveTab("activity")}
        >
          <FaHeartbeat />
          Activity Logs
        </button>

      </div>

      {/* Content */}

      {activeTab === "profile" && (
        <>
          <div className="newsProfile__card">

            <div className="newsProfile__grid">

              <div className="newsProfile__label">
                Full Name:
              </div>
              <div className="newsProfile__value">
                ggf
              </div>

              <div className="newsProfile__label">
                Email Address:
              </div>
              <div className="newsProfile__value">
                <span>gfgf@dd.com</span>

                <span className="newsProfile__badge newsProfile__badgeWarning">
                  Not Verified
                </span>
              </div>

              <div className="newsProfile__label">
                Role:
              </div>
              <div className="newsProfile__value">
                Member

                <span className="newsProfile__badge">
                  System
                </span>
              </div>

              <div className="newsProfile__label">
                Status:
              </div>
              <div className="newsProfile__value">
                <span className="newsProfile__status">
                  ● Active
                </span>
              </div>

              <div className="newsProfile__label">
                Last Sign In:
              </div>
              <div className="newsProfile__value">
                Never
              </div>

            </div>

            <button className="newsProfile__editBtn">
              Edit User Details
            </button>

          </div>

          {/* Danger Zone */}

          <div className="newsProfile__danger">

            <h3>Danger Zone</h3>

            <div className="newsProfile__dangerCard">

              <div>
                <h4>Delete User Account</h4>

                <p>
                  This action will permanently delete the
                  user and all related data. It cannot be
                  undone.
                </p>
              </div>

              <button className="newsProfile__deleteBtn">
                Delete User
              </button>

            </div>

          </div>
        </>
      )}

      {activeTab === "activity" && (
        <div className="newsProfile__card">
          <div className="newsProfile__empty">
            No activity logs available.
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsProfile;