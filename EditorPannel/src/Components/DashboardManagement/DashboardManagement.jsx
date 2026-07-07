import React, { useMemo } from "react";
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

const getTimeAgo = (dateValue) => {
  if (!dateValue) return "-";

  const seconds = Math.floor((Date.now() - new Date(dateValue).getTime()) / 1000);
  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  return new Date(dateValue).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getActivityMeta = (paper) => {
  if (paper.status === "Published") {
    return {
      title: "Paper Published",
      icon: <FiActivity />,
      color: "#8b5cf6",
    };
  }

  if (paper.status === "Completed") {
    return {
      title: "Paper Completed",
      icon: <FiCheckCircle />,
      color: "#22c55e",
    };
  }

  if (paper.status === "Review Pending" || paper.status === "Reviewer Assigned") {
    return {
      title: "Review Updated",
      icon: <FiClock />,
      color: "#f59e0b",
    };
  }

  return {
    title: paper.editorId ? "Paper Assigned" : "Paper Submitted",
    icon: paper.editorId ? <FiFileText /> : <FiUser />,
    color: paper.editorId ? "#2563eb" : "#14b8a6",
  };
};

const getInitial = (name = "") => name.trim().charAt(0).toUpperCase() || "E";

const DashboardManagement = ({
  papers = [],
  allPapers = [],
  editors = [],
  loading = false,
  error = "",
}) => {
  const activities = useMemo(
    () =>
      [...(papers.length ? papers : allPapers)]
        .sort(
          (a, b) =>
            new Date(
              b.publishedAt ||
                b.completedAt ||
                b.editorAssignedAt ||
                b.updatedAt ||
                b.createdAt ||
                0
            ) -
            new Date(
              a.publishedAt ||
                a.completedAt ||
                a.editorAssignedAt ||
                a.updatedAt ||
                a.createdAt ||
                0
            )
        )
        .slice(0, 4)
        .map((paper) => {
          const meta = getActivityMeta(paper);

          return {
            ...meta,
            paperTitle: paper.paperTitle,
            time: getTimeAgo(
              paper.publishedAt ||
                paper.completedAt ||
                paper.editorAssignedAt ||
                paper.updatedAt ||
                paper.createdAt
            ),
          };
        }),
    [allPapers, papers]
  );

  const topEditors = useMemo(() => {
    const editorMap = new Map(
      editors.map((editor) => [
        String(editor._id),
        {
          id: editor._id,
          name: editor.name || "Editor",
          role: editor.role || "Editor",
          papers: 0,
          rating: "5.0",
        },
      ])
    );

    allPapers.forEach((paper) => {
      const editorId =
        typeof paper.editorId === "object" ? paper.editorId?._id : paper.editorId;

      if (!editorId) return;

      const key = String(editorId);
      const current = editorMap.get(key) || {
        id: key,
        name: paper.editorName || "Editor",
        role: "Editor",
        papers: 0,
        rating: "5.0",
      };

      current.papers += 1;
      editorMap.set(key, current);
    });

    return Array.from(editorMap.values())
      .map((editor) => ({
        ...editor,
        papers:
          editor.papers ||
          editors.find((item) => String(item._id) === String(editor.id))
            ?.assignedPapers?.length ||
          0,
      }))
      .sort((a, b) => b.papers - a.papers)
      .slice(0, 3);
  }, [allPapers, editors]);

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

          {loading && <p className="dashboardManagement-empty">Loading activity...</p>}

          {!loading && error && <p className="dashboardManagement-empty">{error}</p>}

          {!loading && !error && activities.length === 0 && (
            <p className="dashboardManagement-empty">No activity found.</p>
          )}

          {!loading && !error && activities.map((item, index) => (

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
                <span>{item.paperTitle} - {item.time}</span>
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

          {loading && <p className="dashboardManagement-empty">Loading editors...</p>}

          {!loading && error && <p className="dashboardManagement-empty">{error}</p>}

          {!loading && !error && topEditors.length === 0 && (
            <p className="dashboardManagement-empty">No editors found.</p>
          )}

          {!loading && !error && topEditors.map((editor) => (

            <div
              className="dashboardManagement-editor"
              key={editor.id}
            >

              <div className="dashboardManagement-avatar">
                {getInitial(editor.name)}
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
