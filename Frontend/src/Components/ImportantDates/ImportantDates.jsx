// ImportantDates.jsx

import React from "react";
import "./ImportantDates.css";

import {
  FaBookOpen,
  FaArrowRight,
  FaCalendarCheck,
} from "react-icons/fa";

const timelineData = [
  {
    id: 1,
    event: "Manuscript submission opens",
    date: "Sep 01, 2025",
    status: "Open",
    statusClass: "open",
  },

  {
    id: 2,
    event: "Last date for submission",
    date: "Nov 15, 2025",
    status: "Soon",
    statusClass: "soon",
  },

  {
    id: 3,
    event: "Notification of acceptance",
    date: "Nov 30, 2025",
    status: "Upcoming",
    statusClass: "upcoming",
  },

  {
    id: 4,
    event: "Final camera-ready submission",
    date: "Dec 05, 2025",
    status: "Upcoming",
    statusClass: "upcoming",
  },

  {
    id: 5,
    event: "Publication date",
    date: "Dec 15, 2025",
    status: "Upcoming",
    statusClass: "upcoming",
  },
];

const ImportantDates = () => {
  return (
    <section className="importantdates">

      <div className="importantdates-container">

        {/* LEFT SIDE */}

        <div className="importantdates-left">

          <span className="importantdates-tag">
            IMPORTANT DATES
          </span>

          <h2>
            Mark your
            <br />
            calendar
          </h2>

          <p>
            IJPASR follows continuous rolling submission.
            Tentative timeline for the current issue and
            publication process.
          </p>

          <button className="importantdates-btn">
            <FaBookOpen />
            Author Guidelines
            <FaArrowRight />
          </button>

          {/* FLOATING CARD */}

          <div className="importantdates-floating-card">

            <div className="importantdates-floating-icon">
              <FaCalendarCheck />
            </div>

            <div>
              <h4>Fast Review Process</h4>
              <span>Average response within 7 days</span>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="importantdates-right">

          {/* TABLE HEAD */}

          <div className="importantdates-table-head">

            <span>Event</span>
            <span>Date</span>
            <span>Status</span>

          </div>

          {/* TABLE BODY */}

          <div className="importantdates-table-body">

            {timelineData.map((item) => (

              <div
                className="importantdates-row"
                key={item.id}
              >

                <div className="importantdates-event">
                  {item.event}
                </div>

                <div className="importantdates-date">
                  {item.date}
                </div>

                <div className="importantdates-status">
                  <span className={item.statusClass}>
                    {item.status}
                  </span>
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default ImportantDates;