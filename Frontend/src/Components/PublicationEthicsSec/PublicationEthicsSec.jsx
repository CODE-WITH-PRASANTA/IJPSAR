// PublicationEthics.jsx

import React, { useState } from "react";
import "./PublicationEthicsSec.css";

import {
  FaUserShield,
  FaHandshake,
  FaFlask,
  FaUsers,
  FaUndoAlt,
  FaUserSecret,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ethicsData = [
  {
    id: 1,
    icon: <FaUserShield />,
    title: "Authorship",
    desc: "All listed authors must have made substantial intellectual contributions and approved the final version.",
  },

  {
    id: 2,
    icon: <FaHandshake />,
    title: "Conflict of Interest",
    desc: "Authors, reviewers, and editors must disclose any financial or personal conflicts.",
  },

  {
    id: 3,
    icon: <FaFlask />,
    title: "Research Integrity",
    desc: "Fabrication, falsification, and plagiarism are not tolerated under any circumstances.",
  },

  {
    id: 4,
    icon: <FaUsers />,
    title: "Human & Animal Studies",
    desc: "Must comply with the Declaration of Helsinki and ARRIVE 2.0 ethical guidelines.",
  },

  {
    id: 5,
    icon: <FaUndoAlt />,
    title: "Corrections & Retractions",
    desc: "We follow COPE flowcharts for handling post-publication ethical concerns.",
  },

  {
    id: 6,
    icon: <FaUserSecret />,
    title: "Confidentiality",
    desc: "Manuscript content remains confidential until publication and editorial approval.",
  },
];

const itemsPerPage = 4;

const PublicationEthics = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    ethicsData.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentItems = ethicsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="publicationEthicsSec">
      {/* HEADING */}
      <div className="publicationEthicsSecHeading">
        <span>COPE COMPLIANT</span>

        <h2>
          Editorial & Publication <span>Ethics</span>
        </h2>

        <p>
          IJPASR adheres to the Code of Conduct and
          Best Practice Guidelines of the Committee
          on Publication Ethics (COPE).
        </p>
      </div>

      {/* GRID */}
      <div className="publicationEthicsSecGrid">
        {currentItems.map((item) => (
          <div
            className="publicationEthicsSecCard"
            key={item.id}
          >
            {/* Glow */}
            <div className="publicationEthicsSecCardGlow"></div>

            {/* ICON */}
            <div className="publicationEthicsSecIcon">
              {item.icon}
            </div>

            {/* CONTENT */}
            <div className="publicationEthicsSecContent">
              <h3>{item.title}</h3>

              <p>{item.desc}</p>
            </div>

            {/* LINE */}
            <div className="publicationEthicsSecLine"></div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="publicationEthicsSecPagination">
        <button
          className="publicationEthicsSecPaginationBtn"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          <FaChevronLeft />
        </button>

        {[...Array(totalPages)].map(
          (_, index) => (
            <button
              key={index}
              className={`publicationEthicsSecPaginationNumber ${
                currentPage === index + 1
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>
          )
        )}

        <button
          className="publicationEthicsSecPaginationBtn"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default PublicationEthics;