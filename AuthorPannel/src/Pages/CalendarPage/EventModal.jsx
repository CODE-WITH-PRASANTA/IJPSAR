import React, { useState } from "react";

const EventModal = ({
  selectedDate,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [allDay, setAllDay] = useState(false);

  const [startDate, setStartDate] =
    useState(selectedDate?.split("T")[0]);

  const [endDate, setEndDate] =
    useState(selectedDate?.split("T")[0]);

  const [startTime, setStartTime] =
    useState("12:30");

  const [endTime, setEndTime] =
    useState("13:00");

  const [description, setDescription] =
    useState("");

  const handleSave = () => {
    onSave({
      title,
      start: allDay
        ? startDate
        : `${startDate}T${startTime}`,
      end: allDay
        ? endDate
        : `${endDate}T${endTime}`,
      allDay,
      description,
    });
  };

  return (
    <div className="event-modal-overlay">
      <div className="event-modal">

        <h2>Event</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <div className="all-day-row">
          <label className="switch">
            <input
              type="checkbox"
              checked={allDay}
              onChange={() =>
                setAllDay(!allDay)
              }
            />
            <span className="slider"></span>
          </label>

          <span>All day</span>
        </div>

        <div className="date-group">
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
          />

          {!allDay && (
            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                setStartTime(e.target.value)
              }
            />
          )}
        </div>

        <div className="date-group">
          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
          />

          {!allDay && (
            <input
              type="time"
              value={endTime}
              onChange={(e) =>
                setEndTime(e.target.value)
              }
            />
          )}
        </div>

        <textarea
          rows="5"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <div className="modal-buttons">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;