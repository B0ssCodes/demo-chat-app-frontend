import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import LeaveRoom from "./LeaveRoom";

function RoomDetails({ userId, roomId }) {
  const [roomDetails, setRoomDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:7162/api/room/getRoom/${roomId}`)
      .then((response) => response.json())
      .then((data) => setRoomDetails(data.result))
      .catch((error) => console.error("Error fetching room details:", error));
  }, [roomId]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button
        variant="primary"
        style={{ position: "fixed", top: "10px", right: "10px", zIndex: 1050 }}
        onClick={handleShow}
      >
        Show Room Details
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Room Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {roomDetails ? (
            <>
              <p>
                <strong>ID:</strong> {roomDetails.roomId}
              </p>
              <p>
                <strong>Name:</strong> {roomDetails.name}
              </p>
              <p>
                <strong>Description:</strong> {roomDetails.description}
              </p>
              <p>
                <strong>Message Count:</strong> {roomDetails.messageCount}
              </p>
              <p>
                <strong>User Count:</strong> {roomDetails.userCount}
              </p>
              <p>
                <strong>Users:</strong>
              </p>
              <ul>
                {roomDetails.users.map((user, index) => (
                  <li key={index}>{user.username}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading room details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <LeaveRoom userId={userId} roomId={roomId} />
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RoomDetails;
