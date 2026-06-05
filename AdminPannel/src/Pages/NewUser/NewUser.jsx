import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewUser.css";
import { FaPlus } from "react-icons/fa";

const initialUsers = [
  { id: 1, name: "ggf", email: "ggf@dd.com", role: "Editor", status: "Active" },
  { id: 2, name: "PP", email: "okok@koko.kok", role: "Author", status: "Active" },
  { id: 3, name: "asdasd", email: "asdasdad@gmail.com", role: "Author", status: "Active" },
  { id: 4, name: "adil", email: "adil@gmail.com", role: "Editor", status: "Active" },
  { id: 5, name: "sdfsd", email: "test@gmail.com", role: "Author", status: "Block" },
];

const NewUser = () => {
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // FILTER LOGIC
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  const handleAddUser = () => {
    if (
      !form.name ||
      !form.email ||
      !form.role ||
      form.role === "" ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: form.name,
      email: form.email,
      role: form.role,
      status: "Active",
    };

    setUsers([...users, newUser]);

    // Reset Form
    setForm({
      name: "",
      email: "",
      role: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    setOpen(false);
  };

  return (
    <div className="nu_container">
      {/* HEADER */}
      <div className="nu_header">
        <h2>Users</h2>
        <button className="nu_addBtn" onClick={() => setOpen(true)}>
          <FaPlus /> Add User
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="nu_filterBar">
        <input
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ROLE FILTER */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All">All roles</option>
          <option value="Author">Author</option>
          <option value="Editor">Editor</option>
        </select>

        {/* STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Block">Block</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="nu_tableCard">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Last Sign In</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="nu_user">
                    <div className="nu_avatar">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="nu_name">{u.name}</p>
                      <span className="nu_email">{u.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="nu_badge">{u.role}</span>
                </td>
                <td>
                  <span className={`nu_status ${u.status.toLowerCase()}`}>
                    {u.status}
                  </span>
                </td>
                <td>June 4, 2026</td>
              <td>
  <button
    className="nu_signBtn"
    onClick={() =>
      navigate("/newsprofile", {
        state: {
          user: u,
        },
      })
    }
  >
    View Activity
  </button>
</td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#9aa4b2" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PREMIUM MODAL */}
      {open && (
        <div className="nu_modalOverlay">
          <div className="nu_modal">
            <div className="nu_modalHeader">
              <h3>Add User</h3>
              <button className="nu_closeBtn" onClick={() => setOpen(false)}>
                ✖
              </button>
            </div>

            <div className="nu_form">
              <div className="nu_inputGroup">
                <label>Name</label>
                <input
                  name="name"
                  value={form.name}
                  placeholder="Enter name"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="nu_inputGroup">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Enter email"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="nu_inputGroup">
                <label>Role</label>
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option value="Author">Author</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>

              <div className="nu_inputGroup">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  placeholder="Phone No"
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              <div className="nu_inputGroup">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  placeholder="Create Password"
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              <div className="nu_inputGroup">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              <div className="nu_modalActions">
                <button
                  type="button"
                  className="nu_cancelBtn"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="nu_saveBtn"
                  onClick={handleAddUser}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUser;