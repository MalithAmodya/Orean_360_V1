import React from "react";
import "./Inbox.css";

const Inbox: React.FC = () => {
  return (
    <div className="inbox-container">
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
          {/* Chat items will go here */}
        </div>
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <h3>User Name</h3>
          <div className="actions">
            <button>Mark as Read</button>
            <button>Assign To</button>
          </div>
        </div>

        <div className="messages">
          {/* Messages here */}
        </div>

        <div className="message-input">
          <input type="text" placeholder="Type your message here..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Inbox;