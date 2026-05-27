// ContactSub.jsx

import React from "react";
import "./ContactSub.css";

import {
  FaEnvelopeOpenText,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

const ContactSub = () => {
  return (
    <section className="contactsub">

      <div className="contactsub-container">

        {/* LEFT CONTENT */}
        <div className="contactsub-left">

          <span className="contactsub-tag">
            NEWSLETTER & UPDATES
          </span>

          <h2 className="contactsub-title">
            Stay updated with IJPASR
          </h2>

          <p className="contactsub-description">
            Get monthly updates on newly published research
            articles, upcoming journal issues, call for papers,
            and international publication announcements directly
            in your inbox.
          </p>

          <div className="contactsub-features">

            <div className="contactsub-feature">
              <FaCheckCircle className="contactsub-check" />
              <span>Monthly research updates</span>
            </div>

            <div className="contactsub-feature">
              <FaCheckCircle className="contactsub-check" />
              <span>Early access to journal announcements</span>
            </div>

            <div className="contactsub-feature">
              <FaCheckCircle className="contactsub-check" />
              <span>No spam — only academic updates</span>
            </div>

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="contactsub-right">

          <div className="contactsub-card">

            <div className="contactsub-icon-box">
              <FaEnvelopeOpenText className="contactsub-icon" />
            </div>

            <h3>Subscribe Newsletter</h3>

            <p>
              Join researchers, scholars, and authors worldwide.
            </p>

            <form className="contactsub-form">

              <input
                type="email"
                placeholder="your.email@university.edu"
                className="contactsub-input"
              />

              <button className="contactsub-btn">
                <FaPaperPlane />
                Subscribe Now
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactSub;