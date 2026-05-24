// IndexingCards.jsx

import React from "react";
import "./IndexingCards.css";

const indexingData = [
  "Scopus",
  "Web of Science",
  "PubMed",
  "PubMed Central",
  "DOAJ",
  "CrossRef",
  "Google Scholar",
  "EBSCO",
  "ProQuest",
  "Index Copernicus",
  "J-Gate",
  "Scilit",
  "ResearchGate",
  "OpenAIRE",
  "BASE",
  "CORE",
  "Dimensions",
  "Lens.org",
];

const IndexingCards = () => {
  return (
    <section className="indexingCards">
      <div className="indexingCardsContainer">

        {/* TOP CONTENT */}
        <div className="indexingCardsTop">
          <span className="indexingCardsTag">
            GLOBAL INDEXING
          </span>

          <h2>
            Abstracting &
            <span> Indexing Platforms</span>
          </h2>

          <p>
            IJPASR is abstracted and indexed in major
            international scientific databases and
            scholarly platforms for maximum research
            visibility and global accessibility.
          </p>
        </div>

        {/* GRID */}
        <div className="indexingCardsGrid">
          {indexingData.map((item, index) => (
            <div
              className="indexingCardItem"
              key={index}
            >
              <div className="indexingCardGlow"></div>

              <h3>{item}</h3>

              <span>Indexed Platform</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndexingCards;