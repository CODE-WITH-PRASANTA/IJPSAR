// Globally.jsx

import React from "react";
import "./Globally.css";

const indexingData = [
  "Scopus",
  "Web of Science",
  "PubMed",
  "DOAJ",
  "CrossRef",
  "Google Scholar",
  "EBSCO",
  "ProQuest",
  "Index Copernicus",
  "J-Gate",
  "Scilit",
  "ResearchGate",
];

const Globally = () => {
  return (
    <section className="globally">

      {/* GLOW EFFECTS */}
      <div className="globally-glow glow-left"></div>
      <div className="globally-glow glow-right"></div>

      <div className="globally-container">

        {/* HEADER */}
        <div className="globally-header">

          <span className="globally-tag">
            INDEXING & ABSTRACTING
          </span>

          <h1 className="globally-title">
            Globally indexed in trusted databases
          </h1>

          <p className="globally-description">
            Our journal is recognized and indexed across
            internationally trusted scholarly databases
            and research platforms worldwide.
          </p>

        </div>

        {/* DESKTOP GRID */}
        <div className="globally-grid">

          {indexingData.map((item, index) => (
            <div className="globally-card" key={index}>

              <div className="globally-card-inner">

                <div className="globally-dot"></div>

                <h3>{item}</h3>

              </div>

              <div className="globally-hoverline"></div>

            </div>
          ))}

        </div>

        {/* MOBILE AUTO SLIDER */}
        <div className="globally-mobile-slider">

          <div className="globally-slider-track">

            {[...indexingData, ...indexingData].map((item, index) => (
              <div className="globally-mobile-card" key={index}>

                <div className="globally-mobile-inner">

                  <div className="globally-dot"></div>

                  <h3>{item}</h3>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Globally;