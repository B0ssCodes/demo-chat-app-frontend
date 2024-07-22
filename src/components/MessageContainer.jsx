function MessageContainer({ messages }) {
  const tableStyle = {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
  };

  const tdStyle = {
    padding: "12px 20px",
    border: "none",
    borderRadius: "15px",
    backgroundColor: "#f8f9fa",
    display: "block",
    margin: "4px 0",
  };

  const messageStyle = {
    color: "#343a40",
    display: "block",
    marginTop: "4px",
  };

  const userStyle = {
    color: "#AF06FF",
    fontWeight: "bold",
    display: "block",
  };

  return (
    <table className="striped bordered" style={tableStyle}>
      <tbody>
        {messages.map((message, index) => (
          <tr key={index}>
            <td style={tdStyle}>
              <span style={userStyle}>{message.user}</span>{" "}
              <span style={messageStyle}>{message.message}</span>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MessageContainer;
