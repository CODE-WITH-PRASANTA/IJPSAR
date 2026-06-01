import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

import logo from "../../assets/p-2.JPEG";

import {
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaShieldAlt,
  FaChevronDown,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaCommentDots,
  FaNetworkWired,
  FaUserShield,
  FaPlus,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoMenu, setShowLogoMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState("dashboard");

  return (
    <>
    <button
  className="mobileMenuBtn"
  onClick={() => setMobileOpen(!mobileOpen)}
>
  ☰
</button>
     <aside
  className={`sidebar ${
    mobileOpen ? "mobileOpen" : ""
  }`}
>
        {/* LOGO SECTION */}

        <div className="sidebarLogoSection">

          <div
            className="sidebarLogoWrapper"
            onClick={() => setShowLogoMenu(!showLogoMenu)}
          >
            <div className="sidebarLogoLeft">
              <img
                src={logo}
                alt="Logo"
                className="sidebarLogo"
              />

              <span>IJPASR</span>
            </div>

            <FaChevronDown />
          </div>

          {showLogoMenu && (
            <div className="logoPopupCard">

              <NavLink to="/profile">
                <FaUser />
                Public Profile
              </NavLink>

              <NavLink to="/account">
                <FaCog />
                Account
              </NavLink>

              <NavLink to="/network">
                <FaNetworkWired />
                Network
              </NavLink>

              <NavLink to="/authentication">
                <FaShieldAlt />
                Authentication
              </NavLink>

              <NavLink to="/user-management">
                <FaUserShield />
                User Management
              </NavLink>

            </div>
          )}

          <div className="sidebarActions">

            <button className="addNewBtn">
              <FaPlus />
              Add New
            </button>

            <button className="searchBtn">
              <FaSearch />
            </button>

          </div>

        </div>

        {/* MENU */}

        <div className="sidebarMenu">

          <div
            className="sidebarDropdown"
            onClick={() =>
              setOpenMenu(
                openMenu === "dashboard"
                  ? ""
                  : "dashboard"
              )
            }
          >
            <div className="sidebarDropdownLeft">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </div>

            <FaChevronDown />
          </div>

          {openMenu === "dashboard" && (
            <div className="sidebarSubMenu">

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "activeSubMenu"
                    : ""
                }
              >
                Dashboard Home
              </NavLink>

              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  isActive
                    ? "activeSubMenu"
                    : ""
                }
              >
                Analytics
              </NavLink>

              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive
                    ? "activeSubMenu"
                    : ""
                }
              >
                Reports
              </NavLink>

            </div>
          )}

          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaUsers />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/roles"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaShieldAlt />
            <span>Roles</span>
          </NavLink>

        </div>

        {/* FOOTER */}

        <div className="sidebarBottom">

          <div
            className="profileCard"
            onClick={() =>
              setShowProfile(!showProfile)
            }
          >
            <img
              src="https://i.pravatar.cc/150"
              alt="Profile"
            />
          </div>

          <div className="bottomActions">

            <button
              className="bottomIcon"
              onClick={() =>
                setShowChat(true)
              }
            >
              <FaCommentDots />
            </button>

            <button className="bottomIcon">
              <FaBell />
            </button>

          </div>

          {showProfile && (
            <div className="profilePopupCard">

              <div className="profileHeader">

                <img
                  src="https://i.pravatar.cc/150"
                  alt=""
                />

                <div>
                  <h4>Demo User</h4>
                  <p>demo@email.com</p>
                </div>

              </div>

              <NavLink to="/profile">
                Public Profile
              </NavLink>

              <NavLink to="/my-profile">
                My Profile
              </NavLink>

              <NavLink to="/account">
                My Account
              </NavLink>

              <button className="logoutBtn">
                <FaSignOutAlt />
                Logout
              </button>

            </div>
          )}

        </div>

      </aside>

      {/* CHAT DRAWER */}

      <div
        className={`chatDrawer ${
          showChat
            ? "chatDrawerOpen"
            : ""
        }`}
      >

        <div className="chatDrawerHeader">

          <h3>Messages</h3>

          <button
            onClick={() =>
              setShowChat(false)
            }
          >
            <FaTimes />
          </button>

        </div>

        <div className="chatDrawerBody">

          <div className="messageLeft">
            Hello 👋
          </div>

          <div className="messageRight">
            Welcome Back 🚀
          </div>

          <div className="messageLeft">
            New notifications available.
          </div>

          <div className="messageRight">
            Everything is working perfectly.
          </div>

        </div>

      </div>
    </>
  );
};

export default Sidebar;