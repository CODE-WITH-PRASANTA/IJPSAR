import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./Transaction.css";

const Transaction = () => {
  const [currentPage] = useState(1);

  const transactions = [
    {
      sr: 1,
      ref: 211,
      requestDate: "2022-04-05",
      amountRequested: 1500,
      amountReceivedDate: "NA",
      paymentMode: "244537",
      transactionId: "244537",
      comment: "244537",
    },
    {
      sr: 2,
      ref: 222,
      requestDate: "2022-08-11",
      amountRequested: 1500,
      amountReceivedDate: "NA",
      paymentMode: "252123",
      transactionId: "252123",
      comment: "252123",
    },
    {
      sr: 3,
      ref: 343,
      requestDate: "2025-12-30",
      amountRequested: 1500,
      amountReceivedDate: "NA",
      paymentMode: "325536",
      transactionId: "325536",
      comment: "325536",
    },
  ];

  return (
    <div className="Transaction">
      {/* Header */}
      <div className="TransactionHeader">
        <h1>Transaction History</h1>

        <div className="TransactionBreadcrumb">
          <FaTachometerAlt />
          <span>Home</span>
          <span>&gt;</span>
          <span>Transaction History</span>
        </div>
      </div>

      {/* Card */}
      <div className="TransactionCard">

        {/* Top Controls */}
        <div className="TransactionControls">
          <div className="TransactionRecords">
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>records per page</span>
          </div>

          <div className="TransactionSearch">
            <label>Search:</label>
            <input type="text" />
          </div>
        </div>

        {/* Table */}
        <div className="TransactionTableWrapper">
          <table className="TransactionTable">
            <thead>
              <tr>
                <th>SR#</th>
                <th>Ref#</th>
                <th>Request Date</th>
                <th>Amount Requested</th>
                <th>Amount Received Date</th>
                <th>Mode of Payment</th>
                <th>Transaction ID</th>
                <th>Comment</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr key={item.sr}>
                  <td>{item.sr}</td>
                  <td>{item.ref}</td>
                  <td>{item.requestDate}</td>
                  <td>{item.amountRequested}</td>
                  <td>{item.amountReceivedDate}</td>
                  <td>{item.paymentMode}</td>
                  <td>{item.transactionId}</td>
                  <td>{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="TransactionFooter">
          <p>Showing 1 to 3 of 3 entries</p>

          <div className="TransactionPagination">
            <button>
              <FaChevronLeft />
              Previous
            </button>

            <button className="TransactionActivePage">
              {currentPage}
            </button>

            <button>
              Next
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Floating Setting */}
        

      </div>
    </div>
  );
};

export default Transaction;