import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore"; // Import Zustand store

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const createUser = useAuthStore((state) => state.createUser); // Zustand createUser function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const success = await createUser(email, password);
    if (success) {
      alert("User created successfully!");
      navigate("/login"); // Redirect to login page after successful creation
    } else {
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <section className="section">
      <h1 className="title">Create User</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label className="label">Confirm Password</label>
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="button is-primary">Create Account</button>
      </form>
    </section>
  );
};

export default CreateUser;