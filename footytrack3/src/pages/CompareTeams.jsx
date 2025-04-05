import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  // Format possession as a percentage
  const formatPercentage = (value) => {
    if (!value && value !== 0) return 'N/A';
    return `${value}%`;
  };

  // Calculate points for both teams
  const calculatePoints = (team) => {
    const wins = team.stats?.fixtures?.wins?.total || 0;
    const draws = team.stats?.fixtures?.draws?.total || 0;
    return (wins * 3) + draws;
  };

  // Define all stats for comparison based on TeamPage component
  const stats = [
    { label: "Matches Played", key: (team) => team.stats?.fixtures?.played?.total || "0", better: "higher" },
    { label: "Points", key: (team) => calculatePoints(team) || "0", better: "higher" },
    { label: "Wins", key: (team) => team.stats?.fixtures?.wins?.total || "0", better: "higher" },
    { label: "Draws", key: (team) => team.stats?.fixtures?.draws?.total || "0", better: "higher" },
    { label: "Losses", key: (team) => team.stats?.fixtures?.loses?.total || "0", better: "lower" },
    { label: "Goals Scored", key: (team) => team.stats?.goals?.for?.total || "0", better: "higher" },
    { label: "Goals Conceded", key: (team) => team.stats?.goals?.against?.total || "0", better: "lower" },
    { label: "Clean Sheets", key: (team) => team.stats?.clean_sheet || "0", better: "higher" },
    { label: "Possession", key: (team) => formatPercentage(team.stats?.possession), better: "higher" },
    { label: "Passes Per Game", key: (team) => team.stats?.passes?.total || "0", better: "higher" },
    { label: "Penalties Won", key: (team) => team.stats?.penalty?.total || "0", better: "higher" },
    { label: "Shots", key: (team) => team.stats?.shots?.total || "0", better: "higher" },
    { label: "Shots On Target", key: (team) => team.stats?.shots?.on || "0", better: "higher" },
    { label: "Corners", key: (team) => team.stats?.corners?.total || "0", better: "higher" },
    { label: "Fouls", key: (team) => team.stats?.fouls?.committed || "0", better: "lower" }
  ];

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '900px', margin: '2rem auto' }}>
      <h1 className="title has-text-centered" style={{ marginBottom: '2rem', color: '#fff', fontWeight: 'bold' }}>
        Head-to-Head
      </h1>
      
      {/* Combined table with team header and stats */}
      <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          border: '1px solid #e1e1e1'
        }}>
          {/* Team header row */}
          <thead>
            <tr>
              <th style={{ 
                backgroundColor: '#3498db', 
                color: 'white',
                padding: '16px 20px', 
                textAlign: 'center',
                width: '40%',
                height: '100px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%'
                }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: 'bold', marginRight: '1rem' }}>{team1Data.name}</span>
                  <img src={team1Data.logo} alt={team1Data.name} width="60" height="60" style={{ objectFit: 'contain' }} />
                </div>
              </th>
              <th style={{ 
                backgroundColor: '#3498db', 
                color: 'white',
                padding: '16px 20px', 
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                width: '20%',
                verticalAlign: 'middle', 
                height: '100px' 
              }}>
                VS
              </th>
              <th style={{ 
                backgroundColor: '#3498db', 
                color: 'white',
                padding: '16px 20px', 
                textAlign: 'center',
                width: '40%',
                height: '100px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%'
                }}>
                  <img src={team2Data.logo} alt={team2Data.name} width="60" height="60" style={{ objectFit: 'contain' }} />
                  <span style={{ fontSize: '1.3rem', fontWeight: 'bold', marginLeft: '1rem' }}>{team2Data.name}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => {
              const val1 = stat.key(team1Data);
              const val2 = stat.key(team2Data);

              // Convert values to numbers for comparison (if possible)
              const numVal1 = isNaN(parseFloat(val1)) ? val1 : parseFloat(val1);
              const numVal2 = isNaN(parseFloat(val2)) ? val2 : parseFloat(val2);
              
              // Style for left and right cells - with darker text
              let leftCellStyle = { 
                padding: '12px 20px', 
                textAlign: 'center',
                borderBottom: '1px solid #eee',
                fontWeight: 'normal',
                color: '#333', // Darker text color
                width: '40%',
                backgroundColor: 'white' // All cells white
              };
              
              let rightCellStyle = { 
                padding: '12px 20px', 
                textAlign: 'center',
                borderBottom: '1px solid #eee',
                fontWeight: 'normal',
                color: '#333', // Darker text color
                width: '40%',
                backgroundColor: 'white' // All cells white
              };
              
              let centerCellStyle = {
                padding: '12px 20px',
                textAlign: 'center',
                borderBottom: '1px solid #eee',
                fontWeight: 'bold',
                color: '#222', // Even darker for stat names
                width: '20%',
                backgroundColor: 'white' // All cells white
              };

              // Add highlighting for better stats
              if (typeof numVal1 === 'number' && typeof numVal2 === 'number') {
                if (stat.better === 'higher') {
                  if (numVal1 > numVal2) {
                    leftCellStyle.fontWeight = 'bold';
                    leftCellStyle.color = 'BLACK'; 
                    leftCellStyle.backgroundColor = '#e8f5e9'; // Light green background
                  } else if (numVal2 > numVal1) {
                    rightCellStyle.fontWeight = 'bold';
                    rightCellStyle.color = 'BLACK'; 
                    rightCellStyle.backgroundColor = '#e8f5e9'; // Light green background
                  }
                } else if (stat.better === 'lower') {
                  if (numVal1 < numVal2) {
                    leftCellStyle.fontWeight = 'bold';
                    leftCellStyle.color = 'BLACK'; 
                    leftCellStyle.backgroundColor = '#e8f5e9'; // Light green background
                  } else if (numVal2 < numVal1) {
                    rightCellStyle.fontWeight = 'bold';
                    rightCellStyle.color = 'BLACK'; 
                    rightCellStyle.backgroundColor = '#e8f5e9'; // Light green background
                  }
                }
              }
              
              return (
                <tr key={stat.label}>
                  <td style={leftCellStyle}>{val1}</td>
                  <td style={centerCellStyle}>{stat.label}</td>
                  <td style={rightCellStyle}>{val2}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareTeams;