import React, { useEffect, useState } from "react";

function History({ userId }) {
  const [messages, setMessages] = useState([]);
  const [emptyMessages, setEmptyMessages] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://localhost:7162/api/message/user/${userId}`
        );
        const data = await response.json();
        if (data && data.result) {
          setMessages(data.result);
        }
        if (data.result.length === 0) {
          setEmptyMessages(true);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchMessages();
  }, [userId]);

  return (
    <div style={{ overflow: "auto" }}>
      <h2 className="display-3 mt-4 mb-1">Message History</h2>
      {emptyMessages && (
        <p className="text-center">
          No messages found, join a room and send some!
        </p>
      )}
      <ul
        style={{
          maxHeight: "75vh",
          overflowY: "auto",
          padding: "0 20px",
        }}
      >
        {messages.map((message, index) => (
          <li
            key={index}
            style={{
              marginBottom: "15px",
              background: "#f0f0f0",
              borderRadius: "15px",
              padding: "10px",
              maxWidth: "80%",
              wordWrap: "break-word",
            }}
          >
            <div>
              <strong>Content:</strong> {message.content}
            </div>
            <div>
              <strong>Room ID:</strong> {message.roomId}
            </div>
            <div>
              <strong>Timestamp:</strong>{" "}
              {new Date(message.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
