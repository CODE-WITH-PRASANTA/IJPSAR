// PeerReviewProcess.jsx

import React from "react";
import "./PeerReviewProcess.css";

import {
  FaPaperPlane,
  FaUserShield,
  FaUsers,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";

const reviewSteps = [
  {
    id: 1,
    icon: <FaPaperPlane />,
    title: "1. Submission",
  },

  {
    id: 2,
    icon: <FaUserShield />,
    title: "2. Editor Screen",
  },

  {
    id: 3,
    icon: <FaUsers />,
    title: "3. Reviewer Assignment",
  },

  {
    id: 4,
    icon: <FaEdit />,
    title: "4. Author Revision",
  },

  {
    id: 5,
    icon: <FaCheckCircle />,
    title: "5. Final Decision",
  },
];

const reviewDetails = [
  {
    id: "01",
    title: "Editorial Screening (3 days)",
    desc: "Editor-in-chief verifies scope, originality, formatting, and runs iThenticate plagiarism check.",
  },

  {
    id: "02",
    title: "Peer Review (14 days)",
    desc: "Two or more international subject experts evaluate scientific rigor, novelty, and clarity.",
  },

  {
    id: "03",
    title: "Revision (7 days)",
    desc: "Authors address reviewer comments and submit revised manuscript with point-by-point response.",
  },

  {
    id: "04",
    title: "Publication (3 days)",
    desc: "Accepted articles receive a CrossRef DOI and are immediately published online.",
  },
];

const PeerReviewProcess = () => {
  return (
    <section className="peerReviewProcessSection">
      <div className="peerReviewProcessContainer">

        {/* ================= HEADER ================= */}

        <div className="peerReviewProcessHeader">

          <span>DOUBLE-BLIND</span>

          <h2>
            How peer review works at <span>IJPASR</span>
          </h2>

          <p>
            Every submission undergoes rigorous double-blind peer
            review by at least two independent international experts.
          </p>

        </div>

        {/* ================= STEPS ================= */}

        <div className="peerReviewStepsWrapper">

          <div className="peerReviewStepsLine"></div>

          {reviewSteps.map((step) => (
            <div className="peerReviewStepCard" key={step.id}>

              <div className="peerReviewStepIcon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

            </div>
          ))}

        </div>

        {/* ================= DETAILS ================= */}

        <div className="peerReviewDetailsGrid">

          {reviewDetails.map((item) => (
            <div className="peerReviewDetailCard" key={item.id}>

              <div className="peerReviewDetailNumber">
                {item.id}
              </div>

              <h4>{item.title}</h4>

              <p>{item.desc}</p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default PeerReviewProcess;