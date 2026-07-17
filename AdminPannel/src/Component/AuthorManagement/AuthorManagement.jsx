import React, { useState, useEffect } from 'react';
import './AuthorManagement.css';

const AuthorManagement = () => {
  // Pre-populated mock data (10 items) to demonstrate the 8-item pagination immediately
  const [authors, setAuthors] = useState([
    { id: 1, name: "Dr. Aradhana Mohanty", organization: "IIT Bhubaneswar", designation: "Professor", email: "aradhana@iitbbs.ac.in", mobile: "9876543210", status: "Accepted" },
    { id: 2, name: "Dr. Manoj Kumar", organization: "NIT Rourkela", designation: "Asst. Professor", email: "manoj@nitrkl.ac.in", mobile: "8765432109", status: "Pending" },
    { id: 3, name: "Prof. Swapna Sarangi", organization: "Utkal University", designation: "Dean", email: "swapna@utkal.edu", mobile: "7654321098", status: "Accepted" },
    { id: 4, name: "Dr. Rajesh Pattnaik", organization: "SOA University", designation: "Researcher", email: "rajesh@soa.ac.in", mobile: "6543210987", status: "Pending" },
    { id: 5, name: "Anjali Mishra", organization: "KIIT University", designation: "Lecturer", email: "anjali@kiit.ac.in", mobile: "9988776655", status: "Pending" },
    { id: 6, name: "Dr. Debasis Nayak", organization: "VSSUT Burla", designation: "HOD", email: "debasis@vssut.ac.in", mobile: "8877665544", status: "Accepted" },
    { id: 7, name: "Pooja Priyadarshini", organization: "BPUT Rourkela", designation: "Asst. Professor", email: "pooja@bput.ac.in", mobile: "7766554433", status: "Pending" },
    { id: 8, name: "Prof. Soumya Ranjan", organization: "Silicon Institute", designation: "Professor", email: "soumya@silicon.ac.in", mobile: "6655443322", status: "Accepted" },
    { id: 9, name: "Dr. Subhashree Dash", organization: "Rama Devi University", designation: "Reader", email: "subhashree@rdwu.ac.in", mobile: "5544332211", status: "Pending" },
    { id: 10, name: "Rakesh Mohapatra", organization: "OUTR Bhubaneswar", designation: "Asst. Professor", email: "rakesh@outr.ac.in", mobile: "4433221100", status: "Pending" }
  ]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // PAGINATION STATES (Set to 8 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Actions: Accept
  const handleAccept = (id) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === id ? { ...author, status: 'Accepted' } : author
      )
    );
  };

  // Actions: Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      const updatedAuthors = authors.filter((author) => author.id !== id);
      setAuthors(updatedAuthors);
      
      // Adjust current page if deleting the last item on the current page
      const totalPagesAfterDelete = Math.ceil(updatedAuthors.length / itemsPerPage);
      if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
        setCurrentPage(totalPagesAfterDelete);
      }
    }
  };

  // Filtered Authors based on search query
  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // PAGINATION CALCULATIONS
  const totalPages = Math.ceil(filteredAuthors.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAuthors.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="portal-container">
      
      {/* DARK DASHBOARD TABLE */}
      <div className="table-dashboard-card">
        <div className="table-header-row">
          <h2 className="table-dashboard-title">Author Management</h2>
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="table-search"
            />
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>SL NO</th>
                <th>NAME</th>
                <th>ORGANIZATION</th>
                <th>DESIGNATION</th>
                <th>EMAIL</th>
                <th>MOBILE NO</th>
                <th>PASSWORD</th>
                <th>STATUS</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((author, index) => {
                  const isAccepted = author.status === 'Accepted';
                  return (
                    <tr key={author.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td className="text-bold">{author.name}</td>
                      <td>{author.organization}</td>
                      <td>{author.designation}</td>
                      <td>{author.email}</td>
                      <td>{author.mobile}</td>
                      <td className="text-muted font-mono">• • • • • •</td>
                      <td>
                        <span className={`status-badge ${author.status.toLowerCase()}`}>
                          {author.status}
                        </span>
                      </td>
                      <td className="action-buttons-cell">
                        <button 
                          onClick={() => !isAccepted && handleAccept(author.id)} 
                          className={`btn-action btn-accept ${isAccepted ? 'accepted-state' : ''}`}
                          disabled={isAccepted}
                          title={isAccepted ? "Already Accepted" : "Accept Application"}
                        >
                          {isAccepted ? (
                            <>
                              <span className="btn-icon">✓</span> Accepted
                            </>
                          ) : (
                            "Accept"
                          )}
                        </button>
                        <button 
                          onClick={() => handleDelete(author.id)} 
                          className="btn-action btn-delete"
                          title="Delete Entry"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="no-data-cell">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL */}
        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <span className="pagination-info">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAuthors.length)} of {filteredAuthors.length} entries
            </span>
            <div className="pagination-controls">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn arrow-btn"
              >
                &laquo; Prev
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`pagination-btn num-btn ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn arrow-btn"
              >
                Next &raquo;
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default AuthorManagement;