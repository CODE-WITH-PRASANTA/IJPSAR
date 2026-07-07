import React, { useMemo, useState } from "react";
import "./SalesTime.css";
import {
  FaSearch,
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
} from "react-icons/fa";

const COLORS = ["#6C63FF", "#F552C4", "#1ABC9C", "#5568FE", "#F59E0B"];

const formatDate = (dateValue) => {
  if (!dateValue) return "-";

  return new Date(dateValue).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "A";

const SalesTime = ({ submissions = [], loading = false, error = "" }) => {
  const [search, setSearch] = useState("");

  const teamData = useMemo(() => {
    const authorMap = new Map();

    submissions.forEach((paper) => {
      const authors = paper.authors?.length
        ? paper.authors
        : [{ fullName: paper.authorName || "Unknown Author" }];

      authors.forEach((author) => {
        const name = author.fullName || "Unknown Author";
        const key = author.email || name;
        const current = authorMap.get(key) || {
          id: key,
          team: name,
          desc: author.organization || author.designation || "Author",
          rating: 5,
          modifiedAt: paper.updatedAt || paper.createdAt,
          papers: 0,
          members: [],
        };

        const latestTime = new Date(current.modifiedAt || 0).getTime();
        const paperTime = new Date(paper.updatedAt || paper.createdAt || 0).getTime();

        current.papers += 1;
        current.modifiedAt = paperTime > latestTime
          ? paper.updatedAt || paper.createdAt
          : current.modifiedAt;
        current.members = authors.slice(0, 4).map((item, index) => ({
          name: getInitials(item.fullName),
          color: COLORS[index % COLORS.length],
        }));

        authorMap.set(key, current);
      });
    });

    return Array.from(authorMap.values()).sort(
      (a, b) => new Date(b.modifiedAt || 0) - new Date(a.modifiedAt || 0)
    );
  }, [submissions]);

  const latestPublications = useMemo(
    () =>
      submissions
        .filter((paper) => paper.status === "Published" || paper.isPublished)
        .sort(
          (a, b) =>
            new Date(b.publishedAt || b.updatedAt || b.createdAt || 0) -
            new Date(a.publishedAt || a.updatedAt || a.createdAt || 0)
        )
        .slice(0, 5),
    [submissions]
  );

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
                  All authors found from submitted papers
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
                    <th className="SalesTime_TableTh">AUTHOR</th>
                    <th className="SalesTime_TableTh">RATING</th>
                    <th className="SalesTime_TableTh">LAST MODIFIED</th>
                    <th className="SalesTime_TableTh">MEMBERS</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td className="SalesTime_EmptyState" colSpan="5">
                        Loading authors...
                      </td>
                    </tr>
                  )}

                  {!loading && error && (
                    <tr>
                      <td className="SalesTime_EmptyState" colSpan="5">
                        {error}
                      </td>
                    </tr>
                  )}

                  {!loading && !error && filteredTeams.length === 0 && (
                    <tr>
                      <td className="SalesTime_EmptyState" colSpan="5">
                        No authors found.
                      </td>
                    </tr>
                  )}

                  {!loading && !error && filteredTeams.map((item) => (
                    <tr key={item.id} className="SalesTime_TableBodyRow">
                      <td className="SalesTime_TableTd CheckboxCell">
                        <input type="checkbox" className="SalesTime_RowCheckbox" />
                      </td>
                      <td className="SalesTime_TableTd">
                        <div className="SalesTime_TeamProfile">
                          <h4 className="SalesTime_TeamName">{item.team}</h4>
                          <span className="SalesTime_TeamDescription">
                            {item.desc} - {item.papers} paper{item.papers === 1 ? "" : "s"}
                          </span>
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
                        {formatDate(item.modifiedAt)}
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
                <span className="SalesTime_PaginationStatus">
                  {filteredTeams.length ? `1-${filteredTeams.length} of ${filteredTeams.length}` : "0 of 0"}
                </span>
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
                  Latest 5 published papers from all authors.
                </p>
              </div>
              <span className="SalesTime_CounterBadge">
                {latestPublications.length} Papers
              </span>
            </div>

            <div className="SalesTime_UserDirectoryList">
              {loading && (
                <p className="SalesTime_EmptyDirectory">Loading publications...</p>
              )}

              {!loading && !error && latestPublications.length === 0 && (
                <p className="SalesTime_EmptyDirectory">No published papers found.</p>
              )}

              {!loading && error && (
                <p className="SalesTime_EmptyDirectory">{error}</p>
              )}

              {!loading && !error && latestPublications.map((paper) => (
                <div className="SalesTime_UserDirectoryCard" key={paper._id || paper.paperId}>
                  <div className="SalesTime_UserDirectoryMeta">
                    <div className="SalesTime_DirectoryAvatar">
                      <FaFileAlt />
                    </div>
                    <div className="SalesTime_DirectoryInfo">
                      <h4 className="SalesTime_DirectoryName">{paper.paperTitle}</h4>
                      <span className="SalesTime_DirectorySubtext">
                        {paper.paperId} - {formatDate(paper.publishedAt || paper.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <span className="SalesTime_PublicationStatus">{paper.status}</span>
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
