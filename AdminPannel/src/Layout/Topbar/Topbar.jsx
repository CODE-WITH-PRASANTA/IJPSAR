import React, { useState } from "react";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import "./Topbar.css";

const Topbar = ({
  collapsed,
  setCollapsed,
  mobileSidebar,
  setMobileSidebar
}) => {

  const [profileOpen,setProfileOpen] = useState(false);

  const handleMenu = () => {

    if(window.innerWidth <= 992){
      setMobileSidebar(!mobileSidebar);
    }else{
      setCollapsed(!collapsed);
    }

  };

  return (
    <header
      className={`topbar ${
        collapsed ? "topbarCollapsed" : ""
      }`}
    >

      <div className="topbarLeft">

        <button
          className="topbarMenuBtn"
          onClick={handleMenu}
        >
          <FaBars />
        </button>

       

      </div>

      <div className="topbarRight">

        <div className="topbarBell">
          <FaBell />
          <span></span>
        </div>

        <div className="topbarProfile">

          <div
            className="topbarProfileBox"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
          >
            <img
              src="https://i.pravatar.cc/100"
              alt=""
            />

            <span>Admin</span>
          </div>

          <div
            className={`topbarDropdown ${
              profileOpen
                ? "topbarDropdownActive"
                : ""
            }`}
          >

            <button>
              <FaUserCircle />
              Profile
            </button>

            <button>
              <FaCog />
              Settings
            </button>

            <button>
              <FaSignOutAlt />
              Logout
            </button>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Topbar;