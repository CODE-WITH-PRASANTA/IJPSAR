import React, { useState, useEffect } from "react";
import "./DashboardHome.css";
import {
  FaFileAlt,
  FaClock,
  FaMoneyCheckAlt,
  FaCheckCircle,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

// 1. Array containing all 6 cards configuration data
const dashboardStats = [
  {
    id: 1,
    title: "Total Submissions",
    targetValue: 1248,
    isCurrency: false,
    suffix: "",
    icon: <FaFileAlt />,
    color: "blue",
  },
  {
    id: 2,
    title: "Pending Papers",
    targetValue: 186,
    isCurrency: false,
    suffix: "",
    icon: <FaClock />,
    color: "orange",
  },
  {
    id: 3,
    title: "Pending Payments",
    targetValue: 94,
    isCurrency: false,
    suffix: "",
    icon: <FaMoneyCheckAlt />,
    color: "red",
  },
  {
    id: 4,
    title: "Published Papers",
    targetValue: 832,
    isCurrency: false,
    suffix: "",
    icon: <FaCheckCircle />,
    color: "green",
  },
  {
    id: 5,
    title: "Team Members",
    targetValue: 28,
    isCurrency: false,
    suffix: "",
    icon: <FaUsers />,
    color: "purple",
  },
  {
    id: 6,
    title: "All-Time Revenue",
    targetValue: 8.75,
    isCurrency: true,
    suffix: "L",
    icon: <FaRupeeSign />,
    color: "cyan",
  },
];

// 2. Count-Up Engine Component for smooth text numeric growth on load
const AnimatedCounter = ({ target, duration = 1000, isCurrency, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      const currentCount = easeOutQuad * target;
      
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  if (isCurrency) {
    return `${count.toFixed(2)}${suffix}`;
  }
  
  return Math.floor(count).toLocaleString() + suffix;
};

const DashboardHome = () => {
  return (
    <div className="dashboardHome">
      {/* Header */}
      <div className="dashboardHomeHeader">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Monitor publications, payments, submissions & revenue.</p>
        </div>
      </div>

      {/* Grid container generating all 6 cards via standard map loop */}
      <div className="dashboardHomeGrid">
        {dashboardStats.map((item, index) => (
          <div
            className={`dashboardCard dashboardCard-${item.color}`}
            key={item.id}
            style={{ animationDelay: `${index * 70}ms` }} /* Staggered load entrance */
          >
            <div className="dashboardCardTop">
              <span className="dashboardCardTitle">{item.title}</span>
              <div className="dashboardCardIcon">{item.icon}</div>
            </div>

            <div className="dashboardCardBottom">
              <h3>
                {item.isCurrency && <FaRupeeSign className="currencyIconPrefix" />}
                <AnimatedCounter 
                  target={item.targetValue} 
                  isCurrency={item.isCurrency} 
                  suffix={item.suffix}
                />
              </h3>
              <span className="dashboardCardGrowth">+12.8%</span>
            </div>

            <div className="dashboardCardGlow"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;