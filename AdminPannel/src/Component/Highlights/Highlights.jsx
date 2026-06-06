import React, { useState, useEffect, useRef } from "react";
import "./Highlights.css";
import {
  FaFacebook,
  FaInstagram,
  FaGoogle,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisV,
  FaRegEye,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";

// 1. Array containing static metrics configurations
const salesData = [
  { id: 1, icon: <BsShop />, title: "Online Store", targetValue: 172, trend: "up", change: "3.9%" },
  { id: 2, icon: <FaFacebook className="brand-fb" />, title: "Facebook", targetValue: 85, trend: "down", change: "0.7%" },
  { id: 3, icon: <FaInstagram className="brand-insta" />, title: "Instagram", targetValue: 36, trend: "up", change: "8.2%" },
  { id: 4, icon: <FaGoogle className="brand-google" />, title: "Google", targetValue: 26, trend: "up", change: "8.2%" },
  { id: 5, icon: <MdOutlineStoreMallDirectory />, title: "Retail", targetValue: 7, trend: "down", change: "0.7%" },
];

// 2. Extracted Smooth Count-Up Animation Hook Component
const DynamicCounter = ({ target, duration = 1000, decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      setCount(easeOutQuad * target);
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(animate);
    
    // Cleanup to prevent memory leaks if component unmounts
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return <span>{count.toFixed(decimals)}</span>;
};

const Highlights = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="highlightsWrapper">
      {/* LEFT SIDE HERO CARD */}
      <div className="highlightsHeroCard">
        <div className="highlightsIllustration">
          <div className="highlightsCircle">
            <HiOutlineUsers />
          </div>
          <div className="highlightsFloatingCard"></div>
        </div>
        <h2 className="highlightsHeroTitle">Swift Setup for New Teams</h2>
        <p className="highlightsHeroDescription">
          Enhance team formation and management with easy-to-use tools for
          communication, task organization, and progress tracking, all in one place.
        </p>
        <button className="highlightsCreateBtn">Create Team</button>
      </div>

      {/* RIGHT SIDE HIGHLIGHTS PANEL */}
      <div className="highlightsSidebar">
        <div className="highlightsHeader">
          {/* Heading updated here */}
          <h3>Latest Revenue</h3>
          <div className="dropdownContainer" ref={dropdownRef}>
            <button 
              className={`highlightsMenuBtn ${dropdownOpen ? "active" : ""}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Toggle Actions Menu"
            >
              <FaEllipsisV />
            </button>
            
            {dropdownOpen && (
              <div className="highlightsDropdownMenu">
                <button onClick={() => setDropdownOpen(false)}>
                  <FaRegEye /> View Details
                </button>
                <button onClick={() => setDropdownOpen(false)}>
                  <FaRegEdit /> Edit Widget
                </button>
                <button className="deleteAction" onClick={() => setDropdownOpen(false)}>
                  <FaRegTrashAlt /> Delete Data
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="highlightsSalesSection">
          <span className="highlightsSalesLabel">All time sales</span>
          <div className="highlightsSalesRow">
            <h2>
              $<DynamicCounter target={295.7} decimals={1} />k
            </h2>
            <span className="highlightsBadge">+2.7%</span>
          </div>

          {/* Progress Bar Segments */}
          <div className="highlightsProgress">
            <div className="highlightsProgressGreen"></div>
            <div className="highlightsProgressRed"></div>
            <div className="highlightsProgressPurple"></div>
          </div>

          {/* Legends */}
          <div className="highlightsLegend">
            <div className="highlightsLegendItem">
              <span className="legendDot green"></span>Metronic
            </div>
            <div className="highlightsLegendItem">
              <span className="legendDot red"></span>Bundle
            </div>
            <div className="highlightsLegendItem">
              <span className="legendDot purple"></span>MetronicNest
            </div>
          </div>
        </div>

        <div className="highlightsDivider"></div>

        {/* Dynamic List Items */}
        <div className="highlightsList">
          {salesData.map((item) => (
            <div className="highlightsListItem" key={item.id}>
              <div className="highlightsLeft">
                <div className="highlightsIcon">{item.icon}</div>
                <span>{item.title}</span>
              </div>
              <div className="highlightsRight">
                <strong>
                  ${<DynamicCounter target={item.targetValue} decimals={0} />}k
                </strong>
                <span className={item.trend === "up" ? "trendUp" : "trendDown"}>
                  {item.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;