import React, { useState, useMemo } from 'react';
import './AddManagement.css';
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
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

const initialAdmins = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    avatarImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    phone: '+91 9876543210',
    designation: 'Professor',
    email: 'rajesh.kumar@cu.ac.in',
    organisation: 'Central University',
    dateOfRegister: '29 Jul 2025',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Anita Sharma',
    initials: 'AS',
    avatarColor: 'purple',
    phone: '+91 8765432109',
    designation: 'Assistant Professor',
    email: 'anita.sharma@jnu.ac.in',
    organisation: 'JNU University',
    dateOfRegister: '28 Jul 2025',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Dr. Vikram Singh',
    avatarImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    phone: '+91 7654321098',
    designation: 'Associate Professor',
    email: 'vikram.singh@amu.ac.in',
    organisation: 'AMU Aligarh',
    dateOfRegister: '27 Jul 2025',
    status: 'Disabled'
  },
  {
    id: 4,
    name: 'Neha Patel',
    initials: 'NP',
    avatarColor: 'green',
    phone: '+91 6543210987',
    designation: 'Research Scholar',
    email: 'neha.patel@gujaratuni.ac.in',
    organisation: 'Gujarat University',
    dateOfRegister: '26 Jul 2025',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Mohd. Kaleem',
    initials: 'MK',
    avatarColor: 'orange',
    phone: '+91 5432109876',
    designation: 'Lecturer',
    email: 'kaleem@jamia.ac.in',
    organisation: 'Jamia Millia Islamia',
    dateOfRegister: '25 Jul 2025',
    status: 'Disabled'
  },
  {
    id: 6,
    name: 'Dr. Pooja Verma',
    avatarImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    phone: '+91 4321098765',
    designation: 'Professor',
    email: 'pooja.verma@du.ac.in',
    organisation: 'Delhi University',
    dateOfRegister: '24 Jul 2025',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Rohit Kumar',
    initials: 'RK',
    avatarColor: 'blue',
    phone: '+91 3210987654',
    designation: 'Research Scholar',
    email: 'rohit.kumar@bhu.ac.in',
    organisation: 'BHU Varanasi',
    dateOfRegister: '23 Jul 2025',
    status: 'Active'
  },
  {
    id: 8,
    name: 'Sanjay Gupta',
    initials: 'SG',
    avatarColor: 'teal',
    phone: '+91 9812345670',
    designation: 'Lecturer',
    email: 'sanjay.gupta@iitd.ac.in',
    organisation: 'IIT Delhi',
    dateOfRegister: '22 Jul 2025',
    status: 'Active'
  },
  {
    id: 9,
    name: 'Kavita Reddy',
    initials: 'KR',
    avatarColor: 'pink',
    phone: '+91 8901234567',
    designation: 'Research Scholar',
    email: 'kavita.reddy@osmania.ac.in',
    organisation: 'Osmania University',
    dateOfRegister: '21 Jul 2025',
    status: 'Active'
  },
  {
    id: 10,
    name: 'Dr. Arjun Mehta',
    avatarImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100',
    phone: '+91 7890123456',
    designation: 'Professor',
    email: 'arjun.mehta@iima.ac.in',
    organisation: 'IIM Ahmedabad',
    dateOfRegister: '20 Jul 2025',
    status: 'Disabled'
  },
  {
    id: 11,
    name: 'Priya Nair',
    initials: 'PN',
    avatarColor: 'blue',
    phone: '+91 6789012345',
    designation: 'Assistant Professor',
    email: 'priya.nair@keralauni.ac.in',
    organisation: 'Kerala University',
    dateOfRegister: '19 Jul 2025',
    status: 'Active'
  },
  {
    id: 12,
    name: 'Suresh Yadav',
    initials: 'SY',
    avatarColor: 'orange',
    phone: '+91 5678901234',
    designation: 'Research Scholar',
    email: 'suresh.yadav@lkouniv.ac.in',
    organisation: 'Lucknow University',
    dateOfRegister: '18 Jul 2025',
    status: 'Disabled'
  },
  {
    id: 13,
    name: 'Dr. Meera Iyer',
    avatarImg: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100',
    phone: '+91 4567890123',
    designation: 'Associate Professor',
    email: 'meera.iyer@annauniv.ac.in',
    organisation: 'Anna University',
    dateOfRegister: '17 Jul 2025',
    status: 'Active'
  },
  {
    id: 14,
    name: 'Karan Malhotra',
    initials: 'KM',
    avatarColor: 'purple',
    phone: '+91 3456789012',
    designation: 'Lecturer',
    email: 'karan.malhotra@puchd.ac.in',
    organisation: 'Panjab University',
    dateOfRegister: '16 Jul 2025',
    status: 'Active'
  },
  {
    id: 15,
    name: 'Divya Joshi',
    initials: 'DJ',
    avatarColor: 'green',
    phone: '+91 2345678901',
    designation: 'Research Scholar',
    email: 'divya.joshi@unipune.ac.in',
    organisation: 'Pune University',
    dateOfRegister: '15 Jul 2025',
    status: 'Active'
  }
];

const ITEMS_PER_PAGE = 10;

const AddManagement = () => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [deletedCount, setDeletedCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAdmin, setViewAdmin] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const totalAdmins = admins.length;
  const activeCount = admins.filter((a) => a.status === 'Active').length;
  const disabledCount = admins.filter((a) => a.status === 'Disabled').length;

  const filteredAdmins = useMemo(() => {
    return admins.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [admins, searchTerm, statusFilter]);

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

  const toggleStatus = (id) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'Active' ? 'Disabled' : 'Active' } : a
      )
    );
    setViewAdmin((prev) =>
      prev && prev.id === id
        ? { ...prev, status: prev.status === 'Active' ? 'Disabled' : 'Active' }
        : prev
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const applyStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setAdmins((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeletedCount((prev) => prev + 1);
    setDeleteTarget(null);
    setViewAdmin(null);
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
          <div className="addmanagement-stat-icon icon-green">
            <FiCheckCircle />
          </div>
          <div className="addmanagement-stat-content">
            <span className="addmanagement-stat-label">Active Add's</span>
            <span className="addmanagement-stat-value">{activeCount}</span>
            <span className="addmanagement-stat-sub">Currently Active</span>
          </div>
        </div>

        <div className="addmanagement-stat-card">
          <div className="addmanagement-stat-icon icon-orange">
            <FiUsers />
          </div>
          <div className="addmanagement-stat-content">
            <span className="addmanagement-stat-label">Disabled Add's</span>
            <span className="addmanagement-stat-value">{disabledCount}</span>
            <span className="addmanagement-stat-sub">Currently Disabled</span>
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

            <div className="addmanagement-filter-wrap">
              <button
                className="addmanagement-filter-btn"
                onClick={() => setIsFilterOpen((v) => !v)}
              >
                <FiFilter /> Filter
              </button>

              {isFilterOpen && (
                <div className="addmanagement-filter-dropdown">
                  {['All', 'Active', 'Disabled'].map((opt) => (
                    <button
                      key={opt}
                      className={`addmanagement-filter-option ${statusFilter === opt ? 'active' : ''}`}
                      onClick={() => applyStatusFilter(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
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
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAdmins.map((admin, idx) => (
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
                  <td data-label="Status">
                    <span className={`addmanagement-status-badge ${admin.status === 'Active' ? 'status-active' : 'status-disabled'}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td data-label="Actions" className="cell-actions">
                    <div className="addmanagement-actions-cell">
                      <button
                        className={`addmanagement-toggle ${admin.status === 'Active' ? 'active' : ''}`}
                        onClick={() => toggleStatus(admin.id)}
                        aria-label="Toggle status"
                      >
                        <span className="addmanagement-toggle-knob" />
                      </button>
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
              ))}

              {currentAdmins.length === 0 && (
                <tr>
                  <td colSpan={9} className="addmanagement-empty-row">
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
                  <span className={`addmanagement-status-badge ${viewAdmin.status === 'Active' ? 'status-active' : 'status-disabled'}`}>
                    {viewAdmin.status}
                  </span>
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
                  className={`addmanagement-view-toggle-btn ${viewAdmin.status === 'Active' ? 'is-active' : ''}`}
                  onClick={() => toggleStatus(viewAdmin.id)}
                >
                  {viewAdmin.status === 'Active' ? 'Disable Account' : 'Activate Account'}
                </button>
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