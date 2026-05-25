// SearchSub.jsx

import React from "react";
import "./SearchSub.css";

import {
  FaPaperPlane,
  FaEnvelopeOpenText,
  FaBell,
  FaCheckCircle,
} from "react-icons/fa";

const SearchSub = () => {
  return (
    <section className="searchsub">

      {/* GLOW EFFECTS */}
      <div className="searchsub-glow searchsub-glow1"></div>
      <div className="searchsub-glow searchsub-glow2"></div>

      <div className="searchsub-container">

        {/* LEFT CONTENT */}
        <div className="searchsub-left">

          {/* BADGE */}
          <div className="searchsub-badge">

            <FaBell />

            Research Updates

          </div>

          {/* TITLE */}
          <h2 className="searchsub-title">
            Stay Updated with
            <span> IJPASR</span>
          </h2>

          {/* DESCRIPTION */}
          <p className="searchsub-description">
            Get newly published pharmaceutical research,
            archive releases, scientific updates, and
            call-for-paper announcements directly in
            your inbox every month.
          </p>

          {/* FEATURES */}
          <div className="searchsub-features">

            <div className="searchsub-feature">

              <FaCheckCircle />

              Latest Articles

            </div>

            <div className="searchsub-feature">

              <FaCheckCircle />

              Journal Alerts

            </div>

            <div className="searchsub-feature">

              <FaCheckCircle />

              Archive Updates

            </div>

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="searchsub-right">

          {/* FORM */}
          <div className="searchsub-form">

            {/* INPUT */}
            <div className="searchsub-inputbox">

              <FaEnvelopeOpenText className="searchsub-inputicon" />

              <input
                type="email"
                placeholder="Enter your academic email"
              />

            </div>

            {/* BUTTON */}
            <button className="searchsub-btn">

              <FaPaperPlane />

              Subscribe Now

            </button>

          </div>

          {/* NOTE */}
          <p className="searchsub-note">
            No spam • Research updates only •
            Unsubscribe anytime
          </p>

        </div>

      </div>
    </section>
  );
};

export default SearchSub;