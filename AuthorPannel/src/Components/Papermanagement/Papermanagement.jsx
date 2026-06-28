import React, { useState, useEffect } from "react";
import "./Papermanagement.css";
import { API, IMG_URL } from "../../api/Axios";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Papermanagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(7);

  const [paperData, setPaperData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);

  const getAllPapers = async () => {
    try {
      const token = localStorage.getItem("authorToken");

      const { data } = await API.get("/submitform/my-papers", {
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this paper?")) return;

    try {
      const token = localStorage.getItem("authorToken");

      const { data } = await API.delete(`/submitform/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setPaperData((prev) => prev.filter((item) => item._id !== id));
        alert("Paper deleted successfully.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (paper) => {
    navigate("/submit-paper", {
      state: {
        paper,
        isEdit: true,
        latestFeedback:
          paper.feedbackHistory?.[paper.feedbackHistory.length - 1] || null,
      },
    });
  };

  const totalPages = Math.ceil(paperData.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = paperData.slice(startIndex, startIndex + cardsPerPage);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  const getLatestFeedback = (paper) => {
    if (!paper.feedbackHistory?.length) return null;

    return paper.feedbackHistory[paper.feedbackHistory.length - 1];
  };

  return (
    <section className="paper-management-section">
      <div className="paper-management-container">
        <div className="paper-management-header">
          <h2>Paper Management</h2>
          <p>Manage and review all submitted research papers.</p>
        </div>

        <div className="paper-management-grid">
          {currentCards.map((paper) => {
            const latestFeedback = getLatestFeedback(paper);

            return (
              <div className="paper-card" key={paper._id}>
                {/* Header */}

                <div className="paper-card-header">
                  <span className="paper-category">
                    {paper.department || "Information Technology"}
                  </span>

                  <div className="paper-header-right">
                    <span className="paper-date">
                      📅 {new Date(paper.createdAt).toLocaleDateString()}
                    </span>

                    <div className="paper-menu">
                      <button
                        className="paper-menu-btn"
                        onClick={() =>
                          setOpenMenu(openMenu === paper._id ? null : paper._id)
                        }
                      >
                        <FiMoreVertical />
                      </button>

                      {openMenu === paper._id && (
                        <div className="paper-menu-dropdown">
                          {/* Edit - Always Visible */}
                          <button onClick={() => handleEdit(paper)}>
                            <FiEdit2 />
                            Edit Paper
                          </button>

                          {/* Delete - Only for Submitted Papers */}
                          {paper.status === "Submitted" && (
                            <button
                              className="delete-btn"
                              onClick={() => handleDelete(paper._id)}
                            >
                              <FiTrash2 />
                              Delete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Publication */}

                <div className="paper-type">📖 Research Publication</div>

                {/* Title */}

                <h2 className="paper-title">{paper.paperTitle}</h2>

                {/* Author */}

                <div className="paper-author">
                  👨‍🎓 {paper.authorName || "Student Researcher"}
                </div>

                {/* Paper ID */}

                <div className="paper-id">
                  <span>ID:</span>

                  <p>{paper.paperId}</p>
                </div>

                <div className="paper-version">
                  <strong>Current Version :</strong> V{paper.version}
                </div>
                <div className="paper-status-box">
                  <strong>Current Status :</strong> {paper.status}
                </div>
                {/* Feedback */}

                <div className="paper-feedback">
                  <div className="feedback-header">
                    <strong>Latest Editor Feedback</strong>

                    <span
                      className={`feedback-status ${paper.status
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {paper.status}
                    </span>
                  </div>

                  {latestFeedback ? (
                    <>
                      <div className="feedback-box">
                        <p className="feedback-text">{latestFeedback.remark}</p>
                      </div>

                      <p className="feedback-editor">
                        👤 {latestFeedback.editorName}
                        <p className="feedback-count">
                          Total Feedbacks : {paper.feedbackHistory.length}
                        </p>
                      </p>

                      <div className="feedback-footer">
                        <span>Version {latestFeedback.version}</span>
                        <span>
                          {new Date(latestFeedback.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {paper.feedbackHistory.length > 1 && (
                        <button
                          className="history-btn"
                          onClick={() =>
                            navigate(`/paper-feedback/${paper._id}`)
                          }
                        >
                          View Feedback History
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="no-feedback">No feedback from editor yet.</p>
                  )}
                </div>

                {/* Buttons */}

                <div className="paper-btns">
                  <a
                    href={`${IMG_URL}${paper.paperFile}`}
                    target="_blank"
                    rel="noreferrer"
                    className="download-btn"
                  >
                    📄 PDF
                  </a>

                  {paper.status === "Revision Required" && (
                    <button
                      className="revision-btn"
                      onClick={() => navigate(`/upload-revision/${paper._id}`)}
                    >
                      Upload Revised Paper (V{paper.version + 1})
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
