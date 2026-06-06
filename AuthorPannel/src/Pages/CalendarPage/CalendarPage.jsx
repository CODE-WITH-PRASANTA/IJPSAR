import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import EventModal from "./EventModal";
import "./CalendarPage.css";

const CalendarPage = () => {
  const calendarRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [viewType, setViewType] = useState("dayGridMonth");

  const [events, setEvents] = useState([
    {
      title: "Project Deadline",
      start: "2026-06-01",
      allDay: true,
    },
  ]);

  const handleSelect = (info) => {
    setSelectedDate(info.startStr);
    setShowModal(true);
  };

  const handleSaveEvent = (eventData) => {
    setEvents((prev) => [...prev, eventData]);
    setShowModal(false);
  };

  const handleViewChange = (value) => {
    setViewType(value);

    const calendarApi = calendarRef.current?.getApi();

    if (calendarApi) {
      calendarApi.changeView(value);
    }
  };

  return (
    <div className="calendar-page">
      <div className="calendar-container">

        <div className="calendar-header">
          <select
            className="calendar-view-select"
            value={viewType}
            onChange={(e) => handleViewChange(e.target.value)}
          >
            <option value="timeGridDay">Day</option>
            <option value="fourDays">4 Days</option>
            <option value="timeGridWeek">Week</option>
            <option value="dayGridMonth">Month</option>
          </select>
        </div>

        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          views={{
            fourDays: {
              type: "timeGrid",
              duration: { days: 4 },
            },
          }}
          headerToolbar={{
            left: "title",
            center: "",
            right: "today prev,next",
          }}
          selectable={true}
          selectMirror={true}
          select={handleSelect}
          editable={true}
          nowIndicator={true}
          events={events}
          height="auto"
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          allDaySlot={true}
          dayHeaderFormat={{
            weekday: "short",
            day: "numeric",
          }}
        />
      </div>

      {showModal && (
        <EventModal
          selectedDate={selectedDate}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;