import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import teams from '../data/teams';
import '../styles/Teams.css';

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

  // Sort teams alphabetically by name
  const sortedTeams = teams.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      className="container"
      style={{
        padding: '2rem',
        maxWidth: '800px',
        marginTop: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h1 className="title has-text-centered" style={{ marginBottom: '1rem' }}>
        Team Comparison
      </h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="field" style={{ marginBottom: '1.5rem' }}>
            <label className="label">Select Team 1</label>
            <div className="control">
              <div className="select is-primary is-fullwidth">
                <select value={team1} onChange={(e) => setTeam1(e.target.value)}>
                  <option value="">Select a team</option>
                  {sortedTeams.map((team) => (
                    <option key={team.id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field" style={{ marginBottom: '1.5rem' }}>
            <label className="label">Select Team 2</label>
            <div className="control">
              <div className="select is-primary is-fullwidth">
                <select value={team2} onChange={(e) => setTeam2(e.target.value)}>
                  <option value="">Select a team</option>
                  {sortedTeams.map((team) => (
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
              <button
                onClick={handleCompare}
                className="button is-primary is-fullwidth"
                style={{ padding: '0.75rem', fontSize: '1rem' }}
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

export default TeamComparison;
