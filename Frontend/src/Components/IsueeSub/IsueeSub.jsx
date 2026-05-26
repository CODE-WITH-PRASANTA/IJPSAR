// IsueeSub.jsx

import React from "react";
import "./IsueeSub.css";

import {
  FaPaperPlane,
  FaEnvelopeOpenText,
  FaCheckCircle,
} from "react-icons/fa";

const IsueeSub = () => {
  return (
    <section className="isueesub">

      {/* Glow Effects */}
      <div className="isueesub-glow isueesub-glow1"></div>
      <div className="isueesub-glow isueesub-glow2"></div>

      <div className="isueesub-container">

        {/* LEFT CONTENT */}
        <div className="isueesub-left">

          <div className="isueesub-badge">
            <FaCheckCircle />
            Research Journal Updates
          </div>

          <h2 className="isueesub-title">
            Stay Updated with
            <span> IJPASR</span>
          </h2>

          <p className="isueesub-description">
            Get monthly updates about newly published research papers,
            upcoming journal issues, indexing updates, and call for papers
            directly in your inbox.
          </p>

          <div className="isueesub-features">

            <div className="isueesub-feature">
              <FaCheckCircle />
              Latest Articles
            </div>

            <div className="isueesub-feature">
              <FaCheckCircle />
              Monthly Journal Alerts
            </div>

            <div className="isueesub-feature">
              <FaCheckCircle />
              Conference Updates
            </div>

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="isueesub-right">

          <div className="isueesub-form">

            <div className="isueesub-input-box">

              <FaEnvelopeOpenText className="isueesub-input-icon" />

              <input
                type="email"
                placeholder="Enter your academic email address"
              />

            </div>

            <button className="isueesub-btn">
              <FaPaperPlane />
              Subscribe Now
            </button>

          </div>

          <p className="isueesub-note">
            No spam • Research updates only • Unsubscribe anytime
          </p>

        </div>

      </div>
    </section>
  );
};

export default IsueeSub;