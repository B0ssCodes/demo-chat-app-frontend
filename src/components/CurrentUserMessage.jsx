function CurrentUserMessage({ message }) {
  return (
    <div
      style={{
        backgroundColor: "#E0F7FA",
        textAlign: "left",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "20px",
        display: "inline-block",
        maxWidth: "80%",
        marginLeft: "20%",
        border: "1px solid #B2EBF2",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
        {message.username}
      </div>

      <div>{message.content}</div>
      <div style={{ fontSize: "12px", marginTop: "10px", color: "#666" }}>
        {new Date(message.timestamp).toLocaleString()}
      </div>
    </div>
  );
}

export default CurrentUserMessage;
