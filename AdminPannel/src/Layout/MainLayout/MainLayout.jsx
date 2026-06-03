import React from "react";
import "./MainLayout.css";
import Sidebar from "../Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="mainLayout">

      <Sidebar />

      <div className="mainLayoutContent">

        <div className="mainLayoutPageContent">

          <div className="dashboardCard">
            <h2>Welcome to Dashboard</h2>
            <p>
              Sidebar remains fixed and only sidebar has scrollbar.
            </p>
          </div>

          <div className="dashboardCard">
            <h2>Statistics</h2>
            <p>Add your dashboard widgets here.</p>
          </div>

          <div className="dashboardCard">
            <h2>Reports</h2>
            <p>Manage reports and analytics.</p>
          </div>

          <div className="dashboardCard">
            <h2>Students</h2>
            <p>Student information and records.</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default MainLayout;