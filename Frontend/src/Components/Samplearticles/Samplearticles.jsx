// Samplearticles.jsx

import React from "react";
import "./Samplearticles.css";

import {
  FaCalendarAlt,
  FaBookOpen,
  FaUsers,
  FaArrowRight,
  FaFilePdf,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const articles = [
  {
    id: 1,
    category: "Pharmaceutics",
    date: "Nov 12, 2025",
    volume: "Vol 12 · Issue 06",
    title:
      "Novel lipid nanoparticles enhance oral bioavailability of curcumin in rats",
    authors: "R. Sharma, J. Patel, M. Kuznetsov",
    doi: "10.55421/ijpasr.2025.1206.001",
  },

  {
    id: 2,
    category: "Pharmacology",
    date: "Nov 11, 2025",
    volume: "Vol 12 · Issue 06",
    title:
      "In-silico identification of natural inhibitors targeting SARS-CoV-2 Mpro protease",
    authors: "L. Okafor, A. Bensalem",
    doi: "10.55421/ijpasr.2025.1206.002",
  },

  {
    id: 3,
    category: "Microbiology",
    date: "Nov 10, 2025",
    volume: "Vol 12 · Issue 06",
    title:
      "Antimicrobial activity of green-synthesized silver nanoparticles",
    authors: "P. Krishnan, S. Iyer",
    doi: "10.55421/ijpasr.2025.1206.003",
  },

  {
    id: 4,
    category: "Clinical Pharmacy",
    date: "Nov 09, 2025",
    volume: "Vol 12 · Issue 06",
    title:
      "Pharmacovigilance trends in oncology drugs: a five-year retrospective analysis",
    authors: "M. Garcia, D. Romero",
    doi: "10.55421/ijpasr.2025.1206.004",
  },

  {
    id: 5,
    category: "Pharm Chemistry",
    date: "Nov 08, 2025",
    volume: "Vol 12 · Issue 06",
    title:
      "Synthesis and QSAR study of novel benzimidazole derivatives",
    authors: "K. Tanaka, H. Suzuki",
    doi: "10.55421/ijpasr.2025.1206.005",
  },

  {
    id: 6,
    category: "Pharmacognosy",
    date: "Nov 07, 2025",
    volume: "Vol 12 · Issue 06",
    title:
      "Phytochemical screening and hepatoprotective potential of Withania somnifera",
    authors: "A. Mehta, V. Joshi",
    doi: "10.55421/ijpasr.2025.1206.006",
  },
];

const Samplearticles = () => {

  const scrollLeft = () => {
    document
      .getElementById("samplearticles-slider")
      .scrollBy({
        left: -340,
        behavior: "smooth",
      });
  };

  const scrollRight = () => {
    document
      .getElementById("samplearticles-slider")
      .scrollBy({
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

            <h2>
              Sample articles from recent issues
            </h2>

          </div>

          <button className="samplearticles-view-btn">
            View all <FaArrowRight />
          </button>

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

        <div
          className="samplearticles-grid"
          id="samplearticles-slider"
        >

          {articles.map((item) => (

            <div className="samplearticles-card" key={item.id}>

              {/* TOP INFO */}

              <div className="samplearticles-meta-top">

                <span className="samplearticles-category">
                  {item.category}
                </span>

                <span className="samplearticles-date">
                  <FaCalendarAlt />
                  {item.date}
                </span>

              </div>

              {/* VOLUME */}

              <div className="samplearticles-volume">
                <FaBookOpen />
                {item.volume}
              </div>

              {/* TITLE */}

              <h3>
                {item.title}
              </h3>

              {/* AUTHORS */}

              <div className="samplearticles-authors">
                <FaUsers />
                {item.authors}
              </div>

              {/* DOI */}

              <div className="samplearticles-doi">
                DOI: {item.doi}
              </div>

              {/* FOOTER */}

              <div className="samplearticles-footer">

                <button className="samplearticles-pdf-btn">
                  <FaFilePdf />
                  PDF
                </button>

                <button className="samplearticles-read-btn">
                  Read article
                  <FaArrowRight />
                </button>

              </div>

              <div className="samplearticles-glow"></div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Samplearticles;