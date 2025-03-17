import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Update state instantly
    navigate("/");
  };

  return (
    <nav className="navbar is-primary">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item title">FootyTrack</Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/teams" className="navbar-item">Teams</Link>
          <Link to="/players" className="navbar-item">Players</Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Compare</a>
            <div className="navbar-dropdown">
              <Link to="/compare/players" className="navbar-item">Compare Players</Link>
              <Link to="/compare/teams" className="navbar-item">Compare Teams</Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="profile-pic"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </a>
              <div className="navbar-dropdown">
                <Link to="/profile" className="navbar-item">Profile</Link>
                <a onClick={handleLogout} className="navbar-item">Logout</a>
              </div>
            </div>
          ) : (
            <Link to="/login" className="navbar-item">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
