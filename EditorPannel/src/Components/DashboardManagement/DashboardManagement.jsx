import React from "react";
import "./DashboardManagement.css";

import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiStar,
  FiPlus,
  FiFileText,
  FiUsers,
  FiSend,
  FiArrowRight,
} from "react-icons/fi";

const DashboardManagement = () => {
  const activities = [
    {
      title: "Paper Accepted",
      time: "10 mins ago",
      icon: <FiCheckCircle />,
      color: "#22c55e",
    },
    {
      title: "New Review Assigned",
      time: "35 mins ago",
      icon: <FiClock />,
      color: "#f59e0b",
    },
    {
      title: "Author Registered",
      time: "1 hour ago",
      icon: <FiUser />,
      color: "#2563eb",
    },
    {
      title: "Issue Published",
      time: "Today",
      icon: <FiActivity />,
      color: "#8b5cf6",
    },
  ];

  const editors = [
    {
      name: "Dr. John Smith",
      role: "Chief Editor",
      papers: 156,
      rating: "4.9",
    },
    {
      name: "Dr. Emma Wilson",
      role: "Associate Editor",
      papers: 128,
      rating: "4.8",
    },
    {
      name: "Dr. Robert Lee",
      role: "Review Editor",
      papers: 95,
      rating: "4.7",
    },
  ];

  const actions = [
    {
      title: "Add Paper",
      icon: <FiPlus />,
    },
    {
      title: "Assign Reviewer",
      icon: <FiUsers />,
    },
    {
      title: "Publish Issue",
      icon: <FiFileText />,
    },
    {
      title: "Send Notification",
      icon: <FiSend />,
    },
  ];

  return (
    <section className="dashboardManagement">

      {/* Activity */}

      <div className="dashboardManagement-card">

        <div className="dashboardManagement-title">
          <FiActivity />
          <h3>Recent Activity</h3>
        </div>

        <div className="dashboardManagement-activityList">

          {activities.map((item, index) => (

            <div
              className="dashboardManagement-activity"
              key={index}
            >

              <div
                className="dashboardManagement-icon"
                style={{ background: item.color }}
              >
                {item.icon}
              </div>

              <div className="dashboardManagement-content">
                <h4>{item.title}</h4>
                <span>{item.time}</span>
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Editors */}

      <div className="dashboardManagement-card">

        <div className="dashboardManagement-title">
          <FiStar />
          <h3>Top Editors</h3>
        </div>

        <div className="dashboardManagement-editorList">

          {editors.map((editor, index) => (

            <div
              className="dashboardManagement-editor"
              key={index}
            >

              <div className="dashboardManagement-avatar">
                {editor.name.charAt(3)}
              </div>

              <div className="dashboardManagement-info">
                <h4>{editor.name}</h4>
                <p>{editor.role}</p>
              </div>

              <div className="dashboardManagement-score">
                <strong>{editor.papers}</strong>
                <span>Papers</span>
              </div>

              <div className="dashboardManagement-rating">
                ⭐ {editor.rating}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Quick Actions */}

      <div className="dashboardManagement-card">

        <div className="dashboardManagement-title">
          <FiPlus />
          <h3>Quick Actions</h3>
        </div>

        <div className="dashboardManagement-actions">

          {actions.map((action, index) => (

            <button
              key={index}
              className="dashboardManagement-actionBtn"
            >

              <span>{action.icon}</span>

              {action.title}

              <FiArrowRight />

            </button>

          ))}

        </div>

      </div>

    </section>
  );
};

export default DashboardManagement;