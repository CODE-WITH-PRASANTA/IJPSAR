// ContactBreadcrum.jsx

import React from "react";
import "./ContactBreadcrum.css";
import { FaChevronRight } from "react-icons/fa";

const ContactBreadcrum = () => {
  return (
    <section className="contactBreadcrum">

      {/* Background Glow */}
      <div className="contactBreadcrum-glowOne"></div>
      <div className="contactBreadcrum-glowTwo"></div>

      <div className="contactBreadcrum-overlay"></div>

      <div className="contactBreadcrum-container">

        {/* Breadcrumb */}
        <div className="contactBreadcrum-path">

          <span className="contactBreadcrum-link">
            Home
          </span>

          <FaChevronRight className="contactBreadcrum-arrow" />

          <span className="contactBreadcrum-active">
            Contact
          </span>

        </div>

        {/* Heading */}
        <h1 className="contactBreadcrum-heading">
          Contact Us
        </h1>

        {/* Description */}
        <p className="contactBreadcrum-description">
          Connect with the IJPASR editorial office for
          manuscript submissions, publication queries,
          peer review support, and collaborations.
        </p>

        {/* Bottom Line */}
        <div className="contactBreadcrum-line"></div>

      </div>

    </section>
  );
};

export default ContactBreadcrum;