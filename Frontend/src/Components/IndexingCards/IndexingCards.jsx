import React, { useEffect, useState } from "react";
import "./IndexingCards.css";
import API from "../../api/axios";

const BASE_URL = "http://localhost:5000";

const IndexingCards = () => {
  const [indexingData, setIndexingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndexingData();
  }, []);

  const fetchIndexingData = async () => {
    try {
      const res = await API.get("/index/all");

      console.log("API Response:", res.data);

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setIndexingData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "";

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${BASE_URL}/${image.replace(/^\/+/, "")}`;
  };

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

        {loading ? (
          <div className="loadingBox">
            Loading Indexing Platforms...
          </div>
        ) : (
          <div className="indexingCardsGrid">
            {indexingData.map((item) => (
              <div
                className="indexingCardItem"
                key={item._id}
              >
                <div className="indexingCardGlow"></div>

                <div className="indexingCardImgBox">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>

                <h3>{item.title}</h3>

                <span>
                  {item.subtitle}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default IndexingCards;