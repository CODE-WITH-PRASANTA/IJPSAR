// PlagiarismPolicyBreadcrumb.jsx

import React from "react";
import "./PlagiarismPolicyBreadcrumb.css";

import {
  FaHome,
  FaChevronRight,
  FaShieldAlt,
} from "react-icons/fa";

import plagiarismBg from "../../assets/bg-6.jpg";

const PlagiarismPolicyBreadcrumb = () => {
  return (
    <section
      className="plagiarismPolicyBreadcrumb"
      style={{
        backgroundImage: `url(${plagiarismBg})`,
      }}
    >
      {/* Overlay */}
      <div className="plagiarismPolicyBreadcrumbOverlay"></div>

      {/* Glow Effects */}
      <div className="plagiarismPolicyGlowOne"></div>
      <div className="plagiarismPolicyGlowTwo"></div>

      <div className="plagiarismPolicyContainer">

        {/* LEFT CONTENT */}
        <div className="plagiarismPolicyContent">

          <span className="plagiarismPolicyTag">
            ZERO TOLERANCE POLICY
          </span>

          <h1>
            Plagiarism <span>Policy</span>
          </h1>

          <p>
            IJPASR strictly follows international publication ethics
            and uses advanced plagiarism detection systems to ensure
            originality, transparency, and research integrity.
          </p>

          {/* Breadcrumb */}
          <div className="plagiarismPolicyPath">

            <FaHome />

            <span>Home</span>

            <FaChevronRight />

            <span className="active">
              Plagiarism Policy
            </span>

          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="plagiarismPolicyCard">

          <div className="plagiarismPolicyCardGlow"></div>

          <div className="plagiarismPolicyIcon">
            <FaShieldAlt />
          </div>

          <h3>
            Ethical & Original Research
          </h3>

          <p>
            Every manuscript is screened through advanced plagiarism
            detection tools before peer review and publication approval.
          </p>

          <button>
            Ethical Guidelines
          </button>

        </div>
      </div>
    </section>
  );
};

export default PlagiarismPolicyBreadcrumb;