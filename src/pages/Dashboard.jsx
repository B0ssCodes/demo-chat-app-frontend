import { useState } from "react";
import UserGroups from "../components/UserGroups";

function Dashboard({ userId }) {
  const [userGroups, setUserGroups] = useState([]);
  return (
    <div>
      Dashboard
      <UserGroups
        userGroups={userGroups}
        setUserGroups={setUserGroups}
        userId={userId}
      />
    </div>
  );
}

export default Dashboard;
