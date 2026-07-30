import { useMemo, useState } from "react";
import "./Teams.css";

const formatDate = (date) => {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const getAuthorNames = (paper) =>
  paper.authors?.map((author) => author.fullName).filter(Boolean) || [];

const Teams = ({ submissions = [], publications = [], loading }) => {
  const [search, setSearch] = useState("");

  const filteredSubmissions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return submissions;

    return submissions.filter((paper) =>
      [paper.paperTitle, paper.paperId, paper.status]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [search, submissions]);

  return (
    <div className="teamsPage">
      <div className="teamsCard">
        <div className="teamsHeader">
          <div>
            <h2>Recent Submissions</h2>
            <p className="subtitle">The five most recently submitted papers</p>
          </div>
          <div className="searchWrapper">
            <span className="searchIcon" aria-hidden="true">⌕</span>
            <input
              aria-label="Search recent submissions"
              placeholder="Search papers..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="teamsTable">
          <div className="tableHead">
            <div>Paper</div>
            <div>Status</div>
            <div>Submitted</div>
            <div>Authors</div>
          </div>

          {loading && <div className="dashboardTableMessage">Loading submissions...</div>}

          {!loading && filteredSubmissions.length === 0 && (
            <div className="dashboardTableMessage">No matching submissions found.</div>
          )}

          {filteredSubmissions.map((paper) => {
            const authorNames = getAuthorNames(paper);

            return (
              <div className="tableRow" key={paper._id}>
                <div className="teamInfo">
                  <div>
                    <h4>{paper.paperTitle}</h4>
                    <p>{paper.paperId || "Paper ID unavailable"}</p>
                  </div>
                </div>

                <div>
                  <span className="paperStatus">{paper.status}</span>
                </div>

                <div className="date">{formatDate(paper.createdAt)}</div>

                <div className="members">
                  <div className="avatarGroup">
                    {authorNames.slice(0, 3).map((name, index) => (
                      <div
                        className={`avatar variant-${index % 3}`}
                        key={`${paper._id}-${name}`}
                        title={name}
                      >
                        {name.charAt(0).toUpperCase()}
                      </div>
                    ))}
                    {authorNames.length === 0 && <span className="noAuthors">—</span>}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="pagination">
            <span className="pageInfo">
              Showing {filteredSubmissions.length} recent submission
              {filteredSubmissions.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      <div className="blockCard">
        <div className="blockHeader">
          <h3>Latest Publications</h3>
          <span className="badge">{publications.length}</span>
        </div>

        <p className="blockDesc">
          Recently published papers available in the journal archive.
        </p>

        <div className="blockUserList">
          {loading && <p className="dashboardTableMessage">Loading publications...</p>}

          {!loading && publications.length === 0 && (
            <p className="dashboardTableMessage">No published papers yet.</p>
          )}

          {publications.map((paper) => (
            <div className="blockUser" key={paper._id}>
              <div className="blockUserLeft">
                <div className="blockAvatar">
                  {paper.paperTitle?.charAt(0).toUpperCase() || "P"}
                </div>
                <div>
                  <h4>{paper.paperTitle}</h4>
                  <p>{formatDate(paper.publishedAt || paper.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
