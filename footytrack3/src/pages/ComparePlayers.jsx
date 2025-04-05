import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import players from "../data/players_with_photos.json";
import "../styles/Players.css";

// Sort players alphabetically by name
const sortedPlayers = players.slice().sort((a, b) => a.name.localeCompare(b.name));

// Define the stats to compare
const stats = [
  { label: "Starts", key: (player) => player.starts || "0", better: "higher" },
  { label: "Minutes", key: (player) => player.minutes || "0", better: "higher" },
  { label: "Goals", key: (player) => player.goals_scored || "0", better: "higher" },
  { label: "Assists", key: (player) => player.assists || "0", better: "higher" },
  { label: "Yellow Cards", key: (player) => player.yellow_cards || "0", better: "lower" },
  { label: "Red Cards", key: (player) => player.red_cards || "0", better: "lower" },
  { label: "Goals Conceded", key: (player) => player.goals_conceded || "0", better: "lower" },
  { label: "Clean Sheets", key: (player) => player.clean_sheets || "0", better: "higher" },
  { label: "Saves per 90", key: (player) => player.saves_per_90 || "0", better: "higher" },
  { label: "Penalties Saved", key: (player) => player.penalties_saved || "0", better: "higher" }
];

const ComparePlayers = () => {
  const { player1, player2 } = useParams();
  const [player1Data, setPlayer1Data] = useState(null);
  const [player2Data, setPlayer2Data] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = () => {
      const p1Name = decodeURIComponent(player1).toLowerCase();
      const p2Name = decodeURIComponent(player2).toLowerCase();

      const p1 = sortedPlayers.find(p => p.name.toLowerCase() === p1Name);
      const p2 = sortedPlayers.find(p => p.name.toLowerCase() === p2Name);

      const processPlayer = (player) => {
        if (!player) return null;
        let photoPath = "";
        if (player.photo_path && player.photo_path.trim() !== "") {
          const filename = player.photo_path.split(/[\\\/]/).pop();
          photoPath = `/assets/player_headshots/${filename}`;
        }
        return { ...player, displayPhotoPath: photoPath };
      };

      setPlayer1Data(processPlayer(p1));
      setPlayer2Data(processPlayer(p2));
      setLoading(false);
    };
    fetchPlayerData();
  }, [player1, player2]);

  if (loading) return <div>Loading...</div>;
  if (!player1Data || !player2Data) return <div>Player data not found.</div>;

  return (
    <div className="container" style={{ padding: "2rem", maxWidth: "900px", margin: "2rem auto" }}>
      <h1 className="title has-text-centered" style={{ marginBottom: "2rem", color: "#fff", fontWeight: "bold" }}>
        Head-to-Head
      </h1>
      <div style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          border: '1px solid #e1e1e1'
        }}>
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
                  <span style={{ fontSize: '1.3rem', fontWeight: 'bold', marginRight: '1rem' }}>
                    {player1Data.name}
                  </span>
                  <img 
                    src={player1Data.displayPhotoPath} 
                    alt={player1Data.name} 
                    width="60" 
                    height="60" 
                    style={{ objectFit: 'contain', borderRadius: '50%' }} 
                  />
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
                  <img 
                    src={player2Data.displayPhotoPath} 
                    alt={player2Data.name} 
                    width="60" 
                    height="60" 
                    style={{ objectFit: 'contain', borderRadius: '50%' }} 
                  />
                  <span style={{ fontSize: '1.3rem', fontWeight: 'bold', marginLeft: '1rem' }}>
                    {player2Data.name}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => {
              const val1 = stat.key(player1Data);
              const val2 = stat.key(player2Data);

              const numVal1 = isNaN(parseFloat(val1)) ? val1 : parseFloat(val1);
              const numVal2 = isNaN(parseFloat(val2)) ? val2 : parseFloat(val2);

              let leftCellStyle = { 
                padding: '12px 20px', 
                textAlign: 'center',
                borderBottom: '1px solid #eee',
                fontWeight: 'normal',
                color: '#333',
                width: '40%',
                backgroundColor: 'white'
              };

              let rightCellStyle = { 
                padding: '12px 20px', 
                textAlign: 'center',
                borderBottom: '1px solid #eee',
                fontWeight: 'normal',
                color: '#333',
                width: '40%',
                backgroundColor: 'white'
              };

              let centerCellStyle = {
                padding: '12px 20px',
                textAlign: 'center',
                borderBottom: '1px solid #eee',
                fontWeight: 'bold',
                color: '#222',
                width: '20%',
                backgroundColor: 'white'
              };

              // Highlight logic for better/worse stats
              if (typeof numVal1 === 'number' && typeof numVal2 === 'number') {
                if (stat.better === 'higher') {
                  if (numVal1 > numVal2) {
                    leftCellStyle.fontWeight = 'bold';
                    leftCellStyle.color = 'black';
                    leftCellStyle.backgroundColor = '#e8f5e9';
                  } else if (numVal2 > numVal1) {
                    rightCellStyle.fontWeight = 'bold';
                    rightCellStyle.color = 'black';
                    rightCellStyle.backgroundColor = '#e8f5e9';
                  }
                } else if (stat.better === 'lower') {
                  if (numVal1 < numVal2) {
                    leftCellStyle.fontWeight = 'bold';
                    leftCellStyle.color = 'black';
                    leftCellStyle.backgroundColor = '#e8f5e9';
                  } else if (numVal2 < numVal1) {
                    rightCellStyle.fontWeight = 'bold';
                    rightCellStyle.color = 'black';
                    rightCellStyle.backgroundColor = '#e8f5e9';
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

export default ComparePlayers;