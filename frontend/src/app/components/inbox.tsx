"use client";

import { useState } from "react";
import "./inbox.css";

const chats = [
  { id: 1, name: "Amasha De Silva", message: "Full name: ..." },
  { id: 2, name: "Nethma Perera", message: "Phone number: ..." },
  { id: 3, name: "Menasha Rajapaksha", message: "Sent an attachment" }
];

export default function Inbox() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

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
            <div key={chat.id} className="chat-item">
              <h4>{chat.name}</h4>
              <p>{chat.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        <div className="chat-header">
          <h3>User Name</h3>
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