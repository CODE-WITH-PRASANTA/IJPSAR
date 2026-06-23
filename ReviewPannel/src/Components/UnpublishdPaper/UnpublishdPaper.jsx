import React, { useState, useEffect } from "react";
import "./UnpublishdPaper.css";
import {
  FaSearch,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const UnpublishdPaper = () => {
  const papersData = [
    {
      regId: "ijrar236154",
      title:
        "CONCURRENT PROCESS ANALYTICAL METHOD DEVELOPMENT AND VALIDATION",
      author: "Jyotsana Upadhyay",
      institute: "GIS IPS, DEHRADUN",
      status: "Paper Published Successfully",
      paperId: "IJRAR21C1232",
      payment: "Received 1",
    },
    {
      regId: "ijrar239143",
      title:
        "FORMULATION AND EVALUATION OF BIOADHESIVE MICROSPHERE",
      author: "Deepankar Akoliya",
      institute: "GIS IPS, DEHRADUN",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1307",
      payment: "Received 1",
    },
    {
      regId: "ijrar239156",
      title:
        "FORMULATION AND CHARACTERIZATION OF NANOFORMULATION",
      author: "Rohit Mehra",
      institute: "GIS IPS, DEHRADUN",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1308",
      payment: "Received 1",
    },
    {
      regId: "ijrar239157",
      title: "ADVANCED DRUG DELIVERY SYSTEM",
      author: "Ankita Negi",
      institute: "GIS IPS",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1309",
      payment: "Received 1",
    },
    {
      regId: "ijrar239158",
      title: "PHARMACEUTICAL ANALYSIS",
      author: "Kashif Hussain",
      institute: "GIS IPS",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1310",
      payment: "Received 1",
    },
    {
      regId: "ijrar239159",
      title: "NANOTECHNOLOGY IN PHARMACY",
      author: "Praveen Kumar",
      institute: "GIS IPS",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1311",
      payment: "Received 1",
    },
    {
      regId: "ijrar239160",
      title: "PHARMACEUTICAL CHEMISTRY",
      author: "Ravi Sharma",
      institute: "GIS IPS",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1312",
      payment: "Received 1",
    },
    {
      regId: "ijrar239161",
      title: "CLINICAL RESEARCH",
      author: "Amit Singh",
      institute: "GIS IPS",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1313",
      payment: "Received 1",
    },
    {
      regId: "ijrar239162",
      title: "DRUG DISCOVERY",
      author: "Neha Verma",
      institute: "GIS IPS",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1314",
      payment: "Received 1",
    },
    {
      regId: "ijrar239163",
      title: "BIOTECHNOLOGY RESEARCH",
      author: "Pooja Gupta",
      institute: "GIS IPS",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1315",
      payment: "Received 1",
    },
    {
      regId: "ijrar239164",
      title:
        "ADVANCED RESEARCH IN PHARMACEUTICAL SCIENCES AND DRUG DEVELOPMENT",
      author: "Rahul Das",
      institute: "GIS IPS",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1316",
      payment: "Received 1",
    },
    {
      regId: "ijrar239165",
      title:
        "RECENT TRENDS IN MEDICINAL CHEMISTRY AND NANOTECHNOLOGY",
      author: "Amit Roy",
      institute: "GIS IPS",
      status: "Paper Published Successfully",
      paperId: "IJRAR21D1317",
      payment: "Received 1",
    },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({});

  const rowsPerPage = 10;

  const filteredData = papersData.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.regId.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(
    filteredData.length / rowsPerPage
  );

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;

  const currentData = filteredData.slice(
    indexOfFirst,
    indexOfLast
  );

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="unpublishdpaper">
      <div className="unpublishdpaper-card">

        <div className="unpublishdpaper-header">
          <h2>
            Review Status Abbrivation : 0 - Not Reviewed |
            1 - Accepted | PA - Partially Accepted |
            R - Rejected
          </h2>

          <div className="unpublishdpaper-search">
            <FaSearch />

            <input
              type="text"
              placeholder="Search paper..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        <div className="unpublishdpaper-table-wrapper">
          <table className="unpublishdpaper-table">
            <thead>
              <tr>
                <th>Reg ID</th>
                <th>Title</th>
                <th>Authors</th>
                <th>Institute</th>
                <th>Review Status</th>
                <th>Paper ID</th>
                <th>Payment Details</th>
                <th>View Paper</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((paper) => (
                <tr key={paper.regId}>
                  <td>{paper.regId}</td>

                  <td className="title-column">
                    {expanded[paper.regId]
                      ? paper.title
                      : paper.title.length > 35
                      ? paper.title.substring(0, 35) +
                        "..."
                      : paper.title}

                    {paper.title.length > 35 && (
                      <button
                        className="read-more-btn"
                        onClick={() =>
                          toggleReadMore(
                            paper.regId
                          )
                        }
                      >
                        {expanded[paper.regId]
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                  </td>

                  <td>{paper.author}</td>

                  <td>{paper.institute}</td>

                  <td>
                    <span className="unpublishdpaper-status">
                      {paper.status}
                    </span>
                  </td>

                  <td>{paper.paperId}</td>

                  <td>{paper.payment}</td>

                  <td>
                    <button className="unpublishdpaper-view-btn">
                      <FaEye />
                      VIEW
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="unpublishdpaper-pagination">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
            >
              <FaChevronLeft />
            </button>

            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((number) => (
              <button
                key={number}
                className={
                  currentPage === number
                    ? "active-page"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(number)
                }
              >
                {number}
              </button>
            ))}

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
            >
              <FaChevronRight />
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default UnpublishdPaper;