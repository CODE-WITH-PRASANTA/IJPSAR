import React, { useState, useEffect, useRef } from "react";

import "./Topbar.css";

import {
  FaBars,
  FaSearch,
  FaBell,
  FaTimes,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import profileImg from "../../assets/hero.png";
import API from "../../api/axios";

const Topbar = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  setMobileSidebar,
}) => {
  const navigate = useNavigate();

  const profileRef = useRef(null);

  const [showNotifications, setShowNotifications] = useState(false);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [notifications, setNotifications] = useState([]);

  // ===========================
  // Sidebar
  // ===========================

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("editorToken");

      const { data } = await API.get("/notification/editor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setNotifications(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSidebarToggle = () => {
    if (window.innerWidth <= 768) {
      setMobileSidebar(true);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  // ===========================
  // Profile Dropdown
  // ===========================

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  // ===========================
  // Click Outside
  // ===========================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===========================
  // Profile Settings
  // ===========================

  const handleProfileSettings = () => {
    setShowProfileMenu(false);

    navigate("/editor-login");

    // Change "/profile"
    // if your profile route is different.
  };

  // ===========================
  // Logout
  // ===========================

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    // Remove Login Data

    localStorage.clear();

    sessionStorage.clear();

    // Redirect Login Page

    navigate("/editor-login");
  };
  return (
    <div className={`Topbar ${sidebarCollapsed ? "TopbarCollapsed" : ""}`}>
      {/* ================= LEFT ================= */}

      <div className="Topbar_Left">
        <button className="Topbar_MenuBtn" onClick={handleSidebarToggle}>
          <FaBars />
        </button>

        <div className="Topbar_SearchBox">
          <FaSearch className="Topbar_SearchIcon" />

          <input type="text" placeholder="Search..." />
        </div>
      </div>

      {/* ================= RIGHT ================= */}

      <div className="Topbar_Right">
        {/* Notification */}

        <div className="Topbar_NotificationWrapper">
          <button
            className="Topbar_NotificationBtn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />

            <span className="Topbar_Badge">
              {notifications.filter((n) => !n.isRead).length}
            </span>
          </button>

          {showNotifications && (
            <div className="Topbar_NotificationDropdown">
              <div className="Topbar_NotificationHeader">
                <h4>Notifications</h4>

                <FaTimes
                  className="Topbar_CloseNotification"
                  onClick={() => setShowNotifications(false)}
                />
              </div>

              {notifications.map((item) => (
                <div key={item._id} className="Topbar_NotificationItem">
                  <h5>{item.title}</h5>
                  <p>{item.message}</p>

                  <small>{new Date(item.createdAt).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= Profile ================= */}

        <div className="Topbar_Profile" ref={profileRef}>
          <div
            className="Topbar_ProfileInfoWrapper"
            onClick={toggleProfileMenu}
          >
            <img src={profileImg} alt="Admin" className="Topbar_ProfileImage" />

            <div className="Topbar_ProfileInfo">
              <h4>Ann Adame</h4>

              <p>Administrator</p>
            </div>
          </div>

          {/* Popup */}

          {showProfileMenu && (
            <div className="Topbar_ProfileDropdown">
              <div className="Topbar_ProfileHeader">
                <img
                  src={profileImg}
                  alt=""
                  className="Topbar_ProfilePopupImage"
                />

                <div>
                  <h4>Ann Adame</h4>

                  <p>Administrator</p>
                </div>
              </div>

              <div className="Topbar_ProfileMenu">
                <button onClick={handleProfileSettings}>
                  <FaUserCog />

                  <span>Profile Settings</span>
                </button>

                <button className="Topbar_LogoutBtn" onClick={handleLogout}>
                  <FaSignOutAlt />

                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
