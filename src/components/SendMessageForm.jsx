import { Button, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";

function SendMessageForm({ sendMessage }) {
  const [message, setMessage] = useState("");

  // Inline styles
  const formContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "10px",
    borderTop: "1px solid #dee2e6", // A light border at the top for separation
  };

  const inputGroupTextStyle = {
    backgroundColor: "#f8f9fa",
    borderColor: "#ced4da",
  };

  const buttonStyle = {
    backgroundColor: "#AF06FF",
    borderColor: "#AF06FF",
  };

  return (
    <div className="fixed-bottom" style={formContainerStyle}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
          setMessage("");
        }}
      >
        <InputGroup className="mb-3">
          <InputGroup.Text style={inputGroupTextStyle}>Chat</InputGroup.Text>
          <Form.Control
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Type your message here"
          ></Form.Control>
          <Button
            variant="primary"
            type="submit"
            disabled={!message}
            style={buttonStyle}
          >
            Send
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default SendMessageForm;
