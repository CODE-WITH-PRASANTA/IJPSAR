import React from "react";
import "./IndexingCards.css";

const indexingData = [
  {
    name: "Scopus",
    img: "https://picsum.photos/300/180?random=1",
  },
  {
    name: "Web of Science",
    img: "https://picsum.photos/300/180?random=2",
  },
  {
    name: "PubMed",
    img: "https://picsum.photos/300/180?random=3",
  },
  {
    name: "PubMed Central",
    img: "https://picsum.photos/300/180?random=4",
  },
  {
    name: "DOAJ",
    img: "https://picsum.photos/300/180?random=5",
  },
  {
    name: "CrossRef",
    img: "https://picsum.photos/300/180?random=6",
  },
  {
    name: "Google Scholar",
    img: "https://picsum.photos/300/180?random=7",
  },
  {
    name: "EBSCO",
    img: "https://picsum.photos/300/180?random=8",
  },
  {
    name: "ProQuest",
    img: "https://picsum.photos/300/180?random=9",
  },
  {
    name: "Index Copernicus",
    img: "https://picsum.photos/300/180?random=10",
  },
  {
    name: "J-Gate",
    img: "https://picsum.photos/300/180?random=11",
  },
  {
    name: "Scilit",
    img: "https://picsum.photos/300/180?random=12",
  },
  {
    name: "ResearchGate",
    img: "https://picsum.photos/300/180?random=13",
  },
  {
    name: "OpenAIRE",
    img: "https://picsum.photos/300/180?random=14",
  },
  {
    name: "BASE",
    img: "https://picsum.photos/300/180?random=15",
  },
  {
    name: "CORE",
    img: "https://picsum.photos/300/180?random=16",
  },
  {
    name: "Dimensions",
    img: "https://picsum.photos/300/180?random=17",
  },
  {
    name: "Lens.org",
    img: "https://picsum.photos/300/180?random=18",
  },
];

const IndexingCards = () => {
  return (
    <section className="indexingCards">
      <div className="indexingCardsContainer">
        <div className="indexingCardsTop">
          <span className="indexingCardsTag">
            GLOBAL INDEXING
          </span>

          <h2>
            Abstracting & <span>Indexing Platforms</span>
          </h2>

          <p>
            IJPASR is indexed in major international scientific
            databases ensuring global visibility and research
            credibility.
          </p>
        </div>

        <div className="indexingCardsGrid">
          {indexingData.map((item, index) => (
            <div
              className="indexingCardItem"
              key={index}
            >
              <div className="indexingCardGlow"></div>

              <div className="indexingCardImgBox">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                />
              </div>

              <h3>{item.name}</h3>
              <span>Indexed Platform</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexingCards;