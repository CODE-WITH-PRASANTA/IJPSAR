import React, { useState } from "react";
import "./SalesTime.css";
import {
  FaSearch,
  FaStar,
  FaRegStar,
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
} from "react-icons/fa";

const SalesTime = () => {
  const [search, setSearch] = useState("");

  const teamData = [
    {
      id: 1,
      team: "Quality Assurance",
      desc: "Product testing & automation",
      rating: 5,
      modified: "25 Sep, 2024",
      members: [
        { name: "A", color: "#6C63FF" },
        { name: "B", color: "#F552C4" },
        { name: "C", color: "#1ABC9C" },
      ],
    },
    {
      id: 2,
      team: "Legal Team",
      desc: "Legal support & compliance",
      rating: 4,
      modified: "25 Aug, 2024",
      members: [
        { name: "A", color: "#6C63FF" },
        { name: "B", color: "#F552C4" },
      ],
    },
    {
      id: 3,
      team: "Product Management",
      desc: "Product development & lifecycle",
      rating: 5,
      modified: "21 Oct, 2024",
      members: [
        { name: "A", color: "#6C63FF" },
        { name: "B", color: "#F552C4" },
        { name: "C", color: "#1ABC9C" },
        { name: "D", color: "#5568FE" },
      ],
    },
    {
      id: 4,
      team: "Finance Team",
      desc: "Financial planning & budget",
      rating: 4,
      modified: "20 Sep, 2024",
      members: [
        { name: "A", color: "#6C63FF" },
        { name: "B", color: "#F552C4" },
        { name: "C", color: "#1ABC9C" },
      ],
    },
    {
      id: 5,
      team: "Logistics Team",
      desc: "Supply chain & distribution",
      rating: 3,
      modified: "20 Aug, 2024",
      members: [
        { name: "A", color: "#6C63FF" },
        { name: "B", color: "#F552C4" },
      ],
    },
  ];

  const users = [
    {
      id: 1,
      name: "Esther Howard",
      commits: "6 system commits",
      avatar: "E",
    },
    {
      id: 2,
      name: "Tyler Hero",
      commits: "29 system commits",
      avatar: "T",
    },
    {
      id: 3,
      name: "Arlene McCoy",
      commits: "34 system commits",
      avatar: "A",
    },
  ];

  const filteredTeams = teamData.filter((item) =>
    item.team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="SalesTime_Wrapper">
      <div className="SalesTime_DashboardContainer">
        
        {/* LEFT COLUMN: TEAMS TABLE MANAGEMENT */}
        <div className="SalesTime_PrimaryColumn">
          <div className="SalesTime_ManagementCard">
            
            <div className="SalesTime_PanelHeader">
              <div className="SalesTime_PanelMeta">
                <h2 className="SalesTime_PanelTitle">Teams</h2>
                <p className="SalesTime_PanelSubtitle">
                  Manage organization units and performance data
                </p>
              </div>

              <div className="SalesTime_SearchContainer">
                <FaSearch className="SalesTime_SearchIcon" />
                <input
                  type="text"
                  className="SalesTime_SearchField"
                  placeholder="Search Teams..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="SalesTime_TableResponsiveWrapper">
              <table className="SalesTime_DataTable">
                <thead>
                  <tr className="SalesTime_TableHeaderRow">
                    <th className="SalesTime_TableTh CheckboxCell">
                      <input type="checkbox" className="SalesTime_HeaderCheckbox" />
                    </th>
                    <th className="SalesTime_TableTh">TEAM</th>
                    <th className="SalesTime_TableTh">RATING</th>
                    <th className="SalesTime_TableTh">LAST MODIFIED</th>
                    <th className="SalesTime_TableTh">MEMBERS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((item) => (
                    <tr key={item.id} className="SalesTime_TableBodyRow">
                      <td className="SalesTime_TableTd CheckboxCell">
                        <input type="checkbox" className="SalesTime_RowCheckbox" />
                      </td>
                      <td className="SalesTime_TableTd">
                        <div className="SalesTime_TeamProfile">
                          <h4 className="SalesTime_TeamName">{item.team}</h4>
                          <span className="SalesTime_TeamDescription">{item.desc}</span>
                        </div>
                      </td>
                      <td className="SalesTime_TableTd">
                        <div className="SalesTime_RatingStarsGroup">
                          {[1, 2, 3, 4, 5].map((star) =>
                            star <= item.rating ? (
                              <FaStar key={star} className="SalesTime_StarIcon Filled" />
                            ) : (
                              <FaRegStar key={star} className="SalesTime_StarIcon Empty" />
                            )
                          )}
                        </div>
                      </td>
                      <td className="SalesTime_TableTd SalesTime_DateValue">
                        {item.modified}
                      </td>
                      <td className="SalesTime_TableTd">
                        <div className="SalesTime_AvatarGroupStack">
                          {item.members.map((m, index) => (
                            <div
                              key={index}
                              className="SalesTime_UserBadgeAvatar"
                              style={{ backgroundColor: m.color }}
                            >
                              {m.name}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="SalesTime_PanelFooter">
              <div className="SalesTime_RowsPerPageSelector">
                <span className="SalesTime_FooterText">Rows per page</span>
                <select className="SalesTime_PageDropdown">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>

              <div className="SalesTime_PaginationControlGroup">
                <span className="SalesTime_PaginationStatus">1-5 of 12</span>
                <div className="SalesTime_PaginationBtnStack">
                  <button className="SalesTime_PaginationNavBtn" aria-label="Previous Page">
                    <FaChevronLeft />
                  </button>
                  <button className="SalesTime_PaginationNumberBtn Active">1</button>
                  <button className="SalesTime_PaginationNumberBtn">2</button>
                  <button className="SalesTime_PaginationNumberBtn">3</button>
                  <button className="SalesTime_PaginationNavBtn" aria-label="Next Page">
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: RESTRICTIONS & PUBLICATIONS */}
        <div className="SalesTime_SecondaryColumn">
          <div className="SalesTime_ManagementCard">
            
            <div className="SalesTime_SidebarCardTop">
              <div className="SalesTime_SidebarCardMeta">
                <h2 className="SalesTime_SidebarCardTitle">Latest Publication</h2>
                <p className="SalesTime_SidebarCardDescription">
                  Users on the block list are restricted from initiating chat workflows.
                </p>
              </div>
              <span className="SalesTime_CounterBadge">
                {users.length} Users
              </span>
            </div>

            <div className="SalesTime_ActionInputGroup">
              <input
                type="text"
                className="SalesTime_FormInputField"
                placeholder="Block new user by username..."
              />
              <button className="SalesTime_FormSubmitBtn">
                <FaPlus className="SalesTime_BtnIcon" />
                <span>Add User</span>
              </button>
            </div>

            <div className="SalesTime_UserDirectoryList">
              {users.map((user) => (
                <div className="SalesTime_UserDirectoryCard" key={user.id}>
                  <div className="SalesTime_UserDirectoryMeta">
                    <div className="SalesTime_DirectoryAvatar">
                      {user.avatar}
                    </div>
                    <div className="SalesTime_DirectoryInfo">
                      <h4 className="SalesTime_DirectoryName">{user.name}</h4>
                      <span className="SalesTime_DirectorySubtext">{user.commits}</span>
                    </div>
                  </div>
                  <button className="SalesTime_DirectoryDeleteAction" aria-label="Delete User">
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SalesTime;