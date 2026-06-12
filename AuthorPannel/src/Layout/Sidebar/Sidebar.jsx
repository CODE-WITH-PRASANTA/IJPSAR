import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import {
  FiGrid,
  FiCalendar,
  FiCheckSquare,
  FiHelpCircle,
  FiSend,
  FiBell,
  FiX,
  FiSearch
} from "react-icons/fi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [showNotifications, setShowNotifications] =
  useState(false);

const [showProfileMenu, setShowProfileMenu] =
  useState(false);

  const notifications = [
    {
      title: "Project Horizon Updated",
      text: "3 new tasks were added to your board."
    },
    {
      title: "New Comment",
      text: "Alex commented on Landing Page redesign."
    },
    {
      title: "Invitation",
      text: "You were invited to Design Team."
    },
    {
      title: "Access Request",
      text: "Michael requested dashboard access."
    },
    {
      title: "Task Completed",
      text: "UI Design task completed."
    }
  ];

  return (
    <>
      <div
        className={`Sidebar_Overlay ${
          sidebarOpen ? "show" : ""
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`Sidebar ${
          sidebarOpen ? "show" : ""
        }`}
      >
        <div className="Sidebar_Scroll">

          {/* Header */}

          <div className="Sidebar_Header">
            <div className="Sidebar_Logo">
              <div className="Sidebar_LogoIcon">
                ⊙
              </div>
              <h2>IJPSAR</h2>
            </div>

            <div className="Sidebar_HeaderActions">

  <button
    className="Sidebar_NotificationBtn"
    onClick={() => {
      setShowNotifications(!showNotifications);
      setShowProfileMenu(false);
    }}
  >
    <FiBell />
  </button>

  {showNotifications && (
    <div className="Sidebar_NotificationPopup">

      <div className="Sidebar_NotificationHeader">
        Notifications
      </div>

      <div className="Sidebar_NotificationList">

        {notifications.map((item, index) => (
          <div
            key={index}
            className="Sidebar_NotificationItem"
          >
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}

      </div>

    </div>
  )}

</div>

            <button
              className="Sidebar_Close"
              onClick={() =>
                setSidebarOpen(false)
              }
            >
              <FiX />
            </button>

           
          </div>

          {/* Search */}

          <div className="Sidebar_Search">
            <FiSearch />
            <input
              placeholder="Search anything"
            />
            <span>⌘K</span>
          </div>

          {/* Menu */}

          <div className="Sidebar_Menu">
              <NavLink
                to="/dashboard"
                className="Sidebar_MenuItem"
              >
                <FiGrid />
                Dashboard
              </NavLink>

              <NavLink
                to="/calendar"
                className="Sidebar_MenuItem"
              >
                <FiCalendar />
                Calendar
              </NavLink>

              <NavLink
                to="/tasks"
                className="Sidebar_MenuItem"
              >
                <FiCheckSquare />
                Tasks
              </NavLink>
            </div>

          {/* Footer */}

          <div className="Sidebar_Footer">
              <NavLink
                to="/support"
                className="Sidebar_MenuItem"
              >
                <FiHelpCircle />
                Support
              </NavLink>

              <NavLink
                to="/feedback"
                className="Sidebar_MenuItem"
              >
                <FiSend />
                Feedback
              </NavLink>
            </div>
        </div>

        {/* Profile */}

       <div className="Sidebar_Profile">
              <img
                src="https://i.pravatar.cc/100"
                alt=""
              />

              <div className="Sidebar_ProfileInfo">
                <h4>Agent Name</h4>
                <p>agent@example.com</p>
              </div>

              <button className="Sidebar_LogoutBtn">
                Logout
              </button>
            </div>
      </aside>
    </>
  );
};

export default Sidebar;