// Newsletter.jsx

import React from "react";
import "./Newsletter.css";

import {
  FaEnvelopeOpenText,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="newsletterContainer">

        {/* BACKGROUND GLOW */}
        <div className="newsletterGlowOne"></div>
        <div className="newsletterGlowTwo"></div>

        {/* LEFT CONTENT */}
        <div className="newsletterLeft">

          <span className="newsletterTag">
            <FaCheckCircle />
            JOIN OUR COMMUNITY
          </span>

          <h2>
            Stay Updated with
            <span> IJPASR</span>
          </h2>

          <p>
            Get monthly updates on newly published
            research articles, upcoming issues,
            conferences, and call for papers directly
            in your inbox.
          </p>

          {/* FEATURES */}
          <div className="newsletterFeatures">

            <div className="newsletterFeatureItem">
              <FaEnvelopeOpenText />
              <span>Research Updates</span>
            </div>

            <div className="newsletterFeatureItem">
              <FaEnvelopeOpenText />
              <span>Fast Notifications</span>
            </div>

            <div className="newsletterFeatureItem">
              <FaEnvelopeOpenText />
              <span>Conference Alerts</span>
            </div>

          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="newsletterRight">

          <div className="newsletterFormCard">

            <h3>Subscribe Newsletter</h3>

            <div className="newsletterInputWrap">

              <input
                type="email"
                placeholder="Enter your email address"
              />

              <button>
                <FaPaperPlane />
                Subscribe
              </button>

            </div>

            <small>
              We respect your privacy. No spam mails.
            </small>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;