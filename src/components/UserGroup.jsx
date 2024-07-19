import React from "react";
import { useNavigate } from "react-router-dom";

function UserGroup({ groupName, members, groupId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ActiveChat/${groupId}`);
  };

  const styles = {
    card: {
      minWidth: "300px",
      border: "1px solid #dee2e6",
      borderRadius: "1rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s",
      padding: "20px",
      margin: "10px",
      cursor: "pointer",
    },
    groupName: {
      fontWeight: "bold",
      fontSize: "24px",
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
      style={styles.card}
      onClick={handleClick}
    >
      <div className="card-body">
        <div style={styles.groupName}>{groupName}</div>
        <div className="card-text">
          <strong>Members:</strong>
          <ul className="list-unstyled" style={styles.memberList}>
            {members.map((user, index) => (
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
