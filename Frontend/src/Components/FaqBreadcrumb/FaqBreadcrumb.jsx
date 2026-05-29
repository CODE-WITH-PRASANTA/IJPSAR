import React from "react";
import "./FaqBreadcrumb.css";

import {
  FaChevronRight,
  FaQuestionCircle,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

import faqBg from "../../assets/bg-5.jpg";

const Faqbreadcrumb = () => {
  return (
    <section
      className="peerReviewBreadcrumb"
      style={{
        backgroundImage: `url(${faqBg})`,
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

            <FaQuestionCircle />

            <span>
              Frequently Asked Questions
            </span>

          </div>

          {/* TITLE */}
          <h1>
            FAQ
          </h1>

          {/* DESCRIPTION */}
          <p>
            Find answers related to manuscript submission,
            publication process, peer review, publication
            charges, certificates, plagiarism policy,
            indexing, DOI services, formatting guidelines,
            and other important journal policies of IJPASR.
          </p>

          {/* FAQ HIGHLIGHTS */}
          <div className="faqBreadcrumbHighlights">

            <div className="faqHighlightItem">
              <FaCheckCircle />
              <span>
                Fast Publication Support
              </span>
            </div>

            <div className="faqHighlightItem">
              <FaCheckCircle />
              <span>
                Double-Blind Peer Review
              </span>
            </div>

            <div className="faqHighlightItem">
              <FaCheckCircle />
              <span>
                DOI & Indexing Guidance
              </span>
            </div>

          </div>

          {/* PATH */}
          <div className="peerReviewBreadcrumbPath">

            <span>
              Home
            </span>

            <FaChevronRight />

            <span className="active">
              FAQ
            </span>

          </div>

        </div>

        {/* RIGHT CARD */}
        <div className="peerReviewBreadcrumbCard">

          <div className="peerReviewCardGlow"></div>

          <div className="peerReviewCardIcon">
            <FaHeadset />
          </div>

          <h3>
            24×7 Author Assistance
          </h3>

          <p>
            Get quick answers regarding submission,
            publication, certificates, plagiarism,
            review process and journal policies from
            the IJPASR editorial support team.
          </p>

          <button>
            Contact Support
          </button>

        </div>

      </div>

    </section>
  );
};

export default Faqbreadcrumb;