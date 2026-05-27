// AboutBreadcrumb.jsx

import React from "react";
import "./AboutBreadcrumb.css";

import {
  FaChevronRight,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";

/* IMPORT BACKGROUND IMAGE */
import breadcrumbBg from "../../assets/Chemical-1.jpg";

const AboutBreadcrumb = () => {
  return (
    <section
      className="aboutBreadcrumb"
      style={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(2, 22, 8, 0.90),
            rgba(6, 48, 18, 0.82),
            rgba(16, 62, 20, 0.72)
          ),
          url(${breadcrumbBg})
        `,
      }}
    >
      {/* Animated Glow Effects */}
      <div className="aboutGlow aboutGlow1"></div>
      <div className="aboutGlow aboutGlow2"></div>

      <div className="aboutBreadcrumbContainer">
        {/* ================= LEFT CONTENT ================= */}

        <div className="aboutBreadcrumbContent">
          {/* TAG */}
          <span className="aboutMiniTag">
            ABOUT OUR JOURNAL
          </span>

          {/* TITLE */}
          <h1>
            About <span>IJPASR</span>
          </h1>

          {/* DESCRIPTION */}
          <p>
            International Journal of Pharmaceutical &
            Allied Sciences Research is committed to
            advancing scientific innovation, quality
            research publication, and global academic
            collaboration through peer-reviewed and
            open-access publishing.
          </p>

          {/* BREADCRUMB */}
          <div className="breadcrumbPath">
            <a href="/">
              <FaHome />
              Home
            </a>

            <FaChevronRight className="breadcrumbArrow" />

            <span>About Us</span>
          </div>
        </div>

        {/* ================= RIGHT CARD ================= */}

        <div className="aboutRightCard">
          {/* Animated Circle */}
          <div className="circleAnimation"></div>

          <h3>
            Trusted Global Research Platform
          </h3>

          <p>
            Empowering researchers and scholars with
            rapid publication, international visibility,
            expert peer review, and impactful scientific
            communication worldwide.
          </p>

          <button>
            Explore Journal
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutBreadcrumb;