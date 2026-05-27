// ContactHome.jsx

import React from "react";
import "./ContactHome.css";
import {
  FaEnvelope,
  FaGlobe,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const ContactHome = () => {
  return (
    <section className="contactHome">
      <div className="contactHome-container">

        {/* LEFT SIDE */}
        <div className="contactHome-left">

          <span className="contactHome-subtitle">
            Contact
          </span>

          <h2 className="contactHome-heading">
            Editorial Office
          </h2>

          <p className="contactHome-description">
            Reach out to our editorial team for manuscript
            submissions, publication support, partnerships,
            and peer review related inquiries.
          </p>

          {/* CONTACT INFO */}
          <div className="contactHome-infoWrapper">

            <div className="contactHome-infoCard">
              <div className="contactHome-infoIcon">
                <FaEnvelope />
              </div>

              <div>
                <h4>Email Address</h4>
                <p>editor@ijpasr.com</p>
              </div>
            </div>

            <div className="contactHome-infoCard">
              <div className="contactHome-infoIcon">
                <FaPhoneAlt />
              </div>

              <div>
                <h4>Support Contact</h4>
                <p>+91 9876543210</p>
              </div>
            </div>

            <div className="contactHome-infoCard">
              <div className="contactHome-infoIcon">
                <FaGlobe />
              </div>

              <div>
                <h4>Website</h4>
                <p>www.ijpasr.com</p>
              </div>
            </div>

          </div>

          {/* MAP CARD */}
          <div className="contactHome-mapCard">

            <div className="contactHome-mapGlow"></div>

            <div className="contactHome-mapContent">
              <FaMapMarkerAlt className="contactHome-mapIcon" />

              <h3>Editorial Office Location</h3>

              <p>
                Bhubaneswar, Odisha, India
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="contactHome-right">

          <div className="contactHome-formHeader">

            <h3>Send Us A Message</h3>

            <p>
              Our team will respond to your inquiry as soon as possible.
            </p>

          </div>

          <form className="contactHome-form">

            <div className="contactHome-inputGrid">

              <div className="contactHome-inputGroup">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>

              <div className="contactHome-inputGroup">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" />
              </div>

              <div className="contactHome-inputGroup">
                <label>Affiliation</label>
                <input type="text" placeholder="University / Organization" />
              </div>

              <div className="contactHome-inputGroup">
                <label>Subject</label>
                <input type="text" placeholder="Enter subject" />
              </div>

            </div>

            <div className="contactHome-inputGroup">
              <label>Message</label>

              <textarea
                rows="7"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button className="contactHome-submitBtn">

              <FaPaperPlane />

              <span>Send Message</span>

            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default ContactHome;