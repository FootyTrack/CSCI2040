import { Link } from "react-router-dom";

const Favorites = ({ favorites, setFavorites }) => {
  const handleRemove = (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="container">
      <h1 className="title has-text-centered">Favorites</h1>
      
      {favorites.length === 0 ? (
        <p className="has-text-centered">No favorites added yet.</p>
      ) : (
        <div className="columns is-multiline">
          {favorites.map((item) => (
            <div key={item.id} className="column is-one-third">
              <div className="card">
                <div className="card-content has-text-centered">
                  <img src={item.image || item.logo} alt={item.name} width="100" />
                  <h2 className="subtitle mt-2">
                    <Link to={item.type === "player" ? `/players/${item.id}` : `/teams/${item.id}`}>
                      {item.name}
                    </Link>
                  </h2>
                  <button className="button is-danger mt-2" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
