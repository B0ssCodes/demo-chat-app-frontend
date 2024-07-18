import { useState } from "react";
import { Container } from "react-bootstrap";
import "../App.css";
import WaitingRoom from "../components/WaitingRoom";
import ChatRoom from "../components/ChatRoom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

function ChatandWaitRoom() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [cookieCounter, setCookieCounter] = useState(0);

  const joinChatRoom = async (userName, chatRoom) => {
    if (connection) return; // Prevent multiple connections
    let userConnection = {
      Username: userName,
      ChatRoom: chatRoom,
    };
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7162/chat")
        .configureLogging(LogLevel.Information)
        .build();

      newConnection.on("ReceiveMessage", (user, message) => {
        console.log(`${user}: ${message}`);
      });

      newConnection.on("JoinSpecificChatRoom", (user, message) => {
        console.log(`${user}: ${message}`);
        setMessages((messages) => [...messages, { user, message }]);
      });

      newConnection.on("SendMessages", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      newConnection.on("IncreaseCookie", () => {
        setCookieCounter((prevCount) => prevCount + 1);
      });

      await newConnection.start();
      await newConnection.invoke("JoinSpecificChatRoom", userConnection);
      setConnection(newConnection);
    } catch (error) {
      console.error("Connection failed: ", error);
    }
  };

  const handleIncrementCookie = () => {
    connection.invoke("IncreaseCookie");
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {!connection ? (
        <WaitingRoom joinChatRoom={joinChatRoom} />
      ) : (
        <ChatRoom
          messages={messages}
          sendMessage={sendMessage}
          cookieCounter={cookieCounter}
          handleIncrementCookie={handleIncrementCookie}
        ></ChatRoom>
      )}
    </Container>
  );
}

export default ChatandWaitRoom;
