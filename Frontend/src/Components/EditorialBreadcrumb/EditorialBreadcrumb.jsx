// EditorialBreadcrumb.jsx
import React, { useState, useEffect } from "react";
import API from "../../api/axios";
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
  // Stats tracking states
  const [stats, setStats] = useState({
    totalEditors: "50+", // Matches visual fallback layout initial values
    totalCountries: "25+"
  });

  useEffect(() => {
    const computeLiveStats = async () => {
      try {
        const response = await API.get("/editorialboard/all");
        let dataArray = [];
        
        // Safely extract payload records array matching your standard router configurations
        if (Array.isArray(response.data)) {
          dataArray = response.data;
        } else if (response.data && Array.isArray(response.data.members)) {
          dataArray = response.data.members;
        } else if (response.data && typeof response.data === 'object') {
          dataArray = response.data.data || [];
        }

        if (dataArray.length > 0) {
          // 1. Calculate Total Registered Members
          const calculatedCount = dataArray.length;

          // 2. Parse out unique countries from dynamic locations/institutions strings
          const extractedCountries = new Set();
          dataArray.forEach((member) => {
            const locString = member.institution || member.location || "";
            if (locString.trim()) {
              // Extract the trailing component segment following the last comma separation token
              const segments = locString.split(",");
              const countryGuess = segments[segments.length - 1].trim();
              if (countryGuess.length > 1) {
                // Remove trailing full-stops or clean punctuation safely
                const cleanCountry = countryGuess.replace(/[.]+$/, "").trim();
                extractedCountries.add(cleanCountry.toLowerCase());
              }
            }
          });

          // Ensure if country scraping yielded zero returns due to input formatting, fallback cleanly
          const uniqueCountriesCount = extractedCountries.size > 0 ? extractedCountries.size : 25;

          setStats({
            totalEditors: `${calculatedCount}+`,
            totalCountries: `${uniqueCountriesCount}+`
          });
        }
      } catch (error) {
        console.error("Failed to update aggregate metrics inside breadcrumb:", error);
      }
    };

    computeLiveStats();
  }, []);

  // Smooth view scroll helper implementation for button module actions
  const handleScrollToGrid = () => {
    const targetedSection = document.querySelector(".editorialBoard");
    if (targetedSection) {
      targetedSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
                <h4>{stats.totalEditors}</h4>
                <span>Editors</span>
              </div>
            </div>

            <div className="editorialStatItem">
              <FaUsers />

              <div>
                <h4>{stats.totalCountries}</h4>
                <span>Countries</span>
              </div>
            </div>
          </div>

          <button onClick={handleScrollToGrid}>
            Explore Board
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditorialBreadcrumb;