import React, { useState } from "react";
import "./Topbar.css";

import {
  FaBars,
  FaArrowRight,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Topbar = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  setMobileSidebar,
}) => {
  const [profileOpen, setProfileOpen] =
    useState(false);

  return (
    <header className="topbar">

      <div className="topbarLeft">

        {/* Desktop Menu */}
        <button
          className="topbarMenuBtn desktopBtn"
          onClick={() =>
            setSidebarCollapsed(
              !sidebarCollapsed
            )
          }
        >
          {sidebarCollapsed ? (
            <FaArrowRight />
          ) : (
            <FaBars />
          )}
        </button>

        {/* Mobile Menu */}
        <button
          className="topbarMenuBtn mobileBtn"
          onClick={() =>
            setMobileSidebar(true)
          }
        >
          <FaBars />
        </button>

        <div className="topbarSearch">
          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
          />
        </div>

      </div>

      <div className="topbarRight">

        <div className="topbarNotification">

          <FaBell />

          <span className="notificationBadge">
            3
          </span>

        </div>

        <div
          className="topbarProfile"
          onClick={() =>
            setProfileOpen(!profileOpen)
          }
        >

          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
          />

          <div className="profileInfo">
            <h4>Ann Adame</h4>
            <p>Admin</p>
          </div>

          {profileOpen && (
            <div className="profileDropdown">

              <button>
                <FaUserCircle />
                Profile
              </button>

              <button>
                <FaCog />
                Settings
              </button>

              <button>
                <FaSignOutAlt />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
};

export default Topbar;