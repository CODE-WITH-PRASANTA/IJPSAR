// AuthorArchive.jsx

import React from "react";
import "./AuthorArchive.css";

import {
  FaSearch,
  FaCalendarAlt,
  FaBookOpen,
  FaUserEdit,
  FaArrowRight,
  FaFilePdf,
} from "react-icons/fa";

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
      "Pharmacovigilance trends in oncology drugs: a five-year retrospective analysis",
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

const AuthorArchive = () => {
  return (
    <section className="authorarchive">

      {/* GLOW */}
      <div className="authorarchive-glow authorarchive-glow1"></div>
      <div className="authorarchive-glow authorarchive-glow2"></div>

      <div className="authorarchive-container">

        {/* SEARCH FILTER */}
        <div className="authorarchive-filter">

          <div className="authorarchive-filter-grid">

            {/* INPUT */}
            <div className="authorarchive-input-group authorarchive-large">

              <label>
                Keyword / Title / Author
              </label>

              <input
                type="text"
                placeholder="e.g. nanoparticles, curcumin, R. Sharma"
              />

            </div>

            {/* VOLUME */}
            <div className="authorarchive-input-group">

              <label>Volume</label>

              <select>
                <option>Any</option>
                <option>Volume 12</option>
                <option>Volume 11</option>
                <option>Volume 10</option>
              </select>

            </div>

            {/* ISSUE */}
            <div className="authorarchive-input-group">

              <label>Issue</label>

              <select>
                <option>Any</option>
                <option>Issue 01</option>
                <option>Issue 02</option>
                <option>Issue 03</option>
              </select>

            </div>

            {/* CATEGORY */}
            <div className="authorarchive-input-group">

              <label>Category</label>

              <select>
                <option>All</option>
                <option>Pharmaceutics</option>
                <option>Pharmacology</option>
                <option>Microbiology</option>
              </select>

            </div>

          </div>

          <button className="authorarchive-search-btn">

            <FaSearch />

            Search

          </button>

        </div>

        {/* RESULT TOP */}
        <div className="authorarchive-result-top">

          <p>
            Showing 9 of 12,480 results
          </p>

          <select className="authorarchive-sort">

            <option>
              Sort: Relevance
            </option>

            <option>
              Latest
            </option>

            <option>
              Most Viewed
            </option>

          </select>

        </div>

        {/* CARDS */}
        <div className="authorarchive-grid">

          {articleData.map((item, index) => (

            <div
              className="authorarchive-card"
              key={index}
            >

              {/* TOP */}
              <div className="authorarchive-card-top">

                <span className="authorarchive-category">
                  {item.category}
                </span>

                <div className="authorarchive-meta">

                  <span>
                    <FaCalendarAlt />
                    {item.date}
                  </span>

                  <span>
                    <FaBookOpen />
                    Vol 12 • Issue 06
                  </span>

                </div>

              </div>

              {/* TITLE */}
              <h3 className="authorarchive-title">
                {item.title}
              </h3>

              {/* AUTHORS */}
              <div className="authorarchive-authors">

                <FaUserEdit />

                {item.authors}

              </div>

              {/* DOI */}
              <div className="authorarchive-doi">

                DOI:
                {item.doi}

              </div>

              {/* BUTTONS */}
              <div className="authorarchive-card-bottom">

                <button className="authorarchive-pdf">

                  <FaFilePdf />

                  PDF

                </button>

                <button className="authorarchive-read">

                  Read Article

                  <FaArrowRight />

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default AuthorArchive;