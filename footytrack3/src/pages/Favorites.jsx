import { useState } from "react";
import React from 'react';


const Favorites = () => {
  const [favorites] = useState(["Arsenal", "Liverpool"]);

  return (
    <section className="section">
      <h1 className="title">Your Favorites</h1>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>{fav}</li>
        ))}
      </ul>
    </section>
  );
};

export default Favorites;
