import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import enhancedPlayersData from "../data/players_with_photos.json";
import "../styles/PlayerDetail.css";
import useAuthStore from "../stores/authStore";

// Team color mapping
const teamColors = {
  "Arsenal": "#EF0107",
  "Manchester City": "#6CABDD",
  "Liverpool": "#C8102E",
  "Manchester United": "#DA291C",
  "Chelsea": "#034694",
  "Tottenham Hotspur": "#132257",
  "Newcastle United": "#241F20",
  "Aston Villa": "#95BFE5",
  "Brighton": "#0057B8",
  "West Ham United": "#7A263A",
  // Add more teams as needed
  "default": "#3498db" // Fallback blue color
};

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addFavorite = useAuthStore((state) => state.addFavorite);

  useEffect(() => {
    // Find the player by ID
    const foundPlayer = enhancedPlayersData.find(p => p.id === id);
    
    if (foundPlayer) {
      // Process the photo path
      let photoPath = '';
      if (foundPlayer.photo_path && foundPlayer.photo_path.trim() !== '') {
        const filename = foundPlayer.photo_path.split(/[\\\/]/).pop();
        photoPath = `/assets/player_headshots/${filename}`;
      }
      
      setPlayer({
        ...foundPlayer,
        displayPhotoPath: photoPath,
        teamColor: teamColors[foundPlayer.team] || teamColors.default
      });
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading player details...</div>;
  }

  if (!player) {
    return <div className="error">Player not found</div>;
  }

  // Extract the stats we want to display
  const stats = [
    { label: "Starts", value: player.starts || "0" },
    { label: "Minutes", value: player.minutes || "0" },
    { label: "Goals", value: player.goals_scored || "0" },
    { label: "Assists", value: player.assists || "0" },
    { label: "Yellow Cards", value: player.yellow_cards || "0" },
    { label: "Red Cards", value: player.red_cards || "0" },
    { label: "Goals Conceded", value: player.goals_conceded || "0" },
    { label: "Clean Sheets", value: player.clean_sheets || "0" },
    { label: "Saves per 90", value: player.saves_per_90 || "0" },
    { label: "Penalties Saved", value: player.penalties_saved || "0" }
  ];

  const handleAddToFavorites = () => {
    addFavorite({ id: player.id, name: player.name, type: "player" });
    alert(`${player.name} has been added to your favorites!`);
  };

  return (
    <div className="player-detail-container">
      <Link to="/players" className="back-button">
        {/* &larr; Back to Players */}
      </Link>
      
      <div className="player-detail-card" style={{ "--team-color": player.teamColor }}>
        <div className="player-header">
          <h1 className="player-detail-name">{player.name}</h1>
        </div>
        
        <div className="player-content">
          <div className="player-photo-container">
            {player.displayPhotoPath ? (
              <img 
                src={player.displayPhotoPath} 
                alt={player.name} 
                className="player-detail-photo" 
              />
            ) : (
              <div className="player-detail-placeholder">
                {player.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="player-stats">
            {/* Player Info integrated at the top of stats section */}
            <div className="player-info-top">
              <div className="player-basic-info">
                <div className="info-item">
                  <span className="info-icon">🏢</span>
                  <span className="info-label">Team:</span>
                  <span className="info-value">{player.team}</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">👕</span>
                  <span className="info-label">Position:</span>
                  <span className="info-value">{player.position}</span>
                </div>
                {player.birth_date && (
                  <div className="info-item">
                    <span className="info-icon">🎂</span>
                    <span className="info-label">Birth Date:</span>
                    <span className="info-value">{player.birth_date}</span>
                  </div>
                )}
              </div>
            </div>
            
            <h2>Player Statistics</h2>
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, index) => (
                  <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                    <td>{stat.label}</td>
                    <td>{stat.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {player.news && (
              <div className="player-news">
                <h3>Latest News</h3>
                <p>{player.news}</p>
              </div>
            )}
          </div>
        </div>

        {/* Add to Favorites Button */}
        {isAuthenticated && (
          <div style={{
            display: "flex", // Use flexbox
            justifyContent: "center", // Center horizontally
            marginTop: "1rem", // Add some spacing from the content above
            marginBottom: "2rem"
          }}
          >
            <button
              onClick={handleAddToFavorites}
              className="add-to-favorites-button"
              style={{
                backgroundColor: "#4CAF50", // Green background
                color: "#fff", // White text
                border: "2px solid #3E8E41", // Add a border
                padding: "0.5rem 1rem", // Increase padding for better visibility
                borderRadius: "8px", // Rounded corners
                cursor: "pointer", // Pointer cursor on hover
                fontSize: "1rem", // Larger font size
                fontWeight: "bold", // Bold text
                transition: "all 0.3s ease", // Smooth hover effect
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#3E8E41")} // Darker green on hover
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")} // Reset background color
            >
              Add to Favorites
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerDetail;