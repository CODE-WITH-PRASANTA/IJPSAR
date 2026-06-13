
import React from "react";
import "./IJwelcomes.css";
import { FaArrowRight } from "react-icons/fa";

const IJwelcomes = () => {
  return (
    <section className="ijwelcome">
      <div className="ijwelcome-container">
        
        {/* LEFT CONTENT */}
        <div className="ijwelcome-left">
          <span className="ijwelcome-tag">
            CALL FOR PAPERS • CURRENT VOLUME
          </span>

          <h1 className="ijwelcome-title">
            Submissions are open — IJPASR welcomes your manuscript
          </h1>

          <p className="ijwelcome-description">
            Original research, review articles, short communications,
            case reports, and clinical studies in pharmaceutical and allied
            sciences. Review notification within 1–2 working days and
            fast-track publication within 24 hours.
          </p>
        </div>

        {/* RIGHT BUTTON */}
        <div className="ijwelcome-right">
          <button className="ijwelcome-btn">
            Submit Manuscript
            <FaArrowRight className="ijwelcome-btn-icon" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default IJwelcomes;