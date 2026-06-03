import React, { useState } from "react";
import "./Faq.css";

import {
  FaPlus,
  FaMinus,
} from "react-icons/fa";

const faqData = [
  {
    question: "How can I submit my manuscript to IJPASR?",
    answer:
      "Authors can submit their manuscript using the Submit Paper Online option available on the official website of IJPASR or through the official editorial email.",
  },

  {
    question: "What type of articles does IJPASR accept?",
    answer:
      "IJPASR accepts Original Research Articles, Review Articles, Short Communications, Case Reports, Clinical Studies, Pharmacology Research, Drug Delivery Research and other Pharmacy & Allied Sciences research works.",
  },

  {
    question: "What is the publication fee in IJPASR?",
    answer:
      "Indian Authors: ₹1570 INR and International Authors: $59 USD.",
  },

  {
    question: "What services are included in the publication fee?",
    answer:
      "Publication certificate, confirmation letter, formatting, DOI support, indexing support and lifetime online archive availability.",
  },

  {
    question: "How much time does IJPASR take for review and publication?",
    answer:
      "Review notification within 1–2 working days and publication within 3–4 working days after acceptance.",
  },

  {
    question: "Does IJPASR provide manuscript templates?",
    answer:
      "Yes. Authors must prepare manuscripts in MS Word format using the journal template.",
  },

  {
    question: "What are the formatting guidelines of IJPASR?",
    answer:
      "A4 page size, Times New Roman font, single spacing, single column and standard journal formatting.",
  },

  {
    question: "Is IJPASR an Open Access Journal?",
    answer:
      "Yes. All published articles are freely accessible worldwide.",
  },

  {
    question: "Does IJPASR provide DOI?",
    answer:
      "Yes. DOI may be provided depending upon issue and volume availability.",
  },

  {
    question: "Does IJPASR publish monthly or quarterly issues?",
    answer:
      "The journal publishes monthly, bi-monthly or quarterly depending upon publication schedule.",
  },

  {
    question: "Can I submit a manuscript already published elsewhere?",
    answer:
      "No. Submitted work must be original and unpublished.",
  },

  {
    question: "Can I submit the same paper to multiple journals?",
    answer:
      "No. Simultaneous submission is strictly prohibited.",
  },

  {
    question: "Does IJPASR check plagiarism?",
    answer:
      "Yes. All manuscripts are checked for plagiarism before publication.",
  },

  {
    question: "What is the acceptable plagiarism limit?",
    answer:
      "Similarity index should remain below acceptable academic limits.",
  },

  {
    question: "Is peer review mandatory?",
    answer:
      "Yes. All papers undergo peer review before acceptance.",
  },

  {
    question: "What type of peer review does IJPASR follow?",
    answer:
      "IJPASR generally follows a double-blind peer review process.",
  },

  {
    question: "Can I request fast publication?",
    answer:
      "Yes. Fast Track Publication within 24 hours is available.",
  },

  {
    question: "Can authors suggest reviewers?",
    answer:
      "Yes, but reviewer selection is decided by the editorial board.",
  },

  {
    question: "What documents are required after acceptance?",
    answer:
      "Undertaking form, copyright form, ID proof, payment proof and final manuscript.",
  },

  {
    question: "How can I track paper status?",
    answer:
      "Authors can track paper status through the submission tracking portal.",
  },

  {
    question: "How will I receive my publication certificate?",
    answer:
      "Authors can download certificates from the portal or receive them through email.",
  },

  {
    question: "Will each author receive a separate certificate?",
    answer:
      "Yes. Separate certificates are provided for each author.",
  },

  {
    question: "Will I receive an acceptance letter before publication?",
    answer:
      "Yes. Official acceptance letters are provided after successful review.",
  },

  {
    question: "Can I make corrections after submission?",
    answer:
      "Yes. Minor corrections are allowed before final publication.",
  },

  {
    question: "Can I withdraw my paper after submission?",
    answer:
      "Yes. Authors may withdraw manuscripts before acceptance.",
  },

  {
    question: "Can I withdraw my paper after acceptance?",
    answer:
      "Withdrawal after acceptance may involve processing charges.",
  },

  {
    question: "Can I publish more than one paper in IJPASR?",
    answer:
      "Yes. Multiple papers are allowed but processed separately.",
  },

  {
    question: "Is there any limit on the number of pages?",
    answer:
      "Very lengthy manuscripts may require additional processing charges.",
  },

  {
    question: "Does IJPASR accept papers from all countries?",
    answer:
      "Yes. IJPASR accepts papers from authors worldwide.",
  },

  {
    question: "Does IJPASR accept conference papers?",
    answer:
      "Yes, if the manuscript is original and properly expanded.",
  },

  {
    question: "Can I publish a review paper in IJPASR?",
    answer:
      "Yes. Review papers are accepted in Pharmacy and Allied Sciences.",
  },

  {
    question: "Does IJPASR publish case reports?",
    answer:
      "Yes. Clinical case reports and case studies are accepted.",
  },

  {
    question: "Does IJPASR provide hard copy of journal?",
    answer:
      "Hard copy availability depends on journal policy.",
  },

  {
    question: "Will my published paper be indexed in Google Scholar?",
    answer:
      "IJPASR makes all efforts for indexing in Google Scholar.",
  },

  {
    question: "How can I cite my published article?",
    answer:
      "Citation formats are provided on the journal website.",
  },

  {
    question: "Can I use previously published figures and tables?",
    answer:
      "Only with proper copyright permission and citation.",
  },

  {
    question: "Can I include AI-generated content in my manuscript?",
    answer:
      "AI-assisted content must be checked for originality and correctness.",
  },

  {
    question: "What is the maximum number of authors allowed?",
    answer:
      "Normally maximum 5 authors are allowed.",
  },

  {
    question: "What happens if the paper is rejected?",
    answer:
      "Authors may revise and resubmit as a fresh submission.",
  },

  {
    question: "How can I become a reviewer or editorial board member?",
    answer:
      "Candidates may apply through the reviewer registration form.",
  },

  {
    question: "Does IJPASR provide language correction support?",
    answer:
      "Minor grammar corrections may be provided during formatting.",
  },

  {
    question: "What if I face any issue during submission?",
    answer:
      "Authors may contact the editorial office through official email.",
  },

  {
    question: "How can I contact the IJPASR editorial office?",
    answer:
      "Email: editorijpasr@gmail.com",
  },
];

const ITEMS_PER_PAGE = 5;

const Faq = () => {

  const [openFaq, setOpenFaq] = useState(null);

  const [leftPage, setLeftPage] = useState(1);
  const [rightPage, setRightPage] = useState(1);

  const leftFaqs = faqData.slice(0, 22);
  const rightFaqs = faqData.slice(22, 43);

  const getPaginatedFaqs = (faqs, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return faqs.slice(start, start + ITEMS_PER_PAGE);
  };

  const leftData = getPaginatedFaqs(
    leftFaqs,
    leftPage
  );

  const rightData = getPaginatedFaqs(
    rightFaqs,
    rightPage
  );

  return (
    <div className="faqPage">

      <div className="faqHeader">

        <h1 className="faqTitle">
          Frequently Asked Questions
        </h1>

        <p className="faqSubtitle">
          Find answers related to publication,
          submission, peer review, certificates,
          indexing and journal policies.
        </p>

      </div>

      <div className="faqGrid">

        {/* LEFT */}
        <div className="faqColumn">

          {leftData.map((faq, index) => {

            const uniqueIndex =
              `left-${leftPage}-${index}`;

            return (
              <div
                className={`faqCard ${
                  openFaq === uniqueIndex
                    ? "faqCardActive"
                    : ""
                }`}
                key={index}
              >

                <div
                  className="faqQuestionWrapper"
                  onClick={() =>
                    setOpenFaq(
                      openFaq === uniqueIndex
                        ? null
                        : uniqueIndex
                    )
                  }
                >

                  <h3 className="faqQuestion">
                    {faq.question}
                  </h3>

                  <div className="faqIcon">
                    {openFaq === uniqueIndex ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                  </div>

                </div>

                {openFaq === uniqueIndex && (
                  <div className="faqAnswerWrapper">

                    <p className="faqAnswer">
                      {faq.answer}
                    </p>

                  </div>
                )}

              </div>
            );
          })}

          <div className="faqPagination">

            {[
              ...Array(
                Math.ceil(
                  leftFaqs.length /
                    ITEMS_PER_PAGE
                )
              ),
            ].map((_, index) => (
              <button
                key={index}
                className={`faqPageButton ${
                  leftPage === index + 1
                    ? "faqPageButtonActive"
                    : ""
                }`}
                onClick={() =>
                  setLeftPage(index + 1)
                }
              >
                {index + 1}
              </button>
            ))}

          </div>

        </div>

        {/* RIGHT */}
        <div className="faqColumn">

          {rightData.map((faq, index) => {

            const uniqueIndex =
              `right-${rightPage}-${index}`;

            return (
              <div
                className={`faqCard ${
                  openFaq === uniqueIndex
                    ? "faqCardActive"
                    : ""
                }`}
                key={index}
              >

                <div
                  className="faqQuestionWrapper"
                  onClick={() =>
                    setOpenFaq(
                      openFaq === uniqueIndex
                        ? null
                        : uniqueIndex
                    )
                  }
                >

                  <h3 className="faqQuestion">
                    {faq.question}
                  </h3>

                  <div className="faqIcon">
                    {openFaq === uniqueIndex ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                  </div>

                </div>

                {openFaq === uniqueIndex && (
                  <div className="faqAnswerWrapper">

                    <p className="faqAnswer">
                      {faq.answer}
                    </p>

                  </div>
                )}

              </div>
            );
          })}

          <div className="faqPagination">

            {[
              ...Array(
                Math.ceil(
                  rightFaqs.length /
                    ITEMS_PER_PAGE
                )
              ),
            ].map((_, index) => (
              <button
                key={index}
                className={`faqPageButton ${
                  rightPage === index + 1
                    ? "faqPageButtonActive"
                    : ""
                }`}
                onClick={() =>
                  setRightPage(index + 1)
                }
              >
                {index + 1}
              </button>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Faq;