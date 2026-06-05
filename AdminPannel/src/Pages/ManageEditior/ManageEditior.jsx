import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaThLarge,
  FaList,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaEye,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

import "./ManageEditior.css";

const ManageEditior = () => {
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  // Sample static data array
  const [editors, setEditors] = useState([
    {
      id: 1,
      name: "ggf",
      role: "Editor",
      email: "ggf@dd.com",
      phone: "+91 9668563648",
      status: "Active",
      joined: "June 4, 2026",
      image: "https://i.pravatar.cc/300?img=12",
    },
    {
      id: 2,
      name: "PP",
      role: "Author",
      email: "okok@koko.kok",
      phone: "+91 9876543210",
      status: "Active",
      joined: "June 4, 2026",
      image: "https://i.pravatar.cc/300?img=32",
    },
    {
      id: 3,
      name: "asdasd",
      role: "Author",
      email: "asdasdad@gmail.com",
      phone: "+91 9123456789",
      status: "Active",
      joined: "June 4, 2026",
      image: "https://i.pravatar.cc/300?img=53",
    },
    {
      id: 4,
      name: "adil",
      role: "Editor",
      email: "adil@gmail.com",
      phone: "+91 9988776655",
      status: "Active",
      joined: "June 4, 2026",
      image: "https://i.pravatar.cc/300?img=18",
    },
    {
      id: 5,
      name: "sdfsd",
      role: "Author",
      email: "test@gmail.com",
      phone: "+91 9090909090",
      status: "Block",
      joined: "June 4, 2026",
      image: "https://i.pravatar.cc/300?img=60",
    },
  ]);

  // Close dropdown menu when clicking completely outside cards area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter functionality
  const filteredEditors = editors.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase())
  );

  // Action Menu Handlers
  const handleView = (editor, e) => {
    e.stopPropagation(); // Stops event bubbling issues
    alert(`Viewing Details for: ${editor.name}`);
    setActiveMenu(null);
  };

  const handleEdit = (editor, e) => {
    e.stopPropagation();
    alert(`Opening Edit Panel for: ${editor.name}`);
    setActiveMenu(null);
  };

  const handleDelete = (id, name, e) => {
    e.stopPropagation();
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmed) {
      setEditors(editors.filter((editor) => editor.id !== id));
    }
    setActiveMenu(null);
  };

  return (
    <div className="manageEditor">
      <div className="manageEditorHeader">
        <div>
          <h2>Manage Editors</h2>
          <p>Dashboard / Administration / Editors</p>
        </div>
      </div>

      <div className="manageEditorContainer">
        <div className="manageEditorToolbar">
          <div className="manageEditorViewBtns">
            <button
              className={view === "card" ? "active" : ""}
              onClick={() => setView("card")}
            >
              <FaThLarge />
            </button>
            <button
              className={view === "table" ? "active" : ""}
              onClick={() => setView("table")}
            >
              <FaList />
            </button>
          </div>

          <div className="manageEditorSearch">
            <FaSearch />
            <input
              type="text"
              placeholder="Search Editor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {view === "card" ? (
          <div className="manageEditorCards" ref={menuRef}>
            {filteredEditors.map((editor) => (
              <div className="manageEditorCard" key={editor.id}>
                <div className="manageEditorTop">
                  <span className={`statusBadge ${editor.status.toLowerCase()}`}>
                    {editor.status}
                  </span>

                  <div className="menuWrapper">
                    <button
                      className="menuBtn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(activeMenu === editor.id ? null : editor.id);
                      }}
                    >
                      <FaEllipsisV />
                    </button>

                    {activeMenu === editor.id && (
                      <div className="actionMenu">
                        <button onClick={(e) => handleView(editor, e)}>
                          <FaEye /> View
                        </button>
                        <button onClick={(e) => handleEdit(editor, e)}>
                          <FaEdit /> Edit
                        </button>
                        <button 
                          className="deleteAction" 
                          onClick={(e) => handleDelete(editor.id, editor.name, e)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <img src={editor.image} alt={editor.name} className="editorAvatar" />
                <h3>{editor.name}</h3>
                <span className="roleText">{editor.role}</span>

                <div className="editorInfo">
                  <p><FaEnvelope /> {editor.email}</p>
                  <p><FaPhone /> {editor.phone}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="manageEditorTableWrapper">
            <table className="manageEditorTable">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEditors.map((editor) => (
                  <tr key={editor.id}>
                    <td>
                      <div className="tableUser">
                        <img src={editor.image} alt={editor.name} />
                        <div className="tableUserMeta">
                          <span className="tableUserName">{editor.name}</span>
                          <span className="tableUserEmail">{editor.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="tableRoleBadge">{editor.role}</span>
                    </td>
                    <td>
                      <span className={`statusText ${editor.status.toLowerCase()}`}>
                        {editor.status}
                      </span>
                    </td>
                    <td className="tableDateText">{editor.joined}</td>
                    <td>
                      <div className="tableActionsInline">
                        <button className="tableActionBtn view" title="View" onClick={(e) => handleView(editor, e)}>
                          <FaEye />
                        </button>
                        <button className="tableActionBtn edit" title="Edit" onClick={(e) => handleEdit(editor, e)}>
                          <FaEdit />
                        </button>
                        <button className="tableActionBtn delete" title="Delete" onClick={(e) => handleDelete(editor.id, editor.name, e)}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEditior;