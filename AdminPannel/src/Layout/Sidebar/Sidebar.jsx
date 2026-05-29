import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaClipboardList,
  FaCog
} from "react-icons/fa";

import "./Sidebar.css";

const menus = [
  {
    title:"Dashboard",
    icon:<FaTachometerAlt />,
    path:"/dashboard"
  },
  {
    title:"Students",
    icon:<FaUserGraduate />,
    path:"/students"
  },
  {
    title:"Teachers",
    icon:<FaChalkboardTeacher />,
    path:"/teachers"
  },
  {
    title:"Fees",
    icon:<FaMoneyBillWave />,
    path:"/fees"
  },
  {
    title:"Attendance",
    icon:<FaClipboardList />,
    path:"/attendance"
  },
  {
    title:"Settings",
    icon:<FaCog />,
    path:"/settings"
  }
];

const Sidebar = ({
  collapsed,
  mobileSidebar,
  setMobileSidebar
}) => {
  return (
    <aside
      className={`
      sidebar
      ${collapsed ? "sidebarCollapsed" : ""}
      ${mobileSidebar ? "sidebarMobileOpen" : ""}
      `}
    >

      <div className="sidebarLogo">
        {collapsed ? "S" : "IJPASR"}
      </div>

      <div className="sidebarMenus">

        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className="sidebarLink"
            onClick={() =>
              setMobileSidebar(false)
            }
          >
            <span className="sidebarIcon">
              {menu.icon}
            </span>

            {!collapsed && (
              <span>{menu.title}</span>
            )}
          </NavLink>
        ))}

      </div>

    </aside>
  );
};

export default Sidebar;