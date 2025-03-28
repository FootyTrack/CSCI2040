// src/pages/PlayerComparison.jsx
import React, { useState } from 'react';
import players from "../data/players_with_photos.json";

const dummyPlayers = [
  { id: 1, name: "Player A", goals: 10, assists: 5, appearances: 20 },
  { id: 2, name: "Player B", goals: 8, assists: 7, appearances: 18 },
  { id: 3, name: "Player C", goals: 12, assists: 3, appearances: 22 }
];

const PlayerComparison = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [compareData, setCompareData] = useState(null);

  const handleCompare = () => {
    // Find players from dummy data
    const p1 = players.find(p => p.name === player1);
    const p2 = players.find(p => p.name === player2);

    if (p1 && p2) {
      setCompareData({ player1: p1, player2: p2 });
    } else {
      alert("Please select valid players for both fields.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Player Comparison</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Player 1:{" "}
          <select value={player1} onChange={(e) => setPlayer1(e.target.value)}>
            <option value="">Select Player</option>
            {players.map(player => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: "1rem" }}>
          Player 2:{" "}
          <select value={player2} onChange={(e) => setPlayer2(e.target.value)}>
            <option value="">Select Player</option>
            {players.map(player => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
        </label>
        <button onClick={handleCompare} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
          Compare
        </button>
      </div>
      {compareData && (
        <div>
          <h2>Comparison Results</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }} border="1" cellPadding="8">
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th>Stat</th>
                <th>{compareData.player1.name}</th>
                <th>{compareData.player2.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Goals</td>
                <td>{compareData.player1.goals}</td>
                <td>{compareData.player2.goals}</td>
              </tr>
              <tr>
                <td>Assists</td>
                <td>{compareData.player1.assists}</td>
                <td>{compareData.player2.assists}</td>
              </tr>
              <tr>
                <td>Appearances</td>
                <td>{compareData.player1.appearances}</td>
                <td>{compareData.player2.appearances}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlayerComparison;
