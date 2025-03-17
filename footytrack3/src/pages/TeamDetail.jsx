import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import teams from '../data/teams';

const TeamDetail = () => {
  const { id } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = () => {
      const teamData = teams.find((team) => team.id === parseInt(id));
      setTeamData(teamData);
      setLoading(false);
    };

    fetchTeamData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teamData) {
    return <div>Team data not found.</div>;
  }

  return (
    <div className="container">
      <h1 className="title has-text-centered">
        <img src={teamData.logo} alt={teamData.name} width="50" /> {teamData.name}
      </h1>
      <div className="columns is-centered">
        <div className="column is-half has-text-centered">
          <img src={teamData.logo} alt={teamData.name} width="150" />
          <ul className="mt-4">
            <li>Wins: {teamData.wins}</li>
            <li>Losses: {teamData.losses}</li>
            <li>Draws: {teamData.draws}</li>
            <li>Goals Scored: {teamData.goalsScored}</li>
            <li>Goals Conceded: {teamData.goalsConceded}</li>
            <li>Points: {teamData.points}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;