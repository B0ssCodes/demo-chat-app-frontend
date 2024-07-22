import { useEffect } from "react";
import UserGroup from "./UserGroup";
import { Col, Row } from "react-bootstrap";

function UserGroups({ rooms, setRooms, userId, username }) {
  useEffect(() => {
    const fetchRooms = async () => {
      const url = `https://localhost:7162/api/room/getRoomsByUser/${userId}`;
      try {
        console.log(userId);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRooms(data.result);
        console.log(data.result);
      } catch (error) {
        console.error("Error fetching user groups:", error);
      }
    };

    if (userId) {
      fetchRooms();
    }
  }, [userId, setRooms]);

  return (
    <div className="container" style={{ maxHeight: "85vh", overflowY: "auto" }}>
      <h1 className="text-center mb-4">{username}'s Rooms</h1>
      {rooms.length > 0 ? (
        <Row>
          {rooms.map((room) => (
            <Col sm={6} md={4} key={room.roomId}>
              <UserGroup room={room} userId={userId} />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">
          You are not in any room, create or join one!
        </p>
      )}
    </div>
  );
}

export default UserGroups;
