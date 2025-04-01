import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import teams from '../data/teams';

const CompareTeams = () => {
  const { team1, team2 } = useParams();
  const [team1Data, setTeam1Data] = useState(null);
  const [team2Data, setTeam2Data] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = () => {
      const t1 = teams.find((team) => team.name.toLowerCase() === team1.toLowerCase());
      const t2 = teams.find((team) => team.name.toLowerCase() === team2.toLowerCase());
      setTeam1Data(t1);
      setTeam2Data(t2);
      setLoading(false);
    };
    fetchTeamData();
  }, [team1, team2]);

  if (loading) return <div>Loading...</div>;
  if (!team1Data || !team2Data) return <div>Team data not found.</div>;

  // Define the stats for comparison and whether a higher or lower value is better.
  const stats = [
    { label: "Wins", key: "wins", better: "higher" },
    { label: "Losses", key: "losses", better: "lower" },
    { label: "Draws", key: "draws", better: "higher" },
    { label: "Goals Scored", key: "goalsScored", better: "higher" },
    { label: "Goals Conceded", key: "goalsConceded", better: "lower" },
    { label: "Points", key: "points", better: "higher" },
  ];

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '900px', margin: '2rem auto' }}>
      <h1 className="title has-text-centered" style={{ marginBottom: '2rem', color: '#333' }}>
        Head-to-Head
      </h1>
      <div className="columns" style={{ marginBottom: '2rem' }}>
        <div className="column has-text-centered">
          <Link to={`/team/${team1Data.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={team1Data.logo} alt={team1Data.name} width="60" />
            {team1Data.name}
          </Link>
        </div>
        <div className="column has-text-centered">
          <Link to={`/team/${team2Data.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={team2Data.logo} alt={team2Data.name} width="60" />
            {team2Data.name}
          </Link>
        </div>
      </div>
      {/* Using Bulma's table classes for consistency */}
      <table className="table is-fullwidth is-striped is-hoverable" style={{ textAlign: 'center' }}>
        <thead>
          <tr style={{ color: '#fff', backgroundColor: '#3498db', fontSize: '1rem' }}>
            <th style={{ padding: '0.75rem' }}>{team1Data.name}</th>
            <th style={{ padding: '0.75rem' }}>Stat</th>
            <th style={{ padding: '0.75rem' }}>{team2Data.name}</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(stat => {
            const val1 = team1Data[stat.key];
            const val2 = team2Data[stat.key];

            // Base style for cells
            let leftStyle = { padding: '0.75rem', fontSize: '1rem', color: '#333' };
            let rightStyle = { padding: '0.75rem', fontSize: '1rem', color: '#333' };

            if (typeof val1 === 'number' && typeof val2 === 'number') {
              if (stat.better === 'higher') {
                if (val1 > val2) {
                  leftStyle.fontWeight = 'bold';
                  leftStyle.backgroundColor = '#e6f7ff';
                } else if (val2 > val1) {
                  rightStyle.fontWeight = 'bold';
                  rightStyle.backgroundColor = '#e6f7ff';
                }
              } else if (stat.better === 'lower') {
                if (val1 < val2) {
                  leftStyle.fontWeight = 'bold';
                  leftStyle.backgroundColor = '#e6f7ff';
                } else if (val2 < val1) {
                  rightStyle.fontWeight = 'bold';
                  rightStyle.backgroundColor = '#e6f7ff';
                }
              }
            }
            return (
              <tr key={stat.label}>
                <td style={leftStyle}>{val1}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#333' }}>{stat.label}</td>
                <td style={rightStyle}>{val2}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/" className="button is-link">Return to Home</Link>
      </div>
    </div>
  );
};

export default CompareTeams;

