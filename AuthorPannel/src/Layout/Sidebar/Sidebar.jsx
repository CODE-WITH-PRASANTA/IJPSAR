import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import {
  FiGrid,
  FiFileText,
  FiFolder,
  FiClock,
  FiBookOpen,
  FiMoreVertical,
  FiBell,
  FiMessageSquare,
  FiLogOut,
  FiX,
} from "react-icons/fi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <>
      <div
        className={`Sidebar_Overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`Sidebar ${sidebarOpen ? "show" : ""}`}>
        <div className="Sidebar_Content">

          {/* Header */}
          <div className="Sidebar_Header">
            <div className="Sidebar_Logo">
              <div className="Sidebar_LogoIcon">⊙</div>
              <h2>IJPASR</h2>
            </div>

            <button
              className="Sidebar_Close"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX />
            </button>
          </div>

          {/* Menu */}
          <div className="Sidebar_Menu">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "Sidebar_MenuItem active"
                  : "Sidebar_MenuItem"
              }
            >
              <FiGrid />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/submit-paper"
              className={({ isActive }) =>
                isActive
                  ? "Sidebar_MenuItem active"
                  : "Sidebar_MenuItem"
              }
            >
              <FiFileText />
              <span>Submit Paper</span>
            </NavLink>

            <NavLink
              to="/paper-management"
              className={({ isActive }) =>
                isActive
                  ? "Sidebar_MenuItem active"
                  : "Sidebar_MenuItem"
              }
            >
              <FiFolder />
              <span>Paper Management</span>
            </NavLink>

            <NavLink
              to="/transaction-history"
              className={({ isActive }) =>
                isActive
                  ? "Sidebar_MenuItem active"
                  : "Sidebar_MenuItem"
              }
            >
              <FiClock />
              <span>Transaction History</span>
            </NavLink>

            <NavLink
              to="/published-papers"
              className={({ isActive }) =>
                isActive
                  ? "Sidebar_MenuItem active"
                  : "Sidebar_MenuItem"
              }
            >
              <FiBookOpen />
              <span>Published Papers</span>
            </NavLink>
          </div>
        </div>

        {/* Profile Section */}
        <div className="Sidebar_Profile">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
          />

          <div className="Sidebar_ProfileInfo">
            <h4>PRWEB-001</h4>
            <p>Journal Administrator</p>
          </div>

          <button
            className="Sidebar_ProfileButton"
            onClick={() =>
              setShowProfileMenu(!showProfileMenu)
            }
          >
            <FiMoreVertical />
          </button>

          {showProfileMenu && (
            <div className="Sidebar_ProfilePopup">
              <div className="Sidebar_ProfilePopupItem">
                <FiBell />
                Notifications
              </div>

              <div className="Sidebar_ProfilePopupItem">
                <FiMessageSquare />
                Messages
              </div>

              <div className="Sidebar_ProfilePopupItem danger">
                <FiLogOut />
                Logout
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;