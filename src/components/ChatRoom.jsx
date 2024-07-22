import { Col, Row } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

function ChatRoom({
  messages,
  sendMessage,
  cookieCounter,
  handleIncrementCookie,
}) {
  // Define inline styles
  const containerStyle = {
    padding: "20px",
    backgroundColor: "#f0f2f5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const headerRowStyle = {
    marginBottom: "20px",
  };

  const headerStyle = {
    textAlign: "center",
  };

  const messageContainerStyle = {
    maxHeight: "500px",
    overflowY: "auto",
  };

  const sendMessageFormStyle = {
    paddingTop: "20px",
  };

  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #af06ff, #004dff)",
    border: "none",
    color: "white",
    borderRadius: "10px",
  };

  return (
    <div style={containerStyle}>
      <Row style={headerRowStyle} className="px-5">
        <Col sm={12}>
          <h2 className="display-5" style={headerStyle}>
            Chat Room
          </h2>
          <div className="d-grid">
            <button
              className="btn"
              style={buttonStyle}
              onClick={handleIncrementCookie}
            >
              Click Me: {cookieCounter}
            </button>
          </div>
        </Col>
        <Col></Col>
      </Row>
      <Row style={messageContainerStyle}>
        <Col sm={12}>
          <MessageContainer messages={messages} />
        </Col>
      </Row>
      <Row style={sendMessageFormStyle}>
        <Col sm={12}>
          <SendMessageForm sendMessage={sendMessage} />
        </Col>
      </Row>
    </div>
  );
}

export default ChatRoom;
