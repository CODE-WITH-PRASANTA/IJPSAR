// JournalHighlights.jsx

import React from "react";
import "./JournalHighlights.css";

import {
  FaChartLine,
  FaMedal,
  FaFingerprint,
} from "react-icons/fa";

const highlightsData = [
  {
    icon: <FaChartLine />,
    title: "Impact Factor 9.42",
    desc: "Calculated per JCR-equivalent methodology, 2024 cycle.",
  },
  {
    icon: <FaMedal />,
    title: "Q1 Quartile",
    desc: "Ranked Q1 in Pharmaceutical Sciences (Scopus CiteScore).",
  },
  {
    icon: <FaFingerprint />,
    title: "CrossRef DOI",
    desc: "Every article receives a permanent CrossRef DOI.",
  },
];

const JournalHighlights = () => {
  return (
    <section className="journalHighlights">
      <div className="journalHighlightsContainer">

        {highlightsData.map((item, index) => (
          <div className="journalHighlightCard" key={index}>

            {/* Glow */}
            <div className="journalHighlightGlow"></div>

            {/* Icon */}
            <div className="journalHighlightIcon">
              {item.icon}
            </div>

            {/* Content */}
            <div className="journalHighlightContent">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>

            {/* Hover Border */}
            <span className="journalHighlightBorder"></span>

          </div>
        ))}

      </div>
    </section>
  );
};

export default JournalHighlights;