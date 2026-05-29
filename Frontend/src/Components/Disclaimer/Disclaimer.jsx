// Hey.jsx

import React from "react";
import "./Disclaimer.css";

const Disclaimer = () => {
  return (
    <div className="hey">
      <div className="hey__container">
        {/* Main Heading */}
        <h1 className="hey__main-title">DISCLAIMER (IJPASR)</h1>

        <p className="hey__text">
          The content published in IJPASR (International Journal of
          Pharmaceutical and Applied Science Research) is intended only for
          research, academic, educational, and informational purposes.
        </p>

        <p className="hey__text">
          The journal does not guarantee the completeness, accuracy,
          reliability, or applicability of the published information.
        </p>

        {/* Section 1 */}
        <section className="hey__section">
          <h2 className="hey__title">
            1. Author Responsibility Disclaimer
          </h2>

          <p className="hey__text">
            All research articles, review articles, case reports, and other
            publications submitted to IJPASR are solely the responsibility of
            the respective author(s).
          </p>

          <p className="hey__text">Authors are fully responsible for:</p>

          <ul className="hey__list">
            <li>Originality of the manuscript</li>
            <li>Authenticity of research data and results</li>
            <li>Ethical approval and patient consent (where applicable)</li>
            <li>Plagiarism-free content</li>
            <li>Correct citations and references</li>
            <li>
              Obtaining permission for figures, tables, and copyrighted
              materials
            </li>
            <li>Compliance with international publication ethics</li>
          </ul>

          <p className="hey__text">
            IJPASR will not be responsible for any legal issues arising from
            the submitted or published content.
          </p>
        </section>

        {/* Section 2 */}
        <section className="hey__section">
          <h2 className="hey__title">
            2. Editorial and Publisher Responsibility Disclaimer
          </h2>

          <p className="hey__text">
            The Editorial Board, Publisher, and Reviewers of IJPASR make every
            effort to ensure quality publication through peer review and
            editorial screening.
          </p>

          <p className="hey__text">
            However, IJPASR does not take responsibility for:
          </p>

          <ul className="hey__list">
            <li>Errors in data, figures, or methodology</li>
            <li>Misleading conclusions by authors</li>
            <li>Misuse of published information</li>
            <li>
              Financial loss, injury, or damage caused by use of published
              research
            </li>
          </ul>

          <p className="hey__text">
            The views and opinions expressed in published articles are those of
            the authors and do not necessarily reflect the views of IJPASR.
          </p>
        </section>

        {/* Section 3 */}
        <section className="hey__section">
          <h2 className="hey__title">
            3. Medical, Clinical, and Pharmaceutical Disclaimer
          </h2>

          <p className="hey__text">
            IJPASR publishes pharmaceutical, medical, clinical, and
            healthcare-related research.
          </p>

          <p className="hey__text">
            The journal strictly declares that:
          </p>

          <ul className="hey__list">
            <li>
              Published articles are not a substitute for medical consultation
            </li>
            <li>The journal does not provide medical advice</li>
            <li>
              Readers must consult licensed healthcare professionals before
              using any drug, therapy, or medical procedure mentioned in the
              articles
            </li>
          </ul>

          <p className="hey__text">
            IJPASR shall not be liable for any consequences, side effects, or
            damages arising from the use of information published in the
            journal.
          </p>
        </section>

        {/* Section 4 */}
        <section className="hey__section">
          <h2 className="hey__title">4. Liability Disclaimer</h2>

          <p className="hey__text">
            Under no circumstances shall IJPASR, its publisher, editorial board
            members, reviewers, employees, or associated staff be liable for:
          </p>

          <ul className="hey__list">
            <li>Direct or indirect damages</li>
            <li>Accidental or consequential losses</li>
            <li>Business interruption</li>
            <li>Loss of data or reputation</li>
          </ul>

          <p className="hey__text">
            arising due to the use of published content.
          </p>
        </section>

        {/* Section 5 */}
        <section className="hey__section">
          <h2 className="hey__title">
            5. External Links Disclaimer
          </h2>

          <p className="hey__text">
            IJPASR website may contain external links to other websites for
            reference purposes.
          </p>

          <p className="hey__text">
            The journal is not responsible for:
          </p>

          <ul className="hey__list">
            <li>Content of external websites</li>
            <li>Security of external websites</li>
            <li>Accuracy of information on third-party sites</li>
            <li>Privacy practices of external websites</li>
          </ul>

          <p className="hey__text">
            Accessing such external links is solely at the user's own risk.
          </p>
        </section>

        {/* Section 6 */}
        <section className="hey__section">
          <h2 className="hey__title">
            6. Advertisement Disclaimer (If Applicable)
          </h2>

          <p className="hey__text">
            If the IJPASR website displays advertisements, sponsored content,
            or promotional materials, the journal does not endorse any product
            or service unless explicitly mentioned.
          </p>

          <p className="hey__text">
            The journal is not responsible for any claims made by advertisers.
          </p>
        </section>

        {/* Section 7 */}
        <section className="hey__section">
          <h2 className="hey__title">
            7. Website Content Disclaimer
          </h2>

          <p className="hey__text">
            IJPASR may update, modify, or remove content from the website
            without prior notice.
          </p>

          <p className="hey__text">
            The journal does not guarantee uninterrupted website access and is
            not responsible for:
          </p>

          <ul className="hey__list">
            <li>Server downtime</li>
            <li>Technical issues</li>
            <li>Hacking or malware attacks</li>
            <li>Data loss due to technical failures</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;