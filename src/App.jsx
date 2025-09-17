import React, { useState, useEffect } from "react";
import { createSession, deleteSession, fetchSessions } from "./api";
import ChatBox from "./components/ChatBox";
import SessionList from "./components/SessionList";
import "./styles.scss";

function App() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);

  const loadSessions = async () => {
    const data = await fetchSessions(); // { sessions: [...] }
    setSessions(data.sessions);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleCreateSession = async () => {
    const newSession = await createSession();
    setSessions((prev) => [...prev, newSession.sessionId]);
    setActiveSession(newSession.sessionId);
  };

  const handleDeleteSession = async (sessionId) => {
    await deleteSession(sessionId);
    setSessions((prev) => prev.filter((s) => s !== sessionId));
    if (activeSession === sessionId) setActiveSession(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <button className="create-session" onClick={handleCreateSession}>
          + New Session
        </button>
        <SessionList
          sessions={sessions}
          onSelect={setActiveSession}
          onDelete={handleDeleteSession}
        />
      </div>
      <div className="main">
        {activeSession ? (
          <ChatBox sessionId={activeSession} />
        ) : (
          <div className="no-session">Select or create a session to start chat</div>
        )}
      </div>
    </div>
  );
}




export default App;
