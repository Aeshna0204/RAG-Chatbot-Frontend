import React from "react";

const SessionList = ({ sessions = [], onSelect, onDelete }) => {
  if (!sessions || sessions.length === 0) {
    return <p>No sessions found</p>;
  }

  return (
    <div className="session-list">
      <h3>Sessions</h3>
      {sessions.map((s) => (
        <div key={s.sessionId} className="session-item">
          <span
            style={{ cursor: "pointer", marginRight: "10px" }}
            onClick={() => onSelect(s)}
          >
            {s.firstQuestion || "New Chat"}
          </span>
         <button onClick={() => onDelete(s.sessionId)}>Delete</button>
        </div>
      ))}
    </div>
  );
};



export default SessionList;
