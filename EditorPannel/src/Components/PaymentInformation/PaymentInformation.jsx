import React, { useEffect, useMemo, useState } from "react";

import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaMoneyBillWave,
  FaReceipt,
  FaSearch,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import API, { IMG_URL } from "../../API/axios";

import "./PaymentInformation.css";

const PaymentInformation = () => {
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [screenshot, setScreenshot] = useState("");

  const [rejectTransaction, setRejectTransaction] = useState(null);

  const [rejectionReason, setRejectionReason] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  /* ================= FETCH TRANSACTIONS ================= */

  const getTransactions = async () => {
    try {
      setLoading(true);

      const response = await API.get("/transactions/all");

      console.log("EDITOR TRANSACTIONS:", response.data);

      setTransactions(response.data.data || []);
    } catch (error) {
      console.log("TRANSACTION ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  /* ================= FILTER ================= */

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const searchText = search.toLowerCase().trim();

      const paperId = item.paperId?.paperId?.toLowerCase() || "";

      const paperTitle = item.paperId?.paperTitle?.toLowerCase() || "";

      const authorName =
        item.authorId?.fullName?.toLowerCase() ||
        item.authorId?.name?.toLowerCase() ||
        "";

      const transactionId = item.transactionId?.toLowerCase() || "";

      const matchesSearch =
        !searchText ||
        paperId.includes(searchText) ||
        paperTitle.includes(searchText) ||
        authorName.includes(searchText) ||
        transactionId.includes(searchText);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, search, statusFilter]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / itemsPerPage),
  );

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* ================= RECEIVE ================= */

  const handleReceive = async (id) => {
    const confirmReceive = window.confirm("Confirm this payment as received?");

    if (!confirmReceive) return;

    try {
      setActionLoading(id);

      const response = await API.put(`/transactions/receive/${id}`);

      console.log("RECEIVE RESPONSE:", response.data);

      await getTransactions();

      setSelectedTransaction(null);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to receive payment");
    } finally {
      setActionLoading("");
    }
  };

  /* ================= OPEN REJECT ================= */

  const openRejectModal = (transaction) => {
    setRejectTransaction(transaction);
    setRejectionReason("");
  };

  /* ================= REJECT ================= */

  const handleReject = async (e) => {
    e.preventDefault();

    if (!rejectionReason.trim()) {
      alert("Please enter rejection reason");
      return;
    }

    try {
      setActionLoading(rejectTransaction._id);

      const response = await API.put(
        `/transactions/reject/${rejectTransaction._id}`,
        {
          rejectionReason: rejectionReason.trim(),
        },
      );

      console.log("REJECT RESPONSE:", response.data);

      setRejectTransaction(null);
      setRejectionReason("");
      setSelectedTransaction(null);

      await getTransactions();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to reject payment");
    } finally {
      setActionLoading("");
    }
  };

  /* ================= SCREENSHOT URL ================= */

  const getScreenshotUrl = (filePath) => {
    if (!filePath) return "";

    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }

    let cleanPath = filePath.replace(/\\/g, "/");

    // Handle absolute backend Windows/Linux paths
    if (cleanPath.includes("/uploads/")) {
      cleanPath = cleanPath.substring(cleanPath.indexOf("/uploads/"));
    }

    if (!cleanPath.startsWith("/")) {
      cleanPath = `/${cleanPath}`;
    }

    return `${IMG_URL}${cleanPath}`;
  };

  /* ================= DASHBOARD DATA ================= */

  const pendingCount = transactions.filter(
    (item) => item.status === "Pending Verification",
  ).length;

  const receivedCount = transactions.filter(
    (item) => item.status === "Received",
  ).length;

  const rejectedCount = transactions.filter(
    (item) => item.status === "Rejected",
  ).length;

  const totalReceivedAmount = transactions
    .filter((item) => item.status === "Received")
    .reduce((total, item) => total + Number(item.amount || 0), 0);

  /* ================= STATUS CLASS ================= */

  const getStatusClass = (status = "") => {
    return status.toLowerCase().replaceAll(" ", "-");
  };

  return (
    <div className="PaymentInformation">
      <div className="PaymentInformation-container">
        {/* ================= HEADER ================= */}

        <div className="PaymentInformation-header">
          <div>
            <span className="PaymentInformation-label">EDITOR PANEL</span>

            <h2 className="PaymentInformation-title">Payment Verification</h2>

            <p>Review and verify author payment transactions.</p>
          </div>

          <FaReceipt className="PaymentInformation-headerIcon" />
        </div>

        {/* ================= SUMMARY ================= */}

        <div className="PaymentInformation-summary">
          <div className="PaymentInformation-summaryCard">
            <span>Pending Verification</span>
            <strong>{pendingCount}</strong>
          </div>

          <div className="PaymentInformation-summaryCard">
            <span>Received</span>
            <strong>{receivedCount}</strong>
          </div>

          <div className="PaymentInformation-summaryCard">
            <span>Rejected</span>
            <strong>{rejectedCount}</strong>
          </div>

          <div className="PaymentInformation-summaryCard">
            <span>Total Received</span>

            <strong>₹{totalReceivedAmount.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {/* ================= FILTER ================= */}

        <div className="PaymentInformation-filterBar">
          <div className="PaymentInformation-search">
            <FaSearch />

            <input
              type="text"
              placeholder="Search paper, author or transaction ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>

            <option value="Pending Verification">Pending Verification</option>

            <option value="Received">Received</option>

            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* ================= TABLE ================= */}

        <div className="PaymentInformation-tableCard">
          <div className="PaymentInformation-tableWrapper">
            <table className="PaymentInformation-table">
              <thead>
                <tr>
                  <th>Paper</th>
                  <th>Author</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Transaction ID / UTR</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="PaymentInformation-loading">
                      Loading transactions...
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="PaymentInformation-loading">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <strong>{item.paperId?.paperId || "N/A"}</strong>

                        <small>{item.paperId?.paperTitle || "Paper"}</small>
                      </td>

                      <td>
                        <div className="PaymentInformation-author">
                          <div>
                            <FaUser />
                          </div>

                          <span>
                            <strong>
                              {item.authorId?.fullName ||
                                item.authorId?.name ||
                                "Author"}
                            </strong>

                            <small>{item.authorId?.email || "N/A"}</small>
                          </span>
                        </div>
                      </td>

                      <td className="PaymentInformation-amountCell">
                        ₹{Number(item.amount || 0).toLocaleString("en-IN")}
                      </td>

                      <td>
                        <strong>{item.paymentMethod}</strong>

                        <small>{item.paymentMode}</small>
                      </td>

                      <td className="PaymentInformation-idCell">
                        {item.transactionId}
                      </td>

                      <td>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("en-IN")
                          : "N/A"}
                      </td>

                      <td>
                        <span
                          className={`PaymentInformation-badge PaymentInformation-badge--${getStatusClass(
                            item.status,
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <div className="PaymentInformation-actionButtons">
                          <button
                            className="PaymentInformation-viewBtn"
                            onClick={() => setSelectedTransaction(item)}
                          >
                            <FaEye />
                            View
                          </button>

                          {item.status === "Pending Verification" && (
                            <>
                              <button
                                className="PaymentInformation-completeBtn"
                                disabled={actionLoading === item._id}
                                onClick={() => handleReceive(item._id)}
                              >
                                <FaCheck />
                              </button>

                              <button
                                className="PaymentInformation-deleteBtn"
                                onClick={() => openRejectModal(item)}
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION ================= */}

          {filteredTransactions.length > 0 && (
            <div className="PaymentInformation-pagination">
              <span className="PaymentInformation-paginationInfo">
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredTransactions.length)} of{" "}
                {filteredTransactions.length} entries
              </span>

              <div className="PaymentInformation-paginationControls">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="PaymentInformation-pageBtn"
                >
                  <FaChevronLeft />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`PaymentInformation-pageBtn ${
                      currentPage === index + 1
                        ? "PaymentInformation-pageBtn--active"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
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

      {/* ================= DETAILS MODAL ================= */}

      {selectedTransaction && (
        <div className="PaymentInformation-overlay PaymentInformation-overlay--open">
          <div className="PaymentInformation-modal PaymentInformation-modal--open">
            <div className="PaymentInformation-modalHeader">
              <h3>
                <FaReceipt />
                Transaction Details
              </h3>

              <button
                className="PaymentInformation-closeBtn"
                onClick={() => setSelectedTransaction(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="PaymentInformation-details">
              <div>
                <span>Paper ID</span>

                <strong>{selectedTransaction.paperId?.paperId || "N/A"}</strong>
              </div>

              <div>
                <span>Paper Title</span>

                <strong>
                  {selectedTransaction.paperId?.paperTitle || "N/A"}
                </strong>
              </div>

              <div>
                <span>Author</span>

                <strong>
                  {selectedTransaction.authorId?.fullName ||
                    selectedTransaction.authorId?.name ||
                    "N/A"}
                </strong>
              </div>

              <div>
                <span>Author Email</span>

                <strong>{selectedTransaction.authorId?.email || "N/A"}</strong>
              </div>

              <div>
                <span>Amount</span>

                <strong>
                  ₹
                  {Number(selectedTransaction.amount || 0).toLocaleString(
                    "en-IN",
                  )}
                </strong>
              </div>

              <div>
                <span>Payment Mode</span>

                <strong>{selectedTransaction.paymentMode}</strong>
              </div>

              <div>
                <span>Payment Method</span>

                <strong>{selectedTransaction.paymentMethod}</strong>
              </div>

              <div>
                <span>Transaction ID / UTR</span>

                <strong>{selectedTransaction.transactionId}</strong>
              </div>
            </div>

            <button
              className="PaymentInformation-screenshotBtn"
              onClick={() =>
                setScreenshot(
                  getScreenshotUrl(selectedTransaction.paymentScreenshot),
                )
              }
            >
              <FaEye />
              View Payment Screenshot
            </button>

            {selectedTransaction.status === "Rejected" && (
              <div className="PaymentInformation-rejection">
                <strong>Rejection Reason</strong>

                <p>{selectedTransaction.rejectionReason}</p>
              </div>
            )}

            {selectedTransaction.status === "Pending Verification" && (
              <div className="PaymentInformation-modalActions">
                <button
                  className="PaymentInformation-cancelBtn"
                  onClick={() => openRejectModal(selectedTransaction)}
                >
                  Reject Payment
                </button>

                <button
                  className="PaymentInformation-submitBtn"
                  disabled={actionLoading === selectedTransaction._id}
                  onClick={() => handleReceive(selectedTransaction._id)}
                >
                  <FaCheck />

                  {actionLoading === selectedTransaction._id
                    ? "Processing..."
                    : "Receive Payment"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= REJECT MODAL ================= */}

      {rejectTransaction && (
        <div className="PaymentInformation-overlay PaymentInformation-overlay--open">
          <div className="PaymentInformation-rejectModal">
            <div className="PaymentInformation-modalHeader">
              <h3>Reject Transaction</h3>

              <button
                className="PaymentInformation-closeBtn"
                onClick={() => {
                  setRejectTransaction(null);
                  setRejectionReason("");
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleReject}>
              <div className="PaymentInformation-formGroup">
                <label>Rejection Reason</label>

                <textarea
                  rows="5"
                  placeholder="Explain why this payment was rejected..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>

              <div className="PaymentInformation-modalActions">
                <button
                  type="button"
                  className="PaymentInformation-cancelBtn"
                  onClick={() => {
                    setRejectTransaction(null);
                    setRejectionReason("");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="PaymentInformation-rejectBtn"
                  disabled={actionLoading === rejectTransaction._id}
                >
                  {actionLoading === rejectTransaction._id
                    ? "Rejecting..."
                    : "Reject Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= SCREENSHOT MODAL ================= */}

      {screenshot && (
        <div
          className="PaymentInformation-overlay PaymentInformation-overlay--open"
          onClick={() => setScreenshot("")}
        >
          <div
            className="PaymentInformation-imageModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="PaymentInformation-imageHeader">
              <div>
                <span>PAYMENT PROOF</span>
                <h3>Transaction Screenshot</h3>
              </div>

              <button type="button" onClick={() => setScreenshot("")}>
                <FaTimes />
              </button>
            </div>

            <div className="PaymentInformation-imageBody">
              <img
                src={screenshot}
                alt="Payment Screenshot"
                onLoad={() => console.log("IMAGE LOADED:", screenshot)}
                onError={(e) => {
                  console.log("IMAGE LOAD FAILED:", e.currentTarget.src);

                  e.currentTarget.style.display = "none";

                  e.currentTarget.nextElementSibling.style.display = "flex";
                }}
              />

              <div className="PaymentInformation-imageError">
                <FaReceipt />

                <strong>Screenshot unavailable</strong>

                <span>Payment proof could not be loaded.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInformation;
