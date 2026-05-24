// Publication.jsx

import React, { useState } from "react";
import "./Publication.css";

import {
  FaPaperPlane,
  FaUserShield,
  FaUsers,
  FaPenNib,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const processData = [
  {
    id: "01",
    icon: <FaPaperPlane />,
    title: "Submit Paper",
    desc: "Upload your research paper through our secure submission system.",
  },
  {
    id: "02",
    icon: <FaUserShield />,
    title: "Editorial Check",
    desc: "Our editorial team verifies formatting, plagiarism and quality.",
  },
  {
    id: "03",
    icon: <FaUsers />,
    title: "Peer Review",
    desc: "Experts review your paper for authenticity and academic value.",
  },
  {
    id: "04",
    icon: <FaPenNib />,
    title: "Revise & Approve",
    desc: "Authors revise the paper based on reviewer feedback quickly.",
  },
  {
    id: "05",
    icon: <FaCheckCircle />,
    title: "Publish & DOI",
    desc: "Paper gets published online with DOI within 3–4 working days.",
  },
];

const Publication = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === processData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? processData.length - 1 : prev - 1
    );
  };

  return (
    <section className="publication-section">
      <div className="publication-container">

        {/* HEADER */}
        <div className="publication-header">
          <span className="publication-subtitle">
            PUBLICATION PROCESS
          </span>

          <h2 className="publication-title">
            From Submission To Online Publication
            <span> In Just 3–4 Working Days</span>
          </h2>

          <p className="publication-description">
            Fast, transparent and professional publication workflow
            designed for researchers, academicians and scholars worldwide.
          </p>
        </div>

        {/* DESKTOP VIEW */}
        <div className="publication-process-wrapper publication-desktop-view">
          {processData.map((item, index) => (
            <div className="publication-process-card" key={index}>

              <div className="publication-step-number">
                {item.id}
              </div>

              <div className="publication-icon-box">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              {index !== processData.length - 1 && (
                <div className="publication-line"></div>
              )}
            </div>
          ))}
        </div>

        {/* MOBILE SLIDER */}
        <div className="publication-mobile-slider">

          <button
            className="publication-mobile-btn left"
            onClick={prevSlide}
          >
            <FaChevronLeft />
          </button>

          <div className="publication-mobile-card-wrapper">

            <div className="publication-process-card mobile-card">

              <div className="publication-step-number">
                {processData[current].id}
              </div>

              <div className="publication-icon-box">
                {processData[current].icon}
              </div>

              <h3>{processData[current].title}</h3>

              <p>{processData[current].desc}</p>

            </div>

          </div>

          <button
            className="publication-mobile-btn right"
            onClick={nextSlide}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* DOTS */}
        <div className="publication-mobile-dots">
          {processData.map((_, index) => (
            <span
              key={index}
              className={`publication-dot ${
                current === index ? "active" : ""
              }`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Publication;