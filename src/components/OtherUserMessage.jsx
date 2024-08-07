import OtherUserDetails from "../modals/OtherUserDetails";

function OtherUserMessage({ message }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "left",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "20px",
        display: "inline-block",
        maxWidth: "80%",
        border: "1px solid #ccc",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <OtherUserDetails userId={message.userId} username={message.username} />
      <div>{message.content}</div>
      <div style={{ fontSize: "12px", marginTop: "10px", color: "#666" }}>
        {new Date(message.timestamp).toLocaleString()}
      </div>
    </div>
  );
}

export default OtherUserMessage;
