import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { BASE_URL } from "../../api/axios";
import "./EditPaper.css";

const EditPaper = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paper, setPaper] = useState(null);
  // const [editedPdf, setEditedPdf] = useState(null);
  const [formData, setFormData] = useState({
    paperTitle: "",
    abstract: "",
    editorRemarks: "",
    status: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPaper();
  }, [id]);

  const fetchPaper = async () => {
    try {
      setError("");
      const res = await API.get(`/submitform/${id}`);

      const data = res.data.data;

      setPaper(data);

      setFormData({
        paperTitle: data.paperTitle || "",
        abstract: data.abstract || "",
        editorRemarks: data.editorRemarks || "",
        status: data.status || "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load paper. Please try again.",
      );
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
        err.response?.data?.message || err.message || "Failed to update paper",
      );
    } finally {
      setSaving(false);
    }
  };

  if (error && !paper) {
    return <div className="loading">{error}</div>;
  }

  if (!paper) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="editPaperPage">
      <div className="paperHeader">
        <h2>Edit Research Paper</h2>

        <button className="backBtn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="paperEditorLayout">
        {/* PDF Viewer */}

        <div className="pdfViewerCard">
          <div className="cardTitle">Uploaded Research Paper</div>

          <iframe
            src={`${BASE_URL}${paper.paperFile}`}
            title="Paper PDF"
            className="pdfFrame"
          />

          <div className="pdfActions">
            <a
              href={`${BASE_URL}${paper.paperFile}`}
              target="_blank"
              rel="noreferrer"
              className="downloadBtn"
            >
              Download Original PDF
            </a>

            {/* <div className="uploadSection">
              <label className="uploadBtn">
                Upload Corrected PDF
                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setEditedPdf(e.target.files[0])}
                />
              </label>

              {editedPdf && <span className="fileName">{editedPdf.name}</span>}
            </div> */}

            {/* {paper.editedPdf && (
              <a
                href={`${BASE_URL}${paper.editedPdf}`}
                target="_blank"
                rel="noreferrer"
                className="correctedPdfBtn"
              >
                View Corrected PDF (V{paper.version})
              </a>
            )} */}
          </div>
        </div>

        {/* Right Side */}

        <div className="editorPanel">
          <div className="paperGrid">
            <div className="paperCard">
              <h3>Assignment Details</h3>

              <p>
                <strong>Editor:</strong> {paper.editorName || "Not Assigned"}
              </p>

              <p>
                <strong>Assigned Date:</strong>{" "}
                {paper.editorAssignedAt
                  ? new Date(paper.editorAssignedAt).toLocaleDateString()
                  : "-"}
              </p>

              <p>
                <strong>Version:</strong> V{paper.version}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(paper.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="paperCard">
              <h3>Paper Information</h3>

              <p>
                <strong>Paper ID:</strong> {paper.paperId}
              </p>

              <p>
                <strong>Research Area:</strong> {paper.researchArea}
              </p>

              <p>
                <strong>Status:</strong> {paper.status}
              </p>

              <p>
                <strong>Author Category:</strong> {paper.authorCategory}
              </p>
              <p>
                <strong>Version:</strong> V{paper.version}
              </p>
              <p>
                <strong>Total Authors:</strong> {paper.totalAuthors}
              </p>
            </div>

            <div className="paperCard">
              <h3>Keywords</h3>

              <div className="keywordWrapper">
                {paper.keywords?.map((item, index) => (
                  <span key={index} className="keywordTag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form className="editForm" onSubmit={handleSubmit}>
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
                rows="8"
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
              />
            </div>

            <div className="formGroup">
              <label>Editor Remarks</label>

              <textarea
                rows="5"
                name="editorRemarks"
                value={formData.editorRemarks}
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
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPaper;
