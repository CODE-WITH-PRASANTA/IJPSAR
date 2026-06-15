import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewUser.css";
import { FaPlus } from "react-icons/fa";
import API from "../../api/axios";
import { useEffect } from "react";

const NewUser = () => {
  const [users, setUsers] = useState([]);
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

  const fetchUsers = async () => {
    try {
      const res = await API.get("/editor/all");

      setUsers(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // FILTER LOGIC
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  const handleAddUser = async () => {
    try {
      if (
        !form.name ||
        !form.email ||
        !form.role ||
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

      const res = await API.post("/editor/create", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      });

      if (res.data.success) {
        alert("User Created Successfully");

        fetchUsers();

        setForm({
          name: "",
          email: "",
          role: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        setOpen(false);
      }
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Failed to create user");
    }
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
              <th>User ID</th>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id}>
                {/* User ID */}
                <td>
                  <span className="nu_userId">{u.userId}</span>
                </td>

                {/* User */}
                <td>
                  <div className="nu_user">
                    <div className="nu_avatar">
                      {u.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="nu_name">{u.name}</p>

                      <span className="nu_email">{u.email}</span>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td>
                  <span className={`nu_badge ${u.role?.toLowerCase()}`}>
                    {u.role}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`nu_status ${u.status
                      ?.toLowerCase()
                      .replace(" ", "")}`}
                  >
                    {u.status}
                  </span>
                </td>

                {/* Created Date */}
                <td>
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                {/* Profile */}
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
                    View Profile
                  </button>
                </td>

                {/* Block / Activate */}
                <td>
                  {u.status === "Active" ? (
                    <button
                      className="nu_blockBtn"
                      onClick={async () => {
                        try {
                          await API.put(`/editor/block/${u._id}`);

                          fetchUsers();
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="nu_activeBtn"
                      onClick={async () => {
                        try {
                          await API.put(`/editor/activate/${u._id}`);

                          fetchUsers();
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    color: "#9aa4b2",
                  }}
                >
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
