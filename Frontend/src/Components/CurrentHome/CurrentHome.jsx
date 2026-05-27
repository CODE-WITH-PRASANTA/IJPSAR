// CurrentHome.jsx

import React from "react";
import "./CurrentHome.css";
import { FaChevronRight } from "react-icons/fa";

const CurrentHome = () => {
  return (
    <section className="currenthome">
      {/* Background Overlay */}
      <div className="currenthome-overlay"></div>

      {/* Animated Glow */}
      <div className="currenthome-glow currenthome-glow1"></div>
      <div className="currenthome-glow currenthome-glow2"></div>

      <div className="currenthome-container">
        
        {/* Breadcrumb */}
        <div className="currenthome-breadcrumb">
          <span>Home</span>
          <FaChevronRight className="currenthome-icon" />
          <span className="active">Current Issue</span>
        </div>

        {/* Title */}
        <h1 className="currenthome-title">
          Current <span>Issue</span>
        </h1>

        {/* Decorative Line */}
        <div className="currenthome-line"></div>
      </div>
    </section>
  );
};

export default CurrentHome;