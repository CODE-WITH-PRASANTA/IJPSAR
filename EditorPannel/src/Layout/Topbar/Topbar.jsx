import React, { useState } from "react";
import "./Topbar.css";

import {
  FaBars,
  FaSearch,
  FaBell,
  FaTimes,
} from "react-icons/fa";

import profileImg from "../../assets/hero.png"; // change image

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Paper Assigned",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Review Submitted",
      time: "10 min ago",
    },
    {
      id: 3,
      title: "Payment Updated",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="Topbar">

      {/* LEFT */}

      <div className="Topbar_Left">

        <button className="Topbar_MenuBtn">
          <FaBars />
        </button>

        <div className="Topbar_SearchBox">
          <FaSearch className="Topbar_SearchIcon" />

          <input
            type="text"
            placeholder="Search..."
          />
        </div>

      </div>

      {/* RIGHT */}

      <div className="Topbar_Right">

        <div className="Topbar_NotificationWrapper">

          <button
            className="Topbar_NotificationBtn"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
          >
            <FaBell />

            <span className="Topbar_Badge">
              {notifications.length}
            </span>
          </button>

          {showNotifications && (
            <div className="Topbar_NotificationDropdown">

              <div className="Topbar_NotificationHeader">

                <h4>Notifications</h4>

                <FaTimes
                  onClick={() =>
                    setShowNotifications(false)
                  }
                />

              </div>

              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="Topbar_NotificationItem"
                >
                  <h5>{item.title}</h5>
                  <p>{item.time}</p>
                </div>
              ))}

            </div>
          )}
        </div>

        <div className="Topbar_Profile">

          <img
            src={profileImg}
            alt="Admin"
            className="Topbar_ProfileImage"
          />

          <div className="Topbar_ProfileInfo">
            <h4>Ann Adame</h4>
            <p>Admin</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Topbar;