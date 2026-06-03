// Isuee.jsx

import React from "react";
import "./Isuee.css";

import {
  FaCalendarAlt,
  FaBookOpen,
  FaUserEdit,
  FaArrowRight,
  FaFilePdf,
  FaFolderOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const articleData = [
  {
    category: "Pharmaceutics",
    date: "Nov 12, 2025",
    title:
      "Novel lipid nanoparticles enhance oral bioavailability of curcumin in rats",
    authors: "R. Sharma, J. Patel, M. Kuznetsov",
    doi: "10.55421/ijpasr.2025.1206.001",
  },
  {
    category: "Pharmacology",
    date: "Nov 11, 2025",
    title:
      "In-silico identification of natural inhibitors targeting SARS-CoV-2 Mpro protease",
    authors: "L. Okafor, A. Bensalem",
    doi: "10.55421/ijpasr.2025.1206.002",
  },
  {
    category: "Microbiology",
    date: "Nov 10, 2025",
    title:
      "Antimicrobial activity of green-synthesized silver nanoparticles",
    authors: "P. Krishnan, S. Iyer",
    doi: "10.55421/ijpasr.2025.1206.003",
  },
  {
    category: "Clinical Pharmacy",
    date: "Nov 09, 2025",
    title:
      "Pharmacovigilance trends in oncology drugs: a retrospective analysis",
    authors: "M. Garcia, D. Romero",
    doi: "10.55421/ijpasr.2025.1206.004",
  },
  {
    category: "Pharm Chemistry",
    date: "Nov 08, 2025",
    title:
      "Synthesis and QSAR study of novel benzimidazole derivatives",
    authors: "K. Tanaka, H. Suzuki",
    doi: "10.55421/ijpasr.2025.1206.005",
  },
  {
    category: "Pharmacognosy",
    date: "Nov 07, 2025",
    title:
      "Phytochemical screening and hepatoprotective potential of plant extract",
    authors: "A. Mehta, V. Joshi",
    doi: "10.55421/ijpasr.2025.1206.006",
  },
];

const Isuee = () => {
  return (
    <section className="isuee">

      {/* GLOW EFFECTS */}
      <div className="isuee-bg-glow isuee-glow1"></div>
      <div className="isuee-bg-glow isuee-glow2"></div>

      <div className="isuee-container">

        {/* LEFT SIDE */}
        <div className="isuee-left">

          {/* HEADER */}
          <div className="isuee-header">

            <div>
              <span className="isuee-subtitle">
                VOLUME 12 • ISSUE 06
              </span>

              <h1 className="isuee-title">
                December <span>2025</span>
              </h1>
            </div>

            <button className="isuee-archive-btn">
              <FaFolderOpen />
              Browse Archives
            </button>

          </div>

          {/* ARTICLES GRID */}
          <div className="isuee-grid">

            {articleData.map((item, index) => (
              <div className="isuee-card" key={index}>

                <div className="isuee-card-top">

                  <span className="isuee-category">
                    {item.category}
                  </span>

                  <div className="isuee-date">
                    <FaCalendarAlt />
                    {item.date}
                  </div>

                </div>

                <div className="isuee-volume">
                  <FaBookOpen />
                  Vol 12 • Issue 06
                </div>

                <h3 className="isuee-card-title">
                  {item.title}
                </h3>

                <div className="isuee-authors">
                  <FaUserEdit />
                  {item.authors}
                </div>

                <div className="isuee-doi">
                  <span>DOI:</span>
                  <p>{item.doi}</p>
                </div>

                <div className="isuee-card-bottom">

                  <button className="isuee-pdf-btn">
                    <FaFilePdf />
                    PDF
                  </button>

                 <Link
  to="/sample-article"
  className="isuee-read-btn"
>
  Read Article
  <FaArrowRight />
</Link>

                </div>

              </div>
            ))}

          </div>
        </div>

        {/* SIDEBAR */}
        <div className="isuee-sidebar">

          {/* ISSUE DETAILS */}
          <div className="isuee-sidebar-card">

            <h3>Issue Details</h3>

            <div className="isuee-detail-row">
              <span>Volume:</span>
              <p>12</p>
            </div>

            <div className="isuee-detail-row">
              <span>Issue:</span>
              <p>06</p>
            </div>

            <div className="isuee-detail-row">
              <span>Month:</span>
              <p>December 2025</p>
            </div>

            <div className="isuee-detail-row">
              <span>Articles:</span>
              <p>24</p>
            </div>

            <div className="isuee-detail-row">
              <span>Pages:</span>
              <p>1247</p>
            </div>

          </div>

          {/* FILTER */}
          <div className="isuee-sidebar-card">

            <h3>Filter Articles</h3>

            {/* CATEGORY */}
            <div className="isuee-select-wrapper">

              <select className="isuee-select">

                <option>All Categories</option>
                <option>Pharmaceutics</option>
                <option>Pharmacology</option>
                <option>Pharm Chemistry</option>
                <option>Microbiology</option>
                <option>Clinical Pharmacy</option>
                <option>Pharmacognosy</option>

              </select>

            </div>

            {/* SORT */}
            <div className="isuee-select-wrapper">

              <select className="isuee-select">

                <option>Sort: Latest</option>
                <option>Most Cited</option>
                <option>Most Downloaded</option>
                <option>Most Viewed</option>

              </select>

            </div>

            <button className="isuee-apply-btn">
              Apply
            </button>

          </div>

          {/* MOST DOWNLOADED */}
          <div className="isuee-sidebar-card">

            <h3>Most Downloaded</h3>

            <ul className="isuee-download-list">
              <li>Lipid nanoparticles for curcumin delivery</li>
              <li>Silver nanoparticles antimicrobial study</li>
              <li>In-silico SARS-CoV-2 inhibitors</li>
            </ul>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Isuee;