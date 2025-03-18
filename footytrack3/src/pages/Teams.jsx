import React, { useState } from "react";
import { Link } from "react-router-dom";
import teams from "../data/teams";
import "../styles/Teams.css"; // Updated to use Teams.css

const Teams = () => {
  const [search, setSearch] = useState("");

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

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