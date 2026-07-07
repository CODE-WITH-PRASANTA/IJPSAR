import React from "react";
import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";
import "./DashboardOverview.css";

const REVIEW_STATUSES = [
  "Editor Assigned",
  "Editing",
  "Reviewer Assigned",
  "Review Pending",
  "Revision Required",
  "Accepted",
];

const getPercent = (value, total) =>
  total > 0 ? Math.round((value / total) * 100) : 0;

const isThisMonth = (dateValue) => {
  if (!dateValue) return false;

  const date = new Date(dateValue);
  const now = new Date();

  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

const DashboardOverview = ({
  papers = [],
  allPapers = [],
  editors = [],
  loading = false,
}) => {
  const totalPapers = papers.length;
  const underReview = papers.filter((paper) =>
    REVIEW_STATUSES.includes(paper.status)
  ).length;
  const published = papers.filter(
    (paper) => paper.status === "Published" || paper.isPublished
  ).length;
  const completed = papers.filter(
    (paper) => paper.status === "Completed" || paper.status === "Published"
  ).length;
  const accepted = papers.filter(
    (paper) =>
      paper.status === "Accepted" ||
      paper.status === "Completed" ||
      paper.status === "Published"
  ).length;
  const todaySubmissions = allPapers.filter((paper) => {
    if (!paper.createdAt) return false;

    return new Date(paper.createdAt).toDateString() === new Date().toDateString();
  }).length;
  const newAuthors = new Set(
    allPapers
      .filter((paper) => isThisMonth(paper.createdAt))
      .flatMap((paper) => paper.authors || [])
      .map((author) => author.email || author.fullName)
      .filter(Boolean)
  ).size;
  const activeEditors = editors.filter(
    (editor) => !editor.status || editor.status === "Active"
  ).length;

  const cards = [
    {
      id: 1,
      title: "Total Papers",
      value: totalPapers,
      growth: `${allPapers.length} all`,
      progress: getPercent(totalPapers, allPapers.length || totalPapers),
      color: "#2563eb",
      icon: <FiFileText />,
    },
    {
      id: 2,
      title: "Under Review",
      value: underReview,
      growth: `${getPercent(underReview, totalPapers)}%`,
      progress: getPercent(underReview, totalPapers),
      color: "#f59e0b",
      icon: <FiClock />,
    },
    {
      id: 3,
      title: "Published",
      value: published,
      growth: `${getPercent(published, totalPapers)}%`,
      progress: getPercent(published, totalPapers),
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
                {loading ? "..." : item.growth}
              </div>
            </div>

            <h5>{item.title}</h5>

            <h1>{loading ? "..." : item.value.toLocaleString()}</h1>

            <div className="dashboardOverview-progress">
              <div
                className="dashboardOverview-progressFill"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>

            <div className="dashboardOverview-footer">
              <span>{loading ? "..." : `${item.progress}% Completed`}</span>
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
            <strong>{loading ? "..." : `${getPercent(accepted, totalPapers)}%`}</strong>
          </div>

          <div className="dashboardOverview-line">
            <div style={{ width: `${getPercent(accepted, totalPapers)}%` }}></div>
          </div>

          <div className="dashboardOverview-row">
            <span>Review Completion</span>
            <strong>{loading ? "..." : `${getPercent(completed, totalPapers)}%`}</strong>
          </div>

          <div className="dashboardOverview-line">
            <div style={{ width: `${getPercent(completed, totalPapers)}%` }}></div>
          </div>

          <div className="dashboardOverview-row">
            <span>Issue Publication</span>
            <strong>{loading ? "..." : `${getPercent(published, completed)}%`}</strong>
          </div>

          <div className="dashboardOverview-line">
            <div style={{ width: `${getPercent(published, completed)}%` }}></div>
          </div>

        </div>

        <div className="dashboardOverview-stats">

          <div className="dashboardOverview-statBox">
            <h4>Today's Submission</h4>
            <span>{loading ? "..." : todaySubmissions}</span>
          </div>

          <div className="dashboardOverview-statBox">
            <h4>Active Editors</h4>
            <span>{loading ? "..." : activeEditors}</span>
          </div>

          <div className="dashboardOverview-statBox">
            <h4>New Authors</h4>
            <span>{loading ? "..." : newAuthors}</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DashboardOverview;
