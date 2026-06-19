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
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const ManageEditior = () => {
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [editors, setEditors] = useState([]);
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const fetchEditors = async () => {
    try {
      const res = await API.get("/editor/all");

      setEditors(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPapers = async () => {
    try {
      const res = await API.get("/submitform/unassigned");

      // console.log("PAPERS =>", res.data); // add this

      setPapers(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEditors();
    fetchPapers();
  }, []);

  // Filter functionality
  const filteredEditors = editors.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()),
  );

  // Action Menu Handlers
  const handleView = (editor, e) => {
    e.stopPropagation();

    navigate("/newsprofile", {
      state: {
        user: editor,
      },
    });

    setActiveMenu(null);
  };

  const handleEdit = (editor, e) => {
    e.stopPropagation();
    alert(`Opening Edit Panel for: ${editor.name}`);
    setActiveMenu(null);
  };

  const handleDelete = async (id, name, e) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );

    if (!confirmed) return;

    try {
      await API.delete(`/editor/delete/${id}`);

      fetchEditors();
    } catch (error) {
      console.error(error);
    }

    setActiveMenu(null);
  };

  const handleToggleStatus = async (editor) => {
    try {
      if (editor.status === "Active") {
        await API.put(`/editor/block/${editor._id}`);
      } else {
        await API.put(`/editor/activate/${editor._id}`);
      }

      fetchEditors();
    } catch (error) {
      console.error(error);
    }
  };

  const assignPaperToEditor = async (paperId, editor) => {
    try {
      await API.post("/editor/assign-paper", {
        editorId: editor._id,
        paperId,
      });

      fetchEditors();
      fetchPapers();

      alert("Paper Assigned Successfully");
    } catch (error) {
      console.error(error);
    }
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
              <div className="manageEditorCard" key={editor._id}>
                <div className="manageEditorTop">
                  <span
                    className={`statusBadge ${editor.status.toLowerCase()}`}
                  >
                    {editor.status}
                  </span>

                  <div className="menuWrapper">
                    <button
                      className="menuBtn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(
                          activeMenu === editor.id ? null : editor.id,
                        );
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
                          onClick={(e) =>
                            handleDelete(editor.id, editor.name, e)
                          }
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="editorAvatar">
                  {editor.name?.charAt(0).toUpperCase()}
                </div>
                <h3>{editor.name}</h3>
                <p className="editorId">{editor.userId}</p>
                <span className="roleText">{editor.role}</span>

                <div className="editorInfo">
                  <p>
                    <FaEnvelope /> {editor.email}
                  </p>
                  <p>
                    <FaPhone /> {editor.phone}
                  </p>
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
                  <th>Assigned Papers</th>
                  <th>Total Assigned</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEditors.map((editor) => (
                  <tr key={editor._id}>
                    <td>
                      <div className="tableUser">
                        <div className="editorAvatar">
                          {editor.name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="tableUserMeta">
                          <span className="tableUserName">{editor.name}</span>

                          <span className="tableUserEmail">{editor.email}</span>

                          <span className="tableUserId">{editor.userId}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="tableRoleBadge">{editor.role}</span>
                    </td>
                    <td>
                      <span
                        className={`statusText ${editor.status.toLowerCase()}`}
                      >
                        {editor.status}
                      </span>
                    </td>
                    <td className="tableDateText">
                      {editor.createdAt
                        ? new Date(editor.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <select
                        className="assignPaperSelect"
                        onChange={(e) => {
                          if (!e.target.value) return;

                          assignPaperToEditor(e.target.value, editor);
                        }}
                      >
                        <option value="">Assign Paper</option>

                        {papers.map((paper) => (
                          <option key={paper._id} value={paper._id}>
                            {paper.paperId} - {paper.paperTitle}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>{editor.assignedPapers?.length || 0}</td>

                    <td>
                      <div className="tableActionsInline">
                        <button
                          className="tableActionBtn view"
                          title="View"
                          onClick={(e) => handleView(editor, e)}
                        >
                          <FaEye />
                        </button>

                        <button
                          className="tableActionBtn delete"
                          title="Delete"
                          onClick={(e) =>
                            handleDelete(editor._id, editor.name, e)
                          }
                        >
                          <FaTrash />
                        </button>

                        <button
                          className={
                            editor.status === "Active"
                              ? "blockBtn"
                              : "activateBtn"
                          }
                          onClick={() => handleToggleStatus(editor)}
                        >
                          {editor.status === "Active" ? "Block" : "Activate"}
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
