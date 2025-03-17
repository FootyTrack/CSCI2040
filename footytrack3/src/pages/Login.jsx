import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === "") return;

    const user = {
      id: username, // Use username as ID (or use actual user ID from a real authentication system)
      name: username,
      profilePic: profilePic || "https://via.placeholder.com/50",
    };

    localStorage.setItem("currentUser", JSON.stringify(user));
    setUser(user);
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="title has-text-centered">Login</h1>
      <div className="field">
        <input className="input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="field">
        <input className="input" type="text" placeholder="Profile Picture URL (optional)" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} />
      </div>
      <button className="button is-primary" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
