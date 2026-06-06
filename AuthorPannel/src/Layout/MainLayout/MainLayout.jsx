import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

import Sidebar from "../Sidebar/Sidebar";
import "./MainLayout.css";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="MainLayout">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="MainLayout_Content">

        {/* Mobile Header */}
        <div className="MainLayout_MobileHeader">
          <button
            className="MainLayout_MenuBtn"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>

          <h2>Dashboard</h2>
        </div>

        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;