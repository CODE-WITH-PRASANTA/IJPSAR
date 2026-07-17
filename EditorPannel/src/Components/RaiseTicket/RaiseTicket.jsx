import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTicketAlt,
  FaPaperPlane,
  FaUndo,
} from "react-icons/fa";
import "./RaiseTicket.css";

const RaiseTicket = () => {

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    department: "",
    assignedTo: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
    attachment: "",
    status: "Open",
  });

  const [tickets, setTickets] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const resetForm = () => {

    setFormData({
      title: "",
      category: "",
      priority: "",
      department: "",
      assignedTo: "",
      email: "",
      phone: "",
      subject: "",
      description: "",
      attachment: "",
      status: "Open",
    });

    setEditIndex(null);

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const ticket = {

      ...formData,

      ticketId:
        editIndex !== null
          ? tickets[editIndex].ticketId
          : `TKT-${1001 + tickets.length}`,

      createdDate:
        editIndex !== null
          ? tickets[editIndex].createdDate
          : new Date().toLocaleDateString(),

    };

    if (editIndex !== null) {

      const updated = [...tickets];

      updated[editIndex] = ticket;

      setTickets(updated);

    } else {

      setTickets([...tickets, ticket]);

    }

    resetForm();

  };

  const handleEdit = (index) => {

    setFormData(tickets[index]);

    setEditIndex(index);

  };

  const handleDelete = (index) => {

    if (window.confirm("Delete this ticket?")) {

      setTickets(tickets.filter((_, i) => i !== index));

    }

  };

  return (

    <div className="RaiseTicket">

      <div className="RaiseTicket-wrapper">

        {/* ============================
                LEFT SIDE FORM
        ============================ */}

        <div className="RaiseTicket-formCard">

          <div className="RaiseTicket-cardHeader">

            <FaTicketAlt />

            <h2>Raise Support Ticket</h2>

          </div>

          <form
            className="RaiseTicket-form"
            onSubmit={handleSubmit}
          >

            {/* Row 1 */}

            <div className="RaiseTicket-row">

              <div className="RaiseTicket-group">

                <label>Ticket Title</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter ticket title"
                  required
                />

              </div>

              <div className="RaiseTicket-group">

                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Category
                  </option>

                  <option>
                    Technical
                  </option>

                  <option>
                    Account
                  </option>

                  <option>
                    Payment
                  </option>

                  <option>
                    Other
                  </option>

                </select>

              </div>

            </div>

            {/* Row 2 */}

            <div className="RaiseTicket-row">

              <div className="RaiseTicket-group">

                <label>Priority</label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Priority
                  </option>

                  <option>Low</option>

                  <option>Medium</option>

                  <option>High</option>

                  <option>Critical</option>

                </select>

              </div>

              <div className="RaiseTicket-group">

                <label>Department</label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Department
                  </option>

                  <option>Editorial</option>

                  <option>Finance</option>

                  <option>Technical</option>

                  <option>Administration</option>

                </select>

              </div>

            </div>

            {/* Row 3 */}

            <div className="RaiseTicket-row">

              <div className="RaiseTicket-group">

                <label>Assigned To</label>

                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  placeholder="Support Team"
                />

              </div>

              <div className="RaiseTicket-group">

                <label>Status</label>

                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  readOnly
                />

              </div>

            </div>

            {/* Row 4 */}

            <div className="RaiseTicket-row">

              <div className="RaiseTicket-group">

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  required
                />

              </div>

              <div className="RaiseTicket-group">

                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />

              </div>

            </div>

            {/* Row 5 */}

            <div className="RaiseTicket-group">

              <label>Subject</label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />

            </div>
                        {/* Description */}

            <div className="RaiseTicket-group">

              <label>Description</label>

              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your issue in detail..."
                required
              />

            </div>

            {/* Attachment */}

            <div className="RaiseTicket-group">

              <label>Attachment</label>

              <input
                type="file"
                name="attachment"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    attachment:
                      e.target.files[0]?.name || "",
                  })
                }
              />

            </div>

            {/* Buttons */}

            <div className="RaiseTicket-buttonGroup">

              <button
                type="submit"
                className="RaiseTicket-submitBtn"
              >

                <FaPaperPlane />

                {editIndex !== null
                  ? "Update Ticket"
                  : "Raise Ticket"}

              </button>

              <button
                type="button"
                className="RaiseTicket-resetBtn"
                onClick={resetForm}
              >

                <FaUndo />

                Reset

              </button>

            </div>

          </form>

        </div>

        {/*====================================
                RIGHT SIDE TABLE
        ====================================*/}

        <div className="RaiseTicket-tableCard">

          <div className="RaiseTicket-cardHeader">

            <FaTicketAlt />

            <h2>Raised Tickets</h2>

          </div>

          <div className="RaiseTicket-tableWrapper">

            <table className="RaiseTicket-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Title</th>

                  <th>Category</th>

                  <th>Priority</th>

                  <th>Status</th>

                  <th>Date</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {tickets.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="RaiseTicket-empty"
                    >
                      No Tickets Found
                    </td>

                  </tr>

                ) : (

                  tickets.map((ticket, index) => (

                    <tr key={ticket.ticketId}>

                      <td>{ticket.ticketId}</td>

                      <td>{ticket.title}</td>

                      <td>{ticket.category}</td>

                      <td>{ticket.priority}</td>

                      <td>

                        <span
                          className={`RaiseTicket-status RaiseTicket-${ticket.status.toLowerCase()}`}
                        >
                          {ticket.status}
                        </span>

                      </td>

                      <td>{ticket.createdDate}</td>

                      <td>

                        <div className="RaiseTicket-actionButtons">

                          <button
                            className="RaiseTicket-editBtn"
                            onClick={() =>
                              handleEdit(index)
                            }
                          >

                            <FaEdit />

                          </button>

                          <button
                            className="RaiseTicket-deleteBtn"
                            onClick={() =>
                              handleDelete(index)
                            }
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

};

export default RaiseTicket;