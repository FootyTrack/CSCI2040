import React, { useState } from "react";
import { Link } from "react-router-dom";
import teams from "../data/teams";
import "../styles/Teams.css"; // Updated to use Teams.css

const Teams = () => {
  const [search, setSearch] = useState("");
  const [sortAttribute, setSortAttribute] = useState(""); // State for selected attribute
  const [sortOrder, setSortOrder] = useState(""); // State for sort order

  let filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort teams based on selected attribute and order
  if (sortAttribute) {
    filteredTeams = [...filteredTeams].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortAttribute] > b[sortAttribute] ? 1 : -1;
      } else if (sortOrder === "desc") {
        return a[sortAttribute] < b[sortAttribute] ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <section className="section">
      <h1 className="title has-text-centered">Teams</h1>
      
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

      {/* Sorting Controls */}
      <div className="field">
        <label className="label">Sort By:</label>
        <div className="control">
          <div className="select">
            <select
              value={sortAttribute}
              onChange={(e) => setSortAttribute(e.target.value)}
            >
              <option value="">Select Attribute</option>
              <option value="name">Name</option>
              <option value="wins">Wins</option>
              <option value="draws">Draws</option>
              <option value="losses">Losses</option>
              <option value="points">Points</option>
              <option value="founded">Founded</option>
              <option value="venue">Stadium</option>
            </select>
          </div>
        </div>
        <div className="buttons">
          <button
            className="button is-primary"
            onClick={() => setSortOrder("asc")}
            disabled={!sortAttribute}
          >
            Sort Ascending
          </button>
          <button
            className="button is-primary"
            onClick={() => setSortOrder("desc")}
            disabled={!sortAttribute}
          >
            Sort Descending
          </button>
        </div>
      </div>

      <h2 className="subtitle">Premier League Teams</h2>
      <div className="teams-grid">
        {filteredTeams.map(team => (
          <Link to={`/teams/${team.id}`} key={team.id} className="team-card">
            <div className="team-image-container">
              <img 
                src={team.logo} 
                alt={team.name} 
                className="team-logo"
                onError={(e) => {
                  // Fall back to placeholder if image fails to load
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  
                  // Create and display a placeholder
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