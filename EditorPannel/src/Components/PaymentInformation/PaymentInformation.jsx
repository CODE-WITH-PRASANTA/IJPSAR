import React, { useState } from 'react';
import { 
  FaPlus, 
  FaReceipt, 
  FaChevronLeft, 
  FaChevronRight, 
  FaTimes, 
  FaDollarSign, 
  FaCalendarAlt, 
  FaUser, 
  FaCreditCard 
} from 'react-icons/fa';
import './PaymentInformation.css';

const PaymentInformation = () => {
  const [transactions, setTransactions] = useState([
    { id: 'TXN-1001', client: 'Alice Johnson', date: '2026-06-28', amount: 450.00, method: 'Credit Card', status: 'Completed' },
    { id: 'TXN-1002', client: 'Bob Smith', date: '2026-06-28', amount: 1200.50, method: 'Bank Transfer', status: 'Completed' },
    { id: 'TXN-1003', client: 'Charlie Brown', date: '2026-06-27', amount: 75.25, method: 'PayPal', status: 'Pending' },
    { id: 'TXN-1004', client: 'Diana Prince', date: '2026-06-26', amount: 310.00, method: 'Credit Card', status: 'Completed' },
    { id: 'TXN-1005', client: 'Evan Wright', date: '2026-06-25', amount: 89.99, method: 'Debit Card', status: 'Failed' },
    { id: 'TXN-1006', client: 'Fiona Gallagher', date: '2026-06-25', amount: 600.00, method: 'Bank Transfer', status: 'Completed' },
    { id: 'TXN-1007', client: 'George Clark', date: '2026-06-24', amount: 150.00, method: 'PayPal', status: 'Completed' },
    { id: 'TXN-1008', client: 'Hannah Abbott', date: '2026-06-23', amount: 45.00, method: 'Credit Card', status: 'Pending' },
    { id: 'TXN-1009', client: 'Ian Malcolm', date: '2026-06-22', amount: 2200.00, method: 'Bank Transfer', status: 'Completed' },
    { id: 'TXN-1010', client: 'Julia Roberts', date: '2026-06-21', amount: 135.50, method: 'Debit Card', status: 'Completed' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ client: '', date: '', amount: '', method: 'Credit Card', status: 'Completed' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: `TXN-${1001 + transactions.length}`,
      client: formData.client,
      date: formData.date,
      amount: parseFloat(formData.amount) || 0,
      method: formData.method,
      status: formData.status,
    };
    setTransactions([newTransaction, ...transactions]);
    setIsModalOpen(false);
    setFormData({ client: '', date: '', amount: '', method: 'Credit Card', status: 'Completed' });
    setCurrentPage(1);
  };

  return (
    <div className="PaymentInformation">
      <div className="PaymentInformation-container">
        
        <div className="PaymentInformation-header">
          <button className="PaymentInformation-addBtn" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Add Payment Receipt
          </button>
          <h2 className="PaymentInformation-title">Payment History Panel</h2>
        </div>

        <div className="PaymentInformation-tableCard">
          <div className="PaymentInformation-tableWrapper">
            <table className="PaymentInformation-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Client Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="PaymentInformation-idCell">{item.id}</td>
                    <td>{item.client}</td>
                    <td>{item.date}</td>
                    <td className="PaymentInformation-amountCell">${item.amount.toFixed(2)}</td>
                    <td>{item.method}</td>
                    <td>
                      <span className={`PaymentInformation-badge PaymentInformation-badge--${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="PaymentInformation-pagination">
              <span className="PaymentInformation-paginationInfo">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, transactions.length)} of {transactions.length} entries
              </span>
              <div className="PaymentInformation-paginationControls">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="PaymentInformation-pageBtn"
                >
                  <FaChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`PaymentInformation-pageBtn ${currentPage === index + 1 ? 'PaymentInformation-pageBtn--active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="PaymentInformation-pageBtn"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      <div className={`PaymentInformation-overlay ${isModalOpen ? 'PaymentInformation-overlay--open' : ''}`}>
        <div className={`PaymentInformation-modal ${isModalOpen ? 'PaymentInformation-modal--open' : ''}`}>
          <div className="PaymentInformation-modalHeader">
            <h3><FaReceipt /> Generate New Receipt</h3>
            <button className="PaymentInformation-closeBtn" onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <form className="PaymentInformation-form" onSubmit={handleFormSubmit}>
            <div className="PaymentInformation-formGroup">
              <label><FaUser /> Client Full Name</label>
              <input type="text" name="client" value={formData.client} onChange={handleInputChange} placeholder="e.g., Jane Doe" required />
            </div>
            <div className="PaymentInformation-formRow">
              <div className="PaymentInformation-formGroup">
                <label><FaCalendarAlt /> Payment Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="PaymentInformation-formGroup">
                <label><FaDollarSign /> Total Amount</label>
                <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleInputChange} placeholder="0.00" required />
              </div>
            </div>
            <div className="PaymentInformation-formRow">
              <div className="PaymentInformation-formGroup">
                <label><FaCreditCard /> Payment Method</label>
                <select name="method" value={formData.method} onChange={handleInputChange}>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>
              <div className="PaymentInformation-formGroup">
                <label>Payment Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
            <div className="PaymentInformation-modalActions">
              <button type="button" className="PaymentInformation-cancelBtn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="PaymentInformation-submitBtn">Submit Record</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;