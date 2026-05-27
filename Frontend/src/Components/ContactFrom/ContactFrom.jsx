// ContactFrom.jsx

import React from "react";
import "./ContactFrom.css";
import {
  FaEnvelope,
  FaGlobe,
  FaClock,
  FaPaperPlane,
  FaAward,
} from "react-icons/fa";

const ContactFrom = () => {
  return (
    <section className="contactFrom">

      <div className="contactFrom-container">

        {/* LEFT SIDE */}
        <div className="contactFrom-left">

          <span className="contactFrom-tag">
            Editorial Office
          </span>

          <h2 className="contactFrom-heading">
            Get In Touch
          </h2>

          <p className="contactFrom-description">
            For manuscript submission, peer review,
            publication support, indexing, certificates,
            and journal related queries — connect with
            the IJPASR editorial office anytime.
          </p>

          {/* CONTACT INFO */}
          <div className="contactFrom-infoWrapper">

            <div className="contactFrom-infoItem">
              <div className="contactFrom-infoIcon">
                <FaEnvelope />
              </div>

              <p>editor@ijpasr.com</p>
            </div>

            <div className="contactFrom-infoItem">
              <div className="contactFrom-infoIcon">
                <FaEnvelope />
              </div>

              <p>editorijpasr@gmail.com</p>
            </div>

            <div className="contactFrom-infoItem">
              <div className="contactFrom-infoIcon">
                <FaGlobe />
              </div>

              <p>www.ijpasr.com</p>
            </div>

            <div className="contactFrom-infoItem">
              <div className="contactFrom-infoIcon">
                <FaClock />
              </div>

              <p>Editorial response: Mon–Sat</p>
            </div>

          </div>

          {/* AWARD CARD */}
          <div className="contactFrom-awardCard">

            <div className="contactFrom-awardGlow"></div>

            <div className="contactFrom-awardTop">

              <div className="contactFrom-awardIcon">
                <FaAward />
              </div>

              <h3>
                Best Paper Award Nomination
              </h3>

            </div>

            <p>
              Submit your nomination request with paper title,
              author names, article ID, and a short
              justification directly to our editorial office.
            </p>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="contactFrom-right">

          <div className="contactFrom-formGlow"></div>

          <div className="contactFrom-formHeader">

            <h3>Send Us A Message</h3>

            <p>
              We usually respond within 24–48 hours.
            </p>

          </div>

          <form className="contactFrom-form">

            <div className="contactFrom-grid">

              <div className="contactFrom-inputGroup">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="contactFrom-inputGroup">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="contactFrom-inputGroup">
                <label>Affiliation</label>
                <input
                  type="text"
                  placeholder="University / Institution"
                />
              </div>

              <div className="contactFrom-inputGroup">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Enter subject"
                />
              </div>

            </div>

            <div className="contactFrom-inputGroup">
              <label>Message</label>

              <textarea
                rows="7"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button className="contactFrom-submitBtn">

              <FaPaperPlane />

              <span>Send Message</span>

            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default ContactFrom;