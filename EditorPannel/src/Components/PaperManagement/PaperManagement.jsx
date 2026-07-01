import React, { useEffect, useState } from "react";
import API from "../../API/axios";
import "./PaperManagement.css";
import { useNavigate } from "react-router-dom";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

const STATUS_STYLES = {
  Editing: "status-editing",
  "Review Pending": "status-pending",
  Accepted: "status-accepted",
  Rejected: "status-rejected",
};

const PaperManagement = () => {
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();
  const editor = JSON.parse(localStorage.getItem("editorData"));

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/submitform/editor/${editor._id}`);
      setPapers(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUnassign = async (paperId) => {
    const confirmDelete = window.confirm("Unassign this paper?");
    if (!confirmDelete) return;

    try {
      setRemovingId(paperId);
      await API.delete(`/editor/remove-paper/${editor._id}/${paperId}`);
      await fetchPapers();
      alert("Paper Unassigned Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to unassign paper. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const handleView = (paperId) => {
    window.open(`${FRONTEND_URL}/sample-article/${paperId}`, "_blank");
  };

  const filteredPapers = papers.filter(
    (paper) =>
      paper.paperTitle?.toLowerCase().includes(search.toLowerCase()) ||
      paper.paperId?.toLowerCase().includes(search.toLowerCase())
  );

  const countByStatus = (status) =>
    papers.filter((p) => p.status === status).length;

  return (
    <div className="paperManagement">
      {/* Header */}
      <div className="paperHeader">
        <div className="paperHeaderText">
          <h1>Paper Management</h1>
          <p>Manage all papers assigned to you</p>
        </div>
        <div className="paperCount">
          <span className="paperCountNum">{papers.length}</span>
          <span>Total Assigned</span>
        </div>
      </div>

      {/* Stats */}
      <div className="paperStats">
        <div className="statCard">
          <h4>Total Papers</h4>
          <h2>{papers.length}</h2>
        </div>
        <div className="statCard statEditing">
          <h4>Editing</h4>
          <h2>{countByStatus("Editing")}</h2>
        </div>
        <div className="statCard statPending">
          <h4>Review Pending</h4>
          <h2>{countByStatus("Review Pending")}</h2>
        </div>
        <div className="statCard statAccepted">
          <h4>Accepted</h4>
          <h2>{countByStatus("Accepted")}</h2>
        </div>
      </div>

      {/* Search */}
      <div className="searchWrapper">
        <svg
          className="searchIcon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="paperSearch"
          placeholder="Search by Paper ID or Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clearSearch" onClick={() => setSearch("")}>
            ✕
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="loadingState">
          <div className="spinner" />
          <p>Loading papers...</p>
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="emptyPaper">
          <p className="emptyIcon">📄</p>
          <h3>No Papers Found</h3>
          <p>
            {search
              ? "Try adjusting your search terms."
              : "No papers have been assigned yet."}
          </p>
        </div>
      ) : (
        <div className="paperTableWrapper">
          {/* Desktop table */}
          <table className="paperTable">
            <thead>
              <tr>
                <th>Paper ID</th>
                <th>Paper Title</th>
                <th>Research Area</th>
                <th>Status</th>
                <th>Submitted Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPapers.map((paper) => (
                <tr key={paper._id}>
                  <td data-label="Paper ID">
                    <span className="paperIdCell">{paper.paperId}</span>
                  </td>
                  <td data-label="Paper Title">
                    <span className="paperTitleCell">{paper.paperTitle}</span>
                  </td>
                  <td data-label="Research Area">
                    {paper.researchArea || "-"}
                  </td>
                  <td data-label="Status">
                    <span
                      className={`statusBadge ${
                        STATUS_STYLES[paper.status] || ""
                      }`}
                    >
                      {paper.status}
                    </span>
                  </td>
                  <td data-label="Submitted Date">
                    {new Date(paper.createdAt).toLocaleDateString()}
                  </td>
                  <td data-label="Actions">
                    <div className="actionBtns">
                      <button
                        className="viewBtn"
                        onClick={() => handleView(paper._id)}
                      >
                        View
                      </button>
                      <button
                        className="removeBtn"
                        disabled={removingId === paper._id}
                        onClick={() => handleUnassign(paper._id)}
                      >
                        {removingId === paper._id
                          ? "Removing..."
                          : "Unassign"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaperManagement;