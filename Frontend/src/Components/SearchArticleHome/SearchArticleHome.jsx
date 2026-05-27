// SearchArticleHome.jsx

import React from "react";
import "./SearchArticleHome.css";

import {
  FaChevronRight,
} from "react-icons/fa";

const SearchArticleHome = () => {
  return (
    <section className="searcharticlehome">

      {/* PREMIUM GLOW */}
      <div className="searcharticlehome-glow searcharticlehome-glow1"></div>
      <div className="searcharticlehome-glow searcharticlehome-glow2"></div>

      {/* OVERLAY */}
      <div className="searcharticlehome-overlay"></div>

      <div className="searcharticlehome-container">

        {/* CONTENT */}
        <div className="searcharticlehome-content">

          {/* BREADCRUMB */}
          <div className="searcharticlehome-breadcrumb">

            <span>Home</span>

            <FaChevronRight className="searcharticlehome-breadcrumb-icon" />

            <span className="active">
              Search
            </span>

          </div>

          {/* TITLE */}
          <h1 className="searcharticlehome-title">
            Search <span>Articles</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="searcharticlehome-description">
            Discover peer-reviewed pharmaceutical research papers,
            archived journal issues, and scientific publications
            with our premium intelligent article search system.
          </p>

          {/* PREMIUM LINE */}
          <div className="searcharticlehome-line"></div>

        </div>

      </div>
    </section>
  );
};

export default SearchArticleHome;