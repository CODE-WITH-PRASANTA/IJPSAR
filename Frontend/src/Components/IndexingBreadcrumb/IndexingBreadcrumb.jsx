// IndexingBreadcrumb.jsx

import React from "react";
import "./IndexingBreadcrumb.css";

import {
  FaHome,
  FaChevronRight,
  FaGlobe,
  FaBookOpen,
} from "react-icons/fa";

import breadcrumbBg from "../../assets/bg-2.jpg";

const IndexingBreadcrumb = () => {
  return (
    <section
      className="indexingBreadcrumb"
      style={{
        backgroundImage: `url(${breadcrumbBg})`,
      }}
    >
      {/* OVERLAY */}
      <div className="indexingBreadcrumbOverlay"></div>

      {/* ANIMATED GLOW */}
      <div className="indexingGlowOne"></div>
      <div className="indexingGlowTwo"></div>

      {/* CONTENT */}
      <div className="indexingBreadcrumbContainer">

        {/* LEFT CONTENT */}
        <div className="indexingBreadcrumbContent">

          <span className="indexingMiniTag">
            <FaGlobe />
            GLOBAL RESEARCH VISIBILITY
          </span>

          <h1>
            Indexing &
            <span> Abstracting</span>
          </h1>

          <p>
            IJPASR is indexed and abstracted in
            renowned international databases and
            scholarly platforms, ensuring maximum
            visibility, accessibility, and impact for
            published research worldwide.
          </p>

          {/* BREADCRUMB */}
          <div className="indexingBreadcrumbPath">

            <a href="/">
              <FaHome />
              Home
            </a>

            <FaChevronRight className="pathArrow" />

            <span>Indexing & Abstracting</span>

          </div>

        </div>

        {/* RIGHT INFO CARD */}
        <div className="indexingInfoCard">

          <div className="indexingCardIcon">
            <FaBookOpen />
          </div>

          <h3>International Reach</h3>

          <p>
            Enhancing global discoverability through
            trusted indexing and abstracting services.
          </p>

          <div className="indexingStats">

            <div className="indexingStatBox">
              <h4>50+</h4>
              <span>Research Platforms</span>
            </div>

            <div className="indexingStatBox">
              <h4>100%</h4>
              <span>Open Access</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default IndexingBreadcrumb;