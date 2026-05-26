// NominationHome.jsx

import React from "react";
import "./NominationHome.css";

import {
  FaChevronRight,
  FaAward,
  FaUsers,
  FaMedal,
} from "react-icons/fa";

const NominationHome = () => {
  return (
    <section className="nominationhome">

      {/* GLOW EFFECTS */}
      <div className="nominationhome-glow nominationhome-glow1"></div>
      <div className="nominationhome-glow nominationhome-glow2"></div>

      {/* OVERLAY */}
      <div className="nominationhome-overlay"></div>

      <div className="nominationhome-container">

        {/* LEFT CONTENT */}
        <div className="nominationhome-content">

          {/* BREADCRUMB */}
          <div className="nominationhome-breadcrumb">

            <span>Home</span>

            <FaChevronRight className="nominationhome-breadcrumb-icon" />

            <span className="active">
              Nomination
            </span>

          </div>

          {/* TITLE */}
          <h1 className="nominationhome-title">
            Award
            <span> Nomination</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="nominationhome-description">
            Recognize exceptional researchers, editors,
            reviewers, and scientific contributors through
            our prestigious academic nomination program.
          </p>

          {/* FEATURES */}
          <div className="nominationhome-features">

            <div className="nominationhome-feature">

              <FaAward />

              Excellence Awards

            </div>

            <div className="nominationhome-feature">

              <FaUsers />

              Research Recognition

            </div>

            <div className="nominationhome-feature">

              <FaMedal />

              Global Academic Honors

            </div>

          </div>

          {/* LINE */}
          <div className="nominationhome-line"></div>

        </div>

      </div>
    </section>
  );
};

export default NominationHome;