// PeerReviewBreadcrumb.jsx

import React from "react";
import "./PeerReviewBreadcrumb.css";

import {
  FaChevronRight,
  FaClipboardCheck,
  FaUserCheck,
} from "react-icons/fa";

import peerReviewBg from "../../assets/bg-5.jpg";

const PeerReviewBreadcrumb = () => {
  return (
    <section
      className="peerReviewBreadcrumb"
      style={{
        backgroundImage: `url(${peerReviewBg})`,
      }}
    >
      {/* OVERLAY */}
      <div className="peerReviewBreadcrumbOverlay"></div>

      {/* GLOW EFFECTS */}
      <div className="peerReviewGlowOne"></div>
      <div className="peerReviewGlowTwo"></div>

      <div className="peerReviewBreadcrumbContainer">

        {/* LEFT CONTENT */}
        <div className="peerReviewBreadcrumbContent">

          {/* TAG */}
          <div className="peerReviewBreadcrumbTag">
            <FaClipboardCheck />
            <span>Transparent Review System</span>
          </div>

          {/* TITLE */}
          <h1>
            Peer Review <span>Process</span>
          </h1>

          {/* DESCRIPTION */}
          <p>
            IJPASR follows a strict double-blind peer review
            system to ensure high-quality, authentic, and
            impactful scientific publication standards.
          </p>

          {/* PATH */}
          <div className="peerReviewBreadcrumbPath">
            <span>Home</span>

            <FaChevronRight />

            <span className="active">
              Peer Review Process
            </span>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="peerReviewBreadcrumbCard">

          <div className="peerReviewCardGlow"></div>

          <div className="peerReviewCardIcon">
            <FaUserCheck />
          </div>

          <h3>
            Double-Blind Review
          </h3>

          <p>
            Every manuscript undergoes expert evaluation
            by independent reviewers to maintain integrity,
            originality, and scientific excellence.
          </p>

          <button>
            Review Guidelines
          </button>
        </div>
      </div>
    </section>
  );
};

export default PeerReviewBreadcrumb;