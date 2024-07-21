import React from "react";
import { useNavigate } from "react-router-dom";

function UserGroup({ room, userId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(userId);
    navigate(`/ActiveChat/${room.roomId}`, { state: { userId } });
  };

  const styles = {
    roomName: {
      fontWeight: "bold",
      fontSize: "24px",
      marginBottom: "5px",
    },
    messageCount: {
      fontSize: "16px",
      color: "#6c757d",
      marginBottom: "15px",
    },
    memberList: {
      paddingLeft: "20px",
    },
    memberItem: {
      marginBottom: "5px",
      fontSize: "16px",
    },
  };

  return (
    <div
      className="card h-100 shadow-sm"
      style={{
        minWidth: "300px",
        cursor: "pointer",
        margin: "10px",
        borderRadius: "1rem",
      }} // Inline styles for card dimensions and cursor
      onClick={handleClick}
    >
      <div className="card-body">
        <div style={styles.roomName}>{room.name}</div>
        <div style={styles.messageCount}>Messages: {room.messageCount}</div>
        <div className="card-text">
          <strong>Members:</strong>
          <ul className="list-unstyled" style={styles.memberList}>
            {room.users.map((user, index) => (
              <li key={index} style={styles.memberItem}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserGroup;
