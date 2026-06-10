import React from "react";
import {
  MdDashboard,
  MdDescription,
  MdLibraryBooks,
  MdCardGiftcard,
  MdReceiptLong,
  MdFileDownload,
  MdLockReset,
} from "react-icons/md";

import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import Logo from "../../assets/p-2.jpeg";

const Sidebar = ({ collapsed, mobileOpen, setMobileOpen }) => {
  const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    title: "Unpublished Papers",
    path: "/unpublished-papers",
    icon: <MdDescription />,
    count: 7,
  },
  {
    title: "Published Papers",
    path: "/published-papers",
    icon: <MdLibraryBooks />,
    count: 15,
  },
  {
    title: "Redeem Points",
    path: "/redeem-points",
    icon: <MdCardGiftcard />,
  },
  {
    title: "Transaction History",
    path: "/transaction-history",
    icon: <MdReceiptLong />,
  },
  {
    title: "Download Certificate",
    path: "/download-certificate",
    icon: <MdFileDownload />,
  },
  {
    title: "Change Password",
    path: "/change-password",
    icon: <MdLockReset />,
  },
];

  return (
    <>
      {mobileOpen && (
        <div
          className="Sidebar_Backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`Sidebar ${
          collapsed ? "Sidebar_Collapsed" : ""
        } ${mobileOpen ? "Sidebar_MobileOpen" : ""}`}
      >
        <div className="Sidebar_Header">
          <img src={Logo} alt="" />

          {!collapsed && <h2>IJPSAR</h2>}

          <button
            className="Sidebar_Close"
            onClick={() => setMobileOpen(false)}
          >
           
          </button>
        </div>

        <div className="Sidebar_Menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "Sidebar_Link Sidebar_LinkActive"
                  : "Sidebar_Link"
              }
            >
              <span>{item.icon}</span>

              {!collapsed && <p>{item.title}</p>}
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;