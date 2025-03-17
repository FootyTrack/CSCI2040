import { useParams } from "react-router-dom";
import teams from "../data/teams";

const TeamPage = () => {
  const { id } = useParams();
  const team = teams.find((t) => t.id === parseInt(id));

  const addToFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = [...storedFavorites, { ...team, type: "team" }];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!team) return <p>Team not found.</p>;

  return (
    <div className="container">
      <h1 className="title">{team.name}</h1>
      <img src={team.logo} alt={team.name} width="150" />
      <p>Wins: {team.wins}</p>
      <p>Losses: {team.losses}</p>

      <button className="button is-warning" onClick={addToFavorites}>
        Add to Favorites
      </button>
    </div>
  );
};

export default TeamPage;
