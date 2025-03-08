import React from 'react';

const PlayerStats = ({ player }) => {
  return (
    <div className= "box player-box">
      <h2 className="title is-4 player-name">{player.name}</h2>
      <p>Country: {player.country}</p>
      <p>Appearances: {player.appearances}</p>
      <p>Yellow Cards: {player.yellow_cards}</p>
      <p>Red Cards: {player.red_cards}</p>
      <p>Tackles: {player.tackles}</p>
      <p>Interceptions: {player.interceptions}</p>
      <p>Passes: {player.passes}</p>
      <p>Fouls: {player.fouls}</p>
      <p>Shots: {player.shots}</p>
    </div>
  );
};

export default PlayerStats;