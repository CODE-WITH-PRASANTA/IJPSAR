import React, { useEffect, useState } from "react";
import API from "../../API/axios";
import Swal from "sweetalert2";
import {
  FaClock,
  FaCheck,
  FaTimes,
  // FaSmile,
  // FaCommentDots,
} from "react-icons/fa";
import "./SettingActivity.css";

const SettingActivity = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const token = localStorage.getItem("editorToken");

      const { data } = await API.get("/notification/editor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setNotifications(data.data);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      await API.put(`/notification/read/${id}`);

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        title:
          err.response?.data?.message || "Unable to mark notification as read",
      });
    }
  };
  const readAll = async () => {
    try {
      const token = localStorage.getItem("editorToken");

      await API.put(
        "/notification/editor/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      getNotifications();

      Swal.fire({
        icon: "success",
        title: "All notifications marked as read",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Unable to mark all as read",
      });
    }
  };

  const deleteNotification = async (id) => {
    const result = await Swal.fire({
      title: "Delete Notification?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`/notification/${id}`);

      setNotifications((prev) => prev.filter((n) => n._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Delete failed",
      });
    }
  };

  if (loading) {
    return (
      <div className="SettingActivity">
        <div className="SettingActivity-container">
          <div className="SettingActivity-loading">
            Loading Notifications...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="SettingActivity">
      <div className="SettingActivity-container">
        {/* Header */}

        <div className="SettingActivity-header">
          <h2>Activity & Notifications</h2>

          <button className="SettingActivity-readAll" onClick={readAll}>
            <FaCheck />
            Mark All Read
          </button>
        </div>

        {/* Empty */}

        {notifications.length === 0 && (
          <div className="SettingActivity-empty">
            <h3>No Notifications</h3>

            <p>You don't have any activity yet.</p>
          </div>
        )}

        {/* Notifications */}

        {notifications.map((item) => (
          <div
            key={item._id}
            className={`SettingActivity-item ${item.isRead ? "" : "unread"}`}
            onClick={() => {
              if (!item.isRead) {
                markRead(item._id);
              }
            }}
          >
            {/* Avatar */}

            <div className="SettingActivity-avatar">
              {item.title ? item.title.charAt(0).toUpperCase() : "N"}
            </div>

            {/* Content */}

            <div className="SettingActivity-content">
              <div className="SettingActivity-top">
                <h4>{item.title}</h4>

                <span
                  className={`SettingActivity-status ${
                    item.isRead ? "read" : "unread"
                  }`}
                >
                  {item.isRead ? "Read" : "New"}
                </span>
              </div>

              <p>{item.message}</p>

              {item.paperId && (
                <div className="SettingActivity-paper">
                  <strong>Paper :</strong>

                  <span>{item.paperId.paperTitle}</span>

                  <small>
                    Status :<b> {item.paperId.status}</b>
                  </small>
                </div>
              )}

              <div className="SettingActivity-footer">
                <div className="SettingActivity-time">
                  <FaClock />

                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                </div>

                <div className="SettingActivity-actions">
                  {!item.isRead && (
                    <button
                      className="SettingActivity-readBtn"
                      onClick={(e) => {
                        e.stopPropagation();
                        markRead(item._id);
                      }}
                    >
                      <FaCheck />
                      Read
                    </button>
                  )}

                  <button
                    className="SettingActivity-deleteBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(item._id);
                    }}
                  >
                    <FaTimes />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingActivity;
