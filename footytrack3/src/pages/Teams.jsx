import React, { useState } from "react";
import { Link } from "react-router-dom";
import teams from "../data/teams";
import "../styles/Teams.css"; // Updated to use Teams.css

const Teams = () => {
  const [search, setSearch] = useState("");
  const [sortAttribute, setSortAttribute] = useState(""); // Selected attribute
  const [sortOrder, setSortOrder] = useState(""); // Sort order ("asc" or "desc")

  let filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort teams based on selected attribute and order
  if (sortAttribute) {
    filteredTeams = [...filteredTeams].sort((a, b) => {
      // Define numeric attributes for teams
      const numericAttributes = ["wins", "draws", "losses", "points"];
      const isNumeric = numericAttributes.includes(sortAttribute);
      const valA = isNumeric ? Number(a[sortAttribute]) : a[sortAttribute];
      const valB = isNumeric ? Number(b[sortAttribute]) : b[sortAttribute];

      if (sortOrder === "asc") {
        return isNumeric ? valA - valB : valA.localeCompare(valB);
      } else if (sortOrder === "desc") {
        return isNumeric ? valB - valA : valB.localeCompare(valA);
      }
      return 0;
    });
  }

  return (
    <section className="section">
      <h1 className="title has-text-centered">Premier League Teams</h1>
      
      {/* Search Bar */}
      <div className="field">
        <input
          className="input"
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Extra space added between search bar and sorting controls */}
      <div style={{ marginTop: '1rem' }}>
        {/* Sorting Controls on One Line */}
        <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label className="label" style={{ marginBottom: 0 }}>Sort By:</label>
          <div className="select">
            <select
              value={sortAttribute}
              onChange={(e) => {
                const attribute = e.target.value;
                setSortAttribute(attribute);
                // Set default sort order based on attribute:
                // For "losses", lower is better (ascending);
                // For "wins", "draws", "points", default descending;
                // For string attributes (like "name"), default ascending.
                if (attribute === "") {
                  setSortOrder("");
                } else if (attribute === "losses") {
                  setSortOrder("asc");
                } else if (["wins", "draws", "points"].includes(attribute)) {
                  setSortOrder("desc");
                } else {
                  setSortOrder("asc");
                }
              }}
            >
              <option value="">Select Attribute</option>
              <option value="name">Name</option>
              <option value="wins">Wins</option>
              <option value="draws">Draws</option>
              <option value="losses">Losses</option>
              <option value="points">Points</option>
            </select>
          </div>
          <div className="buttons">
            <button
              className="button is-primary"
              onClick={() => setSortOrder("asc")}
              disabled={!sortAttribute}
              title="Sort Ascending"
            >
              ▲
            </button>
            <button
              className="button is-primary"
              onClick={() => setSortOrder("desc")}
              disabled={!sortAttribute}
              title="Sort Descending"
            >
              ▼
            </button>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="teams-grid">
        {filteredTeams.map(team => (
          <Link to={`/teams/${team.id}`} key={team.id} className="team-card">
            <div className="team-image-container">
              <img 
                src={team.logo} 
                alt={team.name} 
                className="team-logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  const placeholder = document.createElement('div');
                  placeholder.className = 'team-placeholder';
                  placeholder.innerText = team.name.charAt(0);
                  e.target.parentNode.insertBefore(placeholder, e.target.nextSibling);
                }}
              />
            </div>
            <div className="team-info">
              <p className="team-name">{team.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Teams;
