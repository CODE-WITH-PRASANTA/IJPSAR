import React from "react";
import "./SubmitFrom.css";

const SubmitFrom = () => {
  return (
    <div className="submission-wrapper">
      <div className="submission-container">
        {/* LEFT SIDE */}
        <div className="submission-left">
          <span className="submission-label">ONLINE SUBMISSION</span>

          <h1 className="submission-title">
            Submit your research to IJPASR
          </h1>

          <p className="submission-description">
            Our online submission portal accepts manuscripts as Word (.docx)
            or LaTeX. All submissions undergo iThenticate plagiarism check
            before peer review.
          </p>

          <form className="submission-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Article Title *</label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label>Article Type *</label>
                <select>
                  <option>Original Research</option>
                  <option>Review Article</option>
                  <option>Case Study</option>
                </select>
              </div>

              <div className="form-group">
                <label>Corresponding Author *</label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input type="email" />
              </div>

              <div className="form-group">
                <label>Affiliation *</label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label>Country *</label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label>Co-authors</label>
                <input type="text" placeholder="Name1; Name2; ..." />
              </div>

              <div className="form-group">
                <label>Subject Category</label>
                <select>
                  <option>Pharmaceutics</option>
                  <option>Pharmacology</option>
                  <option>Biotechnology</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Abstract *</label>
              <textarea rows="7"></textarea>
            </div>

            <div className="form-group full-width">
              <label>Keywords (comma separated)</label>
              <input type="text" />
            </div>

            <div className="form-group full-width">
              <label>Upload Manuscript (.docx, .pdf)</label>
              <input type="file" className="file-input" />
            </div>

            <div className="checkbox-wrapper">
              <input type="checkbox" id="confirm" />
              <label htmlFor="confirm">
                I confirm the work is original and has not been published
                elsewhere.
              </label>
            </div>

            <div className="submit-btn-wrapper">
              <button type="submit" className="submit-btn">
                ✈ Submit Manuscript
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="submission-right">
          <div className="info-card">
            <h4>BEFORE YOU SUBMIT</h4>

            <ul>
              <li>Read author guidelines</li>
              <li>Publication ethics</li>
              <li>Plagiarism policy</li>
              <li>Peer review process</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>NEED HELP?</h4>

            <p>
              Email editor@ijpasr.com or call our editorial office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitFrom;