import React from "react";
import { useParams } from "react-router-dom";

function ActiveChat() {
  const { roomId } = useParams();

  return <div>ActiveChat Room ID: {roomId}</div>;
}

export default ActiveChat;
