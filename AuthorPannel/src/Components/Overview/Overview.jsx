import React, { useState, useRef, useEffect } from "react";
import "./Overview.css";

import {
  FiDownload,
  FiSliders,
  FiCalendar,
  FiCheck,
  FiFileText,
  FiClock,
  FiCreditCard,
  FiCheckCircle,
  FiHash,
} from "react-icons/fi";

/**
 * Animates a number from 0 -> value the first time it scrolls into view.
 * Formats with locale thousands separators (1,248) for any value —
 * not just a single hard-coded number.
 */
const AnimatedCounter = ({ value }) => {
  const [display, setDisplay] = useState(0);
  const nodeRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const animate = () => {
      const duration = 1200;
      const startTime = performance.now();
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setDisplay(Math.round(easeOutQuart(progress) * value));
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            animate();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <h3 className="Counter_Animate" ref={nodeRef}>
      {display.toLocaleString()}
    </h3>
  );
};

const Overview = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("30 days");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const periods = ["24 hours", "7 days", "30 days", "6 months"];

  const cards = [
    {
      id: "total-submissions",
      paperId: "IJPSAR-2026-001",
      title: "Total Submissions",
      value: 1248,
      change: "+12.8%",
      positive: true,
      icon: <FiFileText />,
      accentClass: "submissions-accent",
    },
    {
      id: "pending-papers",
      paperId: "IJPSAR-2026-002",
      title: "Pending Papers",
      value: 186,
      change: "+4.2%",
      positive: true,
      icon: <FiClock />,
      accentClass: "pending-accent",
    },
    {
      id: "pending-payments",
      paperId: "IJPSAR-2026-003",
      title: "Pending Payments",
      value: 94,
      change: "-2.5%",
      positive: false,
      icon: <FiCreditCard />,
      accentClass: "payments-accent",
    },
    {
      id: "published-papers",
      paperId: "IJPSAR-2026-004",
      title: "Published Papers",
      value: 832,
      change: "+18.4%",
      positive: true,
      icon: <FiCheckCircle />,
      accentClass: "published-accent",
    },
  ];

  return (
    <div className="Overview" id="dashboard-overview-root">
      {/* Header section */}
      <div className="Overview_Header" id="overview-header-sec">
        <div className="Overview_HeaderLeft">
          <h2>Dashboard Overview</h2>
          <p>Monitor publications, payments, submissions &amp; revenue.</p>
        </div>

        <div className="Overview_HeaderRight">
          <button className="Overview_ActionBtn" id="btn-export-data">
            <FiDownload />
            Export
          </button>

          <button className="Overview_ActionBtn" id="btn-customize-layout">
            <FiSliders />
            Customize
          </button>

          <div
            className="Overview_DropdownWrapper"
            ref={dropdownRef}
            id="period-dropdown-wrapper"
          >
            <button
              className="Overview_IconBtn"
              id="btn-period-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-haspopup="listbox"
              aria-expanded={showDropdown}
            >
              <FiCalendar />
            </button>

            {showDropdown && (
              <div
                className="Overview_Dropdown"
                id="period-dropdown-menu"
                role="listbox"
              >
                {periods.map((item, index) => (
                  <div
                    key={item}
                    id={`period-option-${index}`}
                    role="option"
                    aria-selected={selectedPeriod === item}
                    tabIndex={0}
                    className={`Overview_DropdownItem ${
                      selectedPeriod === item ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedPeriod(item);
                      setShowDropdown(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedPeriod(item);
                        setShowDropdown(false);
                      }
                    }}
                  >
                    {selectedPeriod === item && <FiCheck />}
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable card deck container */}
      <div className="Overview_Cards_Container" id="cards-scroll-container">
        <div className="Overview_Cards" id="overview-metric-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              id={`metric-card-${card.id}`}
              className={`Overview_Card ${card.accentClass}`}
            >
              {/* Header row: paper ID tag + icon — sits in normal flow,
                  so it can never overlap the content below it */}
              <div className="Overview_CardTop">
                <div
                  className="Overview_CardSerial"
                  id={`serial-tag-${card.id}`}
                >
                  <FiHash className="Serial_Icon" />
                  <span>{card.paperId}</span>
                </div>

                <div className="Overview_CardIcon">{card.icon}</div>
              </div>

              <div className="Overview_CardBody">
                <span className="Overview_CardLabel">{card.title}</span>

                <AnimatedCounter value={card.value} />

                <div
                  className={`Overview_CardChange ${
                    card.positive ? "positive" : "negative"
                  }`}
                  id={`trend-indicator-${card.id}`}
                >
                  <div className="Trend_Badge_Pill">
                    <span className="Trend_Arrow">
                      {card.positive ? "↑" : "↓"}
                    </span>
                    <span className="Trend_Percentage">{card.change}</span>
                  </div>
                  <span className="Trend_Label">since last month</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;