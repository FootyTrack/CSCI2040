import React, { useState } from 'react';
import { Link } from "react-router-dom";
//import useFavoritesStore from "../context/FavoritesStore";
import useAuthStore from "../stores/authStore";

const Favorites = () => {
  //const favorites = useFavoritesStore((state) => state.favorites);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const removeFavorite = useAuthStore((state) => state.removeFavorite); // Access the removeFavorite function

  if (!isAuthenticated) {
    (
      <section className="section">
        <h1 className="title">Access Denied</h1>
        <p>You must be logged in to view your favorites.</p>
        <Link to="/login" className="button is-primary">
          Login
        </Link>
      </section>
    );
  }
  const favorites = user?.favorites || [];

  return (
    <section className="section">
      <h1 className="title">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>You have no favorites yet. Add some players or teams to your favorites!</p>
      ) : (
        <ul>
          {favorites.map((fav, index) => (
            <li key={index} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {fav.type === "player" ? (
                <Link to={`/players/${fav.id}`}>{fav.name} (Player)</Link>
              ) : (
                <Link to={`/teams/${fav.id}`}>{fav.name} (Team)</Link>
              )}
              <button
                onClick={() => removeFavorite(fav.id)} // Call removeFavorite with the item's ID
                style={{
                  backgroundColor: "#FF6B6B",
                  color: "#fff",
                  border: "none",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Favorites;
