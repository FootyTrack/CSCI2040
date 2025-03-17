import { useState } from "react";
import { Link } from "react-router-dom";
import teams from "../data/teams";
import "../styles/Home.css";

const Home = () => {
  const [search, setSearch] = useState("");

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="section">
      <h1 className="title has-text-centered">🏆 FootyTrack: Premier League Stats</h1>
      
      {/* Navigation Buttons */}
      <div className="home-links">
        <Link to="/players" className="button is-link is-light">View Players</Link>
        <Link to="/compare" className="button is-info is-light">Compare</Link>
        <Link to="/favorites" className="button is-warning is-light">Favorites</Link>
      </div>

      {/* Search Bar for Teams */}
      <div className="field">
        <input
          className="input"
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="subtitle">Premier League Teams</h2>
      <div className="teams-grid">
        {filteredTeams.map(team => (
          <Link to={`/teams/${team.id}`} key={team.id} className="team-card">
            <img src={team.logo} alt={team.name} />
            <p>{team.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
