
import React, { useEffect, useState } from "react";
import "./IndexAbstracte.css";
import API from "../../api/axios";

const IndexAbstracte = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    status: "Active",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Clean, self-contained layout URL builder
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL or local blob preview string, return it as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("blob:")) {
      return imagePath;
    }

    // 1. Safe extraction of asset host from Axios config or default fallback
    let fallbackBase = "http://localhost:5000";
    if (API.defaults.baseURL) {
      fallbackBase = API.defaults.baseURL.replace(/\/api\/?$/, "");
    }

    // 2. Normalizes paths and handles system folder adjustments (Windows slashes '\' to '/')
    const cleanPath = imagePath.replace(/\\/g, "/").replace(/^\//, "");
    return `${fallbackBase}/${cleanPath}`;
  };

  // ===========================
  // FETCH ALL DATA
  // ===========================
  const fetchPlatforms = async () => {
    try {
      setLoading(true);
      const res = await API.get("/index/all");

      console.log("Server response payload:", res.data);

      const responseData = res.data?.data || res.data;
      
      if (Array.isArray(responseData)) {
        setPlatforms(responseData);
      } else {
        console.error("Expected array but received:", typeof responseData);
        setPlatforms([]);
      }
      
    } catch (error) {
      console.error("Error fetching platforms:", error);
      setPlatforms([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  // ===========================
  // INPUT CHANGE
  // ===========================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===========================
  // IMAGE
  // ===========================
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ===========================
  // CREATE + UPDATE
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = new FormData();
      sendData.append("title", formData.title);
      sendData.append("subtitle", formData.subtitle);
      sendData.append("status", formData.status);

      if (imageFile) {
        sendData.append("image", imageFile);
      }

      if (editingId) {
        await API.put(`/index/update/${editingId}`, sendData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Updated Successfully");
      } else {
        await API.post("/index/create", sendData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Created Successfully");
      }

      resetForm();
      fetchPlatforms();

    } catch (error) {
      console.error("Submission failed:", error.response?.data || error.message);
      alert(`Server Error: ${error.response?.data?.message || "Something went wrong on the server."}`);
    }
  };

  // ===========================
  // EDIT
  // ===========================
  const handleEditClick = (platform) => {
    setEditingId(platform._id);

    setFormData({
      title: platform.title || "",
      subtitle: platform.subtitle || "",
      status: platform.status || "Active",
    });

    setPreview(getImageUrl(platform.image));
  };

  // ===========================
  // DELETE
  // ===========================
  const handleDeleteClick = async (id) => {
    if (!window.confirm("Delete this platform?")) return;

    try {
      await API.delete(`/index/delete/${id}`);
      fetchPlatforms();
      alert("Deleted Successfully");
    } catch (error) {
      console.error("Delete call failed:", error);
    }
  };

  // ===========================
  // RESET
  // ===========================
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      status: "Active",
    });

    setImageFile(null);
    setPreview(null);
    setEditingId(null);
    
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  // ===========================
  // SEARCH & FILTER
  // ===========================
  const filteredPlatforms = Array.isArray(platforms)
    ? platforms.filter((item) => {
        if (!item) return false;
        const matchTitle = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchSubtitle = item.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchTitle || matchSubtitle;
      })
    : [];

  return (
    <section className="indexAbstracte">
      <div className="indexAbstracte__wrapper">

        {/* FORM */}
        <div className="indexAbstracte__formCard">
          <div className="indexAbstracte__heading">
            <h2>{editingId ? "Edit Platform" : "Add Platform"}</h2>
            <p>Manage Indexing Platforms</p>
          </div>

          <form className="indexAbstracte__form" onSubmit={handleSubmit}>
            <div className="indexAbstracte__field">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="indexAbstracte__field">
              <label>Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="indexAbstracte__field">
              <label>Image</label>
              <input type="file" accept="image/*" onChange={handleImage} />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  width="100"
                  style={{ marginTop: "10px", display: "block", borderRadius: "4px", maxHeight: "100px", objectFit: "cover" }}
                />
              )}
            </div>

            <div className="indexAbstracte__field">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="indexAbstracte__formActions">
              <button className="indexAbstracte__saveBtn" type="submit">
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

        {/* TABLE CARD */}
        <div className="indexAbstracte__tableCard">
          <div className="indexAbstracte__tableTop">
            <h2>All Platforms</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* TABLE WRAPPER */}
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
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>Loading Data...</td>
                  </tr>
                ) : filteredPlatforms.length > 0 ? (
                  filteredPlatforms.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item.image ? (
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.title || "Platform"}
                            width="60"
                            style={{ display: "block", borderRadius: "4px", height: "40px", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.parentElement.innerHTML = '<div style="font-size: 10px; color: #ff4d4f;">Error Loading</div>';
                            }}
                          />
                        ) : (
                          <div style={{ fontSize: "12px", color: "#888" }}>No Image</div>
                        )}
                      </td>
                      <td className="indexAbstracte__textTruncate" title={item.title}>
                        {item.title}
                      </td>
                      <td className="indexAbstracte__textTruncate" title={item.subtitle}>
                        {item.subtitle}
                      </td>
                      <td>
                        <span className={item.status === "Active" ? "indexAbstracte__active" : "indexAbstracte__inactive"}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="indexAbstracte__actionsContainer">
                          <button className="indexAbstracte__editBtn" onClick={() => handleEditClick(item)}>
                            Edit
                          </button>
                          <button className="indexAbstracte__deleteBtn" onClick={() => handleDeleteClick(item._id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>No Data Found</td>
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
