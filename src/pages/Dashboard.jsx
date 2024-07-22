import { useState } from "react";
import UserGroups from "../components/UserGroups";
import CreateRoomButton from "../components/CreateRoomButton";
import JoinRoomButton from "../components/JoinRoomButtom";

function Dashboard({ userId, username }) {
  const [rooms, setRooms] = useState([]);

  return (
    <div>
      <UserGroups
        rooms={rooms}
        setRooms={setRooms}
        userId={userId}
        username={username}
      />
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <CreateRoomButton userId={userId} rooms={rooms} setRooms={setRooms} />
        <JoinRoomButton userId={userId} rooms={rooms} setRooms={setRooms} />
      </div>
    </div>
  );
}

export default Dashboard;
