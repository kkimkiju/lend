// src/ChatBot.js
import React, { useState } from "react";

// 인라인 스타일 객체
const styles = {
  chatbot: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
  chatbotButton: {
    backgroundColor: "#29c555",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  chatbotWindow: {
    position: "absolute",
    bottom: "60px",
    right: "0",
    width: "300px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  chatbotHeader: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatbotBody: {
    padding: "10px",
  },
  chatbotTextarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.chatbot}>
      <button style={styles.chatbotButton} onClick={toggleChat}>
        {isOpen ? "챗봇 닫기" : "챗봇 열기"}
      </button>
      {isOpen && (
        <div style={styles.chatbotWindow}>
          <div style={styles.chatbotHeader}>
            <h4>무엇이든 물어보세요</h4>
            <button onClick={toggleChat}>X</button>
          </div>
          <div style={styles.chatbotBody}>
            <p>Frequently Asked Questions:</p>
            <ul>
              <li>How can I contact support?</li>
              <li>Where can I find more information?</li>
              <li>What are your business hours?</li>
            </ul>
            <p>Feel free to ask your question here:</p>
            <textarea
              style={styles.chatbotTextarea}
              rows="4"
              placeholder="Type your message here..."
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
