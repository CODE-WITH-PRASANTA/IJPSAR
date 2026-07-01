import React from "react";
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

const DashboardAnalytics = () => {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Published",
        data: [35, 42, 55, 48, 66, 82],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,.12)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Pending",
        data: [22, 28, 24, 34, 26, 18],
        borderColor: "#14b8a6",
        backgroundColor: "rgba(20,184,166,.08)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Rejected",
        data: [8, 10, 12, 7, 9, 5],
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
    labels: [
      "Medical",
      "Computer",
      "Engineering",
      "Science",
      "Others",
    ],
    datasets: [
      {
        data: [35, 24, 18, 15, 8],
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
            +18%
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