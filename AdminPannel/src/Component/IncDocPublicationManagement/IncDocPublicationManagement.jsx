import React, { useEffect, useMemo, useState } from "react";
import API from "../../api/Axios";
import "./IncDocPublicationManagement.css";

const IncDocPublicationManagement = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPaper, setSelectedPaper] = useState(null);

  const fetchPapers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/submitform/all");

      setPapers(res.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/submitform/status/${id}`, {
        status,
      });

      fetchPapers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesSearch =
        paper.paperTitle
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        paper.paperId
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        paper.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [papers, search, statusFilter]);

  const totalPapers = papers.length;

  const acceptedCount = papers.filter(
    (p) => p.status === "Accepted"
  ).length;

  const reviewCount = papers.filter(
    (p) => p.status === "Review Pending"
  ).length;

  const publishedCount = papers.filter(
    (p) => p.status === "Published"
  ).length;

  return (
    <div className="pub-management">
      {/* Header */}

      <div className="pub-header">
        <div>
          <h1>Publication Management</h1>
          <p>
            Manage submitted papers and publication
            workflow
          </p>
        </div>
      </div>

      {/* Stats */}

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Papers</h4>
          <h2>{totalPapers}</h2>
        </div>

        <div className="stat-card accepted-card">
          <h4>Accepted</h4>
          <h2>{acceptedCount}</h2>
        </div>

        <div className="stat-card review-card">
          <h4>Review Pending</h4>
          <h2>{reviewCount}</h2>
        </div>

        <div className="stat-card published-card">
          <h4>Published</h4>
          <h2>{publishedCount}</h2>
        </div>
      </div>

      {/* Search & Filter */}

      <div className="toolbar">
        <input
          type="text"
          className="search-box"
          placeholder="Search by Title or Paper ID"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">
            All Status
          </option>
          <option value="Submitted">
            Submitted
          </option>
          <option value="Review Pending">
            Review Pending
          </option>
          <option value="Accepted">
            Accepted
          </option>
          <option value="Rejected">
            Rejected
          </option>
          <option value="Published">
            Published
          </option>
        </select>
      </div>

      {/* Table */}

      <div className="table-wrapper">
        <table className="publication-table">
          <thead>
            <tr>
              <th>Paper ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPapers.map((paper) => (
              <tr key={paper._id}>
                <td>{paper.paperId}</td>

                <td>{paper.paperTitle}</td>

                <td>
                  {paper.authors?.[0]
                    ?.fullName || "-"}
                </td>

                <td>
                  <span className="status-badge">
                    {paper.status}
                  </span>
                </td>

                <td>
                  <div className="action-group">
                    <button
                      className="view-btn"
                      onClick={() =>
                        setSelectedPaper(
                          paper
                        )
                      }
                    >
                      View
                    </button>

                    <button
                      className="accept-btn"
                      onClick={() =>
                        updateStatus(
                          paper._id,
                          "Accepted"
                        )
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        updateStatus(
                          paper._id,
                          "Rejected"
                        )
                      }
                    >
                      Reject
                    </button>

                    <button
                      className="publish-btn"
                      onClick={() =>
                        updateStatus(
                          paper._id,
                          "Published"
                        )
                      }
                    >
                      Publish
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}

      {selectedPaper && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>
              {selectedPaper.paperTitle}
            </h2>

            <p>
              <strong>Paper ID:</strong>{" "}
              {selectedPaper.paperId}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedPaper.status}
            </p>

            <p>
              <strong>Abstract:</strong>{" "}
              {selectedPaper.abstract}
            </p>

            <button
              className="close-btn"
              onClick={() =>
                setSelectedPaper(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncDocPublicationManagement;