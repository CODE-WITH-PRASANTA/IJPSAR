import React from "react";
import "./AboutGerenal.css";

import {
  FaFlask,
  FaBullseye,
  FaGlobe,
  FaShieldAlt,
  FaCheck,
  FaWhatsapp,
} from "react-icons/fa";

const AboutGerenal = () => {
  // WhatsApp configuration
  const whatsappNumber = "918868855677";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I would like to learn more about the journal."
  )}`;

  const cards = [
    {
      icon: <FaFlask className="aboutgeneral-icon" />,
      title: "Aim",
      text: "Publish rigorous pharmaceutical and allied sciences research globally.",
    },
    {
      icon: <FaBullseye className="aboutgeneral-icon" />,
      title: "Scope",
      text: "Covering pharmacy, biotech, medical, and life sciences research.",
    },
    {
      icon: <FaGlobe className="aboutgeneral-icon" />,
      title: "Reach",
      text: "Authors and reviewers connected from countries worldwide.",
    },
    {
      icon: <FaShieldAlt className="aboutgeneral-icon" />,
      title: "Integrity",
      text: "Strict plagiarism screening and ethical publication standards.",
    },
  ];

  return (
    <section className="aboutgeneral">
      <div className="aboutgeneral-container">

        {/* ================= LEFT SECTION ================= */}
        <div className="aboutgeneral-left">

          <span className="aboutgeneral-tag">
            ABOUT THE JOURNAL
          </span>

          <h1 className="aboutgeneral-title">
            Advancing pharmaceutical
            <br />
            knowledge across borders.
          </h1>

          <p className="aboutgeneral-description">
            IJPASR (International Journal of Pharmaceutical & Allied Sciences
            Research) is an international peer-reviewed open-access journal
            dedicated to publishing impactful research in pharmaceutical,
            biomedical, and allied sciences worldwide.
          </p>

          <div className="aboutgeneral-points">

            <div className="aboutgeneral-point">
              <FaCheck className="aboutgeneral-check" />
              <span>
                Double-blind peer review by international experts
              </span>
            </div>

            <div className="aboutgeneral-point">
              <FaCheck className="aboutgeneral-check" />
              <span>
                DOI / Unique Paper ID support for publications
              </span>
            </div>

            <div className="aboutgeneral-point">
              <FaCheck className="aboutgeneral-check" />
              <span>
                Open-access journal with worldwide visibility
              </span>
            </div>

            <div className="aboutgeneral-point">
              <FaCheck className="aboutgeneral-check" />
              <span>
                Lifetime archive & indexing support
              </span>
            </div>

          </div>

          {/* WHATSAPP BUTTON */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="aboutgeneral-btn"
          >
            <FaWhatsapp />
            Learn More
          </a>

        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="aboutgeneral-right">

          <div className="aboutgeneral-card-grid">

            {cards.map((card, index) => (
              <div
                className="aboutgeneral-card"
                key={index}
              >

                <div className="aboutgeneral-icon-box">
                  {card.icon}
                </div>

                <h3>{card.title}</h3>

                <p>{card.text}</p>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutGerenal;