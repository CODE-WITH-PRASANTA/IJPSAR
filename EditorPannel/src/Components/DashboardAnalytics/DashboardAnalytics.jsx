import React, { useMemo } from "react";
import "./DashboardAnalytics.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

import {
  FiBarChart2,
  FiPieChart,
  FiTrendingUp,
} from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const getMonthBuckets = () => {
  const now = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);

    return {
      label: date.toLocaleString("en-US", { month: "short" }),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  });
};

const isSameBucket = (dateValue, bucket) => {
  if (!dateValue) return false;

  const date = new Date(dateValue);
  return date.getMonth() === bucket.month && date.getFullYear() === bucket.year;
};

const DashboardAnalytics = ({
  papers = [],
  allPapers = [],
  loading = false,
}) => {
  const monthBuckets = useMemo(() => getMonthBuckets(), []);

  const monthlySeries = useMemo(() => {
    const source = papers.length ? papers : allPapers;

    return monthBuckets.map((bucket) => {
      const monthPapers = source.filter((paper) =>
        isSameBucket(paper.createdAt, bucket)
      );

      return {
        published: monthPapers.filter(
          (paper) => paper.status === "Published" || paper.isPublished
        ).length,
        pending: monthPapers.filter((paper) =>
          [
            "Submitted",
            "Editor Assigned",
            "Editing",
            "Reviewer Assigned",
            "Review Pending",
            "Revision Required",
            "Accepted",
          ].includes(paper.status)
        ).length,
        rejected: monthPapers.filter((paper) => paper.status === "Rejected").length,
      };
    });
  }, [allPapers, monthBuckets, papers]);

  const categoryData = useMemo(() => {
    const source = papers.length ? papers : allPapers;
    const counts = source.reduce((acc, paper) => {
      const category = paper.researchArea || "Others";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const entries = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return entries.length ? entries : [["No Data", 1]];
  }, [allPapers, papers]);

  const lineData = {
    labels: monthBuckets.map((bucket) => bucket.label),
    datasets: [
      {
        label: "Published",
        data: monthlySeries.map((item) => item.published),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,.12)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Pending",
        data: monthlySeries.map((item) => item.pending),
        borderColor: "#14b8a6",
        backgroundColor: "rgba(20,184,166,.08)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Rejected",
        data: monthlySeries.map((item) => item.rejected),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,.08)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const doughnutData = {
    labels: categoryData.map(([label]) => label),
    datasets: [
      {
        data: categoryData.map(([, value]) => value),
        backgroundColor: [
          "#2563eb",
          "#14b8a6",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <section className="dashboardAnalytics">

      <div className="dashboardAnalytics-card">

        <div className="dashboardAnalytics-header">
          <div>
            <h2>
              <FiBarChart2 />
              Paper Analytics
            </h2>

            <p>Monthly journal performance</p>
          </div>

          <div className="dashboardAnalytics-badge">
            <FiTrendingUp />
            {loading ? "..." : `${papers.length} papers`}
          </div>
        </div>

        <div className="dashboardAnalytics-chart">
          <Line
            data={lineData}
            options={lineOptions}
          />
        </div>

      </div>

      <div className="dashboardAnalytics-card">

        <div className="dashboardAnalytics-header">

          <div>
            <h2>
              <FiPieChart />
              Journal Categories
            </h2>

            <p>Distribution of published papers</p>
          </div>

        </div>

        <div className="dashboardAnalytics-doughnut">
          <Doughnut
            data={doughnutData}
            options={doughnutOptions}
          />
        </div>

      </div>

    </section>
  );
};

export default DashboardAnalytics;
