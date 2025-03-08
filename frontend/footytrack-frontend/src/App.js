import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamStats from './components/TeamStats';
import PlayerStats from './components/PlayerStats';

import './App.css';

const App = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [showTeams, setShowTeams] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const [search, setSearch] = useState("");


  useEffect(() => {
    // Fetch teams and players from backend
    axios.get('http://localhost:8080/api/teams').then((response) => {
      setTeams(response.data);
    });

    axios.get('http://localhost:8080/api/players').then((response) => {
      setPlayers(response.data);
    });
  }, []);

  const handleShowTeams = () => {
    setShowTeams(true);
    setShowPlayers(false);
  };

  const handleShowPlayers = () => {
    setShowTeams(false);
    setShowPlayers(true);
  };


  return (
    
    <div className="section">
      <div className="container">
        <div className="has-text-white p-3">
          <h1 className="title has-text-centered">FootyTrack</h1>
        </div>
        
        

        <div className="field has-addons has-addons-centered">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Search teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="control">
            <button className="button is-info">Search</button>
          </div>
        </div>
        <div className="buttons is-centered">
          <button className="button is-primary" onClick={handleShowTeams}>Show Teams</button>
          <button className="button is-primary" onClick={handleShowPlayers}>Show Players</button>
        </div>

        {showTeams && (
          <div>
            <h2 className="subtitle">Teams</h2>
            {teams.map((team) => (
              <TeamStats key={team.teamName} team={team} />
            ))}
          </div>
        )}

        {showPlayers && (
          <div>
            <h2 className="subtitle">Players</h2>
            {players.map((player) => (
              <PlayerStats key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;