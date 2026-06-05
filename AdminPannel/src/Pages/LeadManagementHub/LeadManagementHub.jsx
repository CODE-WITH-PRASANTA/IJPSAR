import React, { useState } from "react";
import "./LeadManagementHub.css";
import { FaSearch, FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";

const LeadManagementHub = () => {
  // --- STATE MANAGEMENT ---
  const [search, setSearch] = useState("");
  const [leads, setLeads] = useState([
    {
      id: 1,
      fullName: "Rahul Kumar",
      phone: "9876543210",
      address: "Odisha",
      message: "Journal Information",
      status: "new",
    },
    {
      id: 2,
      fullName: "Priya Sharma",
      phone: "9123456789",
      address: "Delhi",
      message: "Publication Details",
      status: "contacted",
    },
    {
      id: 3,
      fullName: "Amit Das",
      phone: "9988776655",
      address: "Bhubaneswar",
      message: "Research Support",
      status: "converted",
    },
  ]);

  // Modal Controls
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);

  // --- ACTIONS ---
  
  // Delete Handler
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the lead for "${name}"?`)) {
      setLeads(leads.filter((lead) => lead.id !== id));
    }
  };

  // Open Edit Modal
  const openEditModal = (lead) => {
    setCurrentLead({ ...lead });
    setIsEditModalOpen(true);
  };

  // Open View Modal
  const openViewModal = (lead) => {
    setCurrentLead(lead);
    setIsViewModalOpen(true);
  };

  // Save Edited Changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setLeads(
      leads.map((lead) => (lead.id === currentLead.id ? currentLead : lead))
    );
    setIsEditModalOpen(false);
    setCurrentLead(null);
  };

  // Handle Form Inputs Dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentLead((prev) => ({ ...prev, [name]: value }));
  };

  // --- FILTERING ---
  const filteredLeads = leads.filter((lead) =>
    lead.fullName.toLowerCase().includes(search.toLowerCase()) ||
    lead.phone.includes(search) ||
    lead.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="leadManagementHub">
      {/* HEADER SECTION */}
      <div className="leadManagementHub__header">
        <div>
          <h2 className="leadManagementHub__title">Lead Management Hub</h2>
          <p className="leadManagementHub__subtitle">
            Manage and monitor all incoming lead requests
          </p>
        </div>

        <div className="leadManagementHub__searchBox">
          <FaSearch className="leadManagementHub__searchIcon" />
          <input
            type="text"
            placeholder="Search by Name, Phone, or Location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="leadManagementHub__tableCard">
        <div className="leadManagementHub__tableTop">
          <h3 className="leadManagementHub__tableTitle">All Pipeline Leads</h3>
          <span className="leadManagementHub__subtitle">Total: {filteredLeads.length}</span>
        </div>

        <div className="leadManagementHub__tableWrapper">
          <table className="leadManagementHub__table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((lead, index) => (
                <tr key={lead.id}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="leadManagementHub__userName">
                      {lead.fullName}
                    </span>
                  </td>
                  <td>{lead.phone}</td>
                  <td>{lead.address}</td>
                  <td>
                    <div className="leadManagementHub__messageTruncate">
                      {lead.message}
                    </div>
                  </td>
                  <td>
                    <span className={`leadManagementHub__status leadManagementHub__status--${lead.status}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <div className="leadManagementHub__actionButtons">
                      <button 
                        className="leadManagementHub__viewBtn"
                        title="View Details"
                        onClick={() => openViewModal(lead)}
                      >
                        <FaEye />
                      </button>

                      <button 
                        className="leadManagementHub__editBtn"
                        title="Edit Lead"
                        onClick={() => openEditModal(lead)}
                      >
                        <FaEdit />
                      </button>

                      <button 
                        className="leadManagementHub__deleteBtn"
                        title="Delete Lead"
                        onClick={() => handleDelete(lead.id, lead.fullName)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan="7" className="leadManagementHub__empty">
                    No Leads Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {isEditModalOpen && currentLead && (
        <div className="leadHubModal__overlay">
          <div className="leadHubModal__content">
            <div className="leadHubModal__header">
              <h3>Edit Lead Information</h3>
              <button className="leadHubModal__close" onClick={() => setIsEditModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSaveChanges}>
              <div className="leadHubModal__formGroup">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={currentLead.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="leadHubModal__formGroup">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={currentLead.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="leadHubModal__formGroup">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={currentLead.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="leadHubModal__formGroup">
                <label>Status</label>
                <select
                  name="status"
                  value={currentLead.status}
                  onChange={handleInputChange}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="leadHubModal__formGroup">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="3"
                  value={currentLead.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="leadHubModal__actions">
                <button type="button" className="leadHubModal__cancelBtn" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="leadHubModal__saveBtn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- VIEW MODAL --- */}
      {isViewModalOpen && currentLead && (
        <div className="leadHubModal__overlay">
          <div className="leadHubModal__content leadHubModal__content--view">
            <div className="leadHubModal__header">
              <h3>Lead Profile View</h3>
              <button className="leadHubModal__close" onClick={() => setIsViewModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="leadHubModal__body">
              <p><strong>Full Name:</strong> {currentLead.fullName}</p>
              <p><strong>Phone:</strong> {currentLead.phone}</p>
              <p><strong>Address:</strong> {currentLead.address}</p>
              <p>
                <strong>Status:</strong> 
                <span className={`leadManagementHub__status leadManagementHub__status--${currentLead.status}`} style={{marginLeft: '10px'}}>
                  {currentLead.status}
                </span>
              </p>
              <div className="leadHubModal__msgBox">
                <strong>Message Requirement:</strong>
                <p>{currentLead.message}</p>
              </div>
            </div>
            <div className="leadHubModal__actions">
              <button className="leadHubModal__cancelBtn" onClick={() => setIsViewModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagementHub;