import React from "react";
import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";
import "./DashboardOverview.css";

const DashboardOverview = () => {
  const cards = [
    {
      id: 1,
      title: "Total Papers",
      value: "1,286",
      growth: "+18.6%",
      progress: 78,
      color: "#2563eb",
      icon: <FiFileText />,
    },
    {
      id: 2,
      title: "Under Review",
      value: "324",
      growth: "+9.3%",
      progress: 58,
      color: "#f59e0b",
      icon: <FiClock />,
    },
    {
      id: 3,
      title: "Published",
      value: "962",
      growth: "+25.1%",
      progress: 92,
      color: "#22c55e",
      icon: <FiCheckCircle />,
    },
  ];

  return (
    <section className="dashboardOverview">
      <div className="dashboardOverview-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Monitor journal activities and publication performance.</p>
        </div>

        <button className="dashboardOverview-btn">
          <FiTrendingUp />
          Monthly Report
        </button>
      </div>

      <div className="dashboardOverview-grid">
        {cards.map((item) => (
          <div
            className="dashboardOverview-card"
            key={item.id}
            style={{ "--accent": item.color }}
          >
            <div className="dashboardOverview-cardTop">
              <div className="dashboardOverview-icon">
                {item.icon}
              </div>

              <div className="dashboardOverview-growth">
                <FiArrowUpRight />
                {item.growth}
              </div>
            </div>

            <h5>{item.title}</h5>

            <h1>{item.value}</h1>

            <div className="dashboardOverview-progress">
              <div
                className="dashboardOverview-progressFill"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>

            <div className="dashboardOverview-footer">
              <span>{item.progress}% Completed</span>
              <span>This Month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboardOverview-bottom">

        <div className="dashboardOverview-summary">

          <h3>Publication Summary</h3>

          <div className="dashboardOverview-row">
            <span>Acceptance Rate</span>
            <strong>84%</strong>
          </div>

          <div className="dashboardOverview-line">
            <div style={{ width: "84%" }}></div>
          </div>

          <div className="dashboardOverview-row">
            <span>Review Completion</span>
            <strong>71%</strong>
          </div>

          <div className="dashboardOverview-line">
            <div style={{ width: "71%" }}></div>
          </div>

          <div className="dashboardOverview-row">
            <span>Issue Publication</span>
            <strong>93%</strong>
          </div>

          <div className="dashboardOverview-line">
            <div style={{ width: "93%" }}></div>
          </div>

        </div>

        <div className="dashboardOverview-stats">

          <div className="dashboardOverview-statBox">
            <h4>Today's Submission</h4>
            <span>46</span>
          </div>

          <div className="dashboardOverview-statBox">
            <h4>Active Editors</h4>
            <span>18</span>
          </div>

          <div className="dashboardOverview-statBox">
            <h4>New Authors</h4>
            <span>31</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DashboardOverview;