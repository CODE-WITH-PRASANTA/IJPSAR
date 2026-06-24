import React from "react";
import "./CalendarPage.css";

import {
  FiMoreHorizontal,
  FiTrendingUp,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CalendarPage = () => {
  const revenueData = [
    { month: "Jan", saving: 13, expense: 33, income: 45 },
    { month: "Feb", saving: 21, expense: 42, income: 52 },
    { month: "Mar", saving: 28, expense: 26, income: 39 },
    { month: "Apr", saving: 20, expense: 20, income: 24 },
    { month: "May", saving: 13, expense: 31, income: 33 },
    { month: "Jun", saving: 18, expense: 38, income: 26 },
    { month: "Jul", saving: 30, expense: 28, income: 44 },
    { month: "Aug", saving: 15, expense: 47, income: 55 },
    { month: "Sep", saving: 24, expense: 44, income: 45 },
    { month: "Oct", saving: 32, expense: 56, income: 48 },
    { month: "Nov", saving: 9, expense: 17, income: 35 },
    { month: "Dec", saving: 27, expense: 46, income: 61 },
  ];

  return (
    <div className="calendar-page">
      <div className="calendar-container">

        <div className="calendarRevenueHeader">
          <div>
            <h2>SWIFT Revenue</h2>
            <p>Your data last update 1 hours ago.</p>
          </div>

          <button className="calendarRevenueMenu">
            <FiMoreHorizontal />
          </button>
        </div>

        <div className="calendarRevenueChart">
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={revenueData}>
              <CartesianGrid
                stroke="#e5e7eb"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Legend
                verticalAlign="bottom"
                height={50}
              />

              <Line
                type="monotone"
                dataKey="saving"
                stroke="#148C52"
                strokeWidth={3}
                dot={false}
                name="Saving"
              />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#E63946"
                strokeWidth={3}
                strokeDasharray="8 8"
                dot={false}
                name="Expense"
              />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#1F9D94"
                strokeWidth={3}
                dot={false}
                name="Income"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="calendarRevenueBottom">
          <h3>$45,332.00</h3>

          <div className="calendarRevenueGrowth">
            <FiTrendingUp />
            <span>+4.7% since last month</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CalendarPage;