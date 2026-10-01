import React, { useState, useEffect } from "react";
import "./Papermanagement.css";
import { API, IMG_URL } from "../../api/Axios";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

/* =========================================================
   EDITOR DOCUMENT HELPERS
========================================================= */

const EDITOR_DOCUMENT_LABELS = {
  acceptanceLetter: "Acceptance Letter",
  galleyProof: "Galley Proof",
  reviewReport: "Review Report",
  copyrightForm: "Copyright Form",
};

const normalizeEditorDocuments = (editorDocuments) => {
  if (!editorDocuments) return [];

  return Object.entries(EDITOR_DOCUMENT_LABELS)
    .map(([key, label]) => {
      const doc = editorDocuments[key];
      if (!doc) return null;

      const file = doc.file || doc.url;
      if (!file) return null;

      const filename =
        doc.originalName || file.split("/").pop() || "Document.pdf";

      const fullUrl =
        file.startsWith("http://") || file.startsWith("https://")
          ? file
          : `${IMG_URL}${file}`;

      return { key, label, filename, url: fullUrl };
    })
    .filter(Boolean);
};

const triggerDownload = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename || "");
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Papermanagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(2);

  const [paperData, setPaperData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [openEditorDocs, setOpenEditorDocs] = useState({});

  const getAllPapers = async () => {
    Swal.fire({
      title: "Loading Papers...",
      html: "Please wait while we fetch your papers.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

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

      Swal.close();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load papers.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(1);
      } else {
        setCardsPerPage(2);
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
    const result = await Swal.fire({
      title: "Delete Paper?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: "Deleting...",
      html: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const token = localStorage.getItem("authorToken");

      const { data } = await API.delete(`/submitform/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.close();

      if (data.success) {
        setPaperData((prev) => prev.filter((item) => item._id !== id));

        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          text: "Your paper has been deleted.",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.response?.data?.message || "Something went wrong.",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
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
        <div className="paper-dashboard">
          <div className="dashboard-card total">
            <h3>Total Papers</h3>
            <h1>{paperData.length}</h1>
          </div>

          <div className="dashboard-card submitted">
            <h3>Submitted</h3>
            <h1>
              {paperData.filter((item) => item.status === "Submitted").length}
            </h1>
          </div>

          <div className="dashboard-card revision">
            <h3>Revision Required</h3>
            <h1>
              {
                paperData.filter((item) => item.status === "Revision Required")
                  .length
              }
            </h1>
          </div>

          <div className="dashboard-card accepted">
            <h3>Accepted</h3>
            <h1>
              {paperData.filter((item) => item.status === "Accepted").length}
            </h1>
          </div>
        </div>

        <div className="paper-management-grid two-column">
          {currentCards.map((paper) => {
            const feedbacks = [...(paper.feedbackHistory || [])].reverse();

            return (
              <div className="paper-card" key={paper._id}>
                {/* Header */}

                {/* Publication */}

                <div className="paper-type">📖 Research Publication</div>

                {/* Title */}

                <h2 className="paper-title">{paper.paperTitle}</h2>

                {/* Author */}

                <div className="paper-author">
                  👨‍🎓 {paper.researchArea || "Student Researcher"}
                </div>

                {/* Paper ID */}

                <div className="paper-id">
                  <span>ID:</span>

                  <p>{paper.paperId}</p>
                </div>
                <div className="paper-meta">
                  <div className="meta-card version">
                    <span>Version</span>

                    <h4>V{paper.version}</h4>
                  </div>

                  <div
                    className={`meta-card status ${paper.status.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <span>Status</span>

                    <h4>{paper.status}</h4>
                  </div>
                </div>

                {/* ============================================
                    EDITOR DOCUMENTS (collapsible dropdown)
                ============================================ */}
                {(() => {
                  const editorDocs = normalizeEditorDocuments(
                    paper.editorDocuments,
                  );

                  if (!editorDocs.length) return null;

                  const isOpen = !!openEditorDocs[paper._id];

                  return (
                    <div className="paper-editor-documents">
                      <div className="editor-docs-wrapper">
                        <button
                          type="button"
                          className={`editor-docs-toggle ${isOpen ? "open" : ""}`}
                          onClick={() =>
                            setOpenEditorDocs((prev) => ({
                              ...prev,
                              [paper._id]: !prev[paper._id],
                            }))
                          }
                          aria-expanded={isOpen}
                        >
                          <span className="editor-docs-toggle-left">
                            <span className="editor-docs-icon">📥</span>
                            <span className="editor-docs-title">
                              Documents from Editor
                            </span>
                            <span className="editor-docs-count">
                              {editorDocs.length}
                            </span>
                          </span>

                          <span
                            className={`editor-docs-chevron ${isOpen ? "open" : ""}`}
                          >
                            ▾
                          </span>
                        </button>

                        {isOpen && (
                          <div className="editor-docs-dropdown">
                            {editorDocs.map((doc) => (
                              <div className="editor-doc-row" key={doc.key}>
                                <div className="editor-doc-info">
                                  <span className="editor-doc-label">
                                    {doc.label}
                                  </span>
                                  <span
                                    className="editor-doc-filename"
                                    title={doc.filename}
                                  >
                                    {doc.filename}
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  className="editor-doc-download-btn"
                                  onClick={() =>
                                    triggerDownload(doc.url, doc.filename)
                                  }
                                >
                                  ⬇ Download
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Feedback */}
                <div className="paper-feedback">
                  <h3 className="feedback-heading">📝 Editor Feedback</h3>

                  {feedbacks.length > 0 ? (
                    <div className="feedback-scroll-box">
                      {feedbacks.map((item, index) => (
                        <div
                          key={index}
                          className={`feedback-item ${
                            index === 0 ? "current-feedback" : ""
                          }`}
                        >
                          <div className="feedback-top">
                            <span>Version {item.version}</span>

                            <span className="feedback-status">
                              {item.status}
                            </span>
                          </div>

                          <p className="feedback-text">{item.remark}</p>

                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="feedback-link"
                            >
                              📎 Open Reference Link
                            </a>
                          )}

                          <div className="feedback-footer">
                            <span>👤 {item.editorName}</span>

                            <span>
                              {new Date(item.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-feedback">No feedback from editor yet.</p>
                  )}
                </div>

                {/* ============================================
                    BOTTOM ROW — Buttons + Card Actions
                ============================================ */}
                <div className="paper-card-footer-row">
                  {/* LEFT: PDF + revision */}
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
                        onClick={() =>
                          navigate(`/upload-revision/${paper._id}`)
                        }
                      >
                        Upload Revised Paper (V{paper.version + 1})
                      </button>
                    )}
                  </div>

                  {/* RIGHT: Edit + Delete */}
                  <div className="paper-card-actions">
                    <button
                      type="button"
                      className="card-action-btn edit"
                      onClick={() => handleEdit(paper)}
                    >
                      <FiEdit2 size={15} />
                      Edit
                    </button>

                    {paper.status === "Submitted" && (
                      <button
                        type="button"
                        className="card-action-btn delete"
                        onClick={() => handleDelete(paper._id)}
                      >
                        <FiTrash2 size={15} />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}

        <div className="paper-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={
                currentPage === index + 1 ? "page-number active" : "page-number"
              }
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Papermanagement;
