// UpdateHome.jsx

import React from "react";
import "./UpdateHome.css";
import { FaEnvelopeOpenText, FaPaperPlane } from "react-icons/fa";

const UpdateHome = () => {
  return (
    <section className="updateHome">

      <div className="updateHome-container">

        {/* LEFT CONTENT */}
        <div className="updateHome-left">

          <span className="updateHome-tag">
            Newsletter
          </span>

          <h2 className="updateHome-heading">
            Stay Updated With IJPASR
          </h2>

          <p className="updateHome-description">
            Get monthly updates on newly published articles,
            upcoming journal issues, conference alerts,
            and latest research announcements directly in your inbox.
          </p>

        </div>

        {/* RIGHT FORM */}
        <div className="updateHome-right">

          <div className="updateHome-glow"></div>

          <div className="updateHome-formCard">

            <div className="updateHome-icon">
              <FaEnvelopeOpenText />
            </div>

            <h3>
              Subscribe To Our Newsletter
            </h3>

            <p>
              Join our academic community and receive premium research updates.
            </p>

            <form className="updateHome-form">

              <div className="updateHome-inputWrapper">

                <input
                  type="email"
                  placeholder="Enter your institutional email"
                />

              </div>

              <button className="updateHome-button">

                <FaPaperPlane />

                <span>Subscribe Now</span>

              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default UpdateHome;