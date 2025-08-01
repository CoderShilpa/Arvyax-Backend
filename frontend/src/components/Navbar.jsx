import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Optional: Alert or toast
    alert("Logged out successfully!");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Arvyax Wellness</div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-sessions">My Sessions</Link>
        <Link to="/create">Create Session</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
