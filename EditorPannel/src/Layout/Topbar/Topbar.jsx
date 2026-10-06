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

import Swal from "sweetalert2";
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
  const [editor, setEditor] = useState(null);

  // ===========================
  // Sidebar
  // ===========================

  useEffect(() => {
    fetchNotifications();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("editorToken");

      const { data } = await API.get("/editor/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setEditor(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

    navigate("/editor-profile");

    // Change "/profile"
    // if your profile route is different.
  };

  // ===========================
  // Logout
  // ===========================

  const handleLogout = async () => {
    // 1. Ask for confirmation with styled modal
    const result = await Swal.fire({
      title: "Log Out?",
      text: "You will be signed out of the editorial dashboard.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Log Out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#EF4444", // red — destructive action
      cancelButtonColor: "#64748B", // neutral gray
      background: "#ffffff",
      reverseButtons: true, // Cancel on left, Confirm on right (safer UX)
      focusCancel: true, // Default focus on Cancel (safer)
      allowOutsideClick: false,
      allowEscapeKey: true,
    });

    // 2. User cancelled
    if (!result.isConfirmed) return;

    // 3. Show loading state while clearing
    Swal.fire({
      title: "Logging out…",
      html: "Please wait a moment.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // 4. Clear storage
    localStorage.clear();
    sessionStorage.clear();

    setTimeout(() => {
      Swal.close();
      navigate("/editor-login", { replace: true });
    }, 600);
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
              {/* HEADER - FIXED */}
              <div className="Topbar_NotificationHeader">
                <h4>Notifications</h4>

                <FaTimes
                  className="Topbar_CloseNotification"
                  onClick={() => setShowNotifications(false)}
                />
              </div>

              {/* NOTIFICATIONS - SCROLLABLE */}
              <div className="Topbar_NotificationBody">
                {notifications.length === 0 ? (
                  <div className="Topbar_NoNotification">No notifications</div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className={`Topbar_NotificationItem ${
                        !item.isRead ? "unread" : ""
                      }`}
                    >
                      <h5>{item.title}</h5>

                      <p>{item.message}</p>

                      <small>{new Date(item.createdAt).toLocaleString()}</small>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================= Profile ================= */}

        <div className="Topbar_Profile" ref={profileRef}>
          <div
            className="Topbar_ProfileInfoWrapper"
            onClick={toggleProfileMenu}
          >
            <img
              src={
                editor?.profileImage
                  ? `http://localhost:5000/${editor.profileImage}`
                  : profileImg
              }
              alt={editor?.name}
              className="Topbar_ProfileImage"
            />

            <div className="Topbar_ProfileInfo">
              <h4>{editor?.name || "Editor"}</h4>

              <p>{editor?.role || "Editor"}</p>
            </div>
          </div>

          {/* Popup */}

          {showProfileMenu && (
            <div className="Topbar_ProfileDropdown">
              <div className="Topbar_ProfileHeader">
                <img
                  src={
                    editor?.profileImage
                      ? `http://localhost:5000/${editor.profileImage}`
                      : profileImg
                  }
                  alt=""
                  className="Topbar_ProfilePopupImage"
                />

                <div>
                  <h4>{editor?.name || "Editor"}</h4>

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
