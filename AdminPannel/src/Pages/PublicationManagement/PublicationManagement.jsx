import React, { useState } from "react";
import API from "../../api/axios"; // ✅ Imported custom Axios instance
import "./PublicationManagement.css";
import { useEffect } from "react";

const PublicationManagement = () => {
  const [publications, setPublications] = useState([]);

  const fetchData = async () => {
    try {
      const res = await API.get("/submitform/all");

      const data = res.data.data || [];

      setPublications(
        data.filter(
          (paper) =>
            paper.status === "Completed" || paper.status === "Published",
        ),
      );
    } catch (err) {
      console.log("Fetch error:", err);
      setPublications([]);
    }
  };
  const fetchAuthors = async () => {
    try {
      const { data } = await API.get("/author/all");

      if (data.success) {
        setAuthors(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAuthors();
  }, []);

  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPublication, setSelectedPublication] = useState(null);

  // ✅ POP FORM STATE (EDIT)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // ✅ NEW PUBLICATION STATE (SUBMIT FORM)
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAbstract, setNewAbstract] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newResearchArea, setNewResearchArea] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [file, setFile] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/submitform/delete/${id}`);

      setPublications((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleView = (item) => setSelectedPublication(item);

  // ✅ OPEN FORM ON TITLE CLICK
  const openEditForm = (item) => {
    setEditData(item);
    setIsFormOpen(true);
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // AUTHOR CHANGE
  const handleAuthorChange = (e) => {
    const selected = authors.find((a) => a._id === e.target.value);
    setEditData({
      ...editData,
      author: selected,
    });
  };

  // MODIFY SAVE
  const handleModify = async () => {
    try {
      const res = await API.put(`/submitform/update/${editData._id}`, {
        paperTitle: editData.paperTitle,
        abstract: editData.abstract,
        image: editData.image,
        authorId: editData.authorId,
        authorName: editData.authorName,
        authorEmail: editData.authorEmail,
      });

      const updated = res.data.data;

      setPublications((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p)),
      );

      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // ✅ FRONTEND POST FUNCTION (FIXED FOR MULTIPART)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a paper file.");
      return;
    }

    if (!selectedAuthor) {
      alert("Please select an author.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const formData = new FormData();

      // Paper Details
      formData.append("paperTitle", newTitle);
      formData.append("abstract", newAbstract);
      formData.append("researchArea", newResearchArea);
      formData.append("country", newCountry);

      // Keywords
      formData.append("keywords", newTags);

      // Author Details
      formData.append("authorId", selectedAuthor._id);
      formData.append("authorName", selectedAuthor.fullName);
      formData.append("authorEmail", selectedAuthor.email);
      formData.append("authorCategory", selectedAuthor.authorCategory || "");

      // Paper File
      formData.append("paperFile", file);

      const { data } = await API.post("/submitform/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        alert("Publication created successfully.");

        setPublications((prev) => [...prev, data.data]);

        // Reset Form
        setNewTitle("");
        setNewAbstract("");
        setNewTags("");
        setNewCountry("");
        setNewResearchArea("");
        setSelectedAuthor(null);
        setFile(null);
        setIsCreateOpen(false);
      }
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Failed to create publication.");
    }
  };

  const filteredData = publications.filter((item) => {
    const q = search.toLowerCase();

    return (
      item.paperTitle?.toLowerCase().includes(q) ||
      item.paperId?.toLowerCase().includes(q)
    );
  });

  const handlePublish = async (paperId) => {
    try {
      const { data } = await API.put(`/submitform/publish/${paperId}`);

      if (data.success) {
        alert("Paper Published Successfully");

        fetchData();
      }
    } catch (err) {
      console.log(err);
      alert("Publish failed");
    }
  };

  const handleUnPublish = async (paperId) => {
    try {
      const { data } = await API.put(`/submitform/unpublish/${paperId}`);

      if (data.success) {
        alert("Paper Unpublished");

        fetchData();
      }
    } catch (err) {
      console.log(err);

      alert("Unpublish failed");
    }
  };

  return (
    <div className="publicationManagement">
      {/* HEADER */}
      <div className="publicationHeader">
        <div>
          <h1>Publication Management</h1>
          <p>Manage Research Papers & Publications</p>
        </div>
        {/* ADD NEW PAPER TRIGGER BUTTON */}
        <button
          className="viewBtn"
          onClick={() => setIsCreateOpen(true)}
          style={{ background: "linear-gradient(135deg, #10b881, #059669)" }}
        >
          + Add New Paper
        </button>
      </div>

      {/* SEARCH */}
      <div className="publicationSearchWrapper">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="publicationSearch"
          placeholder="Search..."
        />
      </div>

      {/* TABLE */}
      <div className="publicationTableWrapper">
        <table className="publicationTable">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Paper Title (CLICK)</th>
              <th>Abstract</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.image || "/no-image.png"}
                    className="paperImage"
                  />
                </td>
                <td>
                  <span className="idBadge">{item.paperId}</span>
                </td>

                {/* ✅ CLICK TITLE OPEN FORM */}
                <td
                  className="paperTitle"
                  style={{ cursor: "pointer", color: "#3b82f6" }}
                  onClick={() => openEditForm(item)}
                >
                  {item.paperTitle}
                </td>

                <td className="paperAbstract">{item.abstract}</td>

                <td>
                  <div>
                    <strong>{item.authorName}</strong>
                    <br />
                    <small>{item.authorEmail}</small>
                  </div>
                </td>

                <td>
                  <div className="actionButtons">
                    <a
                      href={`http://localhost:5000${item.paperFile}`}
                      target="_blank"
                      rel="noreferrer"
                      className="viewBtn"
                    >
                      View PDF
                    </a>
                    {item.isPublished ? (
                      <button
                        className="unpublishBtn"
                        onClick={() => handleUnPublish(item._id)}
                      >
                        Unpublish
                      </button>
                    ) : (
                      <button
                        className="publishBtn"
                        onClick={() => handlePublish(item._id)}
                      >
                        Publish
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="publicationCards">
        {filteredData.map((item) => (
          <div className="publicationCard" key={item.paperId}>
            <img
              src={item.image || "/no-image.png"}
              className="mobilePaperImage"
              alt={item.paperTitle}
            />
            <div className="cardContent">
              <span className="idBadge" style={{ marginBottom: "10px" }}>
                {item.paperId}
              </span>
              <h3
                style={{ cursor: "pointer", color: "#3b82f6" }}
                onClick={() => openEditForm(item)}
              >
                {item.paperTitle}
              </h3>
              <p className="mobileAbstract">{item.abstract}</p>

              <p style={{ fontSize: "14px", color: "#aaaaaa" }}>
                <strong>Author:</strong>

                <br />

                {item.authorName}

                <br />

                {item.authorEmail}
              </p>
            <div className="cardActions">
    <a
        href={`http://localhost:5000${item.paperFile}`}
        target="_blank"
        rel="noreferrer"
        className="viewBtn"
    >
        View PDF
    </a>

    {item.isPublished ? (
        <button
            className="unpublishBtn"
            onClick={() => handleUnPublish(item._id)}
        >
            Unpublish
        </button>
    ) : (
        <button
            className="publishBtn"
            onClick={() => handlePublish(item._id)}
        >
            Publish
        </button>
    )}
</div>
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="noResults">No records found.</div>
        )}
      </div>

      {/* VIEW MODAL */}
      {selectedPublication && (
        <div
          className="modalOverlay"
          onClick={() => setSelectedPublication(null)}
        >
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button
              className="closeModalBtn"
              onClick={() => setSelectedPublication(null)}
            >
              &times;
            </button>
            <div className="modalHeader">
              <span className="modalIdBadge">
                {selectedPublication.paperId}
              </span>

              <h2>{selectedPublication.paperTitle}</h2>
              
            </div>
            <img
              src={selectedPublication.image || "/no-image.png"}
              className="modalImage"
              alt="paper preview"
            />
            <div className="modalBody">
              <div className="modalMetaRow">
                <div>
                  <strong>Author</strong>
                  <p>{selectedPublication.authorName || "N/A"}</p>

                  <p>{selectedPublication.authorEmail}</p>
                </div>
                <div>
                  <strong>Country</strong>
                  <p>{selectedPublication.country || "N/A"}</p>
                </div>
                <div>
                  <strong>Domain</strong>
                  <p>{selectedPublication.researchArea || "N/A"}</p>
                </div>
              </div>
              <div className="modalAbstractSection">
                <strong>Abstract</strong>
                <p>{selectedPublication.abstract}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ POPUP FORM (EDIT PAPER TYPE) */}
      {isFormOpen && editData && (
        <div className="modalOverlay" onClick={() => setIsFormOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button
              className="closeModalBtn"
              onClick={() => setIsFormOpen(false)}
            >
              &times;
            </button>

            <div className="modalHeader">
              <h2>Edit Paper</h2>
              <span className="idBadge" style={{ marginTop: "8px" }}>
                {editData.paperId}
              </span>
            </div>

            <div
              className="modalBody"
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* IMAGE */}
              <div>
                <label className="formLabel">Paper Image URL</label>
                <input
                  name="image"
                  value={editData.image || ""}
                  onChange={handleChange}
                  placeholder="Paper Image URL"
                  className="publicationSearch"
                />
              </div>

              {/* TITLE */}
              <div>
                <label className="formLabel">Paper Title</label>
                <input
                  name="paperTitle"
                  value={editData.paperTitle}
                  onChange={handleChange}
                  placeholder="Paper Title"
                  className="publicationSearch"
                />
              </div>

              {/* ABSTRACT EDITOR */}
              <div>
                <label className="formLabel">Abstract</label>
                <textarea
                  name="abstract"
                  value={editData.abstract || ""}
                  onChange={handleChange}
                  className="publicationSearch"
                  style={{ height: "120px", resize: "vertical" }}
                />
              </div>

              {/* AUTHOR DROPDOWN */}
              <div>
                <label className="formLabel">Assign Author</label>
                <select
                  required
                  value={editData.authorId || ""}
                  onChange={(e) => {
                    const author = authors.find(
                      (a) => a._id === e.target.value,
                    );

                    setEditData({
                      ...editData,
                      authorId: author._id,
                      authorName: author.fullName,
                      authorEmail: author.email,
                    });
                  }}
                  className="publicationSearch"
                >
                  <option value="">Choose Author...</option>

                  {authors.map((author, index) => (
                    <option key={author._id} value={author._id}>
                      {index + 1}. {author.fullName} ({author.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* MODIFY BUTTON */}
              <button
                className="viewBtn"
                onClick={handleModify}
                style={{ marginTop: "10px", width: "100%" }}
              >
                Modify Paper
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ NEW FORM SUBMISSION MODAL (POST FUNCTION TO BACKEND) */}
      {isCreateOpen && (
        <div className="modalOverlay" onClick={() => setIsCreateOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button
              className="closeModalBtn"
              onClick={() => setIsCreateOpen(false)}
            >
              &times;
            </button>

            <div className="modalHeader">
              <h2>Upload New Research Paper</h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="modalBody"
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <label className="formLabel">Paper Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter paper title"
                  className="publicationSearch"
                />
              </div>

              <div>
                <label className="formLabel">Abstract Description</label>
                <textarea
                  required
                  value={newAbstract}
                  onChange={(e) => setNewAbstract(e.target.value)}
                  placeholder="Enter abstract data..."
                  className="publicationSearch"
                  style={{ height: "100px", resize: "vertical" }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <label className="formLabel">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="AI, ML, Cloud"
                    className="publicationSearch"
                  />
                </div>
                <div>
                  <label className="formLabel">Country</label>
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    placeholder="e.g. USA, India"
                    className="publicationSearch"
                  />
                </div>
              </div>

              <div>
                <label className="formLabel">Research Domain / Area</label>
                <input
                  type="text"
                  value={newResearchArea}
                  onChange={(e) => setNewResearchArea(e.target.value)}
                  placeholder="e.g. Data Science"
                  className="publicationSearch"
                />
              </div>

              <div>
                <label className="formLabel">Select Author</label>
                <select
                  required
                 value={selectedAuthor?._id || ""}
                  onChange={(e) => {
                    const found = authors.find((a) => a._id === e.target.value);
                    setSelectedAuthor(found || null);
                  }}
                  className="publicationSearch"
                  style={{ width: "100%" }}
                >
                  <option value="">Choose Author...</option>
                  {authors.map((a, i) => (
                    <option key={a._id} value={a._id}>
                      {i + 1} {a.fullName} ({a.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="formLabel">
                  Upload Paper Document (PDF / DOCX)
                </label>
                <input
                  type="file"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ color: "#888888", fontSize: "14px" }}
                />
              </div>

              <button
                type="submit"
                className="viewBtn"
                style={{
                  marginTop: "12px",
                  width: "100%",
                  background: "linear-gradient(135deg, #10b881, #059669)",
                }}
              >
                Submit to Backend Server
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicationManagement;
