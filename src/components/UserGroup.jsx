import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserGroup.css";

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
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
      gap: "10px", // Space between items
      paddingLeft: "20px",
    },
    memberItem: {
      marginBottom: "5px",
      fontSize: "16px",
    },
  };

  return (
    <div
      className="card h-100 shadow-sm user-group-card"
      style={{
        minWidth: "300px",
        cursor: "pointer",
        borderRadius: "1rem",
      }}
      onClick={handleClick}
    >
      <div className="card-body ">
        <div style={styles.roomName}>{room.name}</div>
        <div style={styles.messageCount}>Messages: {room.messageCount}</div>
        <div className="card-text">
          <strong>Members: {room.userCount}</strong>
          <ul className="list-unstyled" style={styles.memberList}>
            {room.users.slice(0, 6).map((user, index) => (
              <li
                key={index}
                style={{
                  ...styles.memberItem,
                  backgroundColor: "lightblue",
                  borderRadius: "8px",
                }}
              >
                <div className="text-center">{user.username}</div>
              </li>
            ))}
            {room.users.length > 6 && <li style={styles.memberItem}>...</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserGroup;
