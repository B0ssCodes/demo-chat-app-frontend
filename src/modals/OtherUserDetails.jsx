import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const OtherUserDetails = ({ userId, username }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const parsedUserId = parseInt(userId, 10);
      const response = await fetch(
        `https://localhost:7162/api/auth/userDetails/${parsedUserId}`
      );
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.message || "Failed to load user profile";
        alert(errorMessage);
        return;
      }
      setUserDetails(data.result);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <div
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={fetchUserDetails}
      >
        {username}
      </div>
      <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userDetails && (
            <>
              <p>UserId: {userDetails.userId}</p>
              <p>Username: {userDetails.username}</p>
              <p>Description: {userDetails.description}</p>
              <p>Rooms:</p>
              <ul>
                {userDetails.rooms.map((room) => (
                  <li key={room.roomId}>
                    {room.name}: {room.roomId}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OtherUserDetails;
