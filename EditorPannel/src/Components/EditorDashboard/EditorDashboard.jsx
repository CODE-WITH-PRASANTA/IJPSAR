import React, { useState } from "react";
import {
  FaProjectDiagram,
  FaTasks,
  FaChartLine,
  FaCheckCircle,
  FaSkype,
  FaVideo,
  FaFolder,
  FaFileAlt,
  FaPaperPlane,
  FaClock,
  FaArrowUp,
} from "react-icons/fa";

import {
  MdGroups,
  MdOutlineMailOutline,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import "./EditorDashboard.css";

const EditorDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const projects = [
    {
      project: "Website Redesign",
      status: "In Progress",
      type: "Front-end",
      preview: "www.web.com",
      tracking: "20 hours",
      progress: "50%",
    },
    {
      project: "Marketing Campaign",
      status: "Completed",
      type: "Marketing",
      preview: "www.marketing.com",
      tracking: "40 hours",
      progress: "100%",
    },
    {
      project: "Product Launch",
      status: "Pending",
      type: "Launch",
      preview: "www.webappdev.com",
      tracking: "0 hours",
      progress: "0%",
    },
    {
      project: "App Development",
      status: "On Hold",
      type: "Development",
      preview: "www.appdev.com",
      tracking: "10 hours",
      progress: "20%",
    },
    {
      project: "Content Creation",
      status: "In Progress",
      type: "Content",
      preview: "www.site.com",
      tracking: "30 hours",
      progress: "70%",
    },
    {
      project: "Training Workshop",
      status: "Completed",
      type: "Training",
      preview: "www.training.com",
      tracking: "50 hours",
      progress: "100%",
    },
    {
      project: "Research Initiative",
      status: "Progress",
      type: "Research",
      preview: "www.initiative.com",
      tracking: "15 hours",
      progress: "40%",
    },
  ];

  const meetings = [
    {
      name: "Layla Garcia",
      title: "Weekly Progress Update",
      time: "10:00 AM",
    },
    {
      name: "Jim Kramer",
      title: "Client Feedback Session",
      time: "11:30 AM",
    },
    {
      name: "Zack Padilla",
      title: "Problem-Solving Brainstorm",
      time: "1:00 PM",
    },
    {
      name: "Wilson Terry",
      title: "Product Demo and Review",
      time: "2:45 PM",
    },
  ];

  return (
    <div className="EditorDashboard">
      {/* TOP SECTION */}

      <div className="EditorDashboard-topGrid">
        {/* LEFT */}

        <div className="EditorDashboard-projectStatusCard">
          <h2>Project Status</h2>

          <div className="EditorDashboard-statusCards">
            <div className="EditorDashboard-statusCard blue">
              <FaProjectDiagram />
              <span>Project</span>
              <h3>35k</h3>
            </div>

            <div className="EditorDashboard-statusCard dark">
              <FaTasks />
              <span>Assigned</span>
              <h3>60</h3>
            </div>

            <div className="EditorDashboard-statusCard yellow">
              <FaChartLine />
              <span>In Progress</span>
              <h3>20</h3>
            </div>

            <div className="EditorDashboard-statusCard white">
              <FaCheckCircle />
              <span>Completed</span>
              <h3>2k</h3>
            </div>
          </div>

          <div className="EditorDashboard-rating">
            On Time Completion Rating :
            <strong> 89%</strong>
          </div>

          <div className="EditorDashboard-progressBox">
            <div className="EditorDashboard-progressHeader">
              <span>85% Processing</span>
              <span>×</span>
            </div>

            <div className="EditorDashboard-progressBar">
              <div className="EditorDashboard-progressFill"></div>
            </div>
          </div>
        </div>

        {/* TEAM */}

        <div className="EditorDashboard-teamWrapper">
          <div className="EditorDashboard-teamCard">
            <h2>Project Team</h2>

            <div className="EditorDashboard-teamUsers">
              <div>A</div>
              <div>CD</div>
              <div>XYZ</div>
              <div>2+</div>
            </div>
          </div>

          <div className="EditorDashboard-hoursCard">
            <h3>
              Hours: <span>60</span>
            </h3>

            <div className="EditorDashboard-circleChart"></div>
          </div>

          <div className="EditorDashboard-taskCard">
            <h3>
              Task: <span>100/85</span>
            </h3>

            <div className="EditorDashboard-circleChart green"></div>
          </div>
        </div>

        {/* RIGHT GRAPH */}

        <div className="EditorDashboard-incomeCard">
          <div className="EditorDashboard-dateRange">
            <MdOutlineKeyboardArrowLeft />
            Feb 02 - Feb 08
          </div>

          <div className="EditorDashboard-incomeBoxes">
            <div>
              <span>$68,200</span>
              <p>Income</p>
            </div>

            <div>
              <span>$12,200</span>
              <p>Total</p>
            </div>
          </div>

          <div className="EditorDashboard-lineGraph">
            <div className="EditorDashboard-line1"></div>
            <div className="EditorDashboard-line2"></div>
          </div>

          <p className="EditorDashboard-incomeText">
            In the symphony of success, our total project income resonates as
            the crescendo of our endeavors.
          </p>
        </div>
      </div>

      {/* SECOND ROW */}

      <div className="EditorDashboard-middleGrid">
        {/* MEETING */}

        <div className="EditorDashboard-meetingCard">
          <h2>Meeting Schedule</h2>

          {meetings.map((meeting, index) => (
            <div className="EditorDashboard-meetingItem" key={index}>
              <div className="EditorDashboard-meetingIcons">
                <FaSkype />
                <MdGroups />
                <FaVideo />
              </div>

              <div className="EditorDashboard-meetingContent">
                <h4>{meeting.name}</h4>
                <p>{meeting.title}</p>
              </div>

              <span>{meeting.time}</span>
            </div>
          ))}
        </div>

        {/* ACTIVITY */}

        <div className="EditorDashboard-activityCard">
          <h2>Activity Hours</h2>

          <div className="EditorDashboard-chartPlaceholder">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <p>
            Your work performance is 30% better compared to last month
          </p>
        </div>

        {/* CHAT SECTION */}

        <div className="EditorDashboard-chatCard">
          <div className="EditorDashboard-chatHeader">
            <div className="EditorDashboard-chatAvatar">RA</div>

            <div>
              <h3>Innovision Squad</h3>
              <span>Online</span>
            </div>
          </div>

          <div className="EditorDashboard-chatBody">
            <div className="EditorDashboard-message right">
              Looks great, Alice! I'll start working on the backend
              functionalities to support it.
            </div>

            <div className="EditorDashboard-message left">
              I've encountered an issue with the database connection. Can
              someone help troubleshoot?
            </div>

            <div className="EditorDashboard-message right">
              Sure, Charlie. Let's hop on a call after lunch.
            </div>
          </div>

          <div className="EditorDashboard-chatInput">
            <input placeholder="Type a message" />
            <button>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      {/* TABLE + SIDEBAR */}

      <div className="EditorDashboard-bottomGrid">
        {/* TABLE */}

        <div className="EditorDashboard-tableCard">
          <div className="EditorDashboard-tableHeader">
            <div>
              Show
              <select>
                <option>10</option>
              </select>
              entries
            </div>

            <div>
              Search:
              <input type="text" />
            </div>
          </div>

          <table className="EditorDashboard-table">
            <thead>
              <tr>
                <th></th>
                <th>Project</th>
                <th>Status</th>
                <th>Type</th>
                <th>Team</th>
                <th>Preview</th>
                <th>Tracking</th>
                <th>Progress</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>

                  <td>
                    <strong>{item.project}</strong>
                    <p>John Mandela</p>
                  </td>

                  <td>{item.status}</td>

                  <td>{item.type}</td>

                  <td>
                    <div className="EditorDashboard-teamSmall">
                      <span>10+</span>
                    </div>
                  </td>

                  <td>{item.preview}</td>

                  <td>
                    <FaClock /> {item.tracking}
                  </td>

                  <td>{item.progress}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="EditorDashboard-pagination">
            <span>Showing 1 to 7 of 7 entries</span>

            <div className="EditorDashboard-paginationBtns">
              <button>Previous</button>
              <button className="active">1</button>
              <button>Next</button>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}

        <div className="EditorDashboard-sidebar">
          <div className="EditorDashboard-filesCard">
            <h2>Data Folder & Files</h2>

            <div className="EditorDashboard-fileItem">
              <FaFileAlt />
              <div>
                <h4>React Data</h4>
                <p>18 Files</p>
              </div>
              <span>32GB</span>
            </div>

            <div className="EditorDashboard-fileItem">
              <FaFolder />
              <div>
                <h4>React Data</h4>
                <p>18 Files</p>
              </div>
              <span>32GB</span>
            </div>

            <button className="EditorDashboard-viewMoreBtn">
              View More
            </button>
          </div>

          <div className="EditorDashboard-milestoneCard">
            <h2>There are no</h2>

            <h3>milestones for today</h3>

            <p>You can create milestones.</p>

            <button>Create Milestones</button>
          </div>
        </div>
      </div>

      <button className="EditorDashboard-scrollTop">
        <FaArrowUp />
      </button>
    </div>
  );
};

export default EditorDashboard;