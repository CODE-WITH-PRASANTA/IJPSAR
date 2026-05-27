// EditorialBreadcrumb.jsx

import React from "react";
import "./EditorialBreadcrumb.css";

import {
  FaHome,
  FaChevronRight,
  FaUsers,
  FaArrowRight,
  FaUserGraduate,
} from "react-icons/fa";

import editorialBg from "../../assets/12.jpg";

const EditorialBreadcrumb = () => {
  return (
    <section
      className="editorialBreadcrumb"
      style={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(3, 18, 8, 0.82),
            rgba(5, 32, 12, 0.74),
            rgba(8, 52, 16, 0.70)
          ),
          url(${editorialBg})
        `,
      }}
    >
      {/* Glow Effects */}
      <div className="editorialGlow editorialGlow1"></div>
      <div className="editorialGlow editorialGlow2"></div>

      {/* Floating Effects */}
      <div className="floatingCircle circle1"></div>
      <div className="floatingCircle circle2"></div>

      <div className="editorialBreadcrumbContainer">
        {/* ================= LEFT ================= */}

        <div className="editorialBreadcrumbLeft">
          <span className="editorialTag">
            EDITORIAL BOARD
          </span>

          <h1>
            Editorial <span>Board</span>
          </h1>

          <p>
            Meet our international editorial experts,
            reviewers, and researchers ensuring
            excellence in scientific publishing.
          </p>

          <div className="editorialPath">
            <a href="/">
              <FaHome />
              Home
            </a>

            <FaChevronRight className="editorialArrow" />

            <span>Editorial Board</span>
          </div>
        </div>

        {/* ================= RIGHT CARD ================= */}

        <div className="editorialInfoCard">
          <div className="editorialCircle"></div>

          <div className="editorialCardTop">
            <FaUsers />

            <h3>Global Experts</h3>
          </div>

          <p>
            Dedicated editorial professionals from
            pharmaceutical and allied science fields.
          </p>

          <div className="editorialStats">
            <div className="editorialStatItem">
              <FaUserGraduate />

              <div>
                <h4>50+</h4>
                <span>Editors</span>
              </div>
            </div>

            <div className="editorialStatItem">
              <FaUsers />

              <div>
                <h4>25+</h4>
                <span>Countries</span>
              </div>
            </div>
          </div>

          <button>
            Explore Board
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditorialBreadcrumb;