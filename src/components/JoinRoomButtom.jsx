import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function JoinRoomButton({ userId, rooms, setRooms }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [roomId, setRoomId] = useState("");

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomData = {
      userId: parseInt(userId, 10),
      roomId: parseInt(roomId, 10),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://localhost:7162/api/room/addUserToRoom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(roomData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.message || "Failed to join the room. Please try again.";
        alert(errorMessage);
        return;
      }

      const newRoom = await response.json();
      if (newRoom.success === false) {
        alert(newRoom.message);
        return;
      }
      setRooms([...rooms, newRoom.result]);
      toggleModal();
    } catch (error) {
      console.error("Failed to join:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <Button onClick={toggleModal}>Join Room</Button>
      <Modal show={modalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Room ID</Form.Label>
              <Form.Control
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default JoinRoomButton;
