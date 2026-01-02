import React, { useEffect, useRef, useState } from 'react';
import '../styles/FloatingChat.css';

const FloatingChat = ({ chats, message, setMessage, onSend, currentUserId, formatTime, disabled, disabledMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastSeenCount, setLastSeenCount] = useState(0);
  const chatEndRef = useRef(null);

  // Calculate unread messages (only messages from others that we haven't seen)
  const totalMessages = chats?.messages?.length || 0;
  const unreadCount = isOpen ? 0 : Math.max(0, totalMessages - lastSeenCount);

  // When chat opens, mark all messages as seen
  useEffect(() => {
    if (isOpen && totalMessages > 0) {
      setLastSeenCount(totalMessages);
    }
  }, [isOpen, totalMessages]);

  // Initialize lastSeenCount when component mounts with existing messages
  useEffect(() => {
    if (totalMessages > 0 && lastSeenCount === 0 && !isOpen) {
      // Don't show badge for messages that were already there when page loaded
      setLastSeenCount(totalMessages);
    }
  }, [totalMessages, lastSeenCount, isOpen]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Update seen count when closing
    setLastSeenCount(totalMessages);
  };

  return (
    <div className="floating-chat-container">
      {/* Chat Toggle Button */}
      <button
        className={`floating-chat-btn ${isOpen ? 'is-open' : ''}`}
        onClick={() => isOpen ? handleClose() : handleOpen()}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!isOpen && unreadCount > 0 && (
          <span className="chat-badge">{unreadCount}</span>
        )}
      </button>

      {/* Chat Popup */}
      <div className={`floating-chat-popup ${isOpen ? 'is-visible' : ''}`}>
        <header className="floating-chat-header">
          <div className="header-info">
            <h3>Project Chat</h3>
            <p>Real-time conversation</p>
          </div>
          <button className="close-btn" onClick={handleClose} aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="floating-chat-body">
          {disabled ? (
            <div className="chat-disabled-state">
              <div className="disabled-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <p>{disabledMessage}</p>
            </div>
          ) : (
            <>
              <div className="floating-chat-messages">
                {chats?.messages?.length > 0 ? (
                  chats.messages.map((msg, index) => {
                    const isMine = msg.senderId === currentUserId;
                    return (
                      <div
                        key={`${msg.time}-${index}`}
                        className={`floating-bubble ${isMine ? 'bubble-mine' : 'bubble-theirs'}`}
                      >
                        <p>{msg.text}</p>
                        <span className="bubble-time">{formatTime(msg.time)}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-messages">
                    <div className="no-messages-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <p>No messages yet</p>
                    <span>Start the conversation!</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form className="floating-chat-input" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message…"
                />
                <button type="submit" disabled={!message.trim()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingChat;
