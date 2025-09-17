import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { fetchHistory, sendMessage } from "../api";

const ChatBox = ({ sessionId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (sessionId) {
            fetchHistory(sessionId).then((res) => {
                const normalized = (res.history || []).map((msg) => ({
                    sender: msg.role,   // map role to sender
                    text: msg.text
                }));
                setMessages(normalized);
            });
        }
    }, [sessionId]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        const botReply = await sendMessage(sessionId, input);
        const botMsg = { sender: "bot", text: botReply.answer || "" };
        setMessages((prev) => [...prev, botMsg]);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((msg, idx) => (
                    <Message key={idx} sender={msg.sender} text={msg.text} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};




export default ChatBox;
