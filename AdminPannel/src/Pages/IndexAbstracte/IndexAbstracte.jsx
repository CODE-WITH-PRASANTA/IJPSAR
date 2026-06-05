import React, { useState } from "react";
import "./IndexAbstracte.css";

const IndexAbstracte = () => {
  const [platforms, setPlatforms] = useState([
    {
      id: 1,
      title: "Scopus",
      subtitle: "Indexed Platform",
      status: "Active",
      image: "https://picsum.photos/80",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    status: "Active",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      if (preview && !preview.startsWith("http")) {
        URL.revokeObjectURL(preview);
      }

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle) return;

    if (editingId) {
      setPlatforms((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, ...formData, image: preview || p.image }
            : p
        )
      );
      setEditingId(null);
    } else {
      setPlatforms((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          image: preview || "https://picsum.photos/80",
        },
      ]);
    }

    resetForm();
  };

  const handleEditClick = (platform) => {
    setEditingId(platform.id);
    setFormData({
      title: platform.title,
      subtitle: platform.subtitle,
      status: platform.status,
    });
    setPreview(platform.image);
  };

  const handleDeleteClick = (id) => {
    setPlatforms((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  };

  const resetForm = () => {
    setFormData({ title: "", subtitle: "", status: "Active" });
    setPreview(null);
    setImageFile(null);
    setEditingId(null);
  };

  const filteredPlatforms = platforms.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="indexAbstracte">
      <div className="indexAbstracte__wrapper">

        {/* FORM */}
        <div className="indexAbstracte__formCard">
          <div className="indexAbstracte__heading">
            <h2>{editingId ? "Edit Platform" : "Add Platform"}</h2>
            <p>Manage indexing platforms</p>
          </div>

          <form className="indexAbstracte__form" onSubmit={handleSubmit}>
            <div className="indexAbstracte__field">
              <label>Title</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Enter title"
              />
            </div>

            <div className="indexAbstracte__field">
              <label>Subtitle</label>
              <input 
                name="subtitle" 
                value={formData.subtitle} 
                onChange={handleInputChange} 
                placeholder="Enter subtitle"
              />
            </div>

            <div className="indexAbstracte__field">
              <label>Image</label>
              <div className="indexAbstracte__upload">
                <input type="file" onChange={handleImage} accept="image/*" />
                {preview && <img src={preview} alt="preview" />}
              </div>
            </div>

            <div className="indexAbstracte__field">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="indexAbstracte__formActions">
              <button type="submit" className="indexAbstracte__saveBtn">
                {editingId ? "Update" : "Save"}
              </button>

              {editingId && (
                <button type="button" className="indexAbstracte__cancelBtn" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TABLE */}
        <div className="indexAbstracte__tableCard">
          <div className="indexAbstracte__tableTop">
            <h2>Platforms</h2>
            <input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="indexAbstracte__tableWrapper">
            <table className="indexAbstracte__table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Subtitle</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPlatforms.length > 0 ? (
                  filteredPlatforms.map((p) => (
                    <tr key={p.id}>
                      <td><img src={p.image} alt="" /></td>
                      <td className="indexAbstracte__textTruncate">{p.title}</td>
                      <td className="indexAbstracte__textTruncate">{p.subtitle}</td>
                      <td>
                        <span className={p.status === "Active"
                          ? "indexAbstracte__active"
                          : "indexAbstracte__inactive"}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <div className="indexAbstracte__actionsContainer">
                          <button className="indexAbstracte__editBtn" onClick={() => handleEditClick(p)}>
                            Edit
                          </button>
                          <button className="indexAbstracte__deleteBtn" onClick={() => handleDeleteClick(p.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#71717a" }}>
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </section>
  );
};

export default IndexAbstracte;