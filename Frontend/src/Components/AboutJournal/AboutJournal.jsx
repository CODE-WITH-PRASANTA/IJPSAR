// AboutJournal.jsx

import React from "react";
import "./AboutJournal.css";

import {
  FaGlobe,
  FaBookOpen,
  FaUserShield,
  FaBolt,
  FaCheckCircle,
  FaFlask,
} from "react-icons/fa";

const journalInfo = [
  {
    title: "Journal Title",
    value:
      "International Journal of Pharmaceutical & Allied Sciences Research",
  },
  {
    title: "Short Name",
    value: "IJPASR",
  },
  {
    title: "Frequency",
    value: "Quarterly",
  },
  {
    title: "Access",
    value: "Open Access (Online)",
  },
  {
    title: "Review Process",
    value: "Double-Blind Peer Review",
  },
  {
    title: "Publication Time",
    value: "3–4 Working Days",
  },
];

const features = [
  {
    icon: <FaGlobe />,
    title: "Global Reach",
    desc: "International visibility and worldwide academic accessibility.",
  },
  {
    icon: <FaBolt />,
    title: "Fast Track",
    desc: "Rapid publication process with fast review notification.",
  },
  {
    icon: <FaUserShield />,
    title: "Peer Reviewed",
    desc: "Strict double-blind peer review for research quality.",
  },
  {
    icon: <FaBookOpen />,
    title: "Open Access",
    desc: "Research articles available freely for everyone.",
  },
];

const AboutJournal = () => {
  return (
    <section className="aboutJournal">
      {/* BACKGROUND GLOW */}
      <div className="journalGlow journalGlow1"></div>
      <div className="journalGlow journalGlow2"></div>

      <div className="aboutJournalContainer">
        {/* ================= LEFT CONTENT ================= */}

        <div className="aboutJournalLeft">
          <span className="journalTag">
            ABOUT THE JOURNAL
          </span>

          <h1>
            A path to globalize your
            <span> research work.</span>
          </h1>

          <p>
            The <strong>International Journal of
            Pharmaceutical & Allied Sciences Research
            (IJPASR)</strong> is an international,
            peer-reviewed, open-access multidisciplinary
            journal devoted to pharmaceutical sciences
            and allied disciplines.
          </p>

          <p>
            IJPASR focuses on innovative research,
            review articles, clinical studies,
            short communications, and scientific
            advancements that contribute significantly
            to pharmacy and healthcare research.
          </p>

          {/* FEATURES */}
          <div className="journalFeatureGrid">
            {features.map((item, index) => (
              <div className="journalFeatureCard" key={index}>
                <div className="featureIcon">
                  {item.icon}
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FOCUS SECTION */}
          <div className="focusSection">
            <div className="focusTitle">
              <FaFlask />
              <h2>Focus & Scope</h2>
            </div>

            <p>
              The journal publishes original research,
              mini reviews, rapid communications,
              ethics forum papers, educational research,
              and case reports across pharmaceutical and
              multidisciplinary allied sciences.
            </p>
          </div>

          {/* DISCLAIMER */}
          <div className="disclaimerCard">
            <h2>Disclaimer</h2>

            <p>
              All articles published in this journal
              reflect the views of the authors and not
              necessarily those of the editorial board
              or publisher. Every manuscript undergoes
              strict peer review and quality evaluation.
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}

        <div className="aboutJournalRight">
          <div className="journalInfoCard">
            <div className="journalInfoTop">
              <FaCheckCircle />
              <h2>Journal Snapshot</h2>
            </div>

            <div className="journalInfoList">
              {journalInfo.map((item, index) => (
                <div
                  className="journalInfoItem"
                  key={index}
                >
                  <h4>{item.title}</h4>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* EXTRA CARD */}
          <div className="publishCard">
            <h3>Publish With Confidence</h3>

            <p>
              Publish your innovative research with
              rapid review, international exposure,
              and trusted scientific communication.
            </p>

            <button>
              Submit Your Paper
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutJournal;