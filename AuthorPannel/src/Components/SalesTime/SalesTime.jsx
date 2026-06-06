import React from "react";
import "./SalesTime.css";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  FiDollarSign,
  FiMoreVertical,
} from "react-icons/fi";

const SalesTime = () => {
  const salesData = [
    { date: "07 May", thisMonth: 3100, lastMonth: 1900 },
    { date: "08 May", thisMonth: 3200, lastMonth: 2000 },
    { date: "09 May", thisMonth: 2800, lastMonth: 2300 },
    { date: "10 May", thisMonth: 2500, lastMonth: 1600 },
    { date: "11 May", thisMonth: 2500, lastMonth: 2300 },
    { date: "12 May", thisMonth: 2700, lastMonth: 2400 },
    { date: "13 May", thisMonth: 2900, lastMonth: 1900 },
    { date: "14 May", thisMonth: 2900, lastMonth: 2400 },
    { date: "15 May", thisMonth: 3600, lastMonth: 2000 },
    { date: "16 May", thisMonth: 3900, lastMonth: 1500 },
    { date: "17 May", thisMonth: 3800, lastMonth: 1400 },
    { date: "18 May", thisMonth: 3400, lastMonth: 1400 },
    { date: "19 May", thisMonth: 3600, lastMonth: 1400 },
    { date: "20 May", thisMonth: 3350, lastMonth: 1000 },
    { date: "21 May", thisMonth: 3350, lastMonth: 1600 },
    { date: "22 May", thisMonth: 3100, lastMonth: 1600 },
    { date: "23 May", thisMonth: 3500, lastMonth: 1800 },
    { date: "24 May", thisMonth: 3650, lastMonth: 1900 },
    { date: "25 May", thisMonth: 3500, lastMonth: 1650 },
    { date: "26 May", thisMonth: 2900, lastMonth: 1700 },
    { date: "27 May", thisMonth: 4200, lastMonth: 1750 },
    { date: "28 May", thisMonth: 3700, lastMonth: 1800 },
    { date: "29 May", thisMonth: 3600, lastMonth: 1700 },
    { date: "30 May", thisMonth: 4100, lastMonth: 1700 },
    { date: "31 May", thisMonth: 4500, lastMonth: 1200 },
    { date: "01 Jun", thisMonth: 4300, lastMonth: 1500 },
    { date: "02 Jun", thisMonth: 4400, lastMonth: 1000 },
    { date: "03 Jun", thisMonth: 4900, lastMonth: 1500 },
    { date: "04 Jun", thisMonth: 4884, lastMonth: 2021 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    return (
      <div className="SalesTime_Tooltip">
        <h4>{label}, 2026</h4>

        <div className="SalesTime_TooltipRow">
          <span className="SalesTime_BlueDot" />
          <span>This month:</span>
          <strong>
            $
            {payload[0]?.value?.toLocaleString()}
            .00
          </strong>
        </div>

        <div className="SalesTime_TooltipRow">
          <span className="SalesTime_LightDot" />
          <span>Last month:</span>
          <strong>
            $
            {payload[1]?.value?.toLocaleString()}
            .00
          </strong>
        </div>
      </div>
    );
  };

  return (
    <div className="SalesTime">

      <div className="SalesTime_Header">

        <div className="SalesTime_Title">
          <FiDollarSign />
          <span>Sales over time</span>
        </div>

        <button className="SalesTime_MenuBtn">
          <FiMoreVertical />
        </button>

      </div>

      <div className="SalesTime_Summary">

        <h2>$45,332.00</h2>

        <div className="SalesTime_Growth">
          ↑ +4.7% since last month
        </div>

      </div>

      <div className="SalesTime_Chart">

        <ResponsiveContainer
          width="100%"
          height={250}
        >
          <AreaChart data={salesData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
            />

            <YAxis hide />

            <Tooltip
              content={<CustomTooltip />}
            />

            <Area
              type="monotone"
              dataKey="lastMonth"
              stroke="#80A8FF"
              strokeWidth={3}
              strokeDasharray="4 4"
              fill="#DDE7FF"
              fillOpacity={0.4}
            />

            <Area
              type="monotone"
              dataKey="thisMonth"
              stroke="#3B5BDB"
              strokeWidth={3}
              fill="#3B5BDB"
              fillOpacity={0.12}
            />
          </AreaChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default SalesTime;