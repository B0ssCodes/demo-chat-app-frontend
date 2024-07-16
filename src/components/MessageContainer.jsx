function MessageContainer({ messages }) {
  // Updated inline styles
  const tableStyle = {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0)", // Fully transparent background for the table
    borderCollapse: "separate",
    borderSpacing: "0 8px", // Adds space between rows
  };

  const tdStyle = {
    padding: "12px 20px", // Increased padding for better spacing
    border: "none", // No border for table cells
    borderRadius: "15px", // Rounded corners for a modern look
    backgroundColor: "#f8f9fa", // Light background color for each message
    display: "block", // Display block to stack messages vertically
    margin: "4px 0", // Margin between messages
  };

  const messageStyle = {
    color: "#343a40", // Dark grey color for text for better readability
    display: "block", // Ensure the message content is displayed as a block
    marginTop: "4px", // Space between the sender's name and the message content
  };

  const userStyle = {
    color: "#AF06FF", // Custom purple color for the user name
    fontWeight: "bold",
    display: "block", // Display the sender's name as a block to place it above the message content
  };

  return (
    <table className="striped bordered" style={tableStyle}>
      <tbody>
        {messages.map((message, index) => (
          <tr key={index}>
            <td style={tdStyle}>
              <span style={userStyle}>{message.user}</span>{" "}
              {/* Sender's name */}
              <span style={messageStyle}>{message.message}</span>{" "}
              {/* Message content */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MessageContainer;
