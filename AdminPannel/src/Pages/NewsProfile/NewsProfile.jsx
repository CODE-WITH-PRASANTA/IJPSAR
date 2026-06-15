import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle, FaUser, FaHeartbeat } from "react-icons/fa";
import "./NewsProfile.css";
import API from "../../api/axios";
import { useEffect } from "react";

const NewsProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [documents, setDocuments] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  const fetchDocuments = async () => {
    try {
      const res = await API.get(`/submitform/editor/${user._id}`);

      setDocuments(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchDocuments();
    }
  }, [user]);

  const handleToggleStatus = async () => {
    try {
      if (user.status === "Active") {
        await API.put(`/editor/block/${user._id}`);
      } else {
        await API.put(`/editor/activate/${user._id}`);
      }

      alert("Status Updated");

      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await API.delete(`/editor/delete/${user._id}`);

      alert("User Deleted");

      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePaper = async (paperId) => {
    const confirmDelete = window.confirm("Delete this paper?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/submitform/delete/${paperId}`);

      setDocuments((prev) => prev.filter((doc) => doc._id !== paperId));

      alert("Paper Deleted Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="newsProfile">
        <h2>User Not Found</h2>
      </div>
    );
  }

  return (
    <div className="newsProfile">
      {/* Breadcrumb */}
      <div className="newsProfile__breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>User Management</span>
        <span>/</span>
        <span className="newsProfile__breadcrumbActive">Users</span>
      </div>

      {/* Header */}
      <div className="newsProfile__header">
        <div className="newsProfile__userInfo">
          <div className="newsProfile__avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="newsProfile__details">
            <h2>{user?.name}</h2>

            <p>{user?.email}</p>

            <div className="newsProfile__userId">User ID: {user?.userId}</div>
          </div>
        </div>

        <button className="newsProfile__backBtn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back to users
        </button>
      </div>

      {/* Tabs */}

      <div className="newsProfile__tabs">
        <button
          className={`newsProfile__tab ${
            activeTab === "profile" ? "newsProfile__tab--active" : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <FaUser />
          Profile
        </button>

        <button
          className={`newsProfile__tab ${
            activeTab === "activity" ? "newsProfile__tab--active" : ""
          }`}
          onClick={() => setActiveTab("activity")}
        >
          <FaHeartbeat />
          Activity Logs
        </button>
      </div>

      {/* Content */}

      {activeTab === "profile" && (
        <>
          <div className="newsProfile__card">
            <div className="newsProfile__grid">
              <div className="newsProfile__label">Full Name:</div>

              <div className="newsProfile__value">{user?.name}</div>

              <div className="newsProfile__label">Email Address:</div>

              <div className="newsProfile__value">{user?.email}</div>

              <div className="newsProfile__label">Phone Number:</div>

              <div className="newsProfile__value">{user?.phone || "-"}</div>

              <div className="newsProfile__label">Role:</div>

              <div className="newsProfile__value">
                <span
                  className={`newsProfile__badge ${user?.role?.toLowerCase()}`}
                >
                  {user?.role}
                </span>
              </div>

              <div className="newsProfile__label">Status:</div>

              <div className="newsProfile__value">
                <span
                  className={`newsProfile__status ${user?.status?.toLowerCase()}`}
                >
                  ● {user?.status}
                </span>
              </div>

              <div className="newsProfile__label">Joined:</div>

              <div className="newsProfile__value">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </div>

              <div className="newsProfile__label">Mongo ID:</div>

              <div className="newsProfile__label">Assigned Papers:</div>

              <div className="newsProfile__value">{documents.length}</div>

              <div className="newsProfile__value">{user?._id}</div>
            </div>

            <button
              className="newsProfile__editBtn"
              onClick={handleToggleStatus}
            >
              {user?.status === "Active" ? "Block User" : "Activate User"}
            </button>
          </div>

          {/* Danger Zone */}

          <div className="newsProfile__danger">
            <h3>Danger Zone</h3>

            <div className="newsProfile__dangerCard">
              <div>
                <h4>Delete User Account</h4>

                <p>
                  This action will permanently delete the user and all related
                  data. It cannot be undone.
                </p>
              </div>

              <button
                className="newsProfile__deleteBtn"
                onClick={handleDeleteUser}
              >
                Delete User
              </button>
            </div>
          </div>
        </>
      )}

      {activeTab === "activity" && (
        <div className="newsProfile__card">
          <h3>Assigned Documents ({documents.length})</h3>

          {documents.length === 0 ? (
            <div className="newsProfile__empty">
              No papers have been assigned to this editor yet.
            </div>
          ) : (
            <table className="editorDocumentTable">
              <thead>
                <tr>
                  <th>Paper ID</th>
                  <th>Title</th>
                  <th>Research Area</th>
                  <th>Status</th>
                  <th>Assigned Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {documents.map((doc) => (
                  <tr key={doc._id}>
                    <td>{doc.paperId}</td>

                    <td>{doc.paperTitle}</td>
                    <td>{doc.researchArea || "-"}</td>
                    <td>
                      <span className="docStatus">{doc.status}</span>
                    </td>

                    <td>{new Date(doc.createdAt).toLocaleDateString()}</td>

                    <td>
                      <button
                        className="viewDocBtn"
                        onClick={() => window.open(doc.paperFile, "_blank")}
                      >
                        View
                      </button>

                      <button
                        className="deleteDocBtn"
                        onClick={() => handleDeletePaper(doc._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsProfile;
