import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

function WaitingRoom(props) {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");

  const formStyle = {
    marginTop: "20vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    marginBottom: "10px",
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Connect with people
      </h1>
      <Form
        onSubmit={(e) => {
          console.log(props);
          e.preventDefault();
          props.joinChatRoom(userName, chatRoom);
        }}
        style={formStyle}
      >
        <Row>
          <Col sm={12}>
            <Form.Group>
              <Form.Control
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                style={inputStyle}
              />
              <Form.Control
                placeholder="Chat Room"
                onChange={(e) => setChatRoom(e.target.value)}
                style={inputStyle}
              />
            </Form.Group>
          </Col>
          <Col sm={12}>
            <hr />
            <Button
              variant="success"
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#AF06FF", borderColor: "#AF06FF" }}
            >
              {" "}
              {/* Custom color and border */}
              Join Room
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default WaitingRoom;
