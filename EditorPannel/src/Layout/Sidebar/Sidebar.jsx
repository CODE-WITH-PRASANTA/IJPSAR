import React, { useState } from "react";
import "./Sidebar.css";

import {
  FaTachometerAlt,
  FaThLarge,
  FaFileAlt,
  FaUserShield,
  FaBell,
  FaLayerGroup,
  FaBook,
  FaChevronDown,
  FaChevronRight,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaEnvelope,
  FaChartBar,
  FaCalendarAlt,
  FaComments,
  FaEnvelopeOpen,
  FaCalendarCheck,
  FaStore,
  FaUser,
  FaDollarSign,
  FaQuestionCircle,
  FaPhoneAlt,
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

        <div className="sidebarLogo">

          <div className="sidebarLogoIcon">
            V
          </div>

          {!sidebarCollapsed && (
            <div className="sidebarLogoText">
              <h2>Velzon</h2>
              <p>Admin Panel</p>
            </div>
          )}

        </div>

        <div className="sidebarMenu">

          <div className="sidebarItem active">
            <div className="sidebarItemLeft">
              <FaTachometerAlt />
              {!sidebarCollapsed && (
                <span>Dashboard</span>
              )}
            </div>
          </div>

          {/* Apps */}

          <div
            className="sidebarItem"
            onClick={() =>
              toggleMenu("apps")
            }
          >
            <div className="sidebarItemLeft">
              <FaThLarge />
              {!sidebarCollapsed && (
                <span>Apps</span>
              )}
            </div>

            {!sidebarCollapsed &&
              (openMenu === "apps" ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              ))}
          </div>

          {!sidebarCollapsed &&
            openMenu === "apps" && (
              <div className="sidebarDropdown">

                <div className="sidebarSubItem">
                  <FaComments />
                  <span>Chat App</span>
                </div>

                <div className="sidebarSubItem">
                  <FaEnvelopeOpen />
                  <span>Email</span>
                </div>

                <div className="sidebarSubItem">
                  <FaCalendarCheck />
                  <span>Calendar</span>
                </div>

                <div className="sidebarSubItem">
                  <FaStore />
                  <span>Ecommerce</span>
                </div>

              </div>
            )}

          {/* Pages */}

          <div
            className="sidebarItem"
            onClick={() =>
              toggleMenu("pages")
            }
          >
            <div className="sidebarItemLeft">
              <FaFileAlt />
              {!sidebarCollapsed && (
                <span>Pages</span>
              )}
            </div>

            {!sidebarCollapsed &&
              (openMenu === "pages" ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              ))}
          </div>

          {!sidebarCollapsed &&
            openMenu === "pages" && (
              <div className="sidebarDropdown">

                <div className="sidebarSubItem">
                  <FaUser />
                  <span>Profile</span>
                </div>

                <div className="sidebarSubItem">
                  <FaDollarSign />
                  <span>Pricing</span>
                </div>

                <div className="sidebarSubItem">
                  <FaQuestionCircle />
                  <span>FAQ</span>
                </div>

                <div className="sidebarSubItem">
                  <FaPhoneAlt />
                  <span>Contact</span>
                </div>

              </div>
            )}

          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaUsers />
              {!sidebarCollapsed && (
                <span>Users</span>
              )}
            </div>
          </div>

          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaShoppingCart />
              {!sidebarCollapsed && (
                <span>Ecommerce</span>
              )}
            </div>
          </div>

          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaChartBar />
              {!sidebarCollapsed && (
                <span>Analytics</span>
              )}
            </div>
          </div>

          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaCalendarAlt />
              {!sidebarCollapsed && (
                <span>Calendar</span>
              )}
            </div>
          </div>

          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaUserShield />
              {!sidebarCollapsed && (
                <span>
                  Authentication
                </span>
              )}
            </div>
          </div>

          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaBell />
              {!sidebarCollapsed && (
                <span>
                  Notifications
                </span>
              )}
            </div>
          </div>

          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaEnvelope />
              {!sidebarCollapsed && (
                <span>Messages</span>
              )}
            </div>
          </div>

          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaLayerGroup />
              {!sidebarCollapsed && (
                <span>Components</span>
              )}
            </div>
          </div>

          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaCog />
              {!sidebarCollapsed && (
                <span>Settings</span>
              )}
            </div>
          </div>

          <div className="sidebarItem">
            <div className="sidebarItemLeft">
              <FaBook />
              {!sidebarCollapsed && (
                <span>
                  Documentation
                </span>
              )}
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;