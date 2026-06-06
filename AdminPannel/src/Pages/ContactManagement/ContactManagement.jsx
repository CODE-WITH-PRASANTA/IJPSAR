import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaGlobe,
  FaTimes,
  FaRegClock
} from "react-icons/fa";
import "./ContactManagement.css";
import API from "../../api/axios";

const ContactManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    primaryEmail: "",
    secondaryEmail: "",
    website: "",
    responseTime: "",
    status: "Active",
  });

  // 🔥 FETCH DATA FROM BACKEND
  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts");
      setContacts(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 CREATE + UPDATE (BACKEND)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id) {
        await API.put(`/contacts/${formData.id}`, formData);
      } else {
        await API.post("/contacts", formData);
      }

      setShowForm(false);
      setFormData({
        id: null,
        primaryEmail: "",
        secondaryEmail: "",
        website: "",
        responseTime: "",
        status: "Active",
      });

      fetchContacts();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const handleEdit = (item) => {
    setFormData({
      id: item._id,
      primaryEmail: item.primaryEmail,
      secondaryEmail: item.secondaryEmail,
      website: item.website,
      responseTime: item.responseTime,
      status: item.status,
    });
    setShowForm(true);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact configuration?")) {
      try {
        await API.delete(`/contacts/${id}`);
        fetchContacts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="contactManagement">
      {/* HEADER SECTION */}
      <div className="contactManagement__header">
        <div>
          <h2>Contact Management</h2>
          <p>Configure corporate contact points, support latency goals, and external site endpoints.</p>
        </div>

        <button className="contactManagement__addBtn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Contact
        </button>
      </div>

      {/* CARD EMBEDDED WRAPPER */}
      <div className="contactManagement__card">
        <div className="contactManagement__tableWrapper">
          <table className="contactManagement__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Primary Email</th>
                <th>Secondary Email</th>
                <th>Website URL</th>
                <th>Response SLA</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
                    No record data nodes mapped. Click "Add Contact" to spin up an access point config.
                  </td>
                </tr>
              ) : (
                contacts.map((item, i) => (
                  <tr key={item._id || i}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="contactManagement__email">
                        <FaEnvelope /> {item.primaryEmail || "—"}
                      </div>
                    </td>
                    <td>
                      <div className="contactManagement__email" style={{ color: "#9ca3af" }}>
                        {item.secondaryEmail ? (
                          <>
                            <FaEnvelope style={{ color: "#4b5563" }} /> {item.secondaryEmail}
                          </>
                        ) : (
                          "—"
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="contactManagement__website">
                        <FaGlobe /> {item.website || "—"}
                      </div>
                    </td>
                    <td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <FaRegClock style={{ color: "#9ca3af", fontSize: "13px" }} />
                        {item.responseTime || "—"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`contactManagement__status ${
                          item.status !== "Active" ? "inactive" : ""
                        }`}
                      >
                        {item.status || "Active"}
                      </span>
                    </td>

                    <td>
                      <div className="contactManagement__actions">
                        <button 
                          className="contactManagement__editBtn" 
                          onClick={() => handleEdit(item)}
                          title="Modify Entry"
                        >
                          <FaEdit />
                        </button>

                        <button 
                          className="contactManagement__deleteBtn" 
                          onClick={() => handleDelete(item._id)}
                          title="Purge Entry"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP OVERLAY SYSTEM */}
      {showForm && (
        <div className="contactManagement__overlay" onClick={() => setShowForm(false)}>
          <div className="contactManagement__modal" onClick={(e) => e.stopPropagation()}>
            
            <div className="contactManagement__modalHeader">
              <h3>{formData.id ? "Edit System Contact" : "Deploy New Contact Point"}</h3>
              <button className="contactManagement__close" onClick={() => setShowForm(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="contactManagement__field">
                <label>Primary Access Email Address *</label>
                <input
                  name="primaryEmail"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.primaryEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contactManagement__field">
                <label>Secondary Fallback Email</label>
                <input
                  name="secondaryEmail"
                  type="email"
                  placeholder="backup@company.com"
                  value={formData.secondaryEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="contactManagement__field">
                <label>Corporate Gateway URL (Website) *</label>
                <input
                  name="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contactManagement__field">
                <label>Expected Response SLA *</label>
                <input
                  name="responseTime"
                  type="text"
                  placeholder="e.g., Under 24 Hours, Within 15 Mins"
                  value={formData.responseTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contactManagement__field">
                <label>Operational Life-Cycle Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <button type="submit" className="contactManagement__saveBtn">
                {formData.id ? "Apply Modifications" : "Commit Infrastructure Configuration"}
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;