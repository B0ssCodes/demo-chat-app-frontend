import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function LeaveRoom({ userId, roomId }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLeaveRoom = async () => {
    const response = await fetch(
      "https://localhost:7162/api/room/removeUserFromRoom",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt(userId, 10),
          roomId: parseInt(roomId, 10),
        }),
      }
    );

    if (response.ok) {
      navigate("/");
    } else {
      console.error("Failed to leave room");
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const confirmLeave = () => {
    handleLeaveRoom();
    handleClose();
  };

  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Leave Room
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to leave the room?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={confirmLeave}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LeaveRoom;
