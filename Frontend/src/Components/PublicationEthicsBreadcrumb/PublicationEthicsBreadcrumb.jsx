// PublicationEthicsBreadcrumb.jsx

import React from "react";
import "./PublicationEthicsBreadcrumb.css";

import {
  FaHome,
  FaChevronRight,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import ethicsBg from "../../assets/bg-4.jpg";

const PublicationEthicsBreadcrumb = () => {
  return (
    <section
      className="publicationEthicsBreadcrumb"
      style={{
        backgroundImage: `url(${ethicsBg})`,
      }}
    >
      {/* Overlay */}
      <div className="publicationEthicsOverlay"></div>

      {/* Glow Effects */}
      <div className="publicationEthicsGlowOne"></div>
      <div className="publicationEthicsGlowTwo"></div>

      <div className="publicationEthicsContainer">

        {/* LEFT CONTENT */}
        <div className="publicationEthicsContent">

          <span className="publicationEthicsTag">
            <FaShieldAlt />
            PUBLICATION ETHICS
          </span>

          <h1>
            Ethical Publishing
            <span> Standards</span>
          </h1>

          <p>
            IJPASR follows strict publication ethics,
            integrity policies, peer-review transparency,
            plagiarism control, and responsible research
            practices to maintain international scholarly
            standards.
          </p>

          {/* Breadcrumb */}
          <div className="publicationEthicsPath">

            <a href="/">
              <FaHome />
              Home
            </a>

            <FaChevronRight className="publicationPathArrow" />

            <span>Publication Ethics</span>

          </div>
        </div>

        {/* RIGHT INFO CARD */}
        <div className="publicationEthicsCard">

          <div className="publicationEthicsIcon">
            <FaCheckCircle />
          </div>

          <h3>
            Research Integrity &
            Ethical Excellence
          </h3>

          <p>
            Upholding honesty, transparency, originality,
            and ethical peer-review practices in every
            published research article.
          </p>

          <div className="publicationEthicsStats">

            <div className="publicationStatBox">
              <h4>100%</h4>
              <span>Ethical Review</span>
            </div>

            <div className="publicationStatBox">
              <h4>Zero</h4>
              <span>Tolerance Policy</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PublicationEthicsBreadcrumb;