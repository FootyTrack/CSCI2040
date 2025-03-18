import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import teams from '../data/teams';
import '../styles/TeamDetail.css';

// Team color mapping - using the same color scheme as in PlayerDetail
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

const TeamPage = () => {
  const { id } = useParams(); // team ID from URL
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTeamData(null);

    try {
      const team = teams.find((team) => team.id.toString() === id.toString());
      if (!team) {
        throw new Error(`No team found with ID: ${id}`);
      }
      
      // Add team color to the team data
      const teamWithColor = {
        ...team,
        teamColor: teamColors[team.name] || teamColors.default
      };
      
      // Build the object your table code expects
      setTeamData({
        team: {
          name: teamWithColor.name,
          logo: teamWithColor.logo,
          founded: teamWithColor.founded,
          venue: teamWithColor.venue,
          location: teamWithColor.location,
          teamColor: teamWithColor.teamColor
        },
        stats: teamWithColor.stats
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching team data:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading team details...</div>;
  }

  if (error) {
    return <div className="error">Team not found</div>;
  }

  if (!teamData) {
    return <div className="error">No data available</div>;
  }

  const team = teamData.team;
  const stats = teamData.stats;

  // Calculate points based on wins & draws
  const wins = stats.fixtures.wins.total || 0;
  const draws = stats.fixtures.draws.total || 0;
  const points = (wins * 3) + draws;

  // Format possession as a percentage
  const formatPercentage = (value) => {
    if (!value && value !== 0) return 'N/A';
    return `${value}%`;
  };

  // Extract the stats we want to display
  const teamStats = [
    { label: "Matches Played", value: stats.fixtures.played.total || "0" },
    { label: "Points", value: points || "0" },
    { label: "Wins", value: stats.fixtures.wins.total || "0" },
    { label: "Draws", value: stats.fixtures.draws.total || "0" },
    { label: "Losses", value: stats.fixtures.loses.total || "0" },
    { label: "Goals Scored", value: stats.goals.for.total || "0" },
    { label: "Goals Conceded", value: stats.goals.against.total || "0" },
    { label: "Clean Sheets", value: stats.clean_sheet || "0" },
    { label: "Possession", value: formatPercentage(stats.possession) },
    { label: "Passes Per Match", value: stats.passes.total || "0" },
    { label: "Penalties Awarded", value: stats.penalty.total || "0" },
    { label: "Shots", value: stats.shots.total || "0" },
    { label: "Shots On Target", value: stats.shots.on || "0" },
    { label: "Corners", value: stats.corners.total || "0" },
    { label: "Fouls", value: stats.fouls.committed || "0" }
  ];

  return (
    <div className="team-detail-container">
      <Link to="/teams" className="back-button">
        {/* &larr; Back to Teams */}
      </Link>
      
      <div className="team-detail-card" style={{ "--team-color": team.teamColor }}>
        <div className="team-header">
          <h1 className="team-detail-name">{team.name}</h1>
        </div>
        
        <div className="team-content">
          <div className="team-logo-container">
            {team.logo ? (
              <img 
                src={team.logo} 
                alt={team.name} 
                className="team-detail-logo" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="team-detail-placeholder">
                {team.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="team-stats">
            {/* Team Info integrated at the top of stats section */}
            <div className="team-info-top">
              <div className="team-basic-info">
                <div className="info-item">
                  <span className="info-icon">🏟️</span>
                  <span className="info-label">Venue:</span>
                  <span className="info-value">{team.venue || 'Stadium'}</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">📅</span>
                  <span className="info-label">Founded:</span>
                  <span className="info-value">{team.founded || '1900'}</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <span className="info-label">Location:</span>
                  <span className="info-value">{team.location || 'England'}</span>
                </div>
              </div>
            </div>
            
            <h2>Season 2022/23 Statistics</h2>
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {teamStats.map((stat, index) => (
                  <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                    <td>{stat.label}</td>
                    <td>{stat.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;