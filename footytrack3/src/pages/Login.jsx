import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import useAuthStore from "../stores/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store error message
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    const success = await login(email, password);
    if (!success) {
      setError("Incorrect email or password, or account does not exist.");
    } else {
      navigate("/"); // Redirect to home page if login is successful
    }
  };

  return (
    <section className="section">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="has-text-danger">{error}</p>} {/* Display error message */}
        <div className="buttons">
          <button className="button is-primary">Login</button>
          <button
            className="button is-link"
            type="button"
            onClick={() => navigate("/create-user")}
          >
            Create User
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
