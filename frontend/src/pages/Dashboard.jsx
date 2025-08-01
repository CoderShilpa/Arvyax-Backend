import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchPublicSessions = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/sessions");
        const data = await res.json();
        if (res.ok) setSessions(data);
      } catch (err) {
        console.error("Error loading public sessions:", err);
      }
    };
    fetchPublicSessions();
  }, []);

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <h1 className="brand-title">Arvyax Wellness</h1>
        <div className="dashboard-links">
          <Link to="/dashboard/my-sessions">My Sessions</Link>
          <Link to="/dashboard/create">Create Session</Link>
        </div>
      </nav>

      <div className="dashboard-hero">
        <h2>Discover Your Inner Peace ✨</h2>
        <p>
          Build custom wellness flows. Publish, edit or save drafts for yoga,
          meditation, or anything that brings balance to your life.
        </p>

        <div className="dashboard-buttons">
          <Link to="/dashboard/create" className="create-btn">
            Create a Session
          </Link>
        </div>
      </div>

      <div className="public-sessions">
        <h3>Explore Public Sessions</h3>
        <div className="session-list">
          {sessions.map((session) => (
            <div key={session._id} className="session-card">
              <h4>{session.title}</h4>
              <p><strong>Tags:</strong> {session.tags.join(", ")}</p>
              <p><strong>Status:</strong> {session.status}</p>
              <p><strong>Published:</strong> {new Date(session.timestamp).toLocaleString()}</p>
              <a href={session.jsonUrl} target="_blank" rel="noreferrer">Open JSON</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
