import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { fetchHistory, sendMessage, resetChat } from "../api";

const ChatBox = ({ sessionId, onFirstMessage }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isResetting, setIsResetting] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New loading state
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

    useEffect(scrollToBottom, [messages, isLoading]); // Also scroll when loading state changes

    const handleSend = async () => {
        if (!input.trim() || isLoading) return; // Prevent sending while loading
        
        const userMsg = { sender: "user", text: input };
        const currentInput = input; // Store the input before clearing it
        
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true); // Start loading

        // If this is the first message (no previous messages), update the session title
        if (messages.length === 0 && onFirstMessage) {
            onFirstMessage(sessionId, currentInput);
        }

        try {
            const botReply = await sendMessage(sessionId, currentInput);
            const botMsg = { sender: "bot", text: botReply.answer || "" };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Error sending message:", error);
            // Show error message to user
            const errorMsg = { sender: "bot", text: "Sorry, there was an error processing your message." };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleReset = async () => {
        if (!sessionId || isResetting) return;
        
        const confirmReset = window.confirm("Are you sure you want to reset this chat? This will clear all messages in this session.");
        if (!confirmReset) return;

        setIsResetting(true);
        try {
            await resetChat(sessionId);
            setMessages([]); // Clear messages from UI
            console.log("Chat reset successfully");
        } catch (error) {
            console.error("Error resetting chat:", error);
            alert("Failed to reset chat. Please try again.");
        } finally {
            setIsResetting(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Loading dots component
    const LoadingDots = () => (
        <div className="message bot loading">
            <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );

    return (
        <div className="chat-box">
            <div className="chat-header">
                <button 
                    className="reset-chat-btn" 
                    onClick={handleReset}
                    disabled={isResetting || !sessionId}
                >
                    {isResetting ? "Resetting..." : "Reset Chat"}
                </button>
            </div>
            <div className="messages">
                {messages.length === 0 && !isLoading ? (
                    <div className="no-messages">
                        <p>No messages yet. Start a conversation!</p>
                    </div>
                ) : (
                    <>
                        {messages.map((msg, idx) => (
                            <Message key={idx} sender={msg.sender} text={msg.text} />
                        ))}
                        {isLoading && <LoadingDots />}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isLoading ? "Bot is responding..." : "Type your message..."}
                    disabled={isLoading} // Disable input while loading
                />
                <button 
                    onClick={handleSend} 
                    disabled={!input.trim() || isLoading} // Disable send button while loading
                >
                    {isLoading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
};

export default ChatBox;