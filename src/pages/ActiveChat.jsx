import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./ActiveChat.css"; // Ensure this path is correct
import CurrentUserMessage from "../components/CurrentUserMessage"; // Assuming this is the path to your component
import OtherUserMessage from "../components/OtherUserMessage"; // Assuming you have a similar component for other users
import RoomDetails from "../components/RoomDetails";
function ActiveChat() {
  const { roomId } = useParams();
  const location = useLocation();
  const { userId, roomName } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7162/chat?userId=${userId}&roomId=${roomId}`) // Adjust the URL to your SignalR hub
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [userId, roomId]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
          });
        })
        .catch((error) => console.error("Connection failed: ", error));
    }
  }, [connection]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://localhost:7162/api/message/room/${roomId}`
        );
        const data = await response.json();
        if (data && data.result) {
          setMessages(data.result);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [roomId]);

  const handleMessageChange = (event) => {
    setMessageContent(event.target.value);
  };

  const handleSendMessage = async () => {
    if (messageContent.trim() == 0) {
      alert("Message cannot be empty");
    }
    if (connection) {
      try {
        await connection.invoke(
          "SendMessage",
          parseInt(userId, 10),
          parseInt(roomId, 10),
          messageContent
        );
        setMessageContent("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <RoomDetails userId={userId} roomId={roomId} />
      <div className="chat-container">
        <header className="chat-header"></header>
        <div className="messages-container">
          {messages.map((message, index) =>
            String(message.userId) === String(userId) ? (
              <CurrentUserMessage key={index} message={message} />
            ) : (
              <OtherUserMessage key={index} message={message} />
            )
          )}
          <div ref={endOfMessagesRef} />{" "}
        </div>
        <div className="message-input-container">
          <input
            type="text"
            value={messageContent}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            className="message-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ActiveChat;
