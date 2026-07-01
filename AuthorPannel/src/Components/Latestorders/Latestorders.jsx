import React, { useMemo, useState } from "react";
import "./Latestorders.css";
import {
  FiMoreVertical,
  FiChevronRight,
} from "react-icons/fi";

const Latestorders = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "dateTime",
    direction: "desc",
  });

  const papers = [
    {
      paperId: "PPR-2025-0784",
      dateTime: "Nov 28, 2025, 8:38 PM",
      status: "Completed",
      feedback: "Excellent",
      editorName: "Victoria Nelson",
    },
    {
      paperId: "PPR-2025-0770",
      dateTime: "Nov 27, 2025, 3:11 PM",
      status: "Completed",
      feedback: "Good",
      editorName: "Chloe Adams",
    },
    {
      paperId: "PPR-2025-0746",
      dateTime: "Nov 27, 2025, 12:06 AM",
      status: "In Review",
      feedback: "Pending",
      editorName: "William Lopez",
    },
    {
      paperId: "PPR-2025-0715",
      dateTime: "Nov 25, 2025, 2:25 PM",
      status: "Revision",
      feedback: "Needs Revision",
      editorName: "Sebastian Young",
    },
    {
      paperId: "PPR-2025-0699",
      dateTime: "Nov 24, 2025, 5:18 PM",
      status: "Completed",
      feedback: "Excellent",
      editorName: "Alexander Walker",
    },
    {
      paperId: "PPR-2025-0676",
      dateTime: "Nov 23, 2025, 9:48 PM",
      status: "Completed",
      feedback: "Satisfactory",
      editorName: "Charlotte White",
    },
    {
      paperId: "PPR-2025-0645",
      dateTime: "Nov 23, 2025, 12:33 AM",
      status: "Revision",
      feedback: "Needs Revision",
      editorName: "Ava Johnson",
    },
    {
      paperId: "PPR-2025-0794",
      dateTime: "Nov 21, 2025, 10:56 PM",
      status: "Completed",
      feedback: "Good",
      editorName: "David Ramirez",
    },
    {
      paperId: "PPR-2025-0629",
      dateTime: "Nov 21, 2025, 4:16 PM",
      status: "Completed",
      feedback: "Excellent",
      editorName: "Isabella Brown",
    },
    {
      paperId: "PPR-2025-0723",
      dateTime: "Nov 20, 2025, 6:57 PM",
      status: "In Review",
      feedback: "Pending",
      editorName: "Ella Hernandez",
    },
    {
      paperId: "PPR-2025-0606",
      dateTime: "Nov 20, 2025, 1:51 PM",
      status: "Completed",
      feedback: "Good",
      editorName: "James Wilson",
    },
    {
      paperId: "PPR-2025-0592",
      dateTime: "Nov 19, 2025, 9:35 PM",
      status: "Revision",
      feedback: "Needs Revision",
      editorName: "Michael Thompson",
    },
    {
      paperId: "PPR-2025-0578",
      dateTime: "Nov 18, 2025, 8:02 PM",
      status: "Completed",
      feedback: "Excellent",
      editorName: "Daniel Rodriguez",
    },
    {
      paperId: "PPR-2025-0652",
      dateTime: "Nov 18, 2025, 12:41 PM",
      status: "Completed",
      feedback: "Satisfactory",
      editorName: "Noah Anderson",
    },
    {
      paperId: "PPR-2025-0754",
      dateTime: "Nov 17, 2025, 10:29 PM",
      status: "Completed",
      feedback: "Good",
      editorName: "Grace Scott",
    },
    {
      paperId: "PPR-2025-0585",
      dateTime: "Nov 17, 2025, 2:48 PM",
      status: "Completed",
      feedback: "Excellent",
      editorName: "Emily Carter",
    },
    {
      paperId: "PPR-2025-0614",
      dateTime: "Nov 16, 2025, 11:40 PM",
      status: "Completed",
      feedback: "Satisfactory",
      editorName: "Olivia Martinez",
    },
    {
      paperId: "PPR-2025-0801",
      dateTime: "Nov 16, 2025, 2:19 PM",
      status: "Completed",
      feedback: "Good",
      editorName: "Natalie Moore",
    },
    {
      paperId: "PPR-2025-0599",
      dateTime: "Nov 15, 2025, 5:12 PM",
      status: "Rejected",
      feedback: "Not Suitable",
      editorName: "Sophia Nguyen",
    },
    {
      paperId: "PPR-2025-0731",
      dateTime: "Nov 15, 2025, 3:44 PM",
      status: "Completed",
      feedback: "Excellent",
      editorName: "Jack King",
    },
  ];

  const sortedPapers = useMemo(() => {
    let sortable = [...papers];

    sortable.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;

      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;

      return 0;
    });

    return sortable;
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";

    if (
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentPapers = sortedPapers.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    sortedPapers.length / itemsPerPage
  );

  const sortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return (
      <span className="sortArrow">
        {sortConfig.direction === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div className="latestOrders">
      <div className="ordersCard">
        <div className="cardHeader">
          <div className="headerText">
            <span className="eyebrow">Editorial Desk</span>
            <h3>Completed Papers</h3>
          </div>

          <div className="menuWrapper">
            <button
              className="menuBtn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FiMoreVertical />
            </button>

            {menuOpen && (
              <div className="dropdownMenu">
                <button>Export CSV</button>
                <button>Export PDF</button>
                <button>Export Excel</button>
                <button>Refresh Data</button>
              </div>
            )}
          </div>
        </div>

        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th className="colSl">Sl. No</th>

                <th onClick={() => requestSort("dateTime")}>
                  Date &amp; Time {sortArrow("dateTime")}
                </th>

                <th onClick={() => requestSort("status")}>
                  Status {sortArrow("status")}
                </th>

                <th onClick={() => requestSort("feedback")}>
                  Feedback {sortArrow("feedback")}
                </th>

                <th onClick={() => requestSort("editorName")}>
                  Editor Name {sortArrow("editorName")}
                </th>

                <th className="colAction">Action</th>

                <th onClick={() => requestSort("paperId")}>
                  Paper ID {sortArrow("paperId")}
                </th>
              </tr>
            </thead>

            <tbody>
              {currentPapers.map((item, idx) => (
                <tr key={item.paperId}>
                  <td className="colSl">
                    {indexOfFirst + idx + 1}
                  </td>

                  <td>{item.dateTime}</td>

                  <td>
                    <span
                      className={`status ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`feedback ${item.feedback
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {item.feedback}
                    </span>
                  </td>

                  <td className="editorCell">
                    {item.editorName}
                  </td>

                  <td className="colAction">
                    <button className="completedBtn">
                      Completed <FiChevronRight />
                    </button>
                  </td>

                  <td className="paperIdCell">
                    {item.paperId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="itemsPerPage">
            <span>Rows per page:</span>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={8}>8</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          <div className="pageControls">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
            >
              ◀
            </button>

            <span>
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latestorders;