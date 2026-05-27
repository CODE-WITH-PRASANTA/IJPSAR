// ArchiveHome.jsx

import React from "react";
import "./ArchiveHome.css";
import { FaChevronRight } from "react-icons/fa";

const ArchiveHome = () => {
  return (
    <section className="archivehome">

      {/* Glow Effects */}
      <div className="archivehome-glow archivehome-glow1"></div>
      <div className="archivehome-glow archivehome-glow2"></div>

      {/* Overlay */}
      <div className="archivehome-overlay"></div>

      <div className="archivehome-container">

        {/* CONTENT */}
        <div className="archivehome-content">

          {/* Breadcrumb */}
          <div className="archivehome-breadcrumb">

            <span>Home</span>

            <FaChevronRight className="archivehome-breadcrumb-icon" />

            <span className="active">Archives</span>

          </div>

          {/* Title */}
          <h1 className="archivehome-title">
            Journal <span>Archives</span>
          </h1>

          {/* Description */}
          <p className="archivehome-description">
            Explore previously published research volumes,
            scientific journals, archived articles, and
            indexed publications with a premium academic
            browsing experience.
          </p>

          {/* Decorative Line */}
          <div className="archivehome-line"></div>

        </div>

      </div>
    </section>
  );
};

export default ArchiveHome;