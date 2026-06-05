import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import "./ContactManagement.css";

const ContactManagement = () => {
  const [showForm, setShowForm] = useState(false);

  const [contacts, setContacts] = useState([
    {
      id: 1,
      primaryEmail: "office@journal.com",
      secondaryEmail: "support@journal.com",
      website: "www.journal.com",
      responseTime: "24 Hours",
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    primaryEmail: "",
    secondaryEmail: "",
    website: "",
    responseTime: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      setContacts((prev) =>
        prev.map((item) =>
          item.id === formData.id ? formData : item
        )
      );
    } else {
      setContacts([
        ...contacts,
        {
          ...formData,
          id: Date.now(),
        },
      ]);
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
  };

  const handleEdit = (item) => {
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((item) => item.id !== id));
  };

  return (
    <div className="contactManagement">
      <div className="contactManagement__header">
        <div>
          <h2>Contact Management</h2>
          <p>Manage Editorial Office Information</p>
        </div>

        <button
          className="contactManagement__addBtn"
          onClick={() => setShowForm(true)}
        >
          <FaPlus />
          Add Contact
        </button>
      </div>

      <div className="contactManagement__card">
        <div className="contactManagement__tableWrapper">
          <table className="contactManagement__table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Primary Email</th>
                <th>Website</th>
                <th>Response Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="contactManagement__email">
                      <FaEnvelope />
                      {item.primaryEmail}
                    </div>
                  </td>

                  <td>
                    <div className="contactManagement__website">
                      <FaGlobe />
                      {item.website}
                    </div>
                  </td>

                  <td>{item.responseTime}</td>

                  <td>
                    <span className="contactManagement__status">
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="contactManagement__actions">
                      <button
                        className="contactManagement__editBtn"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="contactManagement__deleteBtn"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="contactManagement__overlay">
          <div className="contactManagement__modal">
            <div className="contactManagement__modalHeader">
              <h3>Editorial Office Information</h3>

              <button
                onClick={() => setShowForm(false)}
                className="contactManagement__close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="contactManagement__field">
                <label>Primary Email *</label>
                <input
                  type="email"
                  name="primaryEmail"
                  value={formData.primaryEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contactManagement__field">
                <label>Secondary Email</label>
                <input
                  type="email"
                  name="secondaryEmail"
                  value={formData.secondaryEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="contactManagement__field">
                <label>Website URL *</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contactManagement__field">
                <label>Editorial Response Time *</label>
                <input
                  type="text"
                  name="responseTime"
                  value={formData.responseTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contactManagement__field">
                <label>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <button
                type="submit"
                className="contactManagement__saveBtn"
              >
                Save Information
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;