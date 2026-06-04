import React from "react";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import Sidebar from "../Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="mainLayout">
      <Sidebar />

      <main className="mainLayoutContent">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;