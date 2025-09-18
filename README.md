
# RAG Chatbot Frontend
A modern, responsive React frontend for the RAG-powered chatbot designed for news websites. This application provides an intuitive chat interface that seamlessly integrates with the RAG chatbot backend to deliver intelligent, context-aware responses about news content.
### Features

- Modern Chat Interface: Clean, responsive design optimized for news consumption
- Real-time Messaging: Instant responses with typing indicators and message status
- Session Management: Persistent chat sessions with history preservation
- Multi-session Support: Switch between different conversation sessions
- Message History: Browse and search through previous conversations
- Typing Indicators: Visual feedback during response generation

### Architecture

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │───▶│   API Client    │───▶│  Backend API   |
│  (Components)   │    │  (Axios/Fetch)  │    │ (Node.js + RAG) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
   
### Quick Start
Prerequisites

- React Vite SCSS
- npm or yarn
- RAG Chatbot Backend running (see backend repo)

Installation
```git clone https://github.com/Aeshna0204/RAG-Chatbot-Frontend.git
cd RAG-Chatbot-Frontend
npm install
```
