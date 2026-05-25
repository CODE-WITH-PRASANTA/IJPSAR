// AuthorGuidelinesContent.jsx

import React from "react";
import "./AuthorGuidelinesContent.css";

import {
  FaFileWord,
  FaFileAlt,
  FaFileSignature,
  FaCopyright,
  FaShieldAlt,
  FaCheckCircle,
  FaBookOpen,
  FaClipboardList,
  FaFileUpload,
} from "react-icons/fa";

const quickLinks = [
  {
    icon: <FaFileWord />,
    title: "Manuscript Template (.docx)",
  },

  {
    icon: <FaFileAlt />,
    title: "LaTeX Template",
  },

  {
    icon: <FaFileSignature />,
    title: "Cover Letter Template",
  },

  {
    icon: <FaCopyright />,
    title: "Copyright Form",
  },

  {
    icon: <FaShieldAlt />,
    title: "Conflict of Interest Form",
  },
];

const AuthorGuidelinesContent = () => {
  return (
    <section className="authorGuideContent">

      {/* Background Glow */}
      <div className="authorGuideContentGlowOne"></div>
      <div className="authorGuideContentGlowTwo"></div>

      <div className="authorGuideContentContainer">

        {/* ================= LEFT CONTENT ================= */}

        <div className="authorGuideContentLeft">

          <span className="authorGuideMiniTag">
            FOR AUTHORS
          </span>

          <h2>
            Manuscript Preparation <span>Guidelines</span>
          </h2>

          <p className="authorGuideIntro">
            All manuscripts submitted to IJPASR must conform
            to the following structural, formatting,
            ethical, and publication guidelines.
          </p>

          {/* SECTION 1 */}
          <div className="authorGuideBox">

            <div className="authorGuideBoxTop">
              <div className="authorGuideBoxIcon">
                <FaBookOpen />
              </div>

              <h3>
                1. Manuscript Structure
              </h3>
            </div>

            <p>
              Title • Authors and Affiliations • Abstract
              (≤ 250 words) • Keywords (4–8) • Introduction •
              Materials & Methods • Results • Discussion •
              Conclusion • Acknowledgements • References
              (Vancouver style).
            </p>

          </div>

          {/* SECTION 2 */}
          <div className="authorGuideBox">

            <div className="authorGuideBoxTop">
              <div className="authorGuideBoxIcon">
                <FaClipboardList />
              </div>

              <h3>
                2. Formatting
              </h3>
            </div>

            <ul>
              <li>
                Font: Times New Roman, 12pt, double-spaced
              </li>

              <li>
                Margins: 1 inch on all sides
              </li>

              <li>
                Line numbering enabled
              </li>

              <li>
                Word count: 3000–8000 words
              </li>

              <li>
                Figures: 300 DPI, TIFF/PNG preferred
              </li>
            </ul>

          </div>

          {/* SECTION 3 */}
          <div className="authorGuideBox">

            <div className="authorGuideBoxTop">
              <div className="authorGuideBoxIcon">
                <FaCheckCircle />
              </div>

              <h3>
                3. References
              </h3>
            </div>

            <p>
              Use Vancouver style (numbered superscript).
              Cite primary literature and avoid excessive
              self-citation.
            </p>

          </div>

          {/* SECTION 4 */}
          <div className="authorGuideBox">

            <div className="authorGuideBoxTop">
              <div className="authorGuideBoxIcon">
                <FaShieldAlt />
              </div>

              <h3>
                4. Ethics & Disclosures
              </h3>
            </div>

            <p>
              Include statements on ethical approval,
              informed consent, funding, and conflicts
              of interest.
            </p>

          </div>

          {/* SECTION 5 */}
          <div className="authorGuideBox">

            <div className="authorGuideBoxTop">
              <div className="authorGuideBoxIcon">
                <FaFileUpload />
              </div>

              <h3>
                5. Submission Files
              </h3>
            </div>

            <ul>
              <li>Cover letter</li>

              <li>Anonymized manuscript</li>

              <li>Title page (separate)</li>

              <li>Figures & tables</li>

              <li>Supplementary material (optional)</li>
            </ul>

          </div>

          {/* TERMS */}
          <div className="authorGuideTerms">

            <h3>
              Terms & Conditions for Article Publication
            </h3>

            <p>
              By submitting a manuscript to IJPASR,
              the author(s) confirm that the work is
              original, unpublished, and not under review
              elsewhere. Submission confirms that all
              authors approve the manuscript and take full
              responsibility for its content.
            </p>

            <p>
              The manuscript must be free from plagiarism,
              duplicate publication, fabricated data,
              and unethical practices. If misconduct is
              identified, the journal reserves the right
              to reject, withdraw, or retract the article.
            </p>

            <p>
              Authors agree to comply with journal
              formatting and editorial requirements.
              Publication remains subject to peer review
              and final editorial approval.
            </p>

          </div>

        </div>

        {/* ================= RIGHT SIDEBAR ================= */}

        <div className="authorGuideContentRight">

          {/* QUICK LINKS */}
          <div className="authorGuideSidebarCard stickyCard">

            <div className="authorGuideSidebarHeader">
              <span></span>

              <h4>Quick Links</h4>
            </div>

            <div className="authorGuideQuickLinks">

              {quickLinks.map((item, index) => (
                <div
                  className="authorGuideQuickItem"
                  key={index}
                >
                  <div className="authorGuideQuickIcon">
                    {item.icon}
                  </div>

                  <p>{item.title}</p>
                </div>
              ))}

            </div>

          </div>

          {/* APC CARD */}
          <div className="authorGuideSidebarCard">

            <div className="authorGuideSidebarHeader">
              <span></span>

              <h4>
                Article Processing Charge
              </h4>
            </div>

            <p className="authorGuideChargeText">
              USD 90 — covers DOI,
              open-access dissemination,
              indexing, and long-term archiving.
              Waivers may apply for selected countries.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AuthorGuidelinesContent;