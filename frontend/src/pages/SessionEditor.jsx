import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./SessionEditor.css";

function SessionEditor() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const { id } = useParams(); // <-- for edit mode
  const token = localStorage.getItem("token");

  // Fetch session if editing
  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/api/my-sessions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setTitle(data.title);
          setTags(data.tags.join(", "));
          setJsonUrl(data.jsonUrl);
        } else {
          toast.error(data.msg || "Failed to load session");
        }
      } catch (error) {
        console.error("Error loading session:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  const saveDraft = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/my-sessions/save-draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          tags: tags.split(",").map((t) => t.trim()),
          jsonUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Draft auto-saved!");
      } else {
        toast.error(data.msg || "Failed to auto-save");
      }
    } catch (error) {
      toast.error("Auto-save failed");
      console.error("❌ Auto-save error:", error);
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !jsonUrl.trim()) {
      toast.error("Title and JSON URL are required to publish.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          tags: tags.split(",").map((t) => t.trim()),
          jsonUrl,
          status: "published",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Session published!");
        console.log("✅ Published:", data);
      } else {
        toast.error(data.msg || "Failed to publish");
      }
    } catch (err) {
      console.error("Publish error:", err);
      toast.error("Failed to publish session.");
    }
  };

  // Auto-save after 5s of inactivity
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      saveDraft();
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [title, tags, jsonUrl]);

  // Auto-save every 30s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      saveDraft();
    }, 30000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="editor-container">
      <h2>{id ? "Edit Session" : "Create Session"}</h2>

      {loading ? (
        <p>Loading session...</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Session Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <textarea
            placeholder="Enter JSON URL"
            value={jsonUrl}
            onChange={(e) => setJsonUrl(e.target.value)}
          ></textarea>

          <div className="buttons">
            <button onClick={saveDraft}>Save as Draft</button>
            <button onClick={handlePublish}>Publish</button>
          </div>
        </>
      )}
    </div>
  );
}

export default SessionEditor;
