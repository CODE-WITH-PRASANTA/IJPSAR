import React, { useState, useEffect } from "react";
import "./Papermanagement.css";
import { API, IMG_URL } from "../../api/Axios";

const Papermanagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(7);

  const [paperData, setPaperData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPapers = async () => {
    try {
      const token = localStorage.getItem("authorToken");

      const { data } = await API.get("/submitform/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setPaperData(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(3);
      } else {
        setCardsPerPage(7);
      }
    };

    updateCardsPerPage();

    getAllPapers();

    window.addEventListener("resize", updateCardsPerPage);

    return () => {
      window.removeEventListener("resize", updateCardsPerPage);
    };
  }, []);

  const totalPages = Math.ceil(paperData.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = paperData.slice(startIndex, startIndex + cardsPerPage);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <section className="paper-management-section">
      <div className="paper-management-container">
        <div className="paper-management-header">
          <h2>Paper Management</h2>
          <p>Manage and review all submitted research papers.</p>
        </div>

        <div className="paper-management-grid">
          {currentCards.map((paper) => (
            <div className="paper-management-card" key={paper.id}>
              <div className="paper-management-image-box">
                <img
                  src={
                    paper.paperFile
                      ? `${IMG_URL}${paper.paperFile}`
                      : "https://via.placeholder.com/400x220?text=Research+Paper"
                  }
                  alt={paper.paperTitle}
                />
              </div>

              <div className="paper-management-content">
                <h3>{paper.paperTitle}</h3>

                <div className="paper-management-meta">
                  <div>
                    <span>Paper No</span>
                    <p>{paper.paperId}</p>
                  </div>

                  <div>
                    <span>Date</span>
                    <p>{new Date(paper.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="paper-management-feedback">
                  <span>Feedback</span>
                  <strong>{paper.status}</strong>
                </div>

                <p className="paper-management-description">
                  {paper.abstract?.substring(0, 120)}...
                </p>

                <button
                  className="paper-management-btn"
                  onClick={() =>
                    window.open(`${IMG_URL}${paper.paperFile}`, "_blank")
                  }
                >
                  View Paper
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {window.innerWidth <= 768 && (
          <div className="paper-pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            <span>
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Papermanagement;
