import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MySessions.css";

function MySessions() {
  const [sessions, setSessions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMySessions = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/my-sessions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setSessions(data);
        else console.error("Error loading sessions:", data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchMySessions();
  }, [token]);

  return (
    <div className="my-sessions-container">
      <h2>My Sessions</h2>

      {sessions.length === 0 ? (
        <p>You haven't created any sessions yet.</p>
      ) : (
        <div className="session-list">
          {sessions.map((session) => (
            <div key={session._id} className="session-card">
              <h3>{session.title}</h3>
              <p><strong>Status:</strong> {session.status}</p>
              <p><strong>Tags:</strong> {session.tags.join(", ")}</p>
              {session.jsonUrl && (
                <a href={session.jsonUrl} target="_blank" rel="noreferrer">
                  Open JSON
                </a>
              )}
              <div className="session-actions">
                <Link to={`/dashboard/edit/${session._id}`} className="edit-button">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySessions;
