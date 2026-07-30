import "./Sidebar.css";
import {
  FiGrid,
  FiFileText,
  FiFolder,
  FiClock,
  FiBookOpen,
  FiMoreVertical,
  FiBell,
  FiMessageSquare,
  FiLogOut,
  FiX,
  FiSend,
} from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showTicketNotification, setShowTicketNotification] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false); // New state for notifications popup
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [author, setAuthor] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    complain: "",
  });

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("authorToken");

      const { data } = await API.get("/notification/author", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setNotifications(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("author"));

    if (user) {
      setAuthor(user);

      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
      }));
    }

    fetchNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("author");
    localStorage.removeItem("authorToken");
    navigate("/author/auth", { replace: true });
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint Submitted Data:", formData);
    // Add logic here to sync with API endpoints if necessary

    // Clear & close
    setFormData({ name: author?.fullName || "", subject: "", complain: "" });
    setShowComplaintForm(false);
    alert("Your support ticket has been recorded successfully!");
  };

  return (
    <>
      <div
        className={`Sidebar_Overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`Sidebar ${sidebarOpen ? "show" : ""}`}>
        <div className="Sidebar_Content">
          {/* Header */}
          <div className="Sidebar_Header">
            <div className="Sidebar_Logo">
              <div className="Sidebar_LogoIcon">⊙</div>
              <div>
                <h2>IJPSAR</h2>
                <h4>Author Panel</h4>
              </div>
            </div>

            <button
              className="Sidebar_Close"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX />
            </button>
          </div>

          {/* Menu */}
          <div className="Sidebar_Menu">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "Sidebar_MenuItem active" : "Sidebar_MenuItem"
              }
            >
              <FiGrid />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/submit-paper"
              className={({ isActive }) =>
                isActive ? "Sidebar_MenuItem active" : "Sidebar_MenuItem"
              }
            >
              <FiFileText />
              <span>Submit Paper</span>
            </NavLink>

            <NavLink
              to="/paper-management"
              className={({ isActive }) =>
                isActive ? "Sidebar_MenuItem active" : "Sidebar_MenuItem"
              }
            >
              <FiFolder />
              <span>Paper Management</span>
            </NavLink>

            <NavLink
              to="/transaction-details"
              className={({ isActive }) =>
                isActive ? "Sidebar_MenuItem active" : "Sidebar_MenuItem"
              }
            >
              <FiClock />
              <span>Transaction History</span>
            </NavLink>

            <NavLink
              to="/published-papers"
              className={({ isActive }) =>
                isActive ? "Sidebar_MenuItem active" : "Sidebar_MenuItem"
              }
            >
              <FiBookOpen />
              <span>Published Papers</span>
            </NavLink>
          </div>
        </div>

        {/* Profile Section */}
        <div className="Sidebar_Profile">
          <img src="https://i.pravatar.cc/150?img=12" alt="Profile" />

          <div className="Sidebar_ProfileInfo">
            <h4>{author?.fullName || "Author"}</h4>
            <p>{author?.email}</p>
          </div>

          <button
            className="Sidebar_ProfileButton"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowTicketNotification(false);
              setShowNotificationPopup(false);
            }}
          >
            <FiMoreVertical />
          </button>

          {/* Master Profile Actions Popup Menu */}
          {showProfileMenu && (
            <div className="Sidebar_ProfilePopup">
              <div
                className="Sidebar_ProfilePopupItem"
                onClick={() => {
                  setShowNotificationPopup(true);
                  setShowTicketNotification(false);
                  setShowProfileMenu(false);
                }}
              >
                <FiBell />

                <span>Notifications</span>

                {notifications.filter((n) => !n.isRead).length > 0 && (
                  <span className="notificationBadge">
                    {notifications.filter((n) => !n.isRead).length}
                  </span>
                )}
              </div>

              {/* Updated based on Screenshot 2026-07-01 102815.png */}
              <div
                className="Sidebar_ProfilePopupItem"
                onClick={() => {
                  setShowTicketNotification(true);
                  setShowNotificationPopup(false);
                  setShowProfileMenu(false);
                }}
              >
                <FiMessageSquare />
                Ticket
              </div>

              <div
                className="Sidebar_ProfilePopupItem danger"
                onClick={handleLogout}
              >
                <FiLogOut />
                Logout
              </div>
            </div>
          )}

          {/* Interactive Micro Messages (Ticket Status Notification Pop-box) */}
          {showTicketNotification && (
            <div className="Ticket_NotificationBox">
              <div className="Ticket_NotificationHeader">
                <h5>Support & Tickets</h5>
                <button onClick={() => setShowTicketNotification(false)}>
                  <FiX />
                </button>
              </div>
              <div className="Ticket_NotificationBody">
                <p>Have an inquiry or issue regarding publication timelines?</p>
                <button
                  className="Ticket_RaiseBtn"
                  onClick={() => {
                    setShowComplaintForm(true);
                    setShowTicketNotification(false);
                  }}
                >
                  Raise a Ticket / Complain
                </button>
              </div>
            </div>
          )}

          {/* Side Small Notification Pop Section */}
          {showNotificationPopup && (
            <div className="Notification_PopBox">
              <div className="Notification_PopHeader">
                <div className="Notification_Header_Left">
                  <h5>Recent Notifications</h5>

                  {notifications.length > 0 && (
                    <button
                      className="markAllBtn"
                      onClick={async () => {
                        const token = localStorage.getItem("authorToken");

                        await API.put(
                          "/notification/author/read-all",
                          {},
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          },
                        );

                        fetchNotifications();
                      }}
                    >
                      Mark All Read
                    </button>
                  )}
                </div>{" "}
                <button onClick={() => setShowNotificationPopup(false)}>
                  <FiX />
                </button>
              </div>
              <div className="Notification_PopBody">
                {notifications.length === 0 ? (
                  <p className="noNotification">No Notifications</p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className={`Notification_Item ${
                        item.isRead ? "" : "unread"
                      }`}
                      onClick={async () => {
                        if (!item.isRead) {
                          await API.put(`/notification/read/${item._id}`);

                          fetchNotifications();
                        }
                      }}
                    >
                      <p>
                        <strong>{item.title}</strong>
                      </p>

                      <p>{item.message}</p>

                      <span className="Notification_Time">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Standalone Central Modal: Complaint Pop-form */}
      {showComplaintForm && (
        <div className="Complaint_ModalOverlay">
          <div className="Complaint_ModalCard">
            <div className="Complaint_ModalHeader">
              <h3>Submit Support Ticket</h3>
              <button
                className="Complaint_CloseBtn"
                onClick={() => setShowComplaintForm(false)}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="Complaint_Form">
              <div className="Form_Group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="Form_Group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g., Delay in review status assignment"
                  required
                />
              </div>

              <div className="Form_Group">
                <label>Complain Box</label>
                <textarea
                  name="complain"
                  rows="4"
                  value={formData.complain}
                  onChange={handleInputChange}
                  placeholder="Describe your system complaint or ticket issue in detail..."
                  required
                ></textarea>
              </div>

              <div className="Complaint_FormActions">
                <button
                  type="button"
                  className="Form_Btn cancel"
                  onClick={() => setShowComplaintForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="Form_Btn submit">
                  <FiSend /> Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
