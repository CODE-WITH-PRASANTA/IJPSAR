import React, { useEffect, useMemo, useState } from "react";
import "./Latestorders.css";
import {
  FiMoreVertical,
  FiChevronRight,
} from "react-icons/fi";

const formatDateTime = (dateValue) => {
  if (!dateValue) return "-";

  return new Date(dateValue).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getLatestFeedback = (paper) => {
  if (paper.editorRemarks) return paper.editorRemarks;

  const latestFeedback = paper.feedbackHistory?.[paper.feedbackHistory.length - 1];
  return latestFeedback?.remark || "Pending";
};

const getClassName = (value = "") =>
  value.toLowerCase().replace(/\s+/g, "-");

const Latestorders = ({ submissions = [], loading = false, error = "" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "dateTime",
    direction: "desc",
  });

  const papers = useMemo(
    () =>
      submissions
        .filter((paper) => paper.editorId || paper.editorName)
        .map((paper) => ({
          id: paper._id || paper.paperId,
          paperId: paper.paperId || "-",
          dateTime: formatDateTime(
            paper.completedAt ||
              paper.editorAssignedAt ||
              paper.updatedAt ||
              paper.createdAt
          ),
          dateSort:
            paper.completedAt ||
            paper.editorAssignedAt ||
            paper.updatedAt ||
            paper.createdAt,
          status: paper.status || "Editor Assigned",
          feedback: getLatestFeedback(paper),
          editorName: paper.editorName || "Assigned Editor",
        })),
    [submissions]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [papers.length, itemsPerPage]);

  const sortedPapers = useMemo(() => {
    const sortable = [...papers];

    sortable.sort((a, b) => {
      const firstValue = sortConfig.key === "dateTime" ? a.dateSort : a[sortConfig.key];
      const secondValue = sortConfig.key === "dateTime" ? b.dateSort : b[sortConfig.key];

      if (firstValue < secondValue)
        return sortConfig.direction === "asc" ? -1 : 1;

      if (firstValue > secondValue)
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

  const totalPages = Math.max(1, Math.ceil(sortedPapers.length / itemsPerPage));

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
              {loading && (
                <tr>
                  <td colSpan="7" className="emptyTableMessage">
                    Loading assigned papers...
                  </td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td colSpan="7" className="emptyTableMessage">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && currentPapers.length === 0 && (
                <tr>
                  <td colSpan="7" className="emptyTableMessage">
                    No editor-assigned papers found.
                  </td>
                </tr>
              )}

              {!loading && !error && currentPapers.map((item, idx) => (
                <tr key={item.id}>
                  <td className="colSl">
                    {indexOfFirst + idx + 1}
                  </td>

                  <td>{item.dateTime}</td>

                  <td>
                    <span
                      className={`status ${getClassName(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`feedback ${getClassName(item.feedback)}`}
                    >
                      {item.feedback}
                    </span>
                  </td>

                  <td className="editorCell">
                    {item.editorName}
                  </td>

                  <td className="colAction">
                    <button className="completedBtn">
                      {item.status} <FiChevronRight />
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
