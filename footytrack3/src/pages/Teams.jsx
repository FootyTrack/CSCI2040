import React, { useState } from "react";
import { Link } from "react-router-dom";
import teams from "../data/teams";

const Teams = ({ favorites, setFavorites }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToFavorites = (team) => {
    if (!favorites.some(fav => fav.id === team.id)) {
      const updatedFavorites = [...favorites, { ...team, type: "team" }];
      setFavorites(updatedFavorites);
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title has-text-centered">Teams</h1>
      <div className="field">
        <div className="control">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={handleSearch}
            className="input is-primary"
          />
        </div>
      </div>
      <div className="columns is-multiline">
        {filteredTeams.map((team) => (
          <div key={team.id} className="column is-one-third">
            <div className="card">
              <div className="card-content has-text-centered">
                <img src={team.logo} alt={team.name} width="100" />
                <h2 className="subtitle mt-2">
                  <Link to={`/team/${team.id}`}>{team.name}</Link>
                </h2>
                <button className="button is-primary mt-2" onClick={() => handleAddToFavorites(team)}>
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
