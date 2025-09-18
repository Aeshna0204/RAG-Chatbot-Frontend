import axios from "axios";

const API_BASE = "https://rag-chatbot-backend-o0ee.onrender.com"; // replace with your backend

export const createSession = async () => {
  const res = await axios.post(`${API_BASE}/session/create-session` ,{}, // empty body
    // { headers: { "Cache-Control": "no-cache" } }
    );
  return res.data; // should return session id
};

export const deleteSession = async (sessionId) => {
  const res = await axios.delete(`${API_BASE}/session/${sessionId}`,);
  return res.data;
};

export const fetchSessions = async () => {
  const res = await fetch(`${API_BASE}/session/list-sessions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log("API response:", data);
  return data; // list of session ids
};


export const fetchHistory = async (sessionId) => {
  const res = await axios.get(`${API_BASE}/session/${sessionId}/history`,
    // { headers: { "Cache-Control": "no-cache" } }
  );
  return res.data; // chat history
};

export const sendMessage = async (sessionId, message) => {
  const res = await axios.post(`${API_BASE}/chat/${sessionId}`, { message },
    // { headers: { "Cache-Control": "no-cache" } }
  );
  return res.data; // bot reply
};
