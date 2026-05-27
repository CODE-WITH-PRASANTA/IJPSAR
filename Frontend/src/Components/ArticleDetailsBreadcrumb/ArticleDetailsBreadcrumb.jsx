// ArticleDetailsBreadcrumb.jsx

import React from "react";
import "./ArticleDetailsBreadcrumb.css";

import {
  FaHome,
  FaChevronRight,
  FaFileMedicalAlt,
} from "react-icons/fa";

/* BACKGROUND IMAGE */
import breadcrumbBg from "../../assets/bg-9.jpg";

const ArticleDetailsBreadcrumb = () => {
  return (
    <section
      className="articleDetailsBread"
      style={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(3, 18, 38, 0.94),
            rgba(0, 92, 82, 0.82)
          ),
          url(${breadcrumbBg})
        `,
      }}
    >
      {/* OVERLAY */}
      <div className="articleDetailsBreadOverlay"></div>

      {/* GLOW */}
      <div className="articleDetailsGlowOne"></div>
      <div className="articleDetailsGlowTwo"></div>

      <div className="articleDetailsBreadContainer">

        {/* LEFT CONTENT */}
        <div className="articleDetailsBreadLeft">

          <span className="articleDetailsMiniTag">
            RESEARCH ARTICLE
          </span>

          <h1>
            Article <span>Details</span>
          </h1>

          <p>
            Explore publication information, article abstract,
            DOI details, references, indexing data,
            and author contributions.
          </p>

          {/* BREADCRUMB */}
          <div className="articleDetailsBreadPath">

            <a href="/">
              <FaHome />
              Home
            </a>

           

            <FaChevronRight className="articleDetailsArrow" />

            <span>Article Details</span>

          </div>

        </div>

        {/* RIGHT CARD */}
        <div className="articleDetailsBreadCard">

          <div className="articleDetailsCardIcon">
            <FaFileMedicalAlt />
          </div>

          <h3>
            Indexed Research <br />
            Publication
          </h3>

          <p>
            Access peer-reviewed pharmaceutical and allied
            sciences research with DOI indexing and
            citation-ready publication data.
          </p>

          <button>
            View Article
          </button>

        </div>

      </div>
    </section>
  );
};

export default ArticleDetailsBreadcrumb;