import React, { useState, useEffect, useMemo } from 'react';
import './AddManagement.css';
import api from '../../api/axios';

import {
  FiUsers,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiEye,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiAlertTriangle,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiHash
} from 'react-icons/fi';

const ITEMS_PER_PAGE = 10;

const AddManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletedCount, setDeletedCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAdmin, setViewAdmin] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetch authors from backend on mount
  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const response = await api.get('/author/all');
      if (response.data.success) {
        // Map backend fields to frontend expected fields
        const formattedData = response.data.data.map((author, index) => ({
          id: author._id,
          name: author.fullName || 'N/A',
          phone: author.mobile || 'N/A',
          designation: author.designation || 'N/A',
          email: author.email || 'N/A',
          organisation: author.organization || 'N/A',
          dateOfRegister: author.createdAt 
            ? new Date(author.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
            : 'N/A',
          avatarImg: author.profilePhoto || null,
          initials: author.fullName ? author.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'AU',
          avatarColor: ['blue', 'purple', 'green', 'orange', 'teal', 'pink'][index % 6]
        }));
        setAdmins(formattedData);
      }
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalAdmins = admins.length;

  const filteredAdmins = useMemo(() => {
    return admins.filter((a) => {
      return (
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [admins, searchTerm]);

  const totalEntries = filteredAdmins.length;
  const totalPages = Math.max(Math.ceil(totalEntries / ITEMS_PER_PAGE), 1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      // Calls the correct backend admin route to delete the author account from MongoDB
      const response = await api.delete(`/author/admin/${deleteTarget.id}`);
      if (response.data.success) {
        setAdmins((prev) => prev.filter((a) => a.id !== deleteTarget.id));
        setDeletedCount((prev) => prev + 1);
        setDeleteTarget(null);
        setViewAdmin(null);
      }
    } catch (error) {
      console.error('Failed to delete author account:', error);
      alert(error.response?.data?.message || 'Failed to delete account');
    }
  };

  const renderAvatar = (admin, size = 'sm') => {
    if (admin.avatarImg) {
      return (
        <img
          src={admin.avatarImg}
          alt={admin.name}
          className={`addmanagement-avatar addmanagement-avatar-${size}`}
        />
      );
    }
    return (
      <div className={`addmanagement-avatar addmanagement-avatar-${size} avatar-${admin.avatarColor}`}>
        {admin.initials}
      </div>
    );
  };

  return (
    <div className="addmanagement-page">
      {/* HEADER */}
      <div className="addmanagement-header">
        <h1 className="addmanagement-title">Add Management</h1>
        <div className="addmanagement-breadcrumb">
          <FiHome />
          <span>Dashboard</span>
          <FiChevronRight size={13} />
          <span className="crumb-active">Add Management</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="addmanagement-stats-grid">
        <div className="addmanagement-stat-card">
          <div className="addmanagement-stat-icon icon-blue">
            <FiUsers />
          </div>
          <div className="addmanagement-stat-content">
            <span className="addmanagement-stat-label">Total Add's</span>
            <span className="addmanagement-stat-value">{totalAdmins}</span>
            <span className="addmanagement-stat-sub">All Registered Add's</span>
          </div>
        </div>

        <div className="addmanagement-stat-card">
          <div className="addmanagement-stat-icon icon-red">
            <FiTrash2 />
          </div>
          <div className="addmanagement-stat-content">
            <span className="addmanagement-stat-label">Total Deleted</span>
            <span className="addmanagement-stat-value">{deletedCount}</span>
            <span className="addmanagement-stat-sub">Removed Accounts</span>
          </div>
        </div>
      </div>

      {/* LIST CARD */}
      <div className="addmanagement-list-card">
        <div className="addmanagement-list-header">
          <div>
            <h2 className="addmanagement-list-title">Add List</h2>
            <p className="addmanagement-list-subtitle">Manage all registered Add's in the system</p>
          </div>

          <div className="addmanagement-list-actions">
            <div className="addmanagement-search-box">
              <FiSearch />
              <input
                type="text"
                placeholder="Search Add by name, email..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="addmanagement-table-wrapper">
          <table className="addmanagement-table">
            <thead>
              <tr>
                <th className="col-hash">#</th>
                <th>Name</th>
                <th>Phone No.</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Organisation</th>
                <th>Date of Register</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="addmanagement-empty-row">
                    Loading authors...
                  </td>
                </tr>
              ) : (
                currentAdmins.map((admin, idx) => (
                  <tr key={admin.id} className="addmanagement-table-row">
                    <td data-label="#" className="col-hash">{indexOfFirstItem + idx + 1}</td>
                    <td data-label="Name">
                      <div className="addmanagement-name-cell">
                        {renderAvatar(admin, 'sm')}
                        <span className="addmanagement-name-text">{admin.name}</span>
                      </div>
                    </td>
                    <td data-label="Phone No.">{admin.phone}</td>
                    <td data-label="Designation">{admin.designation}</td>
                    <td data-label="Email">{admin.email}</td>
                    <td data-label="Organisation">{admin.organisation}</td>
                    <td data-label="Date of Register">{admin.dateOfRegister}</td>
                    <td data-label="Actions" className="cell-actions">
                      <div className="addmanagement-actions-cell">
                        <button
                          className="addmanagement-icon-btn btn-view"
                          onClick={() => setViewAdmin(admin)}
                          aria-label="View"
                        >
                          <FiEye />
                        </button>
                        <button
                          className="addmanagement-icon-btn btn-delete"
                          onClick={() => setDeleteTarget(admin)}
                          aria-label="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}

              {!loading && currentAdmins.length === 0 && (
                <tr>
                  <td colSpan={8} className="addmanagement-empty-row">
                    No Add's found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="addmanagement-pagination-footer">
          <div className="addmanagement-showing-text">
            Showing {totalEntries === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalEntries)} of {totalEntries} entries
          </div>

          <div className="addmanagement-pagination-controls">
            <button
              className="addmanagement-page-nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              <FiChevronLeft />
            </button>

            {getPageNumbers().map((page, idx) =>
              page === '...' ? (
                <span key={`ellipsis-${idx}`} className="addmanagement-page-ellipsis">...</span>
              ) : (
                <button
                  key={page}
                  className={`addmanagement-page-num ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}

            <button
              className="addmanagement-page-nav-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* VIEW POPUP */}
      {viewAdmin && (
        <div className="addmanagement-modal-backdrop" onClick={() => setViewAdmin(null)}>
          <div className="addmanagement-view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="addmanagement-view-header">
              <h3>Add Details</h3>
              <button className="addmanagement-close-btn" onClick={() => setViewAdmin(null)}>
                <FiX />
              </button>
            </div>

            <div className="addmanagement-view-content">
              <div className="addmanagement-view-profile">
                {renderAvatar(viewAdmin, 'lg')}
                <div>
                  <h4>{viewAdmin.name}</h4>
                </div>
              </div>

              <div className="addmanagement-view-info-card">
                <div className="addmanagement-view-info-row">
                  <span className="info-label"><FiHash /> Designation</span>
                  <span className="info-value">{viewAdmin.designation}</span>
                </div>
                <div className="addmanagement-view-info-row">
                  <span className="info-label"><FiPhone /> Phone</span>
                  <span className="info-value">{viewAdmin.phone}</span>
                </div>
                <div className="addmanagement-view-info-row">
                  <span className="info-label"><FiMail /> Email</span>
                  <span className="info-value">{viewAdmin.email}</span>
                </div>
                <div className="addmanagement-view-info-row">
                  <span className="info-label"><FiBriefcase /> Organisation</span>
                  <span className="info-value">{viewAdmin.organisation}</span>
                </div>
                <div className="addmanagement-view-info-row">
                  <span className="info-label"><FiCalendar /> Registered On</span>
                  <span className="info-value">{viewAdmin.dateOfRegister}</span>
                </div>
              </div>

              <div className="addmanagement-view-actions">
                <button
                  className="addmanagement-view-delete-btn"
                  onClick={() => setDeleteTarget(viewAdmin)}
                >
                  <FiTrash2 /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteTarget && (
        <div className="addmanagement-modal-backdrop" onClick={() => setDeleteTarget(null)}>
          <div className="addmanagement-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="addmanagement-confirm-icon">
              <FiAlertTriangle />
            </div>
            <h3>Delete Account?</h3>
            <p>
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div className="addmanagement-confirm-actions">
              <button className="addmanagement-cancel-btn" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="addmanagement-delete-btn" onClick={confirmDelete}>
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddManagement;