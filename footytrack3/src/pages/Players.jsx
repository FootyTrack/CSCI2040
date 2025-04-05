import React, { useState, useEffect } from "react";
import enhancedPlayersData from "../data/players_with_photos.json";
import { Link } from "react-router-dom";
import "../styles/Players.css";

const Players = () => {
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);
  const [sortAttribute, setSortAttribute] = useState(""); // Selected attribute
  const [sortOrder, setSortOrder] = useState(""); // Sort order ("asc" or "desc")

  useEffect(() => {
    // Process players and filter out those without photos
    const processedPlayers = enhancedPlayersData
      .map((player) => {
        let photoPath = "";
        if (player.photo_path && player.photo_path.trim() !== "") {
          const filename = player.photo_path.split(/[\\\/]/).pop();
          photoPath = `/assets/player_headshots/${filename}`;
        }
        return {
          ...player,
          displayPhotoPath: photoPath,
        };
      })
      .filter((player) => player.displayPhotoPath !== "");
    setPlayers(processedPlayers);
  }, []);

  let filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sortAttribute) {
    filteredPlayers = [...filteredPlayers].sort((a, b) => {
      // For numeric attributes, use Number conversion.
      const numericAttributes = ["saves", "goals_scored", "assists"];
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
      <h1 className="title has-text-centered">Premier League Players</h1>

      {/* Search Bar */}
      <div className="field">
        <input
          className="input"
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        {/* Sorting Controls on one line */}
        <div
          className="field"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <label className="label" style={{ marginBottom: 0 }}>
            Sort By:
          </label>
          <div className="select">
            <select
              value={sortAttribute}
              onChange={(e) => {
                const attribute = e.target.value;
                setSortAttribute(attribute);
                // For numeric attributes default descending; otherwise ascending.
                const numericAttributes = ["saves", "goals_scored", "assists"];
                setSortOrder(attribute ? (numericAttributes.includes(attribute) ? "desc" : "asc") : "");
              }}
            >
              <option value="">Select Attribute</option>
              <option value="name">Name</option>
              <option value="team">Team</option>
              {/* Uncomment if desired: <option value="position">Position</option> */}
              <option value="saves">Saves</option>
              <option value="goals_scored">Goals Scored</option>
              <option value="assists">Assists</option>
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

      {/* <h2 className="subtitle">Premier League Players</h2> */}

      <div className="players-grid">
        {filteredPlayers.map((player) => (
          <Link
            to={`/players/${player.id}`}
            key={player.id}
            className="player-card"
          >
            <img
              src={player.displayPhotoPath}
              alt={player.name}
              className="player-headshot"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                const placeholder = document.createElement("div");
                placeholder.className = "player-placeholder";
                placeholder.innerText = player.name.charAt(0);
                e.target.parentNode.insertBefore(placeholder, e.target.nextSibling);
              }}
            />
            <div className="player-info">
              <p className="player-name">{player.name}</p>
              <p className="player-team">{player.team}</p>
              {player.position && (
                <p className="player-position">{player.position}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Players;
