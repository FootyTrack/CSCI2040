import { useParams } from "react-router-dom";
import players from "../data/players";

const PlayerPage = () => {
  const { id } = useParams();
  const player = players.find((p) => p.id === parseInt(id));

  const addToFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = [...storedFavorites, { ...player, type: "player" }];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!player) return <p>Player not found.</p>;

  return (
    <div className="container">
      <h1 className="title">{player.name}</h1>
      <img src={player.image} alt={player.name} width="150" />
      <p>Team: {player.team}</p>
      <p>Position: {player.position}</p>

      <button className="button is-warning" onClick={addToFavorites}>
        Add to Favorites
      </button>
    </div>
  );
};

export default PlayerPage;
