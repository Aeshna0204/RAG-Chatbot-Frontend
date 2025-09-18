import React from "react";

const Navbar = ({ activeSession, onModelChange, currentModel = "GPT-4" }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-title">
          {activeSession ? (
            <span className="session-title">Chat Session</span>
          ) : (
            <span className="app-title">RAG POWERED CHAT ASSISTANT</span>
          )}
        </div>
        {activeSession && (
          <div className="session-info">
            <span className="session-id">{activeSession.substring(0, 8)}...</span>
          </div>
        )}
      </div>

      {/* <div className="navbar-center">
        <div className="model-selector">
          <select 
            value={currentModel} 
            onChange={(e) => onModelChange && onModelChange(e.target.value)}
            className="model-dropdown"
          >
            <option value="GPT-4">GPT-4</option>
            <option value="GPT-3.5">GPT-3.5 Turbo</option>
            <option value="Claude">Claude</option>
          </select>
        </div>
      </div> */}

      <div className="navbar-right">
        <button className="navbar-btn" title="Share">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16,6 12,2 8,6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </button>
        
        <button className="navbar-btn" title="Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="m12 1 0 6m0 6 0 6"/>
            <path d="m1 12 6 0m6 0 6 0"/>
          </svg>
        </button>

        <div className="user-menu">
          <button className="user-avatar">
            <span>U</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;