import React, { useState, useEffect } from "react";
import "./Publishpaper.css";

const Publishpaper = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(7);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(3); // Mobile: 3 cards
      } else {
        setCardsPerPage(7); // Desktop: show all cards
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
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
        "Research paper focusing on modern React architecture, performance optimization, and scalable component design.",
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
        "Detailed analysis of emerging digital marketing trends and their impact on online business growth.",
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
        "Comprehensive research on strategic business growth models and implementation techniques.",
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
        "An advanced guide to modern web technologies, frameworks, and best development practices.",
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
        "Research paper discussing AI applications, machine learning models, and future innovations.",
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
        "Study exploring healthcare innovations, patient management systems, and medical technologies.",
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
        "Analysis of modern e-learning technologies and their effectiveness in digital education.",
    },
  ];

  // Pagination Logic
  const totalPages = Math.ceil(
    paperData.length / cardsPerPage
  );

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  const currentCards = paperData.slice(
    firstCardIndex,
    lastCardIndex
  );

  return (
    <section className="publish-paper-section">
      <div className="publish-paper-container">
        <div className="publish-paper-header">
          <h2>Published Papers</h2>
          <p>Manage and publish submitted research papers.</p>
        </div>

        <div className="publish-paper-grid">
          {currentCards.map((paper) => (
            <div className="publish-paper-card" key={paper.id}>
              <div className="publish-paper-menu">
                <button
                  className="publish-paper-menu-btn"
                  onClick={() => toggleDropdown(paper.id)}
                >
                  ⋮
                </button>

                {activeDropdown === paper.id && (
                  <div className="publish-paper-dropdown">
                    <button>Publish</button>
                    <button>Unpublish</button>
                  </div>
                )}
              </div>

              <div className="publish-paper-image-box">
                <img src={paper.image} alt={paper.title} />
              </div>

              <div className="publish-paper-content">
                <h3>{paper.title}</h3>

                <div className="publish-paper-meta">
                  <div>
                    <span>Paper No</span>
                    <p>{paper.paperNo}</p>
                  </div>

                  <div>
                    <span>Date</span>
                    <p>{paper.date}</p>
                  </div>
                </div>

                <div className="publish-paper-feedback">
                  <span>Feedback</span>
                  <strong>{paper.feedback}</strong>
                </div>

                <p className="publish-paper-description">
                  {paper.description}
                </p>

                <button className="publish-paper-btn">
                  View Paper
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination */}
        {window.innerWidth <= 768 && (
          <div className="publish-paper-pagination">
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

export default Publishpaper;