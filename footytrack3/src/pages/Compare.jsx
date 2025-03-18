import { useState } from "react";
import React from 'react';

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Compare = () => {
  const [team1] = useState({ name: "Arsenal", wins: 15, losses: 5 });
  const [team2] = useState({ name: "Chelsea", wins: 12, losses: 7 });

  const data = {
    labels: ["Wins", "Losses"],
    datasets: [
      { label: team1.name, data: [team1.wins, team1.losses], backgroundColor: "blue" },
      { label: team2.name, data: [team2.wins, team2.losses], backgroundColor: "red" }
    ]
  };

  return (
    <section className="section">
      <h1 className="title">Compare Teams</h1>
      <div style={{ width: "600px", margin: "auto" }}>
        <Bar data={data} />
      </div>
    </section>
  );
};

export default Compare;
