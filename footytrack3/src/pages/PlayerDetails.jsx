import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useFavoritesStore from "../context/FavoritesStore";

const PlayerDetails = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const { addFavorite } = useFavoritesStore();

  useEffect(() => {
    axios.get(`https://api.football-data.org/v4/persons/${id}`, {
      headers: { "X-Auth-Token": "YOUR_API_KEY" }
    })
    .then(res => setPlayer(res.data))
    .catch(err => console.error(err));
  }, [id]);

  return (
    player ? (
      <section className="section">
        <h1 className="title">{player.name}</h1>
        <p>Position: {player.position}</p>
        <p>Nationality: {player.nationality}</p>
        <button className="button is-primary" onClick={() => addFavorite(player)}>Add to Favorites</button>
      </section>
    ) : <p>Loading...</p>
  );
};

export default PlayerDetails;
