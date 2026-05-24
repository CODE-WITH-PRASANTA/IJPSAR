// DiciplineWe.jsx

import React, { useState } from "react";
import "./DiciplineWe.css";

import {
  FaCapsules,
  FaDna,
  FaMicroscope,
  FaVial,
  FaSyringe,
  FaCog,
  FaFlask,
  FaStethoscope,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const disciplines = [
  {
    icon: <FaCapsules />,
    title: "Pharmaceutics",
    desc: "Formulation, novel drug delivery and biopharmaceutical innovations.",
  },

  {
    icon: <FaDna />,
    title: "Pharmacology",
    desc: "Mechanism of action, in-vivo and in-vitro experimental studies.",
  },

  {
    icon: <FaMicroscope />,
    title: "Pharmacognosy",
    desc: "Natural products, phytochemistry and phytomedicine research.",
  },

  {
    icon: <FaVial />,
    title: "Pharma Chemistry",
    desc: "Medicinal chemistry, analytical chemistry and QA studies.",
  },

  {
    icon: <FaSyringe />,
    title: "Clinical Pharmacy",
    desc: "Clinical research, pharmacovigilance and pharmacy practice.",
  },

  {
    icon: <FaCog />,
    title: "Biotechnology",
    desc: "Bioinformatics, biotech and advanced allied science research.",
  },

  {
    icon: <FaFlask />,
    title: "Medical Sciences",
    desc: "Biomedical, biological and health science innovations.",
  },

  {
    icon: <FaStethoscope />,
    title: "Allied Sciences",
    desc: "Chemistry, applied science and multidisciplinary research.",
  },
];

const DiciplineWe = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === disciplines.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? disciplines.length - 1 : prev - 1
    );
  };

  return (
    <section className="diciplinewe">

      <div className="diciplinewe-glow glow-one"></div>
      <div className="diciplinewe-glow glow-two"></div>

      <div className="diciplinewe-container">

        {/* HEADER */}
        <div className="diciplinewe-header">

          <span className="diciplinewe-tag">
            RESEARCH CATEGORIES
          </span>

          <h1 className="diciplinewe-title">
            Disciplines we publish
          </h1>

          <p className="diciplinewe-description">
            Comprehensive coverage of pharmaceutical,
            medical and allied science research domains.
          </p>

        </div>

        {/* DESKTOP VIEW */}
        <div className="diciplinewe-grid">

          {disciplines.map((item, index) => (
            <div className="diciplinewe-card" key={index}>

              <div className="diciplinewe-iconbox">
                <span className="diciplinewe-icon">
                  {item.icon}
                </span>
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <div className="diciplinewe-hoverline"></div>

            </div>
          ))}

        </div>

        {/* MOBILE VIEW */}
        <div className="diciplinewe-mobile-wrapper">

          <button
            className="diciplinewe-arrow left"
            onClick={prevSlide}
          >
            <FaChevronLeft />
          </button>

          <div className="diciplinewe-card mobile-card">

            <div className="diciplinewe-iconbox">
              <span className="diciplinewe-icon">
                {disciplines[currentSlide].icon}
              </span>
            </div>

            <h3>{disciplines[currentSlide].title}</h3>

            <p>{disciplines[currentSlide].desc}</p>

            <div className="diciplinewe-hoverline active-line"></div>

          </div>

          <button
            className="diciplinewe-arrow right"
            onClick={nextSlide}
          >
            <FaChevronRight />
          </button>

          {/* DOTS */}
          <div className="diciplinewe-dots">

            {disciplines.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`diciplinewe-dot ${
                  currentSlide === index ? "active-dot" : ""
                }`}
              ></span>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default DiciplineWe;