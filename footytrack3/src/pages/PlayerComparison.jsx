import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import players from "../data/players_with_photos.json";
import "../styles/Players.css";

// Sort players alphabetically by name
const sortedPlayers = players.slice().sort((a, b) => a.name.localeCompare(b.name));

const PlayerComparison = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();

  // Process players to generate displayPhotoPath dynamically (not strictly needed if only picking names)
  const processedPlayers = sortedPlayers
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
  .filter(player => player.displayPhotoPath !== "");

  const handleCompare = () => {
    if (player1 && player2) {
      // Navigate to the detail page: /compare/:player1/vs/:player2
      navigate(`/compare/players/${encodeURIComponent(player1)}/vs/${encodeURIComponent(player2)}`);
    } else {
      alert("Please select two players to compare.");
    }
  };

  return (
    <div
      className="container"
      style={{
        padding: "2rem",
        maxWidth: "800px",
        marginTop: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h1 className="title has-text-centered" style={{ marginBottom: "3rem" }}>
        Player Comparison
      </h1>
      <div className="columns is-centered">
        <div className="column is-half">
          {/* Player 1 Field */}
          <div className="field" style={{ marginBottom: "1.5rem" }}>
            <label className="label">Select Player 1</label>
            <div className="control">
              <div className="select is-primary is-fullwidth">
                <select 
                  value={player1} 
                  onChange={(e) => setPlayer1(e.target.value)}
                >
                  <option value="">Select Player</option>
                  {processedPlayers.map(player => (
                    <option key={player.id} value={player.name}>{player.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Player 2 Field */}
          <div className="field" style={{ marginBottom: "2rem" }}>
            <label className="label">Select Player 2</label>
            <div className="control">
              <div className="select is-primary is-fullwidth">
                <select 
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                >
                  <option value="">Select Player</option>
                  {processedPlayers.map(player => (
                    <option key={player.id} value={player.name}>{player.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Compare Button */}
          <div className="field">
            <div className="control">
              <button
                onClick={handleCompare}
                className="button is-primary is-fullwidth"
                style={{ padding: "0.75rem", fontSize: "1rem" }}
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerComparison;
