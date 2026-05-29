import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import "./MainLayout.css";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div className="mainLayout">

      <Sidebar
        collapsed={collapsed}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
      />

      {mobileSidebar && (
        <div
          className="mainLayoutOverlay"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      <div
        className={`mainLayoutContent ${
          collapsed ? "mainLayoutContentCollapsed" : ""
        }`}
      >
        <Topbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileSidebar={mobileSidebar}
          setMobileSidebar={setMobileSidebar}
        />

        <div className="mainLayoutPage">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default MainLayout;