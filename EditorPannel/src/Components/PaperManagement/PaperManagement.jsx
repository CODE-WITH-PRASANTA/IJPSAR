import React, { useEffect, useState } from "react";
import API from "../../API/axios";
import "./PaperManagement.css";

const PaperManagement = () => {
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState("");

  const editor = JSON.parse(localStorage.getItem("editorData"));

  const fetchPapers = async () => {
    try {
      const res = await API.get(`/submitform/editor/${editor._id}`);

      setPapers(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleUnassign = async (paperId) => {
    const confirmDelete = window.confirm("Unassign this paper?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/editor/remove-paper/${editor._id}/${paperId}`);

      fetchPapers();

      alert("Paper Unassigned Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredPapers = papers.filter(
    (paper) =>
      paper.paperTitle?.toLowerCase().includes(search.toLowerCase()) ||
      paper.paperId?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="paperManagement">
      {/* Header */}

      <div className="paperHeader">
        <div>
          <h2>Paper Management</h2>

          <p>Manage all assigned papers</p>
        </div>

        <div className="paperCount">Total Assigned: {papers.length}</div>
      </div>

      {/* Stats */}

      <div className="paperStats">
        <div className="statCard">
          <h4>Total Papers</h4>

          <h2>{papers.length}</h2>
        </div>

        <div className="statCard">
          <h4>Editing</h4>

          <h2>{papers.filter((p) => p.status === "Editing").length}</h2>
        </div>

        <div className="statCard">
          <h4>Review Pending</h4>

          <h2>{papers.filter((p) => p.status === "Review Pending").length}</h2>
        </div>

        <div className="statCard">
          <h4>Accepted</h4>

          <h2>{papers.filter((p) => p.status === "Accepted").length}</h2>
        </div>
      </div>

      {/* Search */}

      <input
        type="text"
        className="paperSearch"
        placeholder="Search by Paper ID or Title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}

      {filteredPapers.length === 0 ? (
        <div className="emptyPaper">No Assigned Papers Found</div>
      ) : (
        <div className="paperTableWrapper">
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
                  <td>{paper.paperId}</td>

                  <td>{paper.paperTitle}</td>

                  <td>{paper.researchArea || "-"}</td>

                  <td>
                    <span className="statusBadge">{paper.status}</span>
                  </td>

                  <td>{new Date(paper.createdAt).toLocaleDateString()}</td>

                  <td>
                    <div className="actionBtns">
                      <button
                        className="viewBtn"
                        onClick={() => window.open(paper.paperFile, "_blank")}
                      >
                        View
                      </button>

                      <button
                        className="removeBtn"
                        onClick={() => handleUnassign(paper._id)}
                      >
                        Unassign
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
