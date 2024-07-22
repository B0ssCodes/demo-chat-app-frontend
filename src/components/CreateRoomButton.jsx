import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function CreateRoomButton({ userId, rooms, setRooms }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomData = {
      name: roomName,
      description,
      userId: parseInt(userId, 10),
    };

    try {
      const response = await fetch(
        "https://localhost:7162/api/room/createRoom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roomData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.message || `Error: ${response.status}`;
        console.error("Failed to create room:", errorMessage);
        alert(errorMessage);
        return;
      }

      const newRoom = await response.json();
      setRooms([...rooms, newRoom.result]);
      toggleModal();
    } catch (error) {
      console.error("Failed to create room:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <Button onClick={toggleModal}>Create Room</Button>
      <Modal show={modalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default CreateRoomButton;
