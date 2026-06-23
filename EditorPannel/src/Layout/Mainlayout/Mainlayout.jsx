import React, { useState } from "react";
import "./Mainlayout.css";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileSidebar, setMobileSidebar] =
    useState(false);

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

        <div className="mainLayoutPage">

          <div className="dashboardCard">
            Revenue Analytics
          </div>

          <div className="dashboardCard">
            Sales Statistics
          </div>

          <div className="dashboardCard">
            Customer Overview
          </div>

          <div className="dashboardCard">
            Orders Report
          </div>

          <div className="dashboardCard">
            Revenue Growth
          </div>

          <div className="dashboardCard">
            Monthly Performance
          </div>

        </div>
      </div>

    </div>
  );
};

export default MainLayout;