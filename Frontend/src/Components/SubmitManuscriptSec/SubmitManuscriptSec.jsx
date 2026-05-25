// SubmitManuscript.jsx

import React from "react";
import "./SubmitManuscriptSec.css";

import {
  FaPaperPlane,
} from "react-icons/fa";

const SubmitManuscript = () => {
  return (
    <section className="submitManuscriptSection">

      <div className="submitManuscriptContainer">

        {/* ================= LEFT SIDE ================= */}

        <div className="submitManuscriptLeft">

          {/* HEADING */}
          <div className="submitManuscriptHeading">

            <span>ONLINE SUBMISSION</span>

            <h2>
              Submit your research to <span>IJPASR</span>
            </h2>

            <p>
              Our online submission portal accepts manuscripts as
              Word (.docx) or LaTeX. All submissions undergo
              iThenticate plagiarism check before peer review.
            </p>

          </div>

          {/* FORM WRAPPER */}
          <div className="submitManuscriptFormWrapper">

            <form className="submitManuscriptForm">

              <div className="submitManuscriptGrid">

                {/* ARTICLE TITLE */}
                <div className="submitManuscriptField">
                  <label>Article Title *</label>

                  <input
                    type="text"
                    placeholder="Enter article title"
                  />
                </div>

                {/* ARTICLE TYPE */}
                <div className="submitManuscriptField">
                  <label>Article Type *</label>

                  <select>
                    <option>Original Research</option>
                    <option>Review Article</option>
                    <option>Case Study</option>
                    <option>Short Communication</option>
                  </select>
                </div>

                {/* CORRESPONDING AUTHOR */}
                <div className="submitManuscriptField">
                  <label>Corresponding Author *</label>

                  <input
                    type="text"
                    placeholder="Author name"
                  />
                </div>

                {/* EMAIL */}
                <div className="submitManuscriptField">
                  <label>Email *</label>

                  <input
                    type="email"
                    placeholder="author@email.com"
                  />
                </div>

                {/* AFFILIATION */}
                <div className="submitManuscriptField">
                  <label>Affiliation *</label>

                  <input
                    type="text"
                    placeholder="University / Institution"
                  />
                </div>

                {/* COUNTRY */}
                <div className="submitManuscriptField">
                  <label>Country *</label>

                  <input
                    type="text"
                    placeholder="Country"
                  />
                </div>

                {/* CO AUTHORS */}
                <div className="submitManuscriptField">
                  <label>Co-authors</label>

                  <input
                    type="text"
                    placeholder="Name1, Name2..."
                  />
                </div>

                {/* SUBJECT CATEGORY */}
                <div className="submitManuscriptField">
                  <label>Subject Category</label>

                  <select>
                    <option>Pharmaceutics</option>
                    <option>Pharmacology</option>
                    <option>Clinical Research</option>
                    <option>Biotechnology</option>
                    <option>Medicinal Chemistry</option>
                  </select>
                </div>

                {/* ABSTRACT */}
                <div className="submitManuscriptField submitManuscriptFull">
                  <label>Abstract *</label>

                  <textarea
                    placeholder="Write manuscript abstract..."
                  ></textarea>
                </div>

                {/* KEYWORDS */}
                <div className="submitManuscriptField submitManuscriptFull">
                  <label>Keywords (comma separated)</label>

                  <input
                    type="text"
                    placeholder="Pharmacy, Drug Delivery, Research..."
                  />
                </div>

                {/* FILE */}
                <div className="submitManuscriptField submitManuscriptFull">
                  <label>
                    Upload Manuscript (.docx, .pdf)
                  </label>

                  <input
                    type="file"
                    className="submitManuscriptFile"
                  />
                </div>

                {/* CHECKBOX */}
                <div className="submitManuscriptCheckbox submitManuscriptFull">

                  <input type="checkbox" />

                  <span>
                    I confirm the work is original and has not
                    been published elsewhere.
                  </span>

                </div>

              </div>

              {/* BUTTON */}
              <div className="submitManuscriptBtnWrapper">

                <button
                  type="submit"
                  className="submitManuscriptBtn"
                >
                  <FaPaperPlane />

                  Submit Manuscript
                </button>

              </div>

            </form>

          </div>

        </div>

        {/* ================= RIGHT SIDEBAR ================= */}

        <div className="submitManuscriptSidebar">

          {/* CARD 1 */}
          <div className="submitManuscriptSidebarCard">

            <h3>Before You Submit</h3>

            <div className="submitManuscriptSidebarLinks">

              <a href="/">Read author guidelines</a>

              <a href="/">Publication ethics</a>

              <a href="/">Plagiarism policy</a>

              <a href="/">Peer review process</a>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="submitManuscriptSidebarCard">

            <h3>Need Help?</h3>

            <p>
              Email editor@ijpasr.com or contact our editorial
              office for manuscript submission assistance.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default SubmitManuscript;