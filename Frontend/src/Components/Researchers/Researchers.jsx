// Researchers.jsx

import React from "react";
import "./Researchers.css";

import {
  FaBolt,
  FaGlobe,
  FaLockOpen,
  FaFingerprint,
  FaShieldAlt,
  FaHeadset,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaBolt />,
    title: "Rapid Peer Review",
    desc: "Get review notifications within 1–2 working days with our streamlined editorial process.",
  },
  {
    id: 2,
    icon: <FaGlobe />,
    title: "Global Visibility",
    desc: "Boost your research reach with worldwide accessibility and indexing support.",
  },
  {
    id: 3,
    icon: <FaLockOpen />,
    title: "Open Access",
    desc: "Free and unrestricted worldwide readership for every published article.",
  },
  {
    id: 4,
    icon: <FaFingerprint />,
    title: "DOI per Article",
    desc: "Every accepted paper receives a unique DOI for better citation tracking.",
  },
  {
    id: 5,
    icon: <FaShieldAlt />,
    title: "Ethics First",
    desc: "Strict plagiarism checks and publication ethics for high-quality research.",
  },
  {
    id: 6,
    icon: <FaHeadset />,
    title: "Author Support",
    desc: "Dedicated editorial assistance and quick response support via email.",
  },
];

const Researchers = () => {
  const scrollLeft = () => {
    document
      .getElementById("researchersSlider")
      .scrollBy({
        left: -320,
        behavior: "smooth",
      });
  };

  const scrollRight = () => {
    document
      .getElementById("researchersSlider")
      .scrollBy({
        left: 320,
        behavior: "smooth",
      });
  };

  return (
    <section className="researchers">
      <div className="researchers-container">

        {/* HEADING */}
        <div className="researchers-heading">
          <span className="researchers-tag">
            WHY PUBLISH WITH US
          </span>

          <h2>
            Built for researchers,
            <br />
            trusted globally
          </h2>

          <p>
            Experience a premium academic publishing platform designed
            for fast, ethical, and globally recognized research publication.
          </p>
        </div>

        {/* MOBILE BUTTONS */}
        <div className="researchers-mobile-nav">
          <button onClick={scrollLeft}>
            <FaChevronLeft />
          </button>

          <button onClick={scrollRight}>
            <FaChevronRight />
          </button>
        </div>

        {/* CARDS */}
        <div
          className="researchers-grid"
          id="researchersSlider"
        >
          {features.map((item) => (
            <div className="researchers-card" key={item.id}>

              <div className="researchers-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <div className="researchers-card-glow"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Researchers;