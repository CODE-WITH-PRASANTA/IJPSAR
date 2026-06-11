import React, { useState } from "react";
import API from "../../api/axios"; // ✅ Imported custom Axios instance
import "./PublicationManagement.css";
import { useEffect } from "react";

const PublicationManagement = () => {
  const [publications, setPublications] = useState([
    {
      id: "PUB-2026-001",
      title: "Artificial Intelligence Applications in Healthcare Research",
      abstract: "This study explores advanced AI methodologies...",
      tags: "AI, Healthcare, ML",
      country: "India",
      researchArea: "Artificial Intelligence",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
      author: { id: "A-101", name: "Dr. John Smith" },
    },
    {
      id: "PUB-2026-002",
      title: "Cloud Computing and Distributed Network Architecture",
      abstract: "Research focusing on cloud infrastructure optimization...",
      tags: "Cloud, Network",
      country: "USA",
      researchArea: "Computer Science",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      author: { id: "A-102", name: "Prof. Emily Watson" },
    },
    {
      id: "PUB-2026-003",
      title: "Renewable Energy Resources and Sustainability",
      abstract: "Analysis of renewable energy strategies...",
      tags: "Energy, Sustainability",
      country: "Germany",
      researchArea: "Environmental Science",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600",
      author: { id: "A-103", name: "Dr. Raj Mehta" },
    },
  ]);
  useEffect(() => {
const fetchData = async () => {
  try {
    const res = await API.get("/submitform/all");

    const data = res.data?.data || res.data;

    setPublications(Array.isArray(data) ? data : []);
  } catch (err) {
    console.log("Fetch error:", err);
    setPublications([]);
  }
};

  fetchData();
}, []);

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

  // AUTHOR DROPDOWN LIST (SL wise + ID)
  const authors = [
    { id: "A-101", name: "Dr. John Smith" },
    { id: "A-102", name: "Prof. Emily Watson" },
    { id: "A-103", name: "Dr. Raj Mehta" },
    { id: "A-104", name: "Dr. Anita Sharma" },
  ];

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
     const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;

  try {
    await API.delete(`/submitform/delete/${id}`);

    setPublications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  } catch (err) {
    console.log(err);
    alert("Delete failed");
  }
};
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
    const selected = authors.find((a) => a.id === e.target.value);
    setEditData({
      ...editData,
      author: selected,
    });
  };

  // MODIFY SAVE
 const handleModify = async () => {
  try {
    const res = await API.put(
      `/submitform/update/${editData.id}`,
      editData
    );

    const updated = res.data.data;

    setPublications((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
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
      alert("Please upload a paper file before submitting.");
      return;
    }
    if (!selectedAuthor) {
      alert("Please assign an author.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("abstract", newAbstract);
      formData.append("tags", newTags);
      formData.append("country", newCountry);
      formData.append("researchArea", newResearchArea);
      formData.append(
  "author",
  JSON.stringify({
    id: selectedAuthor.id,
    name: selectedAuthor.name,
  })
);
      formData.append("paperFile", file);

     const res = await API.post("/submitform/create", formData);

console.log("SUCCESS:", res.data);

      console.log("SUCCESS:", res.data);
      alert("Publication created successfully!");

      // Append local data array to display visually on frontend immediately
      const saved = res.data.data;
      setPublications([...publications, newPaperLocal]);
      
      // Clear Form State
      setNewTitle("");
      setNewAbstract("");
      setNewTags("");
      setNewCountry("");
      setNewResearchArea("");
      setSelectedAuthor(null);
      setFile(null);
      setIsCreateOpen(false);

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert(`Network Submission Error: ${err.response?.data?.message || err.message}`);
    }
  };

 const filteredData = (Array.isArray(publications) ? publications : []).filter((item) => {
  const q = search.toLowerCase();
  return (
    item.title?.toLowerCase().includes(q) ||
    item.id?.toLowerCase().includes(q)
  );
});

  return (
    <div className="publicationManagement">

      {/* HEADER */}
      <div className="publicationHeader">
        <div>
          <h1>Publication Management</h1>
          <p>Manage Research Papers & Publications</p>
        </div>
        {/* ADD NEW PAPER TRIGGER BUTTON */}
        <button className="viewBtn" onClick={() => setIsCreateOpen(true)} style={{ background: "linear-gradient(135deg, #10b881, #059669)" }}>
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
              <tr key={item.id}>
                <td>
                  <img src={item.image} className="paperImage" alt={item.title} />
                </td>
                <td><span className="idBadge">{item.id}</span></td>

                {/* ✅ CLICK TITLE OPEN FORM */}
                <td
                  className="paperTitle"
                  style={{ cursor: "pointer", color: "#3b82f6" }}
                  onClick={() => openEditForm(item)}
                >
                  {item.title}
                </td>

                <td className="paperAbstract">{item.abstract}</td>

                <td>
                  {item.author?.name} ({item.author?.id})
                </td>

                <td>
                  <div className="actionButtons">
                    <button className="viewBtn" onClick={() => handleView(item)}>
                      View
                    </button>
                    <button className="deleteBtn" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
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
          <div className="publicationCard" key={item.id}>
            <img src={item.image} className="mobilePaperImage" alt={item.title} />
            <div className="cardContent">
              <span className="idBadge" style={{ marginBottom: "10px" }}>{item.id}</span>
              <h3 style={{ cursor: "pointer", color: "#3b82f6" }} onClick={() => openEditForm(item)}>
                {item.title}
              </h3>
              <p className="mobileAbstract">{item.abstract}</p>
              <p style={{ fontSize: "14px", color: "#aaaaaa" }}>
                <strong>Author:</strong> {item.author?.name} ({item.author?.id})
              </p>
              <div className="cardActions">
                <button className="viewBtn" onClick={() => handleView(item)}>
                  View
                </button>
                <button className="deleteBtn" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
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
        <div className="modalOverlay" onClick={() => setSelectedPublication(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="closeModalBtn" onClick={() => setSelectedPublication(null)}>
              &times;
            </button>
            <div className="modalHeader">
              <span className="modalIdBadge">{selectedPublication.id}</span>
              <h2>{selectedPublication.title}</h2>
            </div>
            <img src={selectedPublication.image} className="modalImage" alt="paper preview" />
            <div className="modalBody">
              <div className="modalMetaRow">
                <div>
                  <strong>Author</strong>
                  <p>{selectedPublication.author?.name || "N/A"}</p>
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
            <button className="closeModalBtn" onClick={() => setIsFormOpen(false)}>
              &times;
            </button>

            <div className="modalHeader">
              <h2>Edit Paper</h2>
              <span className="idBadge" style={{ marginTop: "8px" }}>{editData.id}</span>
            </div>

            <div className="modalBody" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                  name="title"
                  value={editData.title || ""}
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
                  value={editData.author?.id || ""}
                  onChange={handleAuthorChange}
                  className="publicationSearch"
                  style={{ width: "100%", appearance: "none" }}
                >
                  <option value="">Select Author</option>
                  {authors.map((a, i) => (
                    <option key={a.id} value={a.id}>
                      {i + 1}. {a.name} ({a.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* MODIFY BUTTON */}
              <button className="viewBtn" onClick={handleModify} style={{ marginTop: "10px", width: "100%" }}>
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
            <button className="closeModalBtn" onClick={() => setIsCreateOpen(false)}>
              &times;
            </button>

            <div className="modalHeader">
              <h2>Upload New Research Paper</h2>
            </div>

            <form onSubmit={handleSubmit} className="modalBody" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
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
                  value={selectedAuthor?.id || ""}
                  onChange={(e) => {
                    const found = authors.find(a => a.id === e.target.value);
                    setSelectedAuthor(found || null);
                  }}
                  className="publicationSearch"
                  style={{ width: "100%" }}
                >
                  <option value="">Choose Author...</option>
                  {authors.map((a, i) => (
                    <option key={a.id} value={a.id}>
                      {i + 1}. {a.name} ({a.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="formLabel">Upload Paper Document (PDF / DOCX)</label>
                <input
                  type="file"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ color: "#888888", fontSize: "14px" }}
                />
              </div>

              <button type="submit" className="viewBtn" style={{ marginTop: "12px", width: "100%", background: "linear-gradient(135deg, #10b881, #059669)" }}>
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