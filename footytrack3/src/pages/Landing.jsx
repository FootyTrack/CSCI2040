import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles.css";

const Landing = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Replace with actual API call
    axios.get("https://api.football-data.org/v4/matches") 
      .then(res => setMatches(res.data.matches))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="hero is-fullheight has-background-purple">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-white">FootyTrack</h1>
          <h2 className="subtitle has-text-white">Track EPL matches and stats</h2>
          <Link to="/teams" className="button is-white">View Teams</Link>
          <div className="columns is-multiline mt-5">
            {matches.slice(0, 5).map(match => (
              <div key={match.id} className="column is-one-third">
                <div className="box">
                  <p><strong>{match.homeTeam.name} vs {match.awayTeam.name}</strong></p>
                  <p>Score: {match.score.fullTime.home} - {match.score.fullTime.away}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
