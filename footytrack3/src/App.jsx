import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import Login from "./pages/Login";
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";
import Favorites from "./pages/Favorites";
import TeamComparison from "./pages/TeamComparison";
import CompareTeams from "./pages/CompareTeams";
import TeamDetail from "./pages/TeamDetail";
import Players from "./pages/Players";
import Teams from "./pages/Teams";

const App = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} favorites={favorites} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/teams/:id" element={<TeamPage />} />
        <Route path="/players/:id" element={<PlayerPage />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/compare" element={<TeamComparison />} />
        <Route path="/compare/:team1/vs/:team2" element={<CompareTeams />} />
        <Route path="/team/:id" element={<TeamDetail />} />
        <Route path="/players" element={<Players favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/teams" element={<Teams favorites={favorites} setFavorites={setFavorites} />} />
      </Routes>
    </Router>
  );
};

export default App;
