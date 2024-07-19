import { useEffect } from "react";
import UserGroup from "./UserGroup";
import { Col, Row } from "react-bootstrap";

function UserGroups({ userGroups, setUserGroups, userId }) {
  useEffect(() => {
    const fetchUserGroups = async () => {
      const url = `https://localhost:7162/api/room/getRoomsByUser/${userId}`;
      try {
        console.log(userId);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserGroups(data.result);
        console.log(data.result);
      } catch (error) {
        console.error("Error fetching user groups:", error);
      }
    };

    if (userId) {
      fetchUserGroups();
    }
  }, [userId, setUserGroups]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Groups</h1>
      {userGroups.length > 0 ? (
        <Row>
          {userGroups.map((group) => (
            <Col sm={12} md={6} key={group.roomId}>
              <UserGroup
                groupName={group.name}
                groupId={group.roomId}
                members={group.users}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No user groups found.</p>
      )}
    </div>
  );
}

export default UserGroups;
