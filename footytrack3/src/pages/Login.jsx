import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import useAuthStore from "../stores/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/"); // Redirect to the home page on success
    } else {
      navigate("/Create-user"); // Redirect to the create user page on failure
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
        <button className="button is-primary">Login</button>
      </form>
    </section>
  );
};

export default Login;
