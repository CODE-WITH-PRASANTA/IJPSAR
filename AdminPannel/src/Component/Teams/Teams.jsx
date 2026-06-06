import React, { useState } from "react";
import "./Teams.css";

const Teams = () => {
  // Static teams data
  const teams = [
    {
      name: "Quality Assurance",
      desc: "Product testing & automation",
      rating: 5,
      date: "25 Sep, 2024",
      members: ["A", "B", "C"],
    },
    {
      name: "Legal Team",
      desc: "Legal support & compliance",
      rating: 4,
      date: "25 Aug, 2024",
      members: ["A", "B"],
    },
    {
      name: "Product Management",
      desc: "Product development & lifecycle",
      rating: 5,
      date: "21 Oct, 2024",
      members: ["A", "B", "C", "D"],
    },
    {
      name: "Finance Team",
      desc: "Financial planning & budget",
      rating: 4,
      date: "20 Sep, 2024",
      members: ["A", "B", "C"],
    },
    {
      name: "Logistics Team",
      desc: "Supply chain & distribution",
      rating: 3,
      date: "20 Aug, 2024",
      members: ["A", "B"],
    },
  ];

  // Dynamic state for Block List management
  const [blockUsers, setBlockUsers] = useState([
    { name: "Esther Howard", commits: 6 },
    { name: "Tyler Hero", commits: 29 },
    { name: "Arlene McCoy", commits: 34 },
  ]);

  // State to track new user input field string
  const [inputValue, setInputValue] = useState("");

  // Handler to add a user to the block list
  const handleAddUser = () => {
    if (!inputValue.trim()) return; // Don't add blank strings

    const newUser = {
      name: inputValue.trim(),
      commits: Math.floor(Math.random() * 50), // Emulate random mock system commits
    };

    setBlockUsers([...blockUsers, newUser]);
    setInputValue(""); // Clean out the text input field upon creation
  };

  // Handler to run additions when user presses "Enter" inside the field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddUser();
    }
  };

  // Handler to delete/unblock a user by list index position
  const handleDeleteUser = (indexToDelete) => {
    setBlockUsers(blockUsers.filter((_, index) => index !== indexToDelete));
  };

  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={i < count ? "star active" : "star"}>
          ★
        </span>
      ));
  };

  return (
    <div className="teamsPage">
      {/* LEFT SIDE: TEAMS MANAGEMENT */}
      <div className="teamsCard">
        <div className="teamsHeader">
          <div>
            <h2>Teams</h2>
            <p className="subtitle">Manage organization units and performance data</p>
          </div>
          <div className="searchWrapper">
            <span className="searchIcon">🔍</span>
            <input placeholder="Search Teams..." />
          </div>
        </div>

        <div className="teamsTable">
          <div className="tableHead">
            <div>Team</div>
            <div>Rating</div>
            <div>Last Modified</div>
            <div>Members</div>
          </div>

          {teams.map((t, i) => (
            <div className="tableRow" key={i}>
              <div className="teamInfo">
                <input type="checkbox" className="customCheckbox" />
                <div>
                  <h4>{t.name}</h4>
                  <p>{t.desc}</p>
                </div>
              </div>

              <div className="rating">{renderStars(t.rating)}</div>

              <div className="date">{t.date}</div>

              <div className="members">
                <div className="avatarGroup">
                  {t.members.map((m, idx) => (
                    <div className={`avatar variant-${idx % 3}`} key={idx}>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* PREMIUM PAGINATION */}
          <div className="pagination">
            <div className="rowsPerPage">
              <span>Rows per page:</span>
              <select className="premiumSelect" defaultValue="5">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </select>
            </div>
            
            <div className="paginationControls">
              <span className="pageInfo">1-5 of 12</span>
              <div className="pages">
                <button className="navBtn">‹</button>
                <button className="pageBtn active">1</button>
                <button className="pageBtn">2</button>
                <button className="pageBtn">3</button>
                <button className="navBtn">›</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: BLOCK LIST */}
      <div className="blockCard">
        <div className="blockHeader">
          {/* Heading updated here */}
          <h3>Latest Publication</h3>
          <span className="badge">{blockUsers.length} Users</span>
        </div>

        <p className="blockDesc">
          Users on the block list are restricted from initiating chat workflows or transmitting live telemetry events.
        </p>

        <div className="blockInput">
          <input 
            placeholder="Block new user by username..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="addBtn" onClick={handleAddUser}>Add User</button>
        </div>

        <div className="blockUserList">
          {blockUsers.map((u, i) => (
            <div className="blockUser" key={i}>
              <div className="blockUserLeft">
                <div className="blockAvatar">{u.name ? u.name[0].toUpperCase() : "?"}</div>
                <div>
                  <h4>{u.name}</h4>
                  <p>{u.commits} system commits</p>
                </div>
              </div>
              <button 
                className="deleteBtn" 
                title="Unblock User"
                onClick={() => handleDeleteUser(i)}
              >
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
                  <path d="M11 5v9H3V5h8m-1.5-4h-5l-1 1H1v2h12V2h-4.5l-1-1zM12 4H2v10c0 .6.4 1 1 1h8c.6 0 1-.4 1-1V4z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;