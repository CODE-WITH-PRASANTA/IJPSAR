import React from "react";
import "./AuthorGuidelinesBreadcrum.css";

import {
  FaHome,
  FaChevronRight,
  FaBookOpen,
} from "react-icons/fa";

/* IMPORT IMAGE */
import breadcrumbBg from "../../assets/bg-8.jpg";

const AuthorGuidelinesBreadcrum = () => {
  return (
    <section
      className="authorGuideBreadcrum"
      style={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(4, 25, 52, 0.92),
            rgba(0, 120, 110, 0.82)
          ),
          url(${breadcrumbBg})
        `,
      }}
    >
      {/* Background Overlay */}
      <div className="authorGuideBreadcrum-overlay"></div>

      {/* Glow Effects */}
      <div className="authorGuideBreadcrum-glowOne"></div>
      <div className="authorGuideBreadcrum-glowTwo"></div>

      <div className="authorGuideBreadcrum-container">

        {/* LEFT CONTENT */}
        <div className="authorGuideBreadcrum-left">

          <span className="authorGuideBreadcrum-tag">
            AUTHOR INSTRUCTIONS
          </span>

          <h1>
            Author <span>Guidelines</span>
          </h1>

          <p>
            Follow the official IJPASR manuscript preparation
            and submission standards for smooth peer review
            and publication.
          </p>

          {/* Breadcrumb */}
          <div className="authorGuideBreadcrum-path">

            <a href="/">
              <FaHome />
              Home
            </a>

            <FaChevronRight className="authorGuideBreadcrum-arrow" />

            <span>Author Guidelines</span>

          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="authorGuideBreadcrum-card">

          <div className="authorGuideBreadcrum-cardIcon">
            <FaBookOpen />
          </div>

          <h3>
            Manuscript <br />
            Preparation Guide
          </h3>

          <p>
            Ensure formatting, references,
            ethical compliance, and submission
            requirements before uploading your manuscript.
          </p>

          <button>
            Read Guidelines
          </button>

        </div>

      </div>
    </section>
  );
};

export default AuthorGuidelinesBreadcrum;