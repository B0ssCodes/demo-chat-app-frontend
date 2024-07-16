import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import WaitingRoom from "./components/WaitingRoom";
import ChatRoom from "./components/ChatRoom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const App = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

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

      // Adjusted to match the backend's parameters for the message
      newConnection.on("ReceiveMessage", (user, message) => {
        console.log(`${user}: ${message}`);
      });

      // Adjusted to match the backend's parameters for the group join message
      newConnection.on("JoinSpecificChatRoom", (user, message) => {
        console.log(`${user}: ${message}`);
        setMessages((messages) => [...messages, { user, message }]);
      });

      newConnection.on("SendMessages", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      await newConnection.start();
      await newConnection.invoke("JoinSpecificChatRoom", userConnection);
      setConnection(newConnection);
    } catch (error) {
      console.error("Connection failed: ", error);
    }
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
      <Row className="fixed-top bg-white">
        <Col>
          <h1 className="font-weight-light text-center pt-2 pb-2">Chat App</h1>
        </Col>
      </Row>
      {!connection ? (
        <WaitingRoom joinChatRoom={joinChatRoom} />
      ) : (
        <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
      )}
    </Container>
  );
};

export default App;
