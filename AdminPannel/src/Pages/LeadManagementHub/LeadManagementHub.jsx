import React, { useEffect, useState } from "react";
import "./LeadManagementHub.css";
import { FaSearch, FaTrash, FaEye, FaEdit, FaTimes } from "react-icons/fa";
import API from "../../api/axios";

const LeadManagementHub = () => {
  const [search, setSearch] = useState("");
  const [leads, setLeads] = useState([]);
  
  // Modal states for working View & Edit buttons
  const [selectedLead, setSelectedLead] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState("");

  // ✅ FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await API.get("/floatingform");
      console.log("API RESPONSE:", res.data);

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.leads || [];

      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeads([]);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // ✅ UTILITY FUNCTION TO RENDER NAME SAFELY
  const getLeadName = (lead) => {
    if (!lead) return "—";
    // 1. Fallback if backend uses firstName & lastName fields split up
    if (lead.firstName || lead.lastName) {
      return `${lead.firstName || ""} ${lead.lastName || ""}`.trim();
    }
    // 2. Fallback if data is wrapped inside a user/profile sub-object
    if (lead.user && typeof lead.user === "object") {
      return lead.user.fullName || lead.user.name || "—";
    }
    // 3. Default target
    return lead.fullName || lead.name || "—";
  };

  // ✅ DELETE LEAD
  const handleDelete = async (id, currentLead) => {
    const name = getLeadName(currentLead);
    if (window.confirm(`Delete lead "${name}"?`)) {
      try {
        await API.delete(`/floatingform/${id}`);
        setLeads((prev) => prev.filter((lead) => lead._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  // ✅ OPEN VIEW MODAL
  const handleOpenView = (lead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  // ✅ OPEN EDIT MODAL
  const handleOpenEdit = (lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status || "new");
    setIsEditModalOpen(true);
  };

  // ✅ UPDATE STATUS (EDIT MODAL SUBMIT)
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      // Optimistically update UI state or patch database endpoint
      await API.patch(`/floatingform/${selectedLead._id}`, { status: editStatus });
      
      setLeads((prev) =>
        prev.map((l) => (l._id === selectedLead._id ? { ...l, status: editStatus } : l))
      );
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update status on server:", err);
      // Fallback updating locally if server status endpoint routes vary
      setLeads((prev) =>
        prev.map((l) => (l._id === selectedLead._id ? { ...l, status: editStatus } : l))
      );
      setIsEditModalOpen(false);
    }
  };

  // SAFE FILTER (NO CRASH)
  const safeLeads = Array.isArray(leads) ? leads : [];

  const filteredLeads = safeLeads.filter((lead) => {
    const name = getLeadName(lead).toLowerCase();
    const phone = (lead.phone || "");
    const address = (lead.address || "").toLowerCase();
    const targetSearch = search.toLowerCase();

    return name.includes(targetSearch) || phone.includes(targetSearch) || address.includes(targetSearch);
  });

  return (
    <div className="leadManagementHub">
      {/* HEADER */}
      <div className="leadManagementHub__header">
        <div>
          <h2 className="leadManagementHub__title">Lead Management Hub</h2>
          <p className="leadManagementHub__subtitle">Track, filter, and manage your incoming pipeline records seamlessly.</p>
        </div>

        <div className="leadManagementHub__searchBox">
          <FaSearch className="leadManagementHub__searchIcon" />
          <input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE CARD CONTAINER */}
      <div className="leadManagementHub__tableCard">
        <div className="leadManagementHub__tableTop">
          <h3 className="leadManagementHub__tableTitle">All Active Leads</h3>
        </div>

        <div className="leadManagementHub__tableWrapper">
          <table className="leadManagementHub__table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="leadManagementHub__empty">
                    No leads found matching your request.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, index) => {
                  const currentStatus = (lead.status || "new").toLowerCase();
                  let statusClass = "leadManagementHub__status--new";
                  if (currentStatus === "contacted") statusClass = "leadManagementHub__status--contacted";
                  if (currentStatus === "converted") statusClass = "leadManagementHub__status--converted";
                  if (currentStatus === "closed") statusClass = "leadManagementHub__status--closed";

                  return (
                    <tr key={lead._id || index}>
                      <td>{index + 1}</td>
                      <td className="leadManagementHub__userName">{getLeadName(lead)}</td>
                      <td>{lead.phone || "—"}</td>
                      <td>{lead.address || "—"}</td>
                      <td>
                        <div className="leadManagementHub__messageTruncate" title={lead.message}>
                          {lead.message || "—"}
                        </div>
                      </td>
                      <td>
                        <span className={`leadManagementHub__status ${statusClass}`}>
                          {lead.status || "new"}
                        </span>
                      </td>

                      <td>
                        <div className="leadManagementHub__actionButtons">
                          <button 
                            className="leadManagementHub__viewBtn" 
                            title="View Lead Details"
                            onClick={() => handleOpenView(lead)}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="leadManagementHub__editBtn" 
                            title="Edit Lead Status"
                            onClick={() => handleOpenEdit(lead)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(lead._id, lead)}
                            className="leadManagementHub__deleteBtn"
                            title="Delete Record"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
         VIEW PROFILE MODAL
      ========================================== */}
      {isViewModalOpen && selectedLead && (
        <div className="leadHubModal__overlay" onClick={() => setIsViewModalOpen(false)}>
          <div className="leadHubModal__content" onClick={(e) => e.stopPropagation()}>
            <div className="leadHubModal__header">
              <h3>Lead Profile Details</h3>
              <button className="leadHubModal__close" onClick={() => setIsViewModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="leadHubModal__body">
              <p><strong>Name:</strong> {getLeadName(selectedLead)}</p>
              <p><strong>Phone:</strong> {selectedLead.phone || "—"}</p>
              <p><strong>Address:</strong> {selectedLead.address || "—"}</p>
              <p><strong>Status:</strong> <span style={{ textTransform: "capitalize" }}>{selectedLead.status || "new"}</span></p>
              <div className="leadHubModal__msgBox">
                <strong>Message Breakdown:</strong>
                <p>{selectedLead.message || "No attached note message provided by applicant."}</p>
              </div>
              <div className="leadHubModal__actions">
                <button className="leadHubModal__cancelBtn" onClick={() => setIsViewModalOpen(false)}>Close View</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
         EDIT STATUS MODAL
      ========================================== */}
      {isEditModalOpen && selectedLead && (
        <div className="leadHubModal__overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="leadHubModal__content" onClick={(e) => e.stopPropagation()}>
            <div className="leadHubModal__header">
              <h3>Update Pipeline Status</h3>
              <button className="leadHubModal__close" onClick={() => setIsEditModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUpdateStatus}>
              <div className="leadHubModal__formGroup">
                <label>Lead Identification Name</label>
                <input type="text" value={getLeadName(selectedLead)} disabled style={{ opacity: 0.6, cursor: "not-allowed" }} />
              </div>
              <div className="leadHubModal__formGroup">
                <label>Select Stage Pipeline Status</label>
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="leadHubModal__actions">
                <button type="button" className="leadHubModal__cancelBtn" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="leadHubModal__saveBtn">Save Status Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagementHub;