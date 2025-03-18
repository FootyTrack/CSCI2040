import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import teams from '../data/teams';


const TeamComparison = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const navigate = useNavigate();

  const handleCompare = () => {
    if (team1 && team2) {
      navigate(`/compare/${team1}/vs/${team2}`);
    } else {
      alert('Please select two teams to compare.');
    }
  };

  return (
    <div className="container">
      <h1 className="title has-text-centered">Compare Teams</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="field">
            <label className="label">Select Team 1</label>
            <div className="control">
              <div className="select is-primary">
                <select value={team1} onChange={(e) => setTeam1(e.target.value)}>
                  <option value="">Select a team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Select Team 2</label>
            <div className="control">
              <div className="select is-primary">
                <select value={team2} onChange={(e) => setTeam2(e.target.value)}>
                  <option value="">Select a team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button onClick={handleCompare} className="button is-primary is-fullwidth">
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComparison;