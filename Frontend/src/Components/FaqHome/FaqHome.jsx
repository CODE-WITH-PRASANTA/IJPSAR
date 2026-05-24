// FaqHome.jsx

import React, { useState } from "react";
import "./FaqHome.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
  {
    id: 1,
    question: "How can I submit my manuscript to IJPASR?",
    answer:
      "Authors can submit manuscripts through our online submission portal by uploading all required files, author details, and manuscript information carefully.",
  },
  {
    id: 2,
    question: "What is the publication fee?",
    answer:
      "The publication fee depends on article category and publication type. Complete fee details are available on the journal publication fee section.",
  },
  {
    id: 3,
    question: "How long does review and publication take?",
    answer:
      "The peer-review process generally takes around 2–5 working days, and accepted manuscripts are published shortly after final approval.",
  },
  {
    id: 4,
    question: "What article types does IJPASR accept?",
    answer:
      "IJPASR accepts research articles, review papers, case studies, technical reports, short communications, and innovative research manuscripts.",
  },
  {
    id: 5,
    question: "Is IJPASR an open-access journal?",
    answer:
      "Yes, IJPASR is a fully open-access journal where readers and researchers can access all published articles freely worldwide.",
  },
];

const FaqHome = () => {
  const [activeFaq, setActiveFaq] = useState(1);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <section className="faqHome">
      <div className="faqHome-container">

        {/* LEFT CONTENT */}
        <div className="faqHome-left">

          <span className="faqHome-subtitle">
            Frequently Asked Questions
          </span>

          <h2 className="faqHome-heading">
            Everything You Need To Know
          </h2>

          <p className="faqHome-description">
            Find quick answers about manuscript submission,
            publication process, peer review, fees, and journal
            policies with our premium FAQ experience.
          </p>

        </div>

        {/* RIGHT FAQ */}
        <div className="faqHome-right">

          {faqData.map((item) => (
            <div
              key={item.id}
              className={
                activeFaq === item.id
                  ? "faqHome-item active"
                  : "faqHome-item"
              }
            >

              <button
                className="faqHome-question"
                onClick={() => toggleFaq(item.id)}
              >

                <h3>{item.question}</h3>

                <div className="faqHome-icon">
                  {activeFaq === item.id ? (
                    <FaMinus />
                  ) : (
                    <FaPlus />
                  )}
                </div>

              </button>

              <div
                className={
                  activeFaq === item.id
                    ? "faqHome-answer activeAnswer"
                    : "faqHome-answer"
                }
              >
                <p>{item.answer}</p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FaqHome;