import React, { useState } from "react";
import "./PublishPapper.css";
import {
  FaHome,
  FaSearch,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const PublishPapper = () => {
  const papers = [
    {
      id: "ijrar236154",
      title:
        "CONCURRENT PROCESS ANALYTICAL METHOD DEVELOPMENT AND VALIDATION",
      author: "Jyotsana Upadhyay",
      institute: "GIS IPS, DEHRADUN",
      paperId: "IJRAR21C1252",
    },
    {
      id: "ijrar239143",
      title: "FORMULATION AND EVALUATION OF BIOADHESIVE MICROSPHERE",
      author: "Deepankar Akoliya",
      institute: "GIS IPS, DEHRADUN",
      paperId: "IJRAR21D1307",
    },
    {
      id: "ijrar239156",
      title: "FORMULATION AND CHARACTERIZATION OF NANOFORMULATION",
      author: "Rohit Mehra",
      institute: "GISIPS, DEHRADUN",
      paperId: "IJRAR21D1308",
    },
    {
      id: "ijrar239157",
      title: "ADVANCED DRUG DELIVERY SYSTEM",
      author: "Ankita Negi",
      institute: "GIS IPS",
      paperId: "IJRAR21D1309",
    },
    {
      id: "ijrar239158",
      title: "PHARMACEUTICAL ANALYSIS",
      author: "Kashif Hussain",
      institute: "GIS IPS",
      paperId: "IJRAR21D1310",
    },
    {
      id: "ijrar239159",
      title: "NANOTECHNOLOGY IN PHARMACY",
      author: "Praveen Kumar",
      institute: "GIS IPS",
      paperId: "IJRAR21D1311",
    },
    {
      id: "ijrar239160",
      title: "PHARMACEUTICAL CHEMISTRY",
      author: "Ravi Sharma",
      institute: "GIS IPS",
      paperId: "IJRAR21D1312",
    },
    {
      id: "ijrar239161",
      title: "CLINICAL RESEARCH",
      author: "Amit Singh",
      institute: "GIS IPS",
      paperId: "IJRAR21D1313",
    },
    {
      id: "ijrar239162",
      title: "DRUG DISCOVERY",
      author: "Neha Verma",
      institute: "GIS IPS",
      paperId: "IJRAR21D1314",
    },
    {
      id: "ijrar239163",
      title: "BIOTECHNOLOGY RESEARCH",
      author: "Pooja Gupta",
      institute: "GIS IPS",
      paperId: "IJRAR21D1315",
    },
    {
      id: "ijrar239164",
      title: "PHARMACOGNOSY STUDY",
      author: "Rahul Das",
      institute: "GIS IPS",
      paperId: "IJRAR21D1316",
    },
    {
      id: "ijrar239165",
      title: "HERBAL MEDICINE RESEARCH",
      author: "Manoj Kumar",
      institute: "GIS IPS",
      paperId: "IJRAR21D1317",
    },
    {
      id: "ijrar239166",
      title: "DRUG FORMULATION",
      author: "Sneha Roy",
      institute: "GIS IPS",
      paperId: "IJRAR21D1318",
    },
    {
      id: "ijrar239167",
      title: "NANOPARTICLE DELIVERY",
      author: "Deepak Sharma",
      institute: "GIS IPS",
      paperId: "IJRAR21D1319",
    },
    {
      id: "ijrar239168",
      title: "PHARMACOLOGY REVIEW",
      author: "Kiran Patel",
      institute: "GIS IPS",
      paperId: "IJRAR21D1320",
    },
    {
      id: "ijrar239169",
      title: "MOLECULAR BIOLOGY",
      author: "Ritika Jain",
      institute: "GIS IPS",
      paperId: "IJRAR21D1321",
    },
    {
      id: "ijrar239170",
      title: "GENETIC ENGINEERING",
      author: "Abhishek Roy",
      institute: "GIS IPS",
      paperId: "IJRAR21D1322",
    },
    {
      id: "ijrar239171",
      title: "BIOINFORMATICS",
      author: "Aditi Sharma",
      institute: "GIS IPS",
      paperId: "IJRAR21D1323",
    },
    {
      id: "ijrar239172",
      title: "MEDICAL RESEARCH",
      author: "Harsh Verma",
      institute: "GIS IPS",
      paperId: "IJRAR21D1324",
    },
    {
      id: "ijrar239173",
      title: "ADVANCE PHARMACEUTICS",
      author: "Anjali Singh",
      institute: "GIS IPS",
      paperId: "IJRAR21D1325",
    },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  const filteredData = papers.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="PublishPapper-">
     

      <div className="PublishPapper-Card">
        <div className="PublishPapper-ReviewStatus">
          Review Status Abbrivation : 0 - Not Reviewed | 1 - Accepted |
          PA-Partially Accepted | R-Rejected
        </div>

        <div className="PublishPapper-TopBar">
          <select className="PublishPapper-Select">
            <option>10</option>
          </select>

          <div className="PublishPapper-Search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search paper..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="PublishPapper-TableWrapper">
          <table className="PublishPapper-Table">
            <thead>
              <tr>
                <th>Reg ID</th>
                <th>Title</th>
                <th>Authors</th>
                <th>Institute</th>
                <th>Review Status</th>
                <th>Paper id</th>
                <th>Payment Details</th>
                <th>View Published Paper</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.institute}</td>
                  <td>
                    <span className="PublishPapper-Status">
                      Paper Published Successfully
                    </span>
                  </td>
                  <td>{item.paperId}</td>
                  <td>Received 1</td>
                  <td>
                    <button className="PublishPapper-ViewBtn">
                      <FaEye /> VIEW
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="PublishPapper-Pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaChevronLeft />
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishPapper;