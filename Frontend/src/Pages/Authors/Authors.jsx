import React from "react";
import "./Authors.css";

const Authors = () => {
  return (
    <div className="authorsMainContainer">
      <div className="authorsWrapper">

        {/* LEFT SIDE */}
        <div className="authorsLeftSection">

          <p className="authorsTag">FOR AUTHORS</p>

          <h1 className="authorsMainHeading">
            Manuscript preparation guidelines
          </h1>

          <p className="authorsDescription">
            All manuscripts submitted to IJPASR must conform to the following
            structural and formatting guidelines.
          </p>

          {/* SECTION 1 */}
          <div className="authorsContentSection">
            <h2 className="authorsSectionHeading">
              1. Manuscript Structure
            </h2>

            <p className="authorsText">
              Title · Authors and Affiliations · Abstract (≤ 250 words) ·
              Keywords (4–8) · Introduction · Materials & Methods · Results ·
              Discussion · Conclusion · Acknowledgements · References
              (Vancouver style).
            </p>
          </div>

          {/* SECTION 2 */}
          <div className="authorsContentSection">
            <h2 className="authorsSectionHeading">2. Formatting</h2>

            <ul className="authorsList">
              <li>Font: Times New Roman, 12pt, double-spaced</li>
              <li>Margins: 1 inch on all sides</li>
              <li>Line numbering enabled</li>
              <li>Word count: 3000–8000 words for original research</li>
              <li>Figures: 300 DPI, TIFF/PNG, uploaded separately</li>
            </ul>
          </div>

          {/* SECTION 3 */}
          <div className="authorsContentSection">
            <h2 className="authorsSectionHeading">3. References</h2>

            <p className="authorsText">
              Use Vancouver style (numbered superscript). Cite primary
              literature and avoid excessive self-citation.
            </p>
          </div>

          {/* SECTION 4 */}
          <div className="authorsContentSection">
            <h2 className="authorsSectionHeading">
              4. Ethics & Disclosures
            </h2>

            <p className="authorsText">
              Include statements on ethical approval, informed consent,
              conflicts of interest, and funding.
            </p>
          </div>

          {/* SECTION 5 */}
          <div className="authorsContentSection">
            <h2 className="authorsSectionHeading">5. Submission Files</h2>

            <ul className="authorsList">
              <li>Cover letter</li>
              <li>Anonymized manuscript</li>
              <li>Title page (separate)</li>
              <li>Figures & tables</li>
              <li>Supplementary material (optional)</li>
            </ul>
          </div>

          {/* TERMS */}
          <div className="authorsTermsSection">
            <h2 className="authorsTermsHeading">
              Terms & Conditions for Article Publication (IJPASR) to Author
            </h2>

            <p className="authorsTermsText">
              By submitting a manuscript to the International Journal of
              Pharmaceutical and Allied Sciences Research (IJPASR), the
              author(s) confirm that the work is original, unpublished, and not
              under review elsewhere. Authors are responsible for ensuring the
              manuscript is free from plagiarism, false data, and unethical
              practices. Publication is subject to peer review and editorial
              approval. Accepted articles may require publication charges and
              all payments are non-refundable.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="authorsRightSection">

          {/* QUICK LINKS CARD */}
          <div className="authorsSidebarCard">
            <h3 className="authorsSidebarHeading">QUICK LINKS</h3>

            <div className="authorsLinksWrapper">
              <a href="/" className="authorsSidebarLink">
                Manuscript Template (.docx)
              </a>

              <a href="/" className="authorsSidebarLink">
                LaTeX Template
              </a>

              <a href="/" className="authorsSidebarLink">
                Cover Letter Template
              </a>

              <a href="/" className="authorsSidebarLink">
                Copyright Form
              </a>

              <a href="/" className="authorsSidebarLink">
                Conflict of Interest Form
              </a>
            </div>
          </div>

          {/* APC CARD */}
          <div className="authorsSidebarCard">
            <h3 className="authorsSidebarHeading">
              ARTICLE PROCESSING CHARGE
            </h3>

            <p className="authorsChargeText">
              USD 90 — covers DOI, open-access dissemination, indexing.
              Waivers available for low-income countries.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Authors;