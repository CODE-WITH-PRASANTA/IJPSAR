import React, { useState, useEffect } from "react";
import {
  FiFileText,
  FiUser,
  FiCalendar,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";
import "./Publishpaper.css";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Publishpaper = () => {
  // ===========================
  // STATES
  // ===========================
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [paperData, setPaperData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPublishedPapers = async () => {
    try {
      const token = localStorage.getItem("authorToken");

      const { data } = await API.get("/submitform/author/published", {
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
  fetchPublishedPapers();
}, []);

  // ===========================
  // RESPONSIVE CARDS
  // ===========================
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(1);
      } else if (window.innerWidth <= 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
      setCurrentPage(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ===========================
  // PAGINATION
  // ===========================
  const totalPages = Math.ceil(paperData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = paperData.slice(indexOfFirstCard, indexOfLastCard);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // ===========================
  // CLEANED STATUS CLASS
  // ===========================
  const getStatusClass = () => "published";

  return (
    <section className="publish-paper-section">
      <div className="publish-paper-container">
        {/* ================= HEADER ================= */}
        <div className="publish-paper-header">
          <h2>Published Papers Portal</h2>
          <p>
            Browse your submitted papers, publication status, and editor
            feedback organized by section.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="publish-paper-grid">
          {currentCards.length > 0 ? (
            currentCards.map((paper) => (
              <div className="publish-paper-card" key={paper.id}>
                {/* ========= STATUS BADGE ========= */}
                <div className={`publish-status ${getStatusClass()}`}>
                  <FiCheckCircle />
                  <span>{paper.status}</span>
                </div>

                {/* ========= TITLE ========= */}
                <div className="paper-title-area">
                  <h3>{paper.paperTitle}</h3>
                  <p>
                    <FiFileText />
                    <span>{paper.paperId}</span>
                  </p>
                </div>

                {/* ========= META ========= */}
                <div className="paper-meta">
                  <div className="paper-meta-card">
                    <span>Paper ID</span>
                    <strong>{paper.paperId}</strong>
                  </div>
                  <div className="paper-meta-card">
                    <span>Date</span>
                    <strong>{new Date(paper.updatedAt).toLocaleDateString()}</strong>
                  </div>
                </div>

                {/* ========= FEEDBACK ========= */}
                <div className="feedback-box">
                  <div className="feedback-header">
                    <div className="feedback-version">
                      <span>Version {paper.version}</span>
                    </div>
                    <div className={`feedback-status ${getStatusClass()}`}>
                      {paper.status}
                    </div>
                  </div>

                  <div className="feedback-message">{
paper.feedbackHistory?.length
? paper.feedbackHistory[
paper.feedbackHistory.length-1
].remark
: "No feedback available."
}</div>

                  <div className="feedback-footer">
                    <div className="feedback-editor">
                      <FiUser />
                      <span>{paper.editorName}</span>
                    </div>
                    <div className="feedback-date">
                      <FiCalendar />
                      <span>
                        {
paper.feedbackHistory?.length
?
new Date(
paper.feedbackHistory[
paper.feedbackHistory.length-1
].createdAt
).toLocaleString()
:
"-"
}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ========= BUTTON ========= */}
                {/* <button className="publish-paper-btn">
                  <FiEye />
                  <span>View Paper</span>
                </button> */}
              </div>
            ))
          ) : (
            <div
              className="no-papers-message"
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
                color: "#666",
              }}
            >
              No papers found in this section.
            </div>
          )}
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="publish-paper-pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Publishpaper;
