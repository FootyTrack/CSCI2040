import React from 'react';

const TeamStats = ({ team }) => {
  return (
    <div className="box">
      <h2 className="title is-4">{team.teamName}</h2>
      <p>Matches Played: {team.matchesPlayed}</p>
      <p>Points: {team.points}</p>
      <p>Record (W-D-L): {team.wins}-{team.draws}-{team.losses}</p>
      <p>Goals Scored: {team.goalsScored}</p>
      <p>Goals Conceded: {team.goalsConceded}</p>
      <p>Clean Sheets: {team.cleanSheets}</p>
      <p>Possession: {team.possession}%</p>
      <p>Passes per Match: {team.passesPerMatch}</p>
      <p>Penalties Awarded: {team.penaltiesAwarded}</p>
      <p>Shots: {team.shots}</p>
      <p>Shots on Target: {team.shotsOnTarget}</p>
      <p>Corners: {team.corners}</p>
      <p>Fouls: {team.fouls}</p>
    </div>
  );
};

export default TeamStats;