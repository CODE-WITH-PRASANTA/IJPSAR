import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import logo from "../../assets/p-2.jpeg";
import API from "../../API/axios";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaBell,
  FaLayerGroup,
  FaBook,
  FaChevronDown,
  FaChevronRight,
  FaComments,
  FaUser,
  FaDollarSign,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarCollapsed, mobileSidebar, setMobileSidebar }) => {
  const [openMenu, setOpenMenu] = useState("apps");
  const [editor, setEditor] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("editorToken");
    localStorage.removeItem("editor");

    window.location.href = "/editor-login";
  };

  return (
    <>
      {mobileSidebar && (
        <div
          className="sidebarOverlay"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      <aside
        className={`sidebar
        ${sidebarCollapsed ? "sidebarCollapsed" : ""}
        ${mobileSidebar ? "sidebarMobileOpen" : ""}`}
      >
        {/* Mobile Header */}

        <div className="mobileSidebarHeader">
          <h3>Menu</h3>

          <button
            className="sidebarCloseBtn"
            onClick={() => setMobileSidebar(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Logo */}

        {!sidebarCollapsed && (
          <div className="sidebarLogo">
            <img src={logo} alt="IJPSAR Logo" className="sidebarLogoImage" />

            {!sidebarCollapsed && (
              <div className="sidebarLogoText">
                <h2>IJPSAR</h2>
                <p>Editor Panel</p>
              </div>
            )}
          </div>
        )}

        <div className="sidebarMenu">
          {/* Dashboard */}
          <NavLink to="/editor-dashboard" className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaTachometerAlt />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </div>
          </NavLink>

          {/* Paper Management */}
          <div className="sidebarItem" onClick={() => toggleMenu("paper")}>
            <div className="sidebarItemLeft">
              <FaFileAlt />
              {!sidebarCollapsed && <span>Paper Management</span>}
            </div>

            {!sidebarCollapsed &&
              (openMenu === "paper" ? <FaChevronDown /> : <FaChevronRight />)}
          </div>

          {openMenu === "paper" && !sidebarCollapsed && (
            <div className="sidebarDropdown">
              <NavLink to="/paper-management" className="sidebarSubItem">
                <FaFileAlt />
                <span>Assigned Papers</span>
              </NavLink>

              <NavLink to="/review-paper" className="sidebarSubItem">
                <FaBook />
                <span>Review Papers</span>
              </NavLink>

              <NavLink to="/publication" className="sidebarSubItem">
                <FaLayerGroup />
                <span>Publication</span>
              </NavLink>
            </div>
          )}

          {/* Profile */}
          <NavLink to="/editor-profile" className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaUser />
              {!sidebarCollapsed && <span>Profile Management</span>}
            </div>
          </NavLink>

          {/* Ticket */}
          <NavLink to="/raise-ticket" className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaBell />
              {!sidebarCollapsed && <span>Raise Ticket</span>}
            </div>
          </NavLink>

          {/* Chat */}
          <NavLink to="/editor-chat" className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaComments />
              {!sidebarCollapsed && <span>Chat</span>}
            </div>
          </NavLink>

          {/* Payment */}
          <NavLink to="/payment-info" className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaDollarSign />
              {!sidebarCollapsed && <span>Payment Information</span>}
            </div>
          </NavLink>
        </div>

        <div className="sidebarBottom">
          {!sidebarCollapsed && (
            <div className="sidebarUser">
              <div className="sidebarUserName">{editor?.name}</div>

              <div className="sidebarUserEmail">{editor?.email}</div>
            </div>
          )}

          <button className="sidebarLogout" onClick={handleLogout}>
            <FaSignOutAlt />

            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
