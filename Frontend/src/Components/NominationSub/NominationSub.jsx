import React from "react";
import "./NominationSub.css";

import {
  FaEnvelopeOpenText,
  FaPaperPlane,
  FaBell,
  FaAward,
} from "react-icons/fa";

const NominationSub = () => {
  return (
    <section className="nominationsub">

      {/* GLOW EFFECTS */}
      <div className="nominationsub-glow nominationsub-glow1"></div>
      <div className="nominationsub-glow nominationsub-glow2"></div>

      <div className="nominationsub-container">

        {/* LEFT CONTENT */}
        <div className="nominationsub-left">

          <div className="nominationsub-badge">
            <FaAward />
            Best Paper Award Updates
          </div>

          <h2 className="nominationsub-title">
            Stay updated with
            <span> IJPASR</span>
          </h2>

          <p className="nominationsub-description">
            Receive award nomination updates,
            newly published research articles,
            upcoming journal issues, and important
            academic announcements directly in your inbox.
          </p>

          {/* FEATURES */}
          <div className="nominationsub-features">

            <div className="nominationsub-feature">
              <FaBell />
              Latest Notifications
            </div>

            <div className="nominationsub-feature">
              <FaEnvelopeOpenText />
              Research Updates
            </div>

            <div className="nominationsub-feature">
              <FaAward />
              Award Announcements
            </div>

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="nominationsub-right">

          <div className="nominationsub-form">

            <div className="nominationsub-inputbox">

              <input
                type="email"
                placeholder="Enter your academic e-mail address"
              />

            </div>

            <button className="nominationsub-btn">

              <FaPaperPlane />

              Subscribe Now

            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default NominationSub;