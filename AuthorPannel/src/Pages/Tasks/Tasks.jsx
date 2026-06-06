import React, { useState } from "react";
import "./Tasks.css";

import {
  FiPlusCircle,
  FiX,
  FiFilter,
} from "react-icons/fi";

import { HiOutlineSwitchVertical } from "react-icons/hi";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetails, setTaskDetails] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design new onboarding flow",
      priority: "High",
      completed: true,
    },
    {
      id: 2,
      title: "Refactor users table layout",
      priority: "Medium",
      completed: false,
    },
    {
      id: 3,
      title: "Add audit log detail panel",
      priority: "",
      completed: false,
    },
    {
      id: 4,
      title: "Polish command palette interactions",
      priority: "High",
      completed: false,
    },
    {
      id: 5,
      title: "Create tasks list page",
      priority: "High",
      completed: true,
    },
    {
      id: 6,
      title: "Update settings form spacing",
      priority: "Low",
      completed: true,
    },
    {
      id: 7,
      title: "Add empty states",
      priority: "Medium",
      completed: true,
    },
    {
      id: 8,
      title: "Improve sidebar collapse behavior",
      priority: "Medium",
      completed: false,
    },
  ]);

  const addTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      priority: "Medium",
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTaskTitle("");
    setTaskDetails("");
    setShowModal(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  return (
    <div className="tasksContainer">

      <div className="tasksHeader">
        <div>
          <h1>Tasks</h1>
          <p>
            Manage your team tasks and assignments
          </p>
        </div>

        <button
          className="addTaskBtn"
          onClick={() => setShowModal(true)}
        >
          <FiPlusCircle />
          Add task
        </button>
      </div>

      <div className="tabs">
        <button>List</button>
        <button>Table</button>
        <button>Board</button>
        <button>Calendar</button>
        <button className="activeTab">
          Gantt
        </button>
      </div>

      <div className="filters">
        <div className="leftFilters">
          <button>2 sorts</button>
          <button>Assignee: Evan</button>
          <button>Status: In progress</button>
          <button>+ Add filter</button>
        </div>

        <div className="rightFilters">
          <button>
            <FiFilter />
            Filter
          </button>

          <button>
            <HiOutlineSwitchVertical />
            Sort
          </button>
        </div>
      </div>

      <div className="taskList">
        {tasks.map((task) => (
          <div
            className="taskRow"
            key={task.id}
          >
            <div className="taskLeft">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  toggleTask(task.id)
                }
              />

              <span
                className={
                  task.completed
                    ? "taskDone"
                    : ""
                }
              >
                {task.title}
              </span>
            </div>

            <div
              className={`priority ${
                task.priority
                  ? task.priority.toLowerCase()
                  : "none"
              }`}
            >
              {task.priority || "-"}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="modalOverlay"
          onClick={() =>
            setShowModal(false)
          }
        >
          <div
            className="modalBox"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="modalHeader">
              <h2>Create new task</h2>

              <button
                className="closeBtn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <FiX />
              </button>
            </div>

            <div className="formGroup">
              <label>Title *</label>

              <input
                type="text"
                value={taskTitle}
                onChange={(e) =>
                  setTaskTitle(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="formGroup">
              <label>Details</label>

              <textarea
                rows="5"
                maxLength="160"
                value={taskDetails}
                onChange={(e) =>
                  setTaskDetails(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="charCount">
              {taskDetails.length} / 160
            </div>

            <div className="modalActions">
              <button
                className="cancelBtn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="saveBtn"
                onClick={addTask}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Tasks;