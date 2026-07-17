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
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const ArchiveResesrche = () => {
  const [archiveData, setArchiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchArchiveData = async () => {
    try {
      setLoading(true);

      const response = await API.get("/submitform/published/archive");

      console.log("Archive Response:", response.data);

      setArchiveData(response.data.data || []);
    } catch (error) {
      console.error(
        "Archive fetch error:",
        error.response?.data || error.message,
      );

      setArchiveData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchiveData();
  }, []);

  return (
    <section className="archiveresearch">
      {/* GLOW EFFECTS */}
      <div className="archiveresearch-glow archiveresearch-glow1"></div>
      <div className="archiveresearch-glow archiveresearch-glow2"></div>

      <div className="archiveresearch-container">
        {/* TOP HEADER */}
        <div className="archiveresearch-header">
          <span className="archiveresearch-tag">JOURNAL ARCHIVES</span>

          <h2 className="archiveresearch-title">
            Explore Published
            <span> Research Volumes</span>
          </h2>

          <p className="archiveresearch-description">
            Browse the complete IJPASR archive — 12 years of pharmaceutical
            research, peer-reviewed articles, and indexed scientific
            publications.
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

            <div className="archiveresearch-action">Browse</div>
          </div>

          {/* TABLE ROWS */}
          {loading ? (
            <div className="archiveresearch-loading">Loading archive...</div>
          ) : archiveData.length === 0 ? (
            <div className="archiveresearch-loading">
              No published research found.
            </div>
          ) : (
            archiveData.map((item) => (
              <div className="archiveresearch-row" key={item.year}>
                <div className="archiveresearch-year" data-label="Year">
                  {item.year}
                </div>

                <div data-label="Volume">Volume {item.volume}</div>

                <div data-label="Issues">{item.issues} Issues</div>

                <div data-label="Articles">{item.articles} Articles</div>

                <div className="archiveresearch-btn-box" data-label="Browse">
                  <button
                    className="archiveresearch-btn"
                    onClick={() => navigate(`/current-issue?year=${item.year}`)}
                  >
                    Browse
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ArchiveResesrche;
