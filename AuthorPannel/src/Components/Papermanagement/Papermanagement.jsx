import React, { useState, useEffect } from "react";
import "./Papermanagement.css";

const Papermanagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(7);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(3); // Mobile: show 3 cards
      } else {
        setCardsPerPage(7); // Desktop: show all cards
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);

    return () =>
      window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const paperData = [
    {
      id: 1,
      title: "Modern React Development",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b",
      paperNo: "IJPSAR001",
      date: "18 Jun 2026",
      feedback: "Accepted",
      description:
        "Research paper focusing on modern React architecture.",
    },
    {
      id: 2,
      title: "Digital Marketing Trends",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      paperNo: "IJPSAR002",
      date: "15 Jun 2026",
      feedback: "Under Review",
      description:
        "Detailed analysis of emerging digital marketing trends.",
    },
    {
      id: 3,
      title: "Business Growth Strategy",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      paperNo: "IJPSAR003",
      date: "12 Jun 2026",
      feedback: "Accepted",
      description:
        "Comprehensive research on strategic business growth.",
    },
    {
      id: 4,
      title: "Web Development Guide",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      paperNo: "IJPSAR004",
      date: "10 Jun 2026",
      feedback: "Pending",
      description:
        "Advanced guide to modern web technologies.",
    },
    {
      id: 5,
      title: "Artificial Intelligence Research",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      paperNo: "IJPSAR005",
      date: "08 Jun 2026",
      feedback: "Accepted",
      description:
        "Research paper discussing AI applications.",
    },
    {
      id: 6,
      title: "Healthcare Innovation Study",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f",
      paperNo: "IJPSAR006",
      date: "05 Jun 2026",
      feedback: "Revision Required",
      description:
        "Study exploring healthcare innovations.",
    },
    {
      id: 7,
      title: "E-Learning Technologies",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7",
      paperNo: "IJPSAR007",
      date: "01 Jun 2026",
      feedback: "Accepted",
      description:
        "Analysis of modern e-learning technologies.",
    },
  ];

  const totalPages = Math.ceil(
    paperData.length / cardsPerPage
  );

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = paperData.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <section className="paper-management-section">
      <div className="paper-management-container">
        <div className="paper-management-header">
          <h2>Paper Management</h2>
          <p>Manage and review all submitted research papers.</p>
        </div>

        <div className="paper-management-grid">
          {currentCards.map((paper) => (
            <div
              className="paper-management-card"
              key={paper.id}
            >
              <div className="paper-management-image-box">
                <img src={paper.image} alt={paper.title} />
              </div>

              <div className="paper-management-content">
                <h3>{paper.title}</h3>

                <div className="paper-management-meta">
                  <div>
                    <span>Paper No</span>
                    <p>{paper.paperNo}</p>
                  </div>

                  <div>
                    <span>Date</span>
                    <p>{paper.date}</p>
                  </div>
                </div>

                <div className="paper-management-feedback">
                  <span>Feedback</span>
                  <strong>{paper.feedback}</strong>
                </div>

                <p className="paper-management-description">
                  {paper.description}
                </p>

                <button className="paper-management-btn">
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
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              Previous
            </button>

            <span>
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
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