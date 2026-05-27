// SubmitManuscriptBreadcrumb.jsx

import React from "react";
import "./SubmitManuscriptBreadcrumb.css";

import {
  FaHome,
  FaChevronRight,
  FaPaperPlane,
} from "react-icons/fa";

/* IMPORT BACKGROUND IMAGE */
import submitBg from "../../assets/bg-7.webp";

const SubmitManuscriptBreadcrumb = () => {
  return (
    <section
      className="submitManuscriptBreadcrumb"
      style={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(2, 16, 44, 0.92),
            rgba(0, 87, 84, 0.86)
          ),
          url(${submitBg})
        `,
      }}
    >

      {/* OVERLAY */}
      <div className="submitManuscriptBreadcrumbOverlay"></div>

      {/* GLOW EFFECTS */}
      <div className="submitManuscriptBreadcrumbGlowOne"></div>
      <div className="submitManuscriptBreadcrumbGlowTwo"></div>

      {/* FLOATING CAPSULES */}
      <div className="submitManuscriptCapsule capsuleOne"></div>
      <div className="submitManuscriptCapsule capsuleTwo"></div>
      <div className="submitManuscriptCapsule capsuleThree"></div>

      <div className="submitManuscriptBreadcrumbContainer">

        {/* LEFT CONTENT */}
        <div className="submitManuscriptBreadcrumbLeft">

          <span className="submitManuscriptBreadcrumbTag">
            ONLINE SUBMISSION PORTAL
          </span>

          <h1>
            Submit <span>Manuscript</span>
          </h1>

          <p>
            Submit your original research manuscript to IJPASR for
            rapid peer review, global visibility, and high-quality
            academic publication.
          </p>

          {/* BREADCRUMB */}
          <div className="submitManuscriptBreadcrumbPath">

            <div className="submitManuscriptBreadcrumbItem active">
              <FaHome />
              <span>Home</span>
            </div>

            <FaChevronRight className="submitManuscriptBreadcrumbArrow" />

            <div className="submitManuscriptBreadcrumbItem">
              Submit Manuscript
            </div>

          </div>

        </div>

        {/* RIGHT GLASS CARD */}
        <div className="submitManuscriptBreadcrumbCard">

          <div className="submitManuscriptCardIcon">
            <FaPaperPlane />
          </div>

          <h3>Fast Publication Process</h3>

          <p>
            Experience streamlined manuscript submission with
            double-blind peer review, plagiarism screening,
            and rapid editorial decisions.
          </p>

          <button>
            Submit Paper
          </button>

        </div>

      </div>
    </section>
  );
};

export default SubmitManuscriptBreadcrumb;