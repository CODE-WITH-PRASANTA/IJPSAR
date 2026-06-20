import React from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./SalesTime.css";

const SalesTime = () => {
  const chartData = [
    { month: "Jan", saving: 13, expense: 33, income: 45 },
    { month: "Feb", saving: 21, expense: 42, income: 52 },
    { month: "Mar", saving: 28, expense: 26, income: 39 },
    { month: "Apr", saving: 20, expense: 20, income: 24 },
    { month: "May", saving: 13, expense: 31, income: 33 },
    { month: "Jun", saving: 18, expense: 38, income: 26 },
    { month: "Jul", saving: 29, expense: 28, income: 44 },
    { month: "Aug", saving: 15, expense: 47, income: 55 },
    { month: "Sep", saving: 24, expense: 44, income: 45 },
    { month: "Oct", saving: 31, expense: 56, income: 48 },
    { month: "Nov", saving: 9, expense: 17, income: 35 },
    { month: "Dec", saving: 27, expense: 46, income: 60 },
  ];

  return (
    <div className="SalesTime">
      <div className="SalesTime-card">
        <div className="SalesTime-header">
          <div className="SalesTime-heading">
            <h2 className="SalesTime-title">SWIFT Revenue</h2>
            <p className="SalesTime-subtitle">
              Your data last update 1 hours ago.
            </p>
          </div>

          <button className="SalesTime-menuBtn">
            <BsThreeDots />
          </button>
        </div>

        <div className="SalesTime-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#E8EDF3"
                strokeDasharray="0"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#5E6A7D",
                  fontSize: 14,
                }}
              />

              <YAxis
                domain={[0, 70]}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#5E6A7D",
                  fontSize: 14,
                }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="saving"
                stroke="#178B52"
                strokeWidth={3}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#EF3E4A"
                strokeWidth={3}
                strokeDasharray="8 8"
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#1DA7A1"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="SalesTime-legend">
          <div className="SalesTime-legendItem">
            <span className="SalesTime-saving"></span>
            <span>Saving</span>
          </div>

          <div className="SalesTime-legendItem">
            <span className="SalesTime-expense"></span>
            <span>Expense</span>
          </div>

          <div className="SalesTime-legendItem">
            <span className="SalesTime-income"></span>
            <span>Income</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTime;