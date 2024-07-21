import { useState } from "react";
import UserGroups from "../components/UserGroups";
import CreateRoomButton from "../components/CreateRoomButton";

function Dashboard({ userId }) {
  const [rooms, setRooms] = useState([]);

  return (
    <div>
      <h1 className="display-2 ">Dashboard</h1>
      <UserGroups rooms={rooms} setRooms={setRooms} userId={userId} />
      <CreateRoomButton userId={userId} rooms={rooms} setRooms={setRooms} />
    </div>
  );
}

export default Dashboard;
