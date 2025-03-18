// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components/pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Compare from "./pages/Compare";
import Login from "./pages/Login";
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";
import Favorites from "./pages/Favorites";
import TeamComparison from "./pages/TeamComparison";
import CompareTeams from "./pages/CompareTeams";

const App = () => {
  // Set isLoggedIn to true/false based on your authentication logic.
  const isLoggedIn = false; 

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/teams/:id" element={<TeamPage />} />
        <Route path="/players/:id" element={<PlayerPage />} />
        <Route path="/compare/:team1/vs/:team2" element={<CompareTeams />} />
        {/* Optional additional comparison page */}
        <Route path="/team-comparison" element={<TeamComparison />} />
      </Routes>
    </Router>
  );
};

export default App;
