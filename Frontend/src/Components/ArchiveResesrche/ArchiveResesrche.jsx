// ArchiveResesrche.jsx

import React from "react";
import "./ArchiveResesrche.css";
import {
  FaArrowRight,
  FaBookOpen,
  FaLayerGroup,
  FaFileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const archiveData = [
  {
    year: "2025",
    volume: "Volume 12",
    issues: "12 Issues",
    articles: "259 Articles",
  },
  {
    year: "2024",
    volume: "Volume 11",
    issues: "12 Issues",
    articles: "258 Articles",
  },
  {
    year: "2023",
    volume: "Volume 10",
    issues: "12 Issues",
    articles: "221 Articles",
  },
  {
    year: "2022",
    volume: "Volume 9",
    issues: "12 Issues",
    articles: "237 Articles",
  },
  {
    year: "2021",
    volume: "Volume 8",
    issues: "12 Issues",
    articles: "257 Articles",
  },
  {
    year: "2020",
    volume: "Volume 7",
    issues: "12 Issues",
    articles: "233 Articles",
  },
  {
    year: "2019",
    volume: "Volume 6",
    issues: "12 Issues",
    articles: "221 Articles",
  },
  {
    year: "2018",
    volume: "Volume 5",
    issues: "12 Issues",
    articles: "245 Articles",
  },
  {
    year: "2017",
    volume: "Volume 4",
    issues: "12 Issues",
    articles: "260 Articles",
  },
  {
    year: "2016",
    volume: "Volume 3",
    issues: "12 Issues",
    articles: "258 Articles",
  },
  {
    year: "2015",
    volume: "Volume 2",
    issues: "12 Issues",
    articles: "228 Articles",
  },
  {
    year: "2014",
    volume: "Volume 1",
    issues: "12 Issues",
    articles: "247 Articles",
  },
];

const ArchiveResesrche = () => {
  return (
    <section className="archiveresearch">

      {/* GLOW EFFECTS */}
      <div className="archiveresearch-glow archiveresearch-glow1"></div>
      <div className="archiveresearch-glow archiveresearch-glow2"></div>

      <div className="archiveresearch-container">

        {/* TOP HEADER */}
        <div className="archiveresearch-header">

          <span className="archiveresearch-tag">
            JOURNAL ARCHIVES
          </span>

          <h2 className="archiveresearch-title">
            Explore Published
            <span> Research Volumes</span>
          </h2>

          <p className="archiveresearch-description">
            Browse the complete IJPASR archive —
            12 years of pharmaceutical research,
            peer-reviewed articles, and indexed
            scientific publications.
          </p>

        </div>

        {/* TABLE */}
        <div className="archiveresearch-table-wrapper">

          {/* TABLE HEADER */}
          <div className="archiveresearch-table-header">

            <div>
              <FaLayerGroup />
              Year
            </div>

            <div>
              <FaBookOpen />
              Volume
            </div>

            <div>
              <FaFileAlt />
              Issues
            </div>

            <div>
              <FaBookOpen />
              Articles
            </div>

            <div className="archiveresearch-action">
              Browse
            </div>

          </div>

          {/* TABLE ROWS */}
          {archiveData.map((item, index) => (
            <div
              className="archiveresearch-row"
              key={index}
            >

              <div
                className="archiveresearch-year"
                data-label="Year"
              >
                {item.year}
              </div>

              <div data-label="Volume">
                {item.volume}
              </div>

              <div data-label="Issues">
                {item.issues}
              </div>

              <div data-label="Articles">
                {item.articles}
              </div>

              <div
                className="archiveresearch-btn-box"
                data-label="Browse"
              >

  <div
  className="archiveresearch-btn-box"
  data-label="Browse"
>
  <button
    className="archiveresearch-btn"
    onClick={() =>
      window.location.href = "/current-issue"
    }
  >
    Browse
    <FaArrowRight />
  </button>
</div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ArchiveResesrche;