// PharmaHero.jsx

import React from "react";
import "./Homesec.css";
import {
  FaArrowRight,
  FaGlobe,
  FaBookOpen,
  FaSearch,
} from "react-icons/fa";

import heroBg from "../../assets/p-1.jpg";
import logo from "../../assets/p-2.jpeg";

const PharmaHero = () => {
  return (
    <section
      className="pharmaHero"
      style={{
        backgroundImage: `linear-gradient(
          rgba(3, 25, 52, 0.90),
          rgba(7, 55, 92, 0.85)
        ), url(${heroBg})`,
      }}
    >
      <div className="pharmaOverlay"></div>

      <div className="pharmaContainer">
        {/* LEFT CONTENT */}
        <div className="pharmaLeft">
          <div className="pharmaTag">
            <span className="tagDot"></span>
            Open Access • Peer-Reviewed • Quarterly
          </div>

          <div className="pharmaTitleWrap">
            <img src={logo} alt="journal-logo" className="pharmaLogo" />

            <h1 className="pharmaTitle">
              International Journal of
              <span> Pharmaceutical & Allied </span>
              Sciences Research
            </h1>
          </div>

          <p className="pharmaDescription">
            A global platform dedicated to innovative pharmaceutical and allied
            sciences research. Publish high-quality peer-reviewed articles with
            rapid review, international visibility, and impactful scientific
            contribution.
          </p>

          <div className="pharmaButtons">
            <button className="submitBtn">
              Submit Paper
              <FaArrowRight />
            </button>

            <button className="issueBtn">
              <FaBookOpen />
              Current Issue
            </button>
          </div>

          {/* SEARCH BOX */}
          <div className="pharmaSearch">
            <input
              type="text"
              placeholder="Search articles, authors, DOI, keywords..."
            />

            <button>
              <FaSearch />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="pharmaRight">
          <div className="statsCard">
            <div className="statBox">
              <h2>3-4</h2>
              <p>Days To Publish</p>
            </div>

            <div className="statBox">
              <h2>24h</h2>
              <p>Fast Track</p>
            </div>

            <div className="statBox">
              <h2>Global</h2>
              <p>Research Reach</p>
            </div>

            <div className="statBox">
              <h2>1-2</h2>
              <p>Days Review</p>
            </div>
          </div>

          <div className="floatingCard">
            <FaGlobe className="floatingIcon" />

            <div>
              <h3>International Visibility</h3>
              <p>
                Indexed and accessible worldwide for researchers, institutions,
                and scholars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PharmaHero;