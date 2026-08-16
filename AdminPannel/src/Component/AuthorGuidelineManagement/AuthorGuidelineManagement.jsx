import React, { useState, useEffect } from 'react';
import './AuthorGuidelineManagement.css';
import { 
  FiEdit, 
  FiTrash2, 
  FiCalendar, 
  FiPlus, 
  FiSearch, 
  FiBookOpen, 
  FiArrowRight, 
  FiMove, 
  FiX, 
  FiCheck, 
  FiChevronLeft, 
  FiChevronRight,
  FiPhone,
  FiMessageSquare,
  FiArrowUp
} from 'react-icons/fi';

const INITIAL_DATA = [
  { id: 1, event: 'Manuscript submission opens', date: '2025-09-01', status: 'Open' },
  { id: 2, event: 'Last date for submission', date: '2025-11-15', status: 'Soon' },
  { id: 3, event: 'Notification of acceptance', date: '2025-11-30', status: 'Upcoming' },
  { id: 4, event: 'Final camera ready submission', date: '2025-12-05', status: 'Upcoming' },
  { id: 5, event: 'Publication date', date: '2025-12-15', status: 'Upcoming' },
  { id: 6, event: 'Peer Review Round 1', date: '2025-10-15', status: 'Upcoming' },
  { id: 7, event: 'Revision Submission', date: '2025-11-01', status: 'Closed' }
];

const STATUS_OPTIONS = ['Open', 'Soon', 'Upcoming', 'Closed'];

const AuthorGuidelineManagement = () => {
  // Main Data States
  const [events, setEvents] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Active Item for Edit/Delete
  const [activeItem, setActiveItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    event: '',
    date: '',
    status: 'Upcoming'
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Helper function to format date for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return dateString;
    return dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter Logic
  const filteredEvents = events.filter((item) => {
    const matchesSearch = item.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  // Handle Add Item
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.event || !formData.date) return;

    const newEntry = {
      id: Date.now(),
      event: formData.event,
      date: formData.date,
      status: formData.status
    };

    setEvents([newEntry, ...events]);
    setIsAddModalOpen(false);
    setFormData({ event: '', date: '', status: 'Upcoming' });
    showToast('New date event added successfully!');
  };

  // Handle Edit Action Setup
  const handleOpenEdit = (item) => {
    setActiveItem(item);
    setFormData({ event: item.event, date: item.date, status: item.status });
    setIsEditModalOpen(true);
  };

  // Handle Edit Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEvents(events.map(item => item.id === activeItem.id ? { ...item, ...formData } : item));
    setIsEditModalOpen(false);
    setActiveItem(null);
    showToast('Event updated successfully!');
  };

  // Handle Delete Action Setup
  const handleOpenDelete = (item) => {
    setActiveItem(item);
    setIsDeleteModalOpen(true);
  };

  // Handle Delete Confirm
  const handleConfirmDelete = () => {
    setEvents(events.filter(item => item.id !== activeItem.id));
    setIsDeleteModalOpen(false);
    setActiveItem(null);
    showToast('Event deleted successfully!');
  };

  // Handle Field Updates directly in table
  const handleTableFieldChange = (id, field, value) => {
    setEvents(events.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Save Order Action
  const handleSaveOrder = () => {
    showToast('Order and settings saved successfully!');
  };

  // Drag and Drop Ordering Logic
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('dragIndex', index);
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = Number(e.dataTransfer.getData('dragIndex'));
    if (dragIndex === dropIndex) return;

    const updated = [...events];
    const [draggedItem] = updated.splice(startIndex + dragIndex, 1);
    updated.splice(startIndex + dropIndex, 0, draggedItem);
    setEvents(updated);
  };

  // Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="author-guideline-management">
      {/* Toast Notification */}
      {toastMessage && <div className="agm-toast">{toastMessage}</div>}

      {/* Header / Breadcrumb */}
      <div className="agm-header">
        <div className="agm-breadcrumb">Dashboard &gt; Author Guidelines</div>
        <h1 className="agm-title">Author Guidelines Management</h1>
        <p className="agm-subtitle">Manage author guidelines and important publication dates</p>
      </div>

      {/* Top Split Section */}
      <div className="agm-top-grid">
        {/* Left Card: Banner */}
        <div className="agm-card agm-banner-card">
          <span className="agm-badge">IMPORTANT DATES</span>
          <h2 className="agm-banner-heading">Mark your<br />calendar</h2>
          <p className="agm-banner-text">
            IJPASR follows continuous rolling submission. Tentative timeline for the current issue and publication process.
          </p>
          <a 
            href="https://example.com/author-guidelines" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="agm-btn agm-btn-primary"
          >
            <FiBookOpen /> Author Guidelines <FiArrowRight />
          </a>

          <div className="agm-info-box">
            <div className="agm-info-icon">📅</div>
            <div>
              <div className="agm-info-title">Fast Review Process</div>
              <div className="agm-info-desc">Average response within 7 days</div>
            </div>
          </div>
        </div>

        {/* Right Card: Important Dates Display */}
        <div className="agm-card agm-dates-card">
          <div className="agm-card-header">
            <h3>Important Dates</h3>
            <button 
              className="agm-btn agm-btn-primary agm-btn-sm"
              onClick={() => setIsAddModalOpen(true)}
            >
              <FiPlus /> Add New Date
            </button>
          </div>

          <div className="agm-table-wrapper">
            <table className="agm-table">
              <thead>
                <tr>
                  <th>EVENT</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th className="agm-text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {events.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td className="agm-font-medium">{item.event}</td>
                    <td>
                      <span className="agm-date-chip">
                        <FiCalendar /> {formatDateForDisplay(item.date)}
                      </span>
                    </td>
                    <td>
                      <span className={`agm-status-badge status-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="agm-actions-cell">
                      <button className="agm-icon-btn edit" onClick={() => handleOpenEdit(item)}><FiEdit /></button>
                      <button className="agm-icon-btn delete" onClick={() => handleOpenDelete(item)}><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Section: Manage Important Dates */}
      <div className="agm-card agm-manage-section">
        <div className="agm-manage-header">
          <div>
            <h3>Manage Important Dates</h3>
            <p className="agm-subtitle">Update, reorder or remove timeline events</p>
          </div>

          <div className="agm-controls">
            <div className="agm-search-input">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              className="agm-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Status">All Status</option>
              {STATUS_OPTIONS.map(st => <option key={st} value={st}>{st}</option>)}
            </select>

            <button className="agm-btn agm-btn-primary" onClick={handleSaveOrder}>
              Save Order
            </button>
          </div>
        </div>

        {/* Manage Table */}
        <div className="agm-table-wrapper">
          <table className="agm-table agm-interactive-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>EVENT</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th className="agm-text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.length > 0 ? (
                currentEvents.map((item, index) => (
                  <tr 
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <td className="agm-text-muted">{startIndex + index + 1}</td>
                    <td className="agm-font-medium">{item.event}</td>
                    <td>
                      <div className="agm-input-date-wrap">
                        <FiCalendar className="calendar-icon" />
                        <input 
                          type="date" 
                          value={item.date} 
                          onChange={(e) => handleTableFieldChange(item.id, 'date', e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <select 
                        className={`agm-select-status status-${item.status.toLowerCase()}`}
                        value={item.status}
                        onChange={(e) => handleTableFieldChange(item.id, 'status', e.target.value)}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="agm-actions-cell">
                      <button className="agm-icon-btn edit" onClick={() => handleOpenEdit(item)}><FiEdit /></button>
                      <button className="agm-icon-btn delete" onClick={() => handleOpenDelete(item)}><FiTrash2 /></button>
                    </td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="agm-empty-state">No matching events found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="agm-pagination-footer">
          <div className="agm-pagination-info">
            Showing {filteredEvents.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredEvents.length)} of {filteredEvents.length} events
          </div>
          <div className="agm-pagination">
            <button 
              className="agm-page-btn" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <FiChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button 
                key={i + 1} 
                className={`agm-page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              className="agm-page-btn" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

     
      {/* Add New Event Modal */}
      {isAddModalOpen && (
        <div className="agm-modal-backdrop">
          <div className="agm-modal">
            <div className="agm-modal-header">
              <h3>Add New Important Date</h3>
              <button className="agm-modal-close" onClick={() => setIsAddModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="agm-modal-body">
                <div className="agm-form-group">
                  <label>Event Description</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Paper Acceptance Deadline" 
                    value={formData.event}
                    onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  />
                </div>
                <div className="agm-form-group">
                  <label>Date</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="agm-form-group">
                  <label>Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="agm-modal-footer">
                <button type="button" className="agm-btn agm-btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="agm-btn agm-btn-primary">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {isEditModalOpen && (
        <div className="agm-modal-backdrop">
          <div className="agm-modal">
            <div className="agm-modal-header">
              <h3>Edit Event</h3>
              <button className="agm-modal-close" onClick={() => setIsEditModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="agm-modal-body">
                <div className="agm-form-group">
                  <label>Event Description</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.event}
                    onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  />
                </div>
                <div className="agm-form-group">
                  <label>Date</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="agm-form-group">
                  <label>Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="agm-modal-footer">
                <button type="button" className="agm-btn agm-btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="agm-btn agm-btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="agm-modal-backdrop">
          <div className="agm-modal agm-modal-sm">
            <div className="agm-modal-header">
              <h3>Confirm Deletion</h3>
              <button className="agm-modal-close" onClick={() => setIsDeleteModalOpen(false)}><FiX /></button>
            </div>
            <div className="agm-modal-body">
              <p>Are you sure you want to delete <strong>"{activeItem?.event}"</strong>? This action cannot be undone.</p>
            </div>
            <div className="agm-modal-footer">
              <button type="button" className="agm-btn agm-btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
              <button type="button" className="agm-btn agm-btn-danger" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorGuidelineManagement;