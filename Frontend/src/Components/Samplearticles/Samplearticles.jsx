// Samplearticles.jsx

import "./Samplearticles.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API, BASE_URL } from "../../api/axios";

import {
  FaCalendarAlt,
  FaBookOpen,
  FaUsers,
  FaArrowRight,
  FaFilePdf,
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
} from "react-icons/fa";

const Samplearticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Phone number formatted for WhatsApp API (no spaces or plus sign)
  const whatsappNumber = "918868855677";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I would like to learn more about the published articles."
  )}`;

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await API.get("/submitform/all");

      if (data.success) {
        const published = data.data
          .filter((paper) => paper.status === "Published")
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 6);

        setArticles(published);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    document.getElementById("samplearticles-slider").scrollBy({
      left: -340,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    document.getElementById("samplearticles-slider").scrollBy({
      left: 340,
      behavior: "smooth",
    });
  };

  return (
    <section className="samplearticles">
      <div className="samplearticles-container">
        {/* TOP */}

        <div className="samplearticles-top">
          <div className="samplearticles-heading">
            <span className="samplearticles-tag">
              LATEST PUBLISHED ARTICLES
            </span>

            <h2>Sample articles from recent issues</h2>
          </div>

          {/* WHATSAPP LEARN MORE BUTTON */}
         <a
  href="https://wa.me/918868855677?text=Hello%2C%20I%20would%20like%20to%20learn%20more"
  target="_blank"
  rel="noopener noreferrer"
  className="samplearticles-view-btn"
  style={{
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <FaWhatsapp style={{ fontSize: "1.2rem" }} />
  Learn More <FaArrowRight />
</a>
        </div>

        {/* MOBILE NAV */}

        <div className="samplearticles-mobile-nav">
          <button onClick={scrollLeft}>
            <FaChevronLeft />
          </button>

          <button onClick={scrollRight}>
            <FaChevronRight />
          </button>
        </div>

        {/* GRID */}

        <div className="samplearticles-grid" id="samplearticles-slider">
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            articles.map((item) => (
              <div className="samplearticles-card" key={item.id || item._id}>
                {/* TOP INFO */}

                <div className="samplearticles-meta-top">
                  <span className="samplearticles-category">
                    {item.researchArea || "Research"}
                  </span>

                  <span className="samplearticles-date">
                    <FaCalendarAlt />
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                {/* VOLUME */}

                <div className="samplearticles-volume">
                  <FaBookOpen />
                  Volume {item.version}
                </div>

                {/* TITLE */}

                <h3>{item.paperTitle}</h3>

                {/* AUTHORS */}

                <div className="samplearticles-authors">
                  <FaUsers />
                  {item.authors?.map((author) => author.fullName).join(", ")}
                </div>

                {/* DOI */}

                <div className="samplearticles-doi">
                  Paper ID: {item.paperId}
                </div>

                {/* FOOTER */}

                <div className="samplearticles-footer">
                  <a
                    href={`${BASE_URL}${item.paperFile}`}
                    target="_blank"
                    rel="noreferrer"
                    className="samplearticles-pdf-btn"
                  >
                    <FaFilePdf />
                    PDF
                  </a>

                  <Link
                    to={`/sample-article/${item._id}`}
                    className="samplearticles-read-btn"
                  >
                    Read Article
                    <FaArrowRight />
                  </Link>
                </div>

                <div className="samplearticles-glow"></div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Samplearticles;