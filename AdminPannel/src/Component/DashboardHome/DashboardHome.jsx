import { useEffect, useState } from "react";
import "./DashboardHome.css";
import {
  FaFileAlt,
  FaClock,
  FaMoneyCheckAlt,
  FaCheckCircle,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

const dashboardStats = [
  {
    key: "totalSubmissions",
    title: "Total Submissions",
    isCurrency: false,
    suffix: "",
    icon: <FaFileAlt />,
    color: "blue",
  },
  {
    key: "pendingPapers",
    title: "Pending Papers",
    isCurrency: false,
    suffix: "",
    icon: <FaClock />,
    color: "orange",
  },
  {
    key: "pendingPayments",
    title: "Pending Payments",
    isCurrency: false,
    suffix: "",
    icon: <FaMoneyCheckAlt />,
    color: "red",
  },
  {
    key: "publishedPapers",
    title: "Published Papers",
    isCurrency: false,
    suffix: "",
    icon: <FaCheckCircle />,
    color: "green",
  },
  {
    key: "activeEditors",
    title: "Active Editors",
    isCurrency: false,
    suffix: "",
    icon: <FaUsers />,
    color: "purple",
  },
  {
    key: "revenue",
    title: "All-Time Revenue",
    isCurrency: true,
    suffix: "L",
    icon: <FaRupeeSign />,
    color: "cyan",
  },
];

const AnimatedCounter = ({ target, duration = 1000, isCurrency, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      const currentCount = easeOutQuad * (Number(target) || 0);
      
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

const DashboardHome = ({ stats, loading, error, onRetry }) => {
  const getTargetValue = (item) => {
    const value = Number(stats?.[item.key]) || 0;

    return item.isCurrency ? value / 100000 : value;
  };

  return (
    <div className="dashboardHome">
      <div className="dashboardHomeHeader">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Monitor publications, payments, submissions & revenue.</p>
        </div>
        {error && (
          <button className="dashboardRetryButton" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>

      <div className="dashboardHomeGrid">
        {dashboardStats.map((item, index) => (
          <div
            className={`dashboardCard dashboardCard-${item.color}`}
            key={item.key}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className="dashboardCardTop">
              <span className="dashboardCardTitle">{item.title}</span>
              <div className="dashboardCardIcon">{item.icon}</div>
            </div>

            <div className="dashboardCardBottom">
              <h3>
                {item.isCurrency && <FaRupeeSign className="currencyIconPrefix" />}
                <AnimatedCounter
                  target={getTargetValue(item)}
                  isCurrency={item.isCurrency} 
                  suffix={item.suffix}
                />
              </h3>
              <span
                className={`dashboardCardGrowth ${error ? "dashboardCardError" : ""}`}
              >
                {loading ? "Loading..." : error ? "Data unavailable" : "Live data"}
              </span>
            </div>

            <div className="dashboardCardGlow"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
