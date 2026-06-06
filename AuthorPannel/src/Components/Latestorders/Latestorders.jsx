import React, { useMemo, useState } from "react";
import "./Latestorders.css";
import {
  FiMoreVertical,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const Latestorders = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "asc",
  });

  const orders = [
    {
      id: 784720,
      date: "Nov 28, 2025, 8:38 PM",
      status: "Pending",
      amount: 189,
      customer: "Victoria Nelson",
    },
    {
      id: 784704,
      date: "Nov 27, 2025, 3:11 PM",
      status: "Paid",
      amount: 229,
      customer: "Chloe Adams",
    },
    {
      id: 784680,
      date: "Nov 27, 2025, 0:06 AM",
      status: "Paid",
      amount: 499,
      customer: "William Lopez",
    },
    {
      id: 784649,
      date: "Nov 25, 2025, 2:25 PM",
      status: "Pending",
      amount: 159,
      customer: "Sebastian Young",
    },
    {
      id: 784633,
      date: "Nov 24, 2025, 5:18 PM",
      status: "Paid",
      amount: 649,
      customer: "Alexander Walker",
    },
    {
      id: 784610,
      date: "Nov 23, 2025, 9:48 PM",
      status: "Paid",
      amount: 329,
      customer: "Charlotte White",
    },
    {
      id: 784579,
      date: "Nov 23, 2025, 0:33 AM",
      status: "Pending",
      amount: 219,
      customer: "Ava Johnson",
    },
    {
      id: 784728,
      date: "Nov 21, 2025, 10:56 PM",
      status: "Paid",
      amount: 349.99,
      customer: "David Ramirez",
    },
    {
      id: 784563,
      date: "Nov 21, 2025, 4:16 PM",
      status: "Paid",
      amount: 549,
      customer: "Isabella Brown",
    },
    {
      id: 784657,
      date: "Nov 20, 2025, 6:57 PM",
      status: "Paid",
      amount: 279.99,
      customer: "Ella Hernandez",
    },
    {
      id: 784540,
      date: "Nov 20, 2025, 1:51 PM",
      status: "Paid",
      amount: 399,
      customer: "James Wilson",
    },
    {
      id: 784526,
      date: "Nov 19, 2025, 9:35 PM",
      status: "Pending",
      amount: 129.5,
      customer: "Michael Thompson",
    },
    {
      id: 784512,
      date: "Nov 18, 2025, 8:02 PM",
      status: "Paid",
      amount: 249.99,
      customer: "Daniel Rodriguez",
    },
    {
      id: 784586,
      date: "Nov 18, 2025, 0:41 PM",
      status: "Paid",
      amount: 149.99,
      customer: "Noah Anderson",
    },
    {
      id: 784688,
      date: "Nov 17, 2025, 10:29 PM",
      status: "Fulfilled",
      amount: 169,
      customer: "Grace Scott",
    },
    {
      id: 784519,
      date: "Nov 17, 2025, 2:48 PM",
      status: "Fulfilled",
      amount: 89,
      customer: "Emily Carter",
    },
    {
      id: 784548,
      date: "Nov 16, 2025, 11:40 PM",
      status: "Fulfilled",
      amount: 179.99,
      customer: "Olivia Martinez",
    },
    {
      id: 784735,
      date: "Nov 16, 2025, 2:19 PM",
      status: "Fulfilled",
      amount: 109,
      customer: "Natalie Moore",
    },
    {
      id: 784533,
      date: "Nov 15, 2025, 5:12 PM",
      status: "Cancelled",
      amount: 59.99,
      customer: "Sophia Nguyen",
    },
    {
      id: 784665,
      date: "Nov 15, 2025, 3:44 PM",
      status: "Fulfilled",
      amount: 119,
      customer: "Jack King",
    },
  ];

  const sortedOrders = useMemo(() => {
    let sortable = [...orders];

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

  const currentOrders = sortedOrders.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    sortedOrders.length / itemsPerPage
  );

  return (
    <div className="latestOrders">
      <div className="ordersCard">
        <div className="cardHeader">
          <h3>Latest Orders</h3>

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
                <th onClick={() => requestSort("id")}>
                  ID
                </th>

                <th onClick={() => requestSort("date")}>
                  Date
                </th>

                <th onClick={() => requestSort("status")}>
                  Status
                </th>

                <th onClick={() => requestSort("amount")}>
                  Amount
                </th>

                <th onClick={() => requestSort("customer")}>
                  Customer
                </th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>{item.date}</td>

                  <td>
                    <span
                      className={`status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>${item.amount}</td>

                  <td>{item.customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="itemsPerPage">
            <span>Items per page:</span>

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