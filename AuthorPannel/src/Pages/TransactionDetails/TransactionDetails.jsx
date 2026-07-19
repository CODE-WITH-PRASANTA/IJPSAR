import React, { useEffect, useState } from "react";
import {
  FaCloudUploadAlt,
  FaCreditCard,
  FaFileAlt,
  FaMoneyBillWave,
  FaReceipt,
  FaRedo,
} from "react-icons/fa";

import API from "../../API/axios";

import "./TransactionDetails.css";

const TransactionDetails = () => {
  const initialForm = {
    paperId: "",
    amount: "",
    paymentMode: "",
    paymentMethod: "",
    transactionId: "",
    screenshot: null,
  };

  const [formData, setFormData] = useState(initialForm);
  const [papers, setPapers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [resubmitId, setResubmitId] = useState(null);
  const [message, setMessage] = useState("");

  /* ================= FETCH PAPERS ================= */

  const fetchPapers = async () => {
    try {
      const response = await API.get("/submitform/my-papers");

      setPapers(response.data.data || []);
    } catch (error) {
      console.log("Paper Error:", error);
    }
  };

  /* ================= FETCH TRANSACTIONS ================= */

  const fetchTransactions = async () => {
    try {
      const response = await API.get("/transactions/my-transactions");

      console.log("TRANSACTIONS:", response.data);

      setTransactions(response.data.data || []);
    } catch (error) {
      console.log("Transaction Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPapers();
    fetchTransactions();
  }, []);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "paymentMode" ? { paymentMethod: "" } : {}),
    }));

    setMessage("");
  };

  /* ================= SCREENSHOT ================= */

  const handleScreenshot = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      screenshot: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (
      !formData.paperId ||
      !formData.amount ||
      !formData.paymentMode ||
      !formData.paymentMethod ||
      !formData.transactionId ||
      !formData.screenshot
    ) {
      setMessage("Please complete all fields");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("paperId", formData.paperId);
      data.append("amount", formData.amount);
      data.append("paymentMode", formData.paymentMode);
      data.append("paymentMethod", formData.paymentMethod);
      data.append("transactionId", formData.transactionId);
      data.append("screenshot", formData.screenshot);

      let response;

      if (resubmitId) {
        response = await API.put(`/transactions/resubmit/${resubmitId}`, data);
      } else {
        response = await API.post("/transactions/create", data);
      }

      console.log("TRANSACTION RESPONSE:", response.data);

      setMessage(response.data.message);

      setFormData({
        paperId: "",
        amount: "",
        paymentMode: "",
        paymentMethod: "",
        transactionId: "",
        screenshot: null,
      });

      setPreview("");
      setResubmitId(null);

      await fetchTransactions();
    } catch (error) {
      console.log("SUBMIT ERROR:", error.response?.data || error.message);

      setMessage(
        error.response?.data?.message || "Transaction submission failed",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESUBMIT ================= */

  const handleResubmit = (transaction) => {
    setResubmitId(transaction._id);

    setFormData({
      paperId: transaction.paperId?._id || transaction.paperId,
      amount: transaction.amount,
      paymentMode: transaction.paymentMode,
      paymentMethod: transaction.paymentMethod,
      transactionId: "",
      screenshot: null,
    });

    setPreview("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getMethods = () => {
    if (formData.paymentMode === "Online") {
      return ["GPay", "PhonePe", "Paytm"];
    }

    if (formData.paymentMode === "Bank Transfer") {
      return ["Bank"];
    }

    if (formData.paymentMode === "UPI") {
      return ["GPay", "PhonePe", "Paytm"];
    }

    return [];
  };

  return (
    <div className="transactionPage">
      <div className="transactionHeader">
        <span>AUTHOR PANEL</span>

        <h1>Transaction Details</h1>

        <p>Submit your publication payment details for editor verification.</p>
      </div>

      <div className="transactionLayout">
        {/* ================= FORM ================= */}

        <div className="transactionCard">
          <div className="transactionCardHeader">
            <div className="transactionIcon">
              <FaReceipt />
            </div>

            <div>
              <h2>
                {resubmitId ? "Resubmit Transaction" : "Submit Transaction"}
              </h2>

              <p>Enter your payment information</p>
            </div>
          </div>

          {message && <div className="transactionMessage">{message}</div>}

          <form className="transactionForm" onSubmit={handleSubmit}>
            <div className="transactionGroup">
              <label>Paper ID</label>

              <div className="transactionInput">
                <FaFileAlt />

                <select
                  name="paperId"
                  value={formData.paperId}
                  onChange={handleChange}
                >
                  <option value="">Choose Paper ID</option>

                  {papers.map((paper) => (
                    <option key={paper._id} value={paper._id}>
                      {paper.paperId} - {paper.paperTitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="transactionGroup">
              <label>Payment Amount</label>

              <div className="transactionInput">
                <FaMoneyBillWave />

                <input
                  type="number"
                  name="amount"
                  placeholder="Enter payment amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="transactionRow">
              <div className="transactionGroup">
                <label>Payment Mode</label>

                <div className="transactionInput">
                  <FaCreditCard />

                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                  >
                    <option value="">Select Mode</option>

                    <option value="Online">Online</option>

                    <option value="Bank Transfer">Bank Transfer</option>

                    <option value="UPI">UPI</option>
                  </select>
                </div>
              </div>

              <div className="transactionGroup">
                <label>Payment Method</label>

                <div className="transactionInput">
                  <FaCreditCard />

                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    disabled={!formData.paymentMode}
                  >
                    <option value="">Select Method</option>

                    {getMethods().map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="transactionGroup">
              <label>Transaction ID / UTR Number</label>

              <div className="transactionInput">
                <FaReceipt />

                <input
                  type="text"
                  name="transactionId"
                  placeholder="Enter transaction ID or UTR"
                  value={formData.transactionId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="transactionGroup">
              <label>Payment Screenshot</label>

              <label className="uploadPaymentBox">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshot}
                />

                {preview ? (
                  <img src={preview} alt="Payment Preview" />
                ) : (
                  <>
                    <FaCloudUploadAlt />

                    <h4>Upload Payment Screenshot</h4>

                    <p>PNG, JPG or WEBP</p>
                  </>
                )}
              </label>
            </div>

            <button className="submitTransactionBtn" disabled={loading}>
              {loading
                ? "Submitting..."
                : resubmitId
                  ? "Resubmit Transaction"
                  : "Submit Transaction"}
            </button>
          </form>
        </div>

        {/* ================= STATUS ================= */}

        <div className="transactionHistory">
          <div className="historyHeader">
            <h2>Payment History</h2>

            <p>Track your transaction verification</p>
          </div>

          {transactions.length === 0 ? (
            <div className="emptyTransaction">No transactions submitted.</div>
          ) : (
            transactions.map((transaction) => (
              <div className="transactionHistoryCard" key={transaction._id}>
                <div className="historyTop">
                  <div>
                    <span>Paper ID</span>

                    <h4>{transaction.paperId?.paperId || "N/A"}</h4>
                  </div>

                  <span
                    className={`transactionStatus ${transaction.status
                      ?.toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {transaction.status}
                  </span>
                </div>

                <div className="historyDetails">
                  <div>
                    <span>Amount</span>
                    <strong>₹{transaction.amount}</strong>
                  </div>

                  <div>
                    <span>Mode</span>
                    <strong>{transaction.paymentMode}</strong>
                  </div>

                  <div>
                    <span>Method</span>
                    <strong>{transaction.paymentMethod}</strong>
                  </div>

                  <div>
                    <span>Transaction ID</span>
                    <strong>{transaction.transactionId}</strong>
                  </div>
                </div>

                {transaction.status === "Rejected" && (
                  <div className="rejectionBox">
                    <strong>Rejection Reason</strong>

                    <p>{transaction.rejectionReason}</p>

                    <button onClick={() => handleResubmit(transaction)}>
                      <FaRedo />
                      Resubmit Transaction
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
