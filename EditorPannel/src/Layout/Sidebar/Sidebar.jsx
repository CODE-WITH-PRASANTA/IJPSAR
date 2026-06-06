import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../assets/p-2.jpeg";

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
} from "react-icons/fa";

const Sidebar = ({
  sidebarCollapsed,
  mobileSidebar,
  setMobileSidebar,
}) => {
  const [openMenu, setOpenMenu] =
    useState("apps");

  const toggleMenu = (menu) => {
    setOpenMenu(
      openMenu === menu ? "" : menu
    );
  };

  return (
    <>
      {mobileSidebar && (
        <div
          className="sidebarOverlay"
          onClick={() =>
            setMobileSidebar(false)
          }
        />
      )}

      <aside
        className={`sidebar
        ${
          sidebarCollapsed
            ? "sidebarCollapsed"
            : ""
        }
        ${
          mobileSidebar
            ? "sidebarMobileOpen"
            : ""
        }`}
      >
        {/* Mobile Header */}

        <div className="mobileSidebarHeader">

          <h3>Menu</h3>

          <button
            className="sidebarCloseBtn"
            onClick={() =>
              setMobileSidebar(false)
            }
          >
            <FaTimes />
          </button>

        </div>

        {/* Logo */}


          {!sidebarCollapsed && (
           <div className="sidebarLogo">
                <img
                  src={logo}
                  alt="IJPSAR Logo"
                  className="sidebarLogoImage"
                />

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
          <div className="sidebarItem active">
            <div className="sidebarItemLeft">
              <FaTachometerAlt />
              {!sidebarCollapsed && (
                <span>Dashboard</span>
              )}
            </div>
          </div>

          {/* Paper Management */}
          <div
            className="sidebarItem"
            onClick={() => toggleMenu("paper")}
          >
            <div className="sidebarItemLeft">
              <FaFileAlt />
              {!sidebarCollapsed && (
                <span>Paper Management</span>
              )}
            </div>

            {!sidebarCollapsed &&
              (openMenu === "paper" ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              ))}
          </div>

          {!sidebarCollapsed &&
            openMenu === "paper" && (
              <div className="sidebarDropdown">

                <div className="sidebarSubItem">
                  <FaFileAlt />
                  <span>Submit Research Paper</span>
                </div>

                <div className="sidebarSubItem">
                  <FaBook />
                  <span>Preview Research Paper</span>
                </div>

                <div className="sidebarSubItem">
                  <FaLayerGroup />
                  <span>Publication</span>
                </div>

              </div>
            )}

          {/* Profile Management */}
          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaUser />
              {!sidebarCollapsed && (
                <span>Profile Management</span>
              )}
            </div>
          </div>

          {/* Ticket Raise */}
          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaBell />
              {!sidebarCollapsed && (
                <span>Raise Ticket</span>
              )}
            </div>
          </div>

          {/* Chat */}
          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaComments />
              {!sidebarCollapsed && (
                <span>Chat</span>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaDollarSign />
              {!sidebarCollapsed && (
                <span>Payment Information</span>
              )}
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;