import React, { useState, useEffect, useRef } from "react";
import "./Testimonial.css";
import API, { BASE_URL } from "../../api/axios";

const Testimonial = () => {
  const [list, setList] = useState([]);

  const initialFormState = {
    name: "",
    designation: "",
    organization: "",
    country: "",
    image: "", // Holds base64 data URL string
    rating: 5,
    feedback: "",
    status: "Active",
    order: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  // Load testimonials from API on component mount
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await API.get("/testimonials");
      setList(response.data);
    } catch (error) {
      console.error("Load Error:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Process Avatar Image Upload File to base64 Data String
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 2 MB limit
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2 MB");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    // 1. Frontend validation rules
    if (!form.name.trim()) {
      alert("Please fill out the Researcher Name.");
      return;
    }

    if (!form.feedback.trim()) {
      alert("Please fill out the Feedback Message.");
      return;
    }

    // Auto-generate character fallback if no custom profile image was selected
    const computedInitial = form.name.trim().charAt(0).toUpperCase() || "A";

    // 2. Build explicit schema structured data payload
    const payload = {
      name: form.name.trim(),
      designation: form.designation.trim() || "—",
      organization: form.organization.trim() || "—",
      country: form.country.trim() || "—",
      image: form.image,
      initial: computedInitial,
      rating: Number(form.rating) || 5,
      status: form.status,
      order: form.order.trim() ? Number(form.order) : 0, // Fallback safely to a number type
      feedback: form.feedback.trim(),
    };

    try {
      if (editingId) {
        // Update Record Mode
        await API.put(`/testimonials/${editingId}`, payload);
        setEditingId(null);
      } else {
        // Create Record Mode
        await API.post("/testimonials", payload);
      }

      // Refresh list from DB
      await loadTestimonials();

      // Clear and clean input form cards
      setForm(initialFormState);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Save Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
          `Server Error (${error.response.status}): Check your backend body-parser configuration limits for processing base64 image data strings.`
        );
      } else {
        alert("Unable to connect to server");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      designation: item.designation === "—" ? "" : item.designation || "",
      organization: item.organization === "—" ? "" : item.organization || "",
      country: item.country === "—" ? "" : item.country || "",
      image: item.image || "",
      rating: item.rating || 5,
      feedback: item.feedback || "",
      status: item.status || "Active",
      order: item.order !== undefined && item.order !== null ? String(item.order) : "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback entry?")) {
      try {
        await API.delete(`/testimonials/${id}`);
        
        await loadTestimonials();

        if (editingId === id) {
          setEditingId(null);
          setForm(initialFormState);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(initialFormState);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="ts_wrap">
      <div className="ts_layout">
        
        {/* LEFT FORM CARD */}
        <div className="ts_formCard">
          <div className="ts_header">
            {editingId ? "Edit Researcher Feedback" : "Add Researcher Feedback"}
          </div>

          {/* AVATAR IMAGE UPLOADER UI FIELD */}
          <div className="ts_uploadSection">
            <div className="ts_imagePreviewContainer">
              {form.image ? (
                <img src={form.image} alt="Preview Avatar" className="ts_uploadedImg" />
              ) : (
                <div className="ts_uploadPlaceholder">
                  {form.name ? form.name.charAt(0).toUpperCase() : "?"}
                </div>
              )}
            </div>
            <label className="ts_uploadBtnLabel">
              Choose Avatar Image
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="ts_hiddenFileInput"
              />
            </label>
            {form.image && (
              <button
                type="button"
                className="ts_removeImgBtn"
                onClick={() => setForm({ ...form, image: "" })}
              >
                Remove
              </button>
            )}
          </div>

          <div className="ts_grid">
            <div className="ts_fieldGroup">
              <label className="ts_inputLabel">Researcher Name *</label>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="ts_fieldGroup">
              <label className="ts_inputLabel">Designation *</label>
              <input
                name="designation"
                placeholder="Designation"
                value={form.designation}
                onChange={handleChange}
              />
            </div>

            <div className="ts_fieldGroup">
              <label className="ts_inputLabel">Organization / University *</label>
              <input
                name="organization"
                placeholder="Organization"
                value={form.organization}
                onChange={handleChange}
              />
            </div>

            <div className="ts_fieldGroup">
              <label className="ts_inputLabel">Country *</label>
              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
              />
            </div>

            <div className="ts_fieldGroup">
              <label className="ts_inputLabel">Rating</label>
              <select name="rating" value={form.rating} onChange={handleChange}>
                <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                <option value={4}>⭐⭐⭐⭐ (4)</option>
                <option value={3}>⭐⭐⭐ (3)</option>
                <option value={2}>⭐⭐ (2)</option>
                <option value={1}>⭐ (1)</option>
              </select>
            </div>

            <div className="ts_fieldGroup">
              <label className="ts_inputLabel">Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            <div className="ts_fieldGroup full_width_field">
              <label className="ts_inputLabel">Display Order</label>
              <input
                name="order"
                placeholder="Display Order Position"
                value={form.order}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="ts_fieldGroup text_area_group">
            <label className="ts_inputLabel">Feedback Message *</label>
            <textarea
              name="feedback"
              placeholder="Feedback Message"
              value={form.feedback}
              onChange={handleChange}
            />
          </div>

          <div className="ts_actions">
            {editingId && (
              <button className="ts_cancelBtn" onClick={handleCancel}>
                Cancel
              </button>
            )}
            <button className="ts_saveBtn" onClick={handleSave}>
              {editingId ? "Update Feedback" : "Save Feedback"}
            </button>
          </div>
        </div>

        {/* RIGHT TABLE CARD */}
        <div className="ts_tableCard">
          <div className="ts_tableHeader">Feedback Records</div>
          <div className="ts_tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {list.length > 0 ? (
                  list.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>

                        <td>
                          <div className="ts_avatarWrapper">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="ts_tableImg" />
                            ) : (
                              <div className="ts_initial">
                                {item.initial}
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="ts_boldName">{item.name}</td>
                        <td>{item.designation}</td>

                        <td className="ts_rating">
                          {"★".repeat(item.rating)}
                          <span className="ts_rating_muted">{"★".repeat(5 - item.rating)}</span>
                        </td>

                        <td>
                          <span className={`ts_status ${item.status ? item.status.replace(/\s+/g, "") : "Active"}`}>
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <div className="ts_tableActionBtns">
                            <button
                              className="ts_edit"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="ts_delete"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="ts_noData">
                      No feedback entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Testimonial;