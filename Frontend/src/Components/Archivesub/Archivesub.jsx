// Archivesub.jsx

import React from "react";
import "./Archivesub.css";

import {
  FaPaperPlane,
  FaEnvelopeOpenText,
  FaCheckCircle,
  FaBell,
} from "react-icons/fa";

const Archivesub = () => {
  return (
    <section className="archivesub">

      {/* Glow Effects */}
      <div className="archivesub-glow archivesub-glow1"></div>
      <div className="archivesub-glow archivesub-glow2"></div>

      <div className="archivesub-container">

        {/* LEFT CONTENT */}
        <div className="archivesub-left">

          <div className="archivesub-badge">
            <FaBell />
            Journal Newsletter
          </div>

          <h2 className="archivesub-title">
            Stay Updated with
            <span> IJPASR</span>
          </h2>

          <p className="archivesub-description">
            Get monthly updates on newly published articles,
            archived issues, indexing updates, and call for
            papers directly in your inbox.
          </p>

          {/* FEATURES */}
          <div className="archivesub-features">

            <div className="archivesub-feature">
              <FaCheckCircle />
              Latest Journal Updates
            </div>

            <div className="archivesub-feature">
              <FaCheckCircle />
              Archive Notifications
            </div>

            <div className="archivesub-feature">
              <FaCheckCircle />
              Research Alerts
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="archivesub-right">

          <div className="archivesub-form">

            {/* INPUT */}
            <div className="archivesub-input-box">

              <FaEnvelopeOpenText className="archivesub-input-icon" />

              <input
                type="email"
                placeholder="Enter your academic email address"
              />

            </div>

            {/* BUTTON */}
            <button className="archivesub-btn">

              <FaPaperPlane />

              Subscribe Now

            </button>

          </div>

          <p className="archivesub-note">
            No spam • Only journal and research updates •
            Unsubscribe anytime
          </p>

        </div>

      </div>
    </section>
  );
};

export default Archivesub;