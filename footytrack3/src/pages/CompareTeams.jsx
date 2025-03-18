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
      const team1Data = teams.find((team) => team.name.toLowerCase() === team1.toLowerCase());
      const team2Data = teams.find((team) => team.name.toLowerCase() === team2.toLowerCase());
      setTeam1Data(team1Data);
      setTeam2Data(team2Data);
      setLoading(false);
    };

    fetchTeamData();
  }, [team1, team2]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!team1Data || !team2Data) {
    return <div>Team data not found.</div>;
  }

  return (
    <div className="container">
      <h1 className="title has-text-centered">
        <Link to={`/team/${team1Data.id}`}>
          <img src={team1Data.logo} alt={team1Data.name} width="50" /> {team1Data.name}
        </Link>
        {' '}vs{' '}
        <Link to={`/team/${team2Data.id}`}>
          <img src={team2Data.logo} alt={team2Data.name} width="50" /> {team2Data.name}
        </Link>
      </h1>
      <div className="columns">
        <div className="column has-text-centered">
          <h2 className="subtitle">
            <Link to={`/team/${team1Data.id}`}>{team1Data.name}</Link>
          </h2>
          <img src={team1Data.logo} alt={team1Data.name} width="100" />
          <ul className="mt-4">
            <li>Wins: {team1Data.wins}</li>
            <li>Losses: {team1Data.losses}</li>
            <li>Draws: {team1Data.draws}</li>
            <li>Goals Scored: {team1Data.goalsScored}</li>
            <li>Goals Conceded: {team1Data.goalsConceded}</li>
            <li>Points: {team1Data.points}</li>
          </ul>
        </div>
        <div className="column has-text-centered">
          <h2 className="subtitle">
            <Link to={`/team/${team2Data.id}`}>{team2Data.name}</Link>
          </h2>
          <img src={team2Data.logo} alt={team2Data.name} width="100" />
          <ul className="mt-4">
            <li>Wins: {team2Data.wins}</li>
            <li>Losses: {team2Data.losses}</li>
            <li>Draws: {team2Data.draws}</li>
            <li>Goals Scored: {team2Data.goalsScored}</li>
            <li>Goals Conceded: {team2Data.goalsConceded}</li>
            <li>Points: {team2Data.points}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompareTeams;