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
} from "react-icons/fi";

const Overview = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("30 days");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const periods = [
    "24 hours",
    "7 days",
    "30 days",
    "6 months",
  ];

  const cards = [
    {
      title: "Total Submissions",
      value: "1,248",
      change: "+12.8%",
      positive: true,
      icon: <FiFileText />,
    },
    {
      title: "Pending Papers",
      value: "186",
      change: "+12.8%",
      positive: true,
      icon: <FiClock />,
    },
    {
      title: "Pending Payments",
      value: "94",
      change: "+12.8%",
      positive: true,
      icon: <FiCreditCard />,
    },
    {
      title: "Published Papers",
      value: "832",
      change: "+12.8%",
      positive: true,
      icon: <FiCheckCircle />,
    },
  ];

  return (
    <div className="Overview">
      <div className="Overview_Header">
        <div className="Overview_HeaderLeft">
          <h2>Dashboard Overview</h2>

          <p>
            Monitor publications, payments,
            submissions & revenue.
          </p>
        </div>

        <div className="Overview_HeaderRight">
          <button className="Overview_ActionBtn">
            <FiDownload />
            Export
          </button>

          <button className="Overview_ActionBtn">
            <FiSliders />
            Customize
          </button>

          <div
            className="Overview_DropdownWrapper"
            ref={dropdownRef}
          >
            <button
              className="Overview_IconBtn"
              onClick={() =>
                setShowDropdown(!showDropdown)
              }
            >
              <FiCalendar />
            </button>

            {showDropdown && (
              <div className="Overview_Dropdown">
                {periods.map((item) => (
                  <div
                    key={item}
                    className={`Overview_DropdownItem ${
                      selectedPeriod === item
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedPeriod(item);
                      setShowDropdown(false);
                    }}
                  >
                    {selectedPeriod === item && (
                      <FiCheck />
                    )}
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="Overview_Cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className="Overview_Card"
          >
            <div className="Overview_CardTop">
              <div className="Overview_CardIcon">
                {card.icon}
              </div>

              <span>{card.title}</span>
            </div>

            <div className="Overview_CardBody">
              <h3>{card.value}</h3>

              <div
                className={`Overview_CardChange ${
                  card.positive
                    ? "positive"
                    : "negative"
                }`}
              >
                ↑

                <span>
                  {card.change} since last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;