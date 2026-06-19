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
  FaUserTie,
  FaClipboardList,
  FaBookOpen,
  FaStar,
  FaAddressBook,
  FaBook,
} from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

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
      <aside className={`sidebar ${mobileOpen ? "mobileOpen" : ""}`}>
        {/* LOGO SECTION */}

        <div className="sidebarLogoSection">
          <div
            className="sidebarLogoWrapper"
            onClick={() => setShowLogoMenu(!showLogoMenu)}
          >
            <div className="sidebarLogoLeft">
              <img src={logo} alt="Logo" className="sidebarLogo" />

              <span>IJPASR</span>
            </div>

            <FaChevronDown />
          </div>

          {showLogoMenu && (
            <div className="logoPopupCard">
              <NavLink to="/profile">
                <FaUser />
                Profile Center
              </NavLink>

              <NavLink to="/authentication">
                <FaShieldAlt />
                Authentication & Security
              </NavLink>

              <NavLink to="/network">
                <FaNetworkWired />
                Editorial Network
              </NavLink>

              <NavLink to="/user-management">
                <FaUserShield />
                User Management
              </NavLink>

              <NavLink to="/logout">
                <FaSignOutAlt />
                Sign Out
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
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebarLink active" : "sidebarLink"
            }
          >
            <FaTachometerAlt />
            <span>Executive Dashboard</span>
          </NavLink>

          {/* Editor Management */}
          <div
            className="sidebarDropdown"
            onClick={() => setOpenMenu(openMenu === "editor" ? "" : "editor")}
          >
            <div className="sidebarDropdownLeft">
              <FaUserTie />
              <span>Editorial Management</span>
            </div>

            <FaChevronDown />
          </div>

          {openMenu === "editor" && (
            <div className="sidebarSubMenu">
              <NavLink to="/new-editor">New Editor</NavLink>

              <NavLink to="/manage-editor">Manage Editor</NavLink>
            </div>
          )}

          {/* Cold Lead Management */}
          <NavLink
            to="/cold-lead-management"
            className={({ isActive }) =>
              isActive ? "sidebarLink active" : "sidebarLink"
            }
          >
            <FaClipboardList />
            <span>Lead Management Hub</span>
          </NavLink>

          {/* Index & Abstracting Management */}
          <NavLink
            to="/index-abstracting-management"
            className={({ isActive }) =>
              isActive ? "sidebarLink active" : "sidebarLink"
            }
          >
            <FaBookOpen />
            <span>Indexing & Abstracting</span>
          </NavLink>

          {/* Publication Management */}
          <NavLink
            to="/publication-management"
            className={({ isActive }) =>
              isActive ? "sidebarLink active" : "sidebarLink"
            }
          >
            <FaBook />
            <span>Publication Management</span>
          </NavLink>
          <NavLink
            to="/inc-publication-management"
            className={({ isActive }) =>
              isActive ? "sidebarLink active" : "sidebarLink"
            }
          >
            <FaBook />
            <span>Inc-DocPublication Management</span>
          </NavLink>

          {/* Testimonial Management */}
          <NavLink
            to="/testimonial-management"
            className={({ isActive }) =>
              isActive ? "sidebarLink active" : "sidebarLink"
            }
          >
            <FaStar />
            <span>Author Testimonials</span>
          </NavLink>
          <NavLink
            to="/calendar-management"
            className={({ isActive }) =>
              isActive ? "sidebarLink active" : "sidebarLink"
            }
          >
            <FaCalendarAlt />
            <span>Calendar Management</span>
          </NavLink>
          {/* Contact Management */}
          <NavLink
            to="/contact-management"
            className={({ isActive }) =>
              isActive ? "sidebarLink active" : "sidebarLink"
            }
          >
            <FaAddressBook />
            <span>Contact & Support Center</span>
          </NavLink>
        </div>

        {/* FOOTER */}

        <div className="sidebarBottom">
          <div
            className="profileCard"
            onClick={() => setShowProfile(!showProfile)}
          >
            <img src="https://i.pravatar.cc/150" alt="Profile" />
          </div>

          <div className="bottomActions">
            <button className="bottomIcon" onClick={() => setShowChat(true)}>
              <FaCommentDots />
            </button>

            <button className="bottomIcon">
              <FaBell />
            </button>
          </div>

          {showProfile && (
            <div className="profilePopupCard">
              <div className="profileHeader">
                <img src="https://i.pravatar.cc/150" alt="" />

                <div>
                  <h4>Demo User</h4>
                  <p>demo@email.com</p>
                </div>
              </div>

              <NavLink to="/profile">Public Profile</NavLink>

              <NavLink to="/my-profile">My Profile</NavLink>

              <NavLink to="/account">My Account</NavLink>

              <button className="logoutBtn">
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* CHAT DRAWER */}

      <div className={`chatDrawer ${showChat ? "chatDrawerOpen" : ""}`}>
        <div className="chatDrawerHeader">
          <h3>Messages</h3>

          <button onClick={() => setShowChat(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="chatDrawerBody">
          <div className="messageLeft">Hello 👋</div>

          <div className="messageRight">Welcome Back 🚀</div>

          <div className="messageLeft">New notifications available.</div>

          <div className="messageRight">Everything is working perfectly.</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
