import React, { useEffect, useState } from "react";
import "./Globally.css";
import API from "../../api/axios";

const Globally = () => {
  const [indexingData, setIndexingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // 🔥 FETCH ADMIN INDEX DATA (GET)
  // ==============================
  const fetchIndexing = async () => {
    try {
      const res = await API.get("/index/all");

      // ✅ SAFE NORMALIZATION (Handles variations from admin panel payload)
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.index || [];

      setIndexingData(data);
    } catch (err) {
      console.error("Error fetching admin index data:", err);
      setIndexingData([]); // ✅ Fallback avoids mapping crashes
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndexing();
  }, []);

  return (
    <section className="globally">
      {/* Premium Ambient Background Glows */}
      <div className="globally-glow glow-left"></div>
      <div className="globally-glow glow-right"></div>

      <div className="globally-container">
        {/* HEADER SECTION */}
        <div className="globally-header">
          <span className="globally-tag">INDEXING & ABSTRACTING</span>
          <h1 className="globally-title">
            Globally indexed in trusted databases
          </h1>
          <p className="globally-description">
            Our journal is recognized and indexed across international databases approved via the admin panel.
          </p>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="globally-skeleton-container">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="globally-skeleton-card"></div>
            ))}
          </div>
        ) : (
          <>
            {/* DESKTOP GRID (Shows Admin Uploaded Titles) */}
            <div className="globally-grid">
              {Array.isArray(indexingData) && indexingData.length > 0 ? (
                indexingData.map((item) => (
                  <div className="globally-card" key={item._id || item.id}>
                    <div className="globally-card-inner">
                      <div className="globally-dot"></div>
                      {/* ✅ FIX: Reads item.title from your admin panel input string safely */}
                      <h3>{item.title || item.name || "Untitled Database"}</h3>
                    </div>
                  </div>
                ))
              ) : (
                <p className="globally-no-data">No indexing records found.</p>
              )}
            </div>

            {/* MOBILE INFINITE MARQUEE SLIDER */}
            {Array.isArray(indexingData) && indexingData.length > 0 && (
              <div className="globally-mobile-slider">
                <div className="globally-slider-track">
                  {/* Duplicated array elements create an unbroken infinity slider seam */}
                  {[...indexingData, ...indexingData].map((item, index) => (
                    <div className="globally-mobile-card" key={`slider-${index}`}>
                      <div className="globally-mobile-inner">
                        <div className="globally-dot"></div>
                        {/* ✅ FIX: Reads item.title on mobile elements as well */}
                        <h3>{item.title || item.name || "Untitled Database"}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Globally;