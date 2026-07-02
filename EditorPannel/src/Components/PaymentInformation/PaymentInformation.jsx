import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaReceipt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaDollarSign,
  FaCalendarAlt,
  FaUser,
  FaCreditCard,
} from "react-icons/fa";

import API from "../../API/axios";
import "./PaymentInformation.css";

const PaymentInformation = () => {
 const [transactions, setTransactions] = useState([]);

 const [saving, setSaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ client: '', date: '', amount: '', method: 'Credit Card', status: 'Completed' });
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

 const totalPages = Math.max(
    1,
    Math.ceil(transactions.length / itemsPerPage)
);

const indexOfLastItem = currentPage * itemsPerPage;

const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentItems = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
);

useEffect(() => {

    if (
        currentPage > totalPages &&
        totalPages > 0
    ) {

        setCurrentPage(totalPages);

    }

}, [transactions, totalPages]);

   useEffect(() => {
    getPayments();
}, []);



  const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// ==============================
// GET ALL PAYMENTS
// ==============================

const getPayments = async () => {
  try {
    setLoading(true);

    const { data } = await API.get("/payment");

    setTransactions(data.payments);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
 

  const handleEdit = (item) => {

    setEditId(item._id);

    setFormData({

        client:item.client,

      date: item.date ? item.date.substring(0, 10) : "",

        amount:item.amount,

        method:item.method,

        status:item.status,

    });

    setIsModalOpen(true);

};

 

const handleDelete = async(id)=>{

    if(!window.confirm("Delete this payment?")) return;

    try{

        await API.delete(`/payment/${id}`);

       await getPayments();

    }

    catch(error){

        console.log(error);

    }

};

const handleComplete = async(id)=>{

    try {

    setSaving(true);

    if (editId) {

        await API.put(`/payment/${editId}`, formData);

    } else {

        await API.post("/payment", formData);

    }

    resetForm();

    setIsModalOpen(false);

    await getPayments();

    setCurrentPage(1);

} catch (error) {

    console.log(error);

} finally {

    setSaving(false);

}
};

const resetForm = () => {

    setFormData({

        client: "",

        date: "",

        amount: "",

        method: "Credit Card",

        status: "Completed",

    });

    setEditId(null);

};

 const handleFormSubmit = async(e)=>{

    e.preventDefault();

    try{

        if(editId){

            await API.put(`/payment/${editId}`,formData);

        }

        else{

            await API.post("/payment",formData);

        }

        resetForm();

setIsModalOpen(false);

await getPayments();

setCurrentPage(1);

    }

    catch(error){

        console.log(error);

    }

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
    <th>Action</th>
  </tr>
</thead>
  <tbody>

{loading ? (

<tr>

<td colSpan="7" className="PaymentInformation-loading">

Loading...

</td>

</tr>

) : currentItems.length === 0 ? (

<tr>

<td colSpan="7" className="PaymentInformation-loading">

No Payment Found

</td>

</tr>

) : (

currentItems.map((item) => (

<tr key={item._id}>

<td className="PaymentInformation-idCell">
{item.transactionId}
</td>

<td>
{item.client}
</td>

<td>
{new Date(item.date).toLocaleDateString()}
</td>

<td className="PaymentInformation-amountCell">

${Number(item.amount).toFixed(2)}

</td>

<td>
{item.method}
</td>

<td>

<span
className={`PaymentInformation-badge PaymentInformation-badge--${item.status.toLowerCase()}`}
>

{item.status}

</span>

</td>

<td>

<div className="PaymentInformation-actionButtons">

<button
className="PaymentInformation-editBtn"
onClick={() => handleEdit(item)}
>

Edit

</button>

<button
className="PaymentInformation-deleteBtn"
onClick={() => handleDelete(item._id)}
>

Delete

</button>

{item.status !== "Completed" && (

<button
className="PaymentInformation-completeBtn"
onClick={() => handleComplete(item._id)}
>

Complete

</button>

)}

</div>

</td>

</tr>

))

)}

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

    <h3>
        <FaReceipt />
        {editId ? "Update Payment" : "Generate New Receipt"}
    </h3>

    <button
        className="PaymentInformation-closeBtn"
        onClick={() => {

            resetForm();

            setIsModalOpen(false);

        }}
    >

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
                  <option value="Processing">Processing</option>
                </select>
              </div>
            </div>
            <div className="PaymentInformation-modalActions">
              <button type="button" className="PaymentInformation-cancelBtn"onClick={() => {

    resetForm();

    setIsModalOpen(false);

}}>Cancel</button>
            <button
type="submit"
className="PaymentInformation-submitBtn"
disabled={saving}
>

{saving
? "Saving..."
: editId
? "Update Payment"
: "Submit Record"}

</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;