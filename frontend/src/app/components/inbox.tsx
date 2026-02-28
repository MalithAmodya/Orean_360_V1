"use client";

import React, { useState } from "react";
import "./inbox.css";

const chats = [
  { id: 1, name: "Thilina", lastMessage: "Hello there!" },
  { id: 2, name: "Nadeesha", lastMessage: "Can we discuss?" },
  { id: 3, name: "Kasun", lastMessage: "Review updated." },
];

export default function Inbox() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const sendMessage = () => {
    if (inputValue.trim() === "") return;
    setMessages([...messages, inputValue]);
    setInputValue("");
  };

  return (
    <div className="inbox-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Logo</div>

        <input type="text" placeholder="Search..." className="search" />

        <div className="tabs">
          <button>All</button>
          <button>Private Chats</button>
          <button>Post Comments</button>
          <button>Reviews</button>
        </div>

        <div className="chat-list">
          {chats.map((chat) => (
            <div
          key={chat.id}
          className="chat-item"
          onClick={() => setSelectedChat(chat)}
        >
          <h4>{chat.name}</h4>
          <p>{chat.lastMessage}</p>
        </div>

          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        <div className="chat-header">
          <h3>{selectedChat ? selectedChat.name : "Select a chat"}</h3>
          <div className="actions">
            <button>Mark as Read</button>
            <button>Assign To</button>
          </div>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}