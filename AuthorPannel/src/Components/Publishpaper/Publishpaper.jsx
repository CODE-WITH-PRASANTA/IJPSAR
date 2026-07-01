import React, { useState, useEffect } from "react";
import {
  FiFileText,
  FiUser,
  FiCalendar,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";
import "./Publishpaper.css";

const Publishpaper = () => {
  // ===========================
  // STATES
  // ===========================
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(3);

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
  // PAPER DATA (All status: "Published")
  // ===========================
  const paperData = [
    {
      id: 1,
      title: "Modern React Development",
      paperNo: "IJPSAR001",
      date: "18 Jun 2026",
      status: "Published",
      version: "Version 1",
      feedback:
        "The paper has been reviewed successfully. Please update the methodology section and replace Figure 3 with the latest high-resolution image before final publication.",
      editor: "Prasanta Kumar Khuntia",
      feedbackDate: "30 Jun 2026",
      feedbackTime: "5:27 PM",
    },
    {
      id: 2,
      title: "Digital Marketing Trends",
      paperNo: "IJPSAR002",
      date: "15 Jun 2026",
      status: "Published",
      version: "Version 2",
      feedback:
        "The reviewer recommends adding more recent references related to AI-based marketing strategies and improving the conclusion section.",
      editor: "Dr. S. Mohanty",
      feedbackDate: "28 Jun 2026",
      feedbackTime: "11:10 AM",
    },
    {
      id: 3,
      title: "Business Growth Strategy",
      paperNo: "IJPSAR003",
      date: "12 Jun 2026",
      status: "Published",
      version: "Version 1",
      feedback:
        "Excellent work. Only minor grammatical corrections are required before publication.",
      editor: "Prof. A. Das",
      feedbackDate: "26 Jun 2026",
      feedbackTime: "2:45 PM",
    },
    {
      id: 4,
      title: "Artificial Intelligence Research",
      paperNo: "IJPSAR004",
      date: "10 Jun 2026",
      status: "Published",
      version: "Version 3",
      feedback:
        "Final revision approved. The paper is ready for publication in the upcoming issue.",
      editor: "Dr. B. Mishra",
      feedbackDate: "24 Jun 2026",
      feedbackTime: "4:30 PM",
    },
    {
      id: 5,
      title: "Healthcare Innovation Study",
      paperNo: "IJPSAR005",
      date: "08 Jun 2026",
      status: "Published",
      version: "Version 2",
      feedback:
        "Please include ethical approval details and revise the patient data analysis section.",
      editor: "Dr. R. Panda",
      feedbackDate: "20 Jun 2026",
      feedbackTime: "9:40 AM",
    },
    {
      id: 6,
      title: "Cloud Computing Architecture",
      paperNo: "IJPSAR006",
      date: "05 Jun 2026",
      status: "Published",
      version: "Version 1",
      feedback:
        "The technical content is strong. Kindly improve formatting according to journal guidelines.",
      editor: "Prof. N. Behera",
      feedbackDate: "18 Jun 2026",
      feedbackTime: "1:20 PM",
    },
    {
      id: 7,
      title: "Machine Learning Applications",
      paperNo: "IJPSAR007",
      date: "01 Jun 2026",
      status: "Published",
      version: "Version 2",
      feedback:
        "Reviewer comments have been addressed successfully. Congratulations on acceptance.",
      editor: "Dr. A. Patra",
      feedbackDate: "15 Jun 2026",
      feedbackTime: "6:15 PM",
    },
    {
      id: 8,
      title: "Cyber Security Framework",
      paperNo: "IJPSAR008",
      date: "28 May 2026",
      status: "Published",
      version: "Version 1",
      feedback:
        "Awaiting editor assignment. No review comments available yet.",
      editor: "Not Assigned",
      feedbackDate: "--",
      feedbackTime: "--",
    },
    {
      id: 9,
      title: "IoT Smart City Research",
      paperNo: "IJPSAR009",
      date: "25 May 2026",
      status: "Published",
      version: "Version 2",
      feedback:
        "Paper published successfully in Volume 8 Issue 4. Thank you for your contribution.",
      editor: "Dr. K. Rout",
      feedbackDate: "10 Jun 2026",
      feedbackTime: "3:05 PM",
    },
  ];

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
            Browse your submitted papers, publication status, and editor feedback organized by section.
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
                  <h3>{paper.title}</h3>
                  <p>
                    <FiFileText />
                    <span>{paper.paperNo}</span>
                  </p>
                </div>

                {/* ========= META ========= */}
                <div className="paper-meta">
                  <div className="paper-meta-card">
                    <span>Paper ID</span>
                    <strong>{paper.paperNo}</strong>
                  </div>
                  <div className="paper-meta-card">
                    <span>Date</span>
                    <strong>{paper.date}</strong>
                  </div>
                </div>

                {/* ========= FEEDBACK ========= */}
                <div className="feedback-box">
                  <div className="feedback-header">
                    <div className="feedback-version">
                      <span>{paper.version}</span>
                    </div>
                    <div className={`feedback-status ${getStatusClass()}`}>
                      {paper.status}
                    </div>
                  </div>

                  <div className="feedback-message">{paper.feedback}</div>

                  <div className="feedback-footer">
                    <div className="feedback-editor">
                      <FiUser />
                      <span>{paper.editor}</span>
                    </div>
                    <div className="feedback-date">
                      <FiCalendar />
                      <span>
                        {paper.feedbackDate} • {paper.feedbackTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ========= BUTTON ========= */}
                <button className="publish-paper-btn">
                  <FiEye />
                  <span>View Paper</span>
                </button>
              </div>
            ))
          ) : (
            <div className="no-papers-message" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#666" }}>
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