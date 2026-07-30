import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import "./Calender.css";

const dateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const timeInputValue = (date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

const addDays = (date, amount) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + amount);
  return nextDate;
};

const startOfWeekSun = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());
  return start;
};

const sameDay = (firstDate, secondDate) =>
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth() === secondDate.getMonth() &&
  firstDate.getDate() === secondDate.getDate();

const getDefaultForm = (date = new Date(), hour = 9, allDay = false) => ({
  title: "",
  date: dateInputValue(date),
  startTime: `${String(hour).padStart(2, "0")}:00`,
  endTime: hour === 23 ? "23:59" : `${String(hour + 1).padStart(2, "0")}:00`,
  allDay,
  color: "blue",
});

const Calender = () => {
  const base = "calender";
  const [view, setView] = useState("week");
  const [refDate, setRefDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState(getDefaultForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const dowShort = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    [],
  );

  const times = useMemo(
    () =>
      Array.from({ length: 24 }, (_, hour) => {
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        return `${hour12}${hour < 12 ? "am" : "pm"}`;
      }),
    [],
  );

  const monthGrid = useMemo(() => {
    const year = refDate.getFullYear();
    const month = refDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const start = addDays(firstDay, -firstDay.getDay());

    return {
      month,
      cells: Array.from({ length: 42 }, (_, index) => addDays(start, index)),
    };
  }, [refDate]);

  const weekDays = useMemo(() => {
    const start = startOfWeekSun(refDate);
    return Array.from({ length: 7 }, (_, index) => addDays(start, index));
  }, [refDate]);

  const visibleRange = useMemo(() => {
    if (view === "month") {
      return {
        start: monthGrid.cells[0],
        end: addDays(monthGrid.cells[monthGrid.cells.length - 1], 1),
      };
    }

    if (view === "day") {
      const start = new Date(refDate);
      start.setHours(0, 0, 0, 0);
      return { start, end: addDays(start, 1) };
    }

    return { start: weekDays[0], end: addDays(weekDays[6], 1) };
  }, [monthGrid, refDate, view, weekDays]);

  const rangeStart = visibleRange.start.toISOString();
  const rangeEnd = visibleRange.end.toISOString();

  useEffect(() => {
    let isMounted = true;

    API.get("/calendar", {
      params: { start: rangeStart, end: rangeEnd },
    })
      .then((response) => {
        if (!isMounted) return;
        setEvents(response.data.data || []);
        setError("");
      })
      .catch((requestError) => {
        console.error("Calendar load error:", requestError);
        if (isMounted) {
          setError("Calendar events could not be loaded. Please try again.");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [rangeEnd, rangeStart, refreshKey]);

  const headerTitle = useMemo(() => {
    const monthName = (date) =>
      date.toLocaleString("en-US", { month: "long" });

    if (view === "month") return `${monthName(refDate)} ${refDate.getFullYear()}`;

    if (view === "day") {
      return `${monthName(refDate)} ${refDate.getDate()}, ${refDate.getFullYear()}`;
    }

    const start = weekDays[0];
    const end = weekDays[6];
    return `${monthName(start)} ${start.getDate()} – ${end.getDate()} ${end.getFullYear()}`;
  }, [refDate, view, weekDays]);

  const getEventStart = (event) => new Date(event.start);
  const getEventEnd = (event) => new Date(event.end);

  const eventsForDate = (date) =>
    events.filter((event) => sameDay(getEventStart(event), date));

  const allDayEventsForDate = (date) =>
    eventsForDate(date).filter((event) => event.allDay);

  const blocksForDate = (date) =>
    eventsForDate(date)
      .filter((event) => !event.allDay)
      .map((event) => {
        const start = getEventStart(event);
        const end = getEventEnd(event);
        const startMinutes = start.getHours() * 60 + start.getMinutes();
        const durationMinutes = Math.max(30, (end - start) / 60000);

        return {
          ...event,
          top: 40 + (startMinutes / 60) * 40,
          height: Math.max(30, (durationMinutes / 60) * 40 - 6),
        };
      });

  const changeDate = (amount) => {
    setLoading(true);
    setRefDate((currentDate) => {
      if (view === "month") {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + amount, 1);
      }

      return addDays(currentDate, view === "week" ? amount * 7 : amount);
    });
  };

  const openCreateEvent = (date = refDate, hour = 9, allDay = false) => {
    setEditingEvent(null);
    setEventForm(getDefaultForm(date, hour, allDay));
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditEvent = (event) => {
    const start = getEventStart(event);
    const end = getEventEnd(event);

    setEditingEvent(event);
    setEventForm({
      title: event.title,
      date: dateInputValue(start),
      startTime: timeInputValue(start),
      endTime: timeInputValue(end),
      allDay: event.allDay,
      color: event.color,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!saving) setIsModalOpen(false);
  };

  const handleFormChange = (event) => {
    const { name, value, checked, type } = event.target;
    setEventForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveEvent = async (event) => {
    event.preventDefault();
    setFormError("");

    const start = new Date(
      `${eventForm.date}T${eventForm.allDay ? "00:00" : eventForm.startTime}`,
    );
    const end = eventForm.allDay
      ? addDays(start, 1)
      : new Date(`${eventForm.date}T${eventForm.endTime}`);

    if (!eventForm.title.trim()) {
      setFormError("Please enter an event title.");
      return;
    }

    if (end <= start) {
      setFormError("End time must be after the start time.");
      return;
    }

    const payload = {
      title: eventForm.title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: eventForm.allDay,
      color: eventForm.color,
    };

    try {
      setSaving(true);

      if (editingEvent) {
        await API.put(`/calendar/${editingEvent._id}`, payload);
      } else {
        await API.post("/calendar", payload);
      }

      setIsModalOpen(false);
      setRefreshKey((key) => key + 1);
    } catch (requestError) {
      setFormError(
        requestError.response?.data?.message || "Unable to save the calendar event.",
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteEvent = async () => {
    if (!editingEvent) return;

    try {
      setSaving(true);
      await API.delete(`/calendar/${editingEvent._id}`);
      setIsModalOpen(false);
      setRefreshKey((key) => key + 1);
    } catch (requestError) {
      setFormError(
        requestError.response?.data?.message || "Unable to delete the calendar event.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={base}>
      <div className={`${base}__card`}>
        <div className={`${base}__toolbar`}>
          <div className={`${base}__nav`}>
            <button
              className={`${base}__btn ${base}__btn--split`}
              onClick={() => changeDate(-1)}
              type="button"
              aria-label="Previous period"
            >
              ‹
            </button>
            <button
              className={`${base}__btn ${base}__btn--split`}
              onClick={() => changeDate(1)}
              type="button"
              aria-label="Next period"
            >
              ›
            </button>
            <button
              className={`${base}__btn ${base}__btn--today`}
              onClick={() => {
                setLoading(true);
                setRefDate(new Date());
              }}
              type="button"
            >
              Today
            </button>
          </div>

          <div className={`${base}__title`}>{headerTitle}</div>

          <div className={`${base}__views`}>
            <button
              className={`${base}__addButton`}
              onClick={() => openCreateEvent()}
              type="button"
            >
              + Event
            </button>
            {["month", "week", "day"].map((nextView) => (
              <button
                className={`${base}__tab ${view === nextView ? `${base}__tab--on` : ""}`}
                onClick={() => {
                  setLoading(true);
                  setView(nextView);
                }}
                type="button"
                key={nextView}
              >
                {nextView.charAt(0).toUpperCase() + nextView.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={`${base}__body`}>
          {error && (
            <div className={`${base}__message ${base}__message--error`}>
              {error}
              <button type="button" onClick={() => setRefreshKey((key) => key + 1)}>
                Retry
              </button>
            </div>
          )}

          {loading && <div className={`${base}__message`}>Loading calendar events...</div>}

          {view === "month" && (
            <div className={`${base}__month`}>
              <div className={`${base}__monthHead`}>
                {dowShort.map((day) => (
                  <div key={day} className={`${base}__monthHCell`}>
                    {day}
                  </div>
                ))}
              </div>

              <div className={`${base}__monthGrid`}>
                {monthGrid.cells.map((date) => {
                  const inMonth = date.getMonth() === monthGrid.month;
                  const dayEvents = eventsForDate(date);

                  return (
                    <div
                      key={date.toISOString()}
                      onClick={() => openCreateEvent(date, 9, true)}
                      className={`${base}__mCell ${!inMonth ? `${base}__mCell--dim` : ""} ${
                        date.getDay() === 6 ? `${base}__mCell--sat` : ""
                      }`}
                    >
                      <span className={`${base}__mDate`}>{date.getDate()}</span>
                      <span className={`${base}__mEvents`}>
                        {dayEvents.slice(0, 3).map((calendarEvent) => (
                          <button
                            type="button"
                            key={calendarEvent._id}
                            className={`${base}__mEvent ${base}__mEvent--${calendarEvent.color}`}
                            onClick={(clickEvent) => {
                              clickEvent.stopPropagation();
                              openEditEvent(calendarEvent);
                            }}
                          >
                            {calendarEvent.title}
                          </button>
                        ))}
                        {dayEvents.length > 3 && (
                          <span className={`${base}__moreEvents`}>+{dayEvents.length - 3} more</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(view === "week" || view === "day") && (
            <div className={`${base}__weekWrapper`}>
              <div
                className={`${base}__weekHeader`}
                style={{ gridTemplateColumns: `80px repeat(${view === "week" ? 7 : 1}, 1fr)` }}
              >
                <div className={`${base}__timeColumnHeader`} />
                {(view === "week" ? weekDays : [refDate]).map((date) => (
                  <div key={date.toDateString()} className={`${base}__weekDayHeader`}>
                    <div className={`${base}__dayName`}>{dowShort[date.getDay()]}</div>
                    <div className={`${base}__dayDate`}>
                      {date.getMonth() + 1}/{date.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`${base}__weekGrid`}
                style={{ gridTemplateColumns: `80px repeat(${view === "week" ? 7 : 1}, 1fr)` }}
              >
                <div className={`${base}__timeColumn`}>
                  <div className={`${base}__allDayLabel`}>all-day</div>
                  {times.map((time) => (
                    <div key={time} className={`${base}__timeLabel`}>
                      {time}
                    </div>
                  ))}
                </div>

                {(view === "week" ? weekDays : [refDate]).map((date) => (
                  <div
                    key={date.toDateString()}
                    className={`${base}__dayColumn ${
                      date.getDay() === 6 ? `${base}__dayColumn--sat` : ""
                    }`}
                  >
                    <div
                      className={`${base}__allDayRow`}
                      onClick={() => openCreateEvent(date, 9, true)}
                      role="button"
                      tabIndex={0}
                    >
                      {allDayEventsForDate(date).map((calendarEvent) => (
                        <button
                          type="button"
                          key={calendarEvent._id}
                          className={`${base}__allDayEvent ${base}__allDayEvent--${calendarEvent.color}`}
                          onClick={(clickEvent) => {
                            clickEvent.stopPropagation();
                            openEditEvent(calendarEvent);
                          }}
                        >
                          {calendarEvent.title}
                        </button>
                      ))}
                    </div>

                    {times.map((time, hour) => (
                      <button
                        type="button"
                        key={`${date.toDateString()}-${time}`}
                        className={`${base}__slot`}
                        onClick={() => openCreateEvent(date, hour)}
                        aria-label={`Add event on ${date.toDateString()} at ${time}`}
                      />
                    ))}

                    {blocksForDate(date).map((calendarEvent) => (
                      <button
                        type="button"
                        key={calendarEvent._id}
                        className={`${base}__block ${base}__block--${calendarEvent.color}`}
                        style={{ top: calendarEvent.top, height: calendarEvent.height }}
                        onClick={() => openEditEvent(calendarEvent)}
                      >
                        {calendarEvent.title}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className={`${base}__modalBackdrop`} onMouseDown={closeModal}>
          <form
            className={`${base}__modal`}
            onSubmit={saveEvent}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={`${base}__modalHeader`}>
              <h2>{editingEvent ? "Edit event" : "Add event"}</h2>
              <button type="button" onClick={closeModal} aria-label="Close event form">
                ×
              </button>
            </div>

            <label>
              Title
              <input
                autoFocus
                name="title"
                value={eventForm.title}
                onChange={handleFormChange}
                placeholder="Event title"
              />
            </label>

            <label>
              Date
              <input
                type="date"
                name="date"
                value={eventForm.date}
                onChange={handleFormChange}
              />
            </label>

            <label className={`${base}__checkLabel`}>
              <input
                type="checkbox"
                name="allDay"
                checked={eventForm.allDay}
                onChange={handleFormChange}
              />
              All-day event
            </label>

            {!eventForm.allDay && (
              <div className={`${base}__timeFields`}>
                <label>
                  Start time
                  <input
                    type="time"
                    name="startTime"
                    value={eventForm.startTime}
                    onChange={handleFormChange}
                  />
                </label>
                <label>
                  End time
                  <input
                    type="time"
                    name="endTime"
                    value={eventForm.endTime}
                    onChange={handleFormChange}
                  />
                </label>
              </div>
            )}

            <label>
              Colour
              <select name="color" value={eventForm.color} onChange={handleFormChange}>
                <option value="blue">Blue</option>
                <option value="magenta">Purple</option>
                <option value="green">Green</option>
                <option value="black">Black</option>
              </select>
            </label>

            {formError && <p className={`${base}__formError`}>{formError}</p>}

            <div className={`${base}__modalActions`}>
              {editingEvent && (
                <button type="button" className={`${base}__deleteButton`} onClick={deleteEvent} disabled={saving}>
                  Delete
                </button>
              )}
              <button type="button" className={`${base}__cancelButton`} onClick={closeModal} disabled={saving}>
                Cancel
              </button>
              <button type="submit" className={`${base}__saveButton`} disabled={saving}>
                {saving ? "Saving..." : "Save event"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Calender;
