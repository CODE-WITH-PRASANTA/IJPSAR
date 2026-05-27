// PlagiarismPolicySec.jsx

import React from "react";
import "./PlagiarismPolicySec.css";

import {
  FaShieldAlt,
  FaPercentage,
  FaSearch,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const similarityData = [
  {
    id: 1,
    icon: <FaCheckCircle />,
    title: "Below 10%",
    desc: "Acceptable similarity level and proceeds directly to peer review.",
  },

  {
    id: 2,
    icon: <FaPercentage />,
    title: "10% – 15%",
    desc: "Returned to authors for paraphrasing and corrections.",
  },

  {
    id: 3,
    icon: <FaExclamationTriangle />,
    title: "Above 15%",
    desc: "Manuscript may be rejected due to high plagiarism similarity.",
  },
];

const misconductData = [
  "Duplicate Submission",
  "Fabricated Data",
  "Ghost Authorship",
  "Image Manipulation",
  "Unethical Citation",
  "Data Falsification",
];

const PlagiarismPolicySec = () => {
  return (
    <section className="plagiarismPolicySec">

      {/* Background Glow */}
      <div className="plagiarismPolicySecGlowOne"></div>
      <div className="plagiarismPolicySecGlowTwo"></div>

      <div className="plagiarismPolicySecContainer">

        {/* TOP CONTENT */}
        <div className="plagiarismPolicySecTop">

          <span className="plagiarismPolicySecTag">
            ZERO TOLERANCE
          </span>

          <h2>
            Plagiarism & <span>Originality</span> Policy
          </h2>

          <p>
            IJPASR uses iThenticate (Turnitin) to screen every
            submission. Manuscripts with similarity index above
            15% (excluding references) are returned to authors
            for revision or rejected.
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="plagiarismPolicySecGrid">

          {/* LEFT */}
          <div className="plagiarismPolicySecLeft">

            <div className="plagiarismPolicySecHeading">

              <div className="plagiarismPolicySecHeadingIcon">
                <FaShieldAlt />
              </div>

              <div>
                <h3>Acceptable Similarity</h3>

                <p>
                  Manuscripts are categorized according to
                  similarity percentage.
                </p>
              </div>

            </div>

            {/* CARDS */}
            <div className="plagiarismPolicySecCards">

              {similarityData.map((item) => (
                <div
                  className="plagiarismPolicySecCard"
                  key={item.id}
                >

                  <div className="plagiarismPolicySecCardGlow"></div>

                  <div className="plagiarismPolicySecCardIcon">
                    {item.icon}
                  </div>

                  <h4>{item.title}</h4>

                  <p>{item.desc}</p>

                </div>
              ))}

            </div>
          </div>

          {/* RIGHT */}
          <div className="plagiarismPolicySecRight">

            <div className="plagiarismPolicySecMisconduct">

              <div className="plagiarismPolicySecHeading">

                <div className="plagiarismPolicySecHeadingIcon">
                  <FaSearch />
                </div>

                <div>
                  <h3>Misconduct Handling</h3>

                  <p>
                    Ethical violations are investigated
                    according to COPE guidelines.
                  </p>
                </div>

              </div>

              <div className="plagiarismPolicySecInfo">

                <p>
                  Suspected misconduct such as duplicate
                  submission, fabricated data, ghost
                  authorship, and image manipulation is
                  thoroughly investigated.
                </p>

                <div className="plagiarismPolicySecBadges">

                  {misconductData.map((item, index) => (
                    <span key={index}>
                      {item}
                    </span>
                  ))}

                </div>

                <div className="plagiarismPolicySecAlert">

                  <FaExclamationTriangle />

                  <p>
                    Confirmed cases may lead to manuscript
                    rejection, retraction, and institutional
                    notification.
                  </p>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlagiarismPolicySec;