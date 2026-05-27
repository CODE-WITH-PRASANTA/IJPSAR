import React from "react";
import "./NominationBestPaper.css";

import {
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

const NominationBestPaper = () => {
  return (
    <section className="nominationpaper">

      <div className="nominationpaper-container">

        {/* TOP */}
        <div className="nominationpaper-top">

          <span className="nominationpaper-tag">
            Awards & Recognition
          </span>

          <h1 className="nominationpaper-title">
            Nomination of Best Paper Award (IJPASR)
          </h1>

        </div>

        {/* ALERT */}
        <div className="nominationpaper-alert">

          <FaEnvelope className="nominationpaper-alert-icon" />

          <p>
            For Nomination of Best Paper Award,
            kindly e-mail us at:
            <span> editor@ijpasr.com</span>
          </p>

        </div>

        {/* CONTENT */}
        <div className="nominationpaper-content">

          <p>
            In every issue, as part of its continuous mission
            to promote high-quality research in Pharmaceutical
            Sciences, Life Sciences, and Allied Health Sciences,
            the International Journal of Pharmaceutical and Allied
            Science Research (IJPASR) selects one Best Paper Award
            along with two Runner-Up Papers.
          </p>

          <p>
            The selection is carried out by the Editorial Board
            based on the overall excellence and scientific
            contribution of the manuscript.
          </p>

        </div>

        {/* PURPOSE */}
        <div className="nominationpaper-section">

          <h2>
            Purpose of the Best Paper Award
          </h2>

          <p>
            The main objective of the IJPASR Best Paper Award is to:
          </p>

          <ul>

            <li>
              Promote research excellence and scientific innovation
            </li>

            <li>
              Encourage authors to publish high-impact manuscripts
            </li>

            <li>
              Recognize contributions improving healthcare
              and scientific development
            </li>

            <li>
              Support researchers working in pharmaceutical,
              clinical, and biomedical sciences
            </li>

            <li>
              Highlight studies creating meaningful academic impact
            </li>

          </ul>

        </div>

        {/* CRITERIA */}
        <div className="nominationpaper-section">

          <h2>
            Selection Process & Evaluation Criteria
          </h2>

          <div className="nominationpaper-grid">

            <div className="nominationpaper-card">

              <h3>
                1. Scientific Novelty & Originality
              </h3>

              <ul>

                <li>
                  Uniqueness of the concept or hypothesis
                </li>

                <li>
                  Innovation in research approach
                </li>

                <li>
                  Contribution of new scientific ideas
                </li>

              </ul>

            </div>

            <div className="nominationpaper-card">

              <h3>
                2. Technical Quality & Methodology
              </h3>

              <ul>

                <li>
                  Appropriateness of experimental design
                </li>

                <li>
                  Statistical interpretation quality
                </li>

                <li>
                  Validation and reproducibility of findings
                </li>

              </ul>

            </div>

            <div className="nominationpaper-card">

              <h3>
                3. Research Contribution & Impact
              </h3>

              <ul>

                <li>
                  Contribution to pharmaceutical sciences
                </li>

                <li>
                  Relevance to current scientific challenges
                </li>

                <li>
                  Potential future research influence
                </li>

              </ul>

            </div>

            <div className="nominationpaper-card">

              <h3>
                4. Presentation & Ethics
              </h3>

              <ul>

                <li>
                  Clear writing and organized structure
                </li>

                <li>
                  Proper formatting and referencing
                </li>

                <li>
                  Compliance with ethical standards
                </li>

              </ul>

            </div>

          </div>

        </div>

        {/* ELIGIBILITY */}
        <div className="nominationpaper-section">

          <h2>
            Eligibility for Nomination
          </h2>

          <ul className="nominationpaper-checklist">

            <li>
              <FaCheckCircle />
              Research Scholars and Students
            </li>

            <li>
              <FaCheckCircle />
              Academicians and Professors
            </li>

            <li>
              <FaCheckCircle />
              Healthcare Professionals
            </li>

            <li>
              <FaCheckCircle />
              Industry Professionals
            </li>

            <li>
              <FaCheckCircle />
              Scientists and Researchers
            </li>

          </ul>

        </div>

        {/* RECOGNITION */}
        <div className="nominationpaper-section">

          <h2>
            Award Recognition
          </h2>

          <div className="nominationpaper-recognition">

            <div className="nominationpaper-recognition-item">

              <FaCheckCircle />

              Best Paper Award Certificate

            </div>

            <div className="nominationpaper-recognition-item">

              <FaCheckCircle />

              Recognition on IJPASR Website

            </div>

            <div className="nominationpaper-recognition-item">

              <FaCheckCircle />

              Editorial Appreciation Letter

            </div>

            <div className="nominationpaper-recognition-item">

              <FaCheckCircle />

              Journal Newsletter Mention

            </div>

          </div>

        </div>

        {/* APPLY */}
        <div className="nominationpaper-apply">

          <h2>
            How to Apply / Nominate
          </h2>

          <p>
            Authors or readers can nominate a published
            paper by sending an email with manuscript
            details, DOI, author information,
            and short justification.
          </p>

          {/* EMAIL BOX */}
          <div className="nominationpaper-apply-box">

            <FaEnvelope />

            <span>
              Send nomination request to:
            </span>

            <a href="/">
              editor@ijpasr.com
            </a>

          </div>

          {/* DETAILS */}
          <div className="nominationpaper-details-wrapper">

            {/* LEFT */}
            <div className="nominationpaper-details-card">

              <h3>
                Details to Mention in Email
              </h3>

              <ul>

                <li>Paper Title</li>

                <li>Author(s) Name</li>

                <li>Volume, Issue, Year</li>

                <li>Article ID / DOI (if available)</li>

                <li>Corresponding Author Email & Contact</li>

                <li>
                  Short justification
                  (why the paper deserves the award)
                </li>

              </ul>

            </div>

            {/* RIGHT */}
            <div className="nominationpaper-details-card">

              <h3>
                Important Note
              </h3>

              <ul>

                <li>
                  Only papers published in the
                  current issue will be considered.
                </li>

                <li>
                  The decision of the Editorial Board
                  will be final.
                </li>

                <li>
                  Award announcement will be made after
                  completion of the issue publication process.
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default NominationBestPaper;