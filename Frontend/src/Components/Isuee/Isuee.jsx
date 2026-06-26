import React, { useEffect, useState } from "react";
import "./Isuee.css";
import API from "../../api/axios";

import {
  FaCalendarAlt,
  FaBookOpen,
  FaUserEdit,
  FaArrowRight,
  FaFilePdf,
  FaFolderOpen,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Isuee = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await API.get("/submitform/all");

      console.log("Articles Response:", data);

      if (data?.success) {
        setArticles(data.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="isuee">

      <div className="isuee-bg-glow isuee-glow1"></div>
      <div className="isuee-bg-glow isuee-glow2"></div>

      <div className="isuee-container">

        <div className="isuee-left">

          <div className="isuee-header">

            <div>
              <span className="isuee-subtitle">
                RESEARCH ARTICLES
              </span>

              <h1 className="isuee-title">
                Latest <span>Publications</span>
              </h1>
            </div>

            <button className="isuee-archive-btn">
              <FaFolderOpen />
              Browse Archives
            </button>

          </div>

          <div className="isuee-grid">

            {loading ? (
              <h3>Loading Articles...</h3>
            ) : articles.length === 0 ? (
              <h3>No Articles Found</h3>
            ) : (
              articles.map((item) => (
                <div
                  className="isuee-card"
                  key={item._id}
                >
                  <div className="isuee-card-top">

                    <span className="isuee-category">
                      {item.researchArea ||
                        "Research"}
                    </span>

                    <div className="isuee-date">
                      <FaCalendarAlt />

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </div>

                  </div>

                  <div className="isuee-volume">
                    <FaBookOpen />
                    Research Publication
                  </div>

                  <h3 className="isuee-card-title">
                    {item.paperTitle}
                  </h3>

                  <div className="isuee-authors">
                    <FaUserEdit />
                    {item.authorCategory}
                  </div>

                  <div className="isuee-doi">
                    <span>ID:</span>
                    <p>{item._id}</p>
                  </div>

                  <div className="isuee-card-bottom">

                    {item.paperFile && (
                      <a
                        href={`http://localhost:5000${item.paperFile}`}
                        target="_blank"
                        rel="noreferrer"
                        className="isuee-pdf-btn"
                      >
                        <FaFilePdf />
                        PDF
                      </a>
                    )}

                    <Link
                      to={`/sample-article/${item._id}`}
                      className="isuee-read-btn"
                    >
                      Read Article
                      <FaArrowRight />
                    </Link>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        <div className="isuee-sidebar">

          <div className="isuee-sidebar-card">

            <h3>Publication Summary</h3>

            <div className="isuee-detail-row">
              <span>Total Articles:</span>
              <p>{articles.length}</p>
            </div>

            <div className="isuee-detail-row">
              <span>Status:</span>
              <p>Published</p>
            </div>

          </div>

          <div className="isuee-sidebar-card">

            <h3>Most Recent Research</h3>

            <ul className="isuee-download-list">

              {articles
                .slice(0, 5)
                .map((item) => (
                  <li key={item._id}>
                    {item.paperTitle}
                  </li>
                ))}

            </ul>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Isuee;