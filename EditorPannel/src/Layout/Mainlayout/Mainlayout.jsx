import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Mainlayout.css";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div className="mainLayout">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
      />

      <div
        className={`mainLayoutContent ${
          sidebarCollapsed
            ? "mainLayoutContentCollapsed"
            : ""
        }`}
      >
        <Topbar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          setMobileSidebar={setMobileSidebar}
        />

        <main className="mainLayoutPage">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;