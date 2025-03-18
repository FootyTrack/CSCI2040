import React, { useState, useEffect } from "react";
import enhancedPlayersData from "../data/players_with_photos.json";
import { Link } from "react-router-dom";
import "../styles/Players.css";

const Players = () => {
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Process players and filter out those without photos
    const processedPlayers = enhancedPlayersData
      .map(player => {
        let photoPath = '';
        
        if (player.photo_path && player.photo_path.trim() !== '') {
          // Get just the filename without any directory information
          const filename = player.photo_path.split(/[\\\/]/).pop();
          
          // Create the correct web path
          photoPath = `/assets/player_headshots/${filename}`;
        }
        
        return {
          ...player,
          displayPhotoPath: photoPath
        };
      })
      .filter(player => player.displayPhotoPath !== ''); // Only keep players with photos
    
    setPlayers(processedPlayers);
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="section">
      <h1 className="title has-text-centered">Players</h1>
      
      <div className="field">
        <input
          className="input"
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="subtitle">Premier League Players</h2>

      <div className="players-grid">
        {filteredPlayers.map((player) => (
          <Link to={`/players/${player.id}`} key={player.id} className="player-card">
            <img
              src={player.displayPhotoPath}
              alt={player.name}
              className="player-headshot"
              onError={(e) => {
                // Fall back to placeholder if image fails to load
                e.target.onerror = null;
                e.target.style.display = 'none';
                
                // Create and display a placeholder
                const placeholder = document.createElement('div');
                placeholder.className = 'player-placeholder';
                placeholder.innerText = player.name.charAt(0);
                e.target.parentNode.insertBefore(placeholder, e.target.nextSibling);
              }}
            />
            <div className="player-info">
              <p className="player-name">{player.name}</p>
              <p className="player-team">{player.team}</p>
              {player.position && <p className="player-position">{player.position}</p>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Players;