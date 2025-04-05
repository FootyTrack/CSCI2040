import React from 'react';
import { Link } from "react-router-dom";
import enhancedPlayersData from "../data/players_with_photos.json";
import teamsData from "../data/teams";
import useAuthStore from "../stores/authStore";

const getPlayerPhotoPath = (playerId) => {
  const foundPlayer = enhancedPlayersData.find(p => p.id === playerId);
  if (foundPlayer && foundPlayer.photo_path && foundPlayer.photo_path.trim() !== "") {
    const filename = foundPlayer.photo_path.split(/[\\\/]/).pop();
    return `/assets/player_headshots/${filename}`;
  }
  return "/assets/player_headshots/placeholder.png";
};

const getTeamInfo = (fav) => {
  let team = null;
  if (fav.id) {
    team = teamsData.find(t => String(t.id) === String(fav.id));
  }
  if (!team) {
    team = teamsData.find(t => t.name.toLowerCase() === fav.name.toLowerCase());
  }
  return team;
};

const Favorites = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const removeFavorite = useAuthStore((state) => state.removeFavorite);

  if (!isAuthenticated) {
    return (
      <section className="section">
        <h1 className="title" style={{ color: "#fff" }}>Access Denied</h1>
        <p style={{ color: "#fff" }}>You must be logged in to view your favorites.</p>
        <Link to="/login" className="button is-primary">
          Login
        </Link>
      </section>
    );
  }

  const favorites = user?.favorites || [];
  const favoritePlayers = favorites.filter(fav => fav.type === "player");
  const favoriteTeams = favorites.filter(fav => fav.type === "team");

  return (
    <section className="section">
      <h1 className="title" style={{ color: "#fff" }}>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p style={{ color: "#fff" }}>You have no favorites yet. Add some players or teams to your favorites!</p>
      ) : (
        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Favorite Players */}
          <div style={{ flex: 1 }}>
            <h2 style={{ 
              color: "#fff", 
              marginBottom: "1rem", 
              fontWeight: "bold",
              textDecoration: "underline" 
            }}>
              Players
            </h2>
            {favoritePlayers.length === 0 ? (
              <p style={{ color: "#fff" }}>No favorite players.</p>
           .Concurrent) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {favoritePlayers.map((fav, index) => (
                  <li key={index} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <div style={{ 
                      width: "70px", 
                      height: "70px", 
                      borderRadius: "50%", 
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>
                      <img 
                        src={getPlayerPhotoPath(fav.id)} 
                        alt={fav.name} 
                        style={{ 
                          maxWidth: "100%", 
                          maxHeight: "100%", 
                          objectFit: "contain"
                        }}
                      />
                    </div>
                    <Link to={`/players/${fav.id}`} style={{ color: "#fff" }}>{fav.name}</Link>
                    <button
                      onClick={() => removeFavorite(fav.id)}
                      style={{
                        backgroundColor: "#FF6B6B",
                        color: "#fff",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        marginLeft: "auto"
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Favorite Teams */}
          <div style={{ flex: 1 }}>
            <h2 style={{ 
              color: "#fff", 
              marginBottom: "1rem", 
              fontWeight: "bold",
              textDecoration: "underline"
            }}>
              Teams
            </h2>
            {favoriteTeams.length === 0 ? (
              <p style={{ color: "#fff" }}>No favorite teams.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {favoriteTeams.map((fav, index) => {
                  const team = getTeamInfo(fav);
                  const logo = team ? team.logo : '/assets/team_logos/default.png';
                  const teamId = team ? team.id : (fav.id || encodeURIComponent(fav.name));
                  return (
                    <li key={index} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <img 
                        src={logo} 
                        alt={fav.name} 
                        style={{ width: "70px", height: "70px", objectFit: "contain" }}
                      />
                      <Link to={`/teams/${teamId}`} style={{ color: "#fff" }}>{fav.name}</Link>
                      <button
                        onClick={() => removeFavorite(fav.id || fav.name)}
                        style={{
                          backgroundColor: "#FF6B6B",
                          color: "#fff",
                          border: "none",
                          padding: "0.3rem 0.6rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          marginLeft: "auto"
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Favorites;