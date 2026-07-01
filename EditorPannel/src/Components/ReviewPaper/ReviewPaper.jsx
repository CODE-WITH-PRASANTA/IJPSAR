import React, { useEffect, useState } from "react";
import API, { BASE_URL } from "../../api/axios";
import "./ReviewPaper.css";
import { useNavigate } from "react-router-dom";

const ReviewPaper = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPapers = async () => {
    try {
      const editor = JSON.parse(localStorage.getItem("editorData"));

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
  }, []);

  const updateStatus = async (paperId, status) => {
    try {
      await API.put(`/submitform/status/${paperId}`, {
        status,
      });

      fetchPapers();

      alert(`Paper ${status}`);
    } catch (error) {
      console.log(error);
    }
  };

  const completePaper = async (paperId) => {
    try {
      await API.put(`/submitform/complete/${paperId}`);

      alert("Paper marked as Completed.");

      fetchPapers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reviewPaper">
      <div className="reviewHeader">
        <h2>Review Papers</h2>
        <p>Manage and review assigned research papers</p>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <span>Loading papers...</span>
        </div>
      ) : papers.length === 0 ? (
        <div className="emptyBox">
          <div className="emptyIcon">📄</div>
          <h3>No Papers Assigned</h3>
          <p>Papers assigned to you for review will show up here.</p>
        </div>
      ) : (
        <>
          {/* Table layout - visible on tablet/desktop */}
          <div className="reviewTableWrapper">
            <table className="reviewTable">
              <thead>
                <tr>
                  <th>Paper ID</th>
                  <th>Title</th>
                  <th>Research Area</th>
                  <th>Status</th>
                  <th>File</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {papers.map((paper) => (
                  <tr key={paper._id}>
                    <td data-label="Paper ID">
                      <span className="paperIdTag">{paper.paperId}</span>
                    </td>

                    <td data-label="Title" className="titleCell">
                      {paper.paperTitle}
                    </td>

                    <td data-label="Research Area">{paper.researchArea}</td>

                    <td data-label="Status">
                      <span
                        className={`status ${paper.status
                          .replace(/\s+/g, "")
                          .toLowerCase()}`}
                      >
                        {paper.status}
                      </span>
                    </td>

                    <td data-label="File">
                      <button
                        type="button"
                        className="viewBtn"
                        onClick={() =>
                          window.open(
                            `${BASE_URL}${paper.paperFile}`,
                            "_blank"
                          )
                        }
                      >
                        View
                      </button>
                    </td>

                    <td data-label="Actions">
                      <div className="actionGroup">
                        <button
                          type="button"
                          className="editBtn"
                          onClick={() =>
                            navigate(`/edit-paper/${paper._id}`)
                          }
                        >
                          Edit Paper
                        </button>

                        {/* <button
                          className="approveBtn"
                          onClick={() => updateStatus(paper._id, "Accepted")}
                        >
                          Accept
                        </button>

                        <button
                          className="rejectBtn"
                          onClick={() => updateStatus(paper._id, "Rejected")}
                        >
                          Reject
                        </button> */}

                        <button
                          type="button"
                          className="completeBtn"
                          onClick={() => completePaper(paper._id)}
                        >
                          Complete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewPaper;