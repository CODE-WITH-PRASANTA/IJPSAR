import React, { useState, useEffect } from "react";
import "./Papermanagement.css";
import { API, IMG_URL } from "../../api/Axios";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Papermanagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
 const [cardsPerPage, setCardsPerPage] = useState(2);

  const [paperData, setPaperData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const [showHistory, setShowHistory] = useState({});

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
        <div className="paper-dashboard">

  <div className="dashboard-card total">
    <h3>Total Papers</h3>
    <h1>{paperData.length}</h1>
  </div>

  <div className="dashboard-card submitted">
    <h3>Submitted</h3>
    <h1>
      {paperData.filter(item => item.status === "Submitted").length}
    </h1>
  </div>

  <div className="dashboard-card revision">
    <h3>Revision Required</h3>
    <h1>
      {paperData.filter(item => item.status === "Revision Required").length}
    </h1>
  </div>

  <div className="dashboard-card accepted">
    <h3>Accepted</h3>
    <h1>
      {paperData.filter(item => item.status === "Accepted").length}
    </h1>
  </div>

</div>

      <div className="paper-management-grid two-column">
          {currentCards.map((paper) => {
            const feedbacks = [...(paper.feedbackHistory || [])].reverse();
            const latestFeedback = feedbacks[0];

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
<div className="paper-meta">

<div className="meta-card version">

<span>Version</span>

<h4>V{paper.version}</h4>

</div>

<div
className={`meta-card status ${paper.status.replace(/\s+/g,"-").toLowerCase()}`}
>

<span>Status</span>

<h4>{paper.status}</h4>

</div>

</div>
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
       
          <div className="paper-pagination">

<button
disabled={currentPage===1}
onClick={()=>setCurrentPage(currentPage-1)}
>
Previous
</button>

{
Array.from({length:totalPages},(_,index)=>(
<button
key={index}
className={
currentPage===index+1
?
"page-number active"
:
"page-number"
}
onClick={()=>setCurrentPage(index+1)}
>
{index+1}
</button>
))
}

<button
disabled={currentPage===totalPages}
onClick={()=>setCurrentPage(currentPage+1)}
>
Next
</button>

</div>

</div>
</section>
  );
};


export default Papermanagement;
