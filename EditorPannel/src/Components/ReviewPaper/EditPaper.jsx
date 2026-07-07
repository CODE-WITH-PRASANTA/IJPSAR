import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { BASE_URL } from "../../api/axios";
import "./EditPaper.css";

const STATUS_STYLES = {
  Editing: "badge-editing",
  "Revision Required": "badge-revision",
  "Review Pending": "badge-pending",
  Accepted: "badge-accepted",
  Rejected: "badge-rejected",
  "Editor Assigned": "badge-assigned",
};

const EditPaper = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paper, setPaper] = useState(null);
  const [formData, setFormData] = useState({
    paperTitle: "",
    abstract: "",
    editorRemarks: "",
    feedbackLink: "",
    status: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPaper = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get(`/submitform/${id}`);
      const data = res.data.data;

      setPaper(data);
      setFormData({
        paperTitle: data.paperTitle || "",
        abstract: data.abstract || "",
        editorRemarks: data.editorRemarks || "",
        feedbackLink: data.feedbackLink || "",
        status: data.status || "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load paper. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("editorToken");
      const { data } = await API.put(`/submitform/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        alert(data.message);
        setPaper(data.data);
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || err.message || "Failed to update paper"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="stateScreen">
        <div className="spinner" />
        <p>Loading paper details...</p>
      </div>
    );
  }

  if (error && !paper) {
    return (
      <div className="stateScreen">
        <p className="stateIcon">⚠️</p>
        <h3>Something went wrong</h3>
        <p className="stateMsg">{error}</p>
        <button className="backBtn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="editPaperPage">
      {/* Header */}
      <div className="paperHeader">
        <div className="headerLeft">
          <button className="backBtn" onClick={() => navigate(-1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </button>
          <div>
            <h1>Edit Research Paper</h1>
            <p className="paperSubId">{paper.paperId}</p>
          </div>
        </div>
        <span className={`statusBadge ${STATUS_STYLES[paper.status] || ""}`}>
          {paper.status}
        </span>
      </div>

      <div className="paperEditorLayout">
        {/* PDF Viewer */}
        <div className="pdfViewerCard">
          <div className="cardTitleRow">
            <span className="cardTitle">Uploaded Research Paper</span>
            <a
              href={`${BASE_URL}${paper.paperFile}`}
              target="_blank"
              rel="noreferrer"
              className="downloadBtn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
              </svg>
              Download
            </a>
          </div>

          <div className="pdfFrameWrapper">
            <iframe
              src={`${BASE_URL}${paper.paperFile}`}
              title="Paper PDF"
              className="pdfFrame"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="editorPanel">
          <div className="paperGrid">
            <div className="paperCard accentIndigo">
              <h3>
                <span className="cardIconDot dotIndigo" />
                Assignment Details
              </h3>
              <div className="infoRow">
                <span className="infoLabel">Editor</span>
                <span className="infoValue">{paper.editorName || "Not Assigned"}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Assigned Date</span>
                <span className="infoValue">
                  {paper.editorAssignedAt
                    ? new Date(paper.editorAssignedAt).toLocaleDateString()
                    : "-"}
                </span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Version</span>
                <span className="infoValue infoPill pillIndigo">V{paper.version}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Created</span>
                <span className="infoValue">
                  {new Date(paper.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="paperCard accentTeal">
              <h3>
                <span className="cardIconDot dotTeal" />
                Paper Information
              </h3>
              <div className="infoRow">
                <span className="infoLabel">Paper ID</span>
                <span className="infoValue infoPill pillTeal">{paper.paperId}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Research Area</span>
                <span className="infoValue">{paper.researchArea}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Author Category</span>
                <span className="infoValue">{paper.authorCategory}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Total Authors</span>
                <span className="infoValue">{paper.totalAuthors}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Status</span>
                <span className={`statusBadge inlineBadge ${STATUS_STYLES[paper.status] || ""}`}>
                  {paper.status}
                </span>
              </div>
            </div>

            <div className="paperCard fullSpan accentAmber">
              <h3>
                <span className="cardIconDot dotAmber" />
                Keywords
              </h3>
              <div className="keywordWrapper">
                {paper.keywords?.length ? (
                  paper.keywords.map((item, index) => (
                    <span key={index} className="keywordTag">
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="noKeywords">No keywords added</span>
                )}
              </div>
            </div>
          </div>

          <form className="editForm" onSubmit={handleSubmit}>
            <h3 className="formHeading">Edit Details</h3>

            <div className="formGroup">
              <label>Paper Title</label>
              <input
                type="text"
                name="paperTitle"
                value={formData.paperTitle}
                onChange={handleChange}
              />
            </div>

            <div className="formGroup">
              <label>Abstract</label>
              <textarea
                rows="6"
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
              />
            </div>

            <div className="formGroup">
              <label>Editor Remarks</label>
              <textarea
                rows="4"
                name="editorRemarks"
                value={formData.editorRemarks}
                onChange={handleChange}
              />
            </div>

            <div className="formGroup">
              <label>Reference Link</label>
              <input
                type="url"
                name="feedbackLink"
                placeholder="https://drive.google.com/..."
                value={formData.feedbackLink}
                onChange={handleChange}
              />
            </div>

            <div className="formGroup">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Editing">Editing</option>
                <option value="Revision Required">Revision Required</option>
                <option value="Review Pending">Review Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {error && <p className="formError">{error}</p>}

            <button type="submit" className="saveBtn" disabled={saving}>
              {saving ? (
                <>
                  <span className="btnSpinner" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPaper;