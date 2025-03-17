import { useState } from "react";
import { Link } from "react-router-dom";
import players from "../data/players";
import "../styles/Players.css";

const Players = ({ favorites, setFavorites }) => {
  const [search, setSearch] = useState("");

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(search.toLowerCase()) ||
    player.team.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToFavorites = (player) => {
    if (!favorites.some(fav => fav.id === player.id)) {
      const updatedFavorites = [...favorites, { ...player, type: "player" }];
      setFavorites(updatedFavorites);
    }
  };

  return (
    <section className="section">
      <h1 className="title has-text-centered">Premier League Players</h1>

      <div className="field">
        <input
          className="input"
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="columns is-multiline">
        {filteredPlayers.map(player => (
          <div key={player.id} className="column is-one-third">
            <div className="card">
              <div className="card-content has-text-centered">
                <img src={player.image} alt={player.name} width="100" />
                <h2 className="subtitle mt-2">
                  <Link to={`/players/${player.id}`}>{player.name}</Link>
                </h2>
                <button className="button is-primary mt-2" onClick={() => handleAddToFavorites(player)}>
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Players;