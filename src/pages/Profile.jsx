import React, { useEffect, useState } from "react";

function Profile({ userId }) {
  const [userDetails, setUserDetails] = useState({
    userId: "",
    username: "",
    email: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const response = await fetch(
          `https://localhost:7162/api/auth/getUserDetails/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        const data = await response.json();
        if (data && data.result) {
          setUserDetails(data.result);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://localhost:7162/api/auth/updateUserDetails",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: parseInt(userDetails.userId, 10),
            username: userDetails.username,
            email: userDetails.email,
            description: userDetails.description,
          }),
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setSuccessMessage("User details updated successfully.");
      } else {
        setSuccessMessage(
          data.message || "An error occurred while updating user details."
        );
      }
    } catch (error) {
      console.error("Failed to update user details:", error);
      setSuccessMessage("An error occurred while updating user details.");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            style={{ maxWidth: "400px" }} // Example of inline CSS for specific styling
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userDetails.email}
            readOnly
            style={{ maxWidth: "400px", backgroundColor: "#e9ecef" }} // Example of inline CSS
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={userDetails.description}
            onChange={handleChange}
            rows="3"
            style={{ maxWidth: "400px" }} // Example of inline CSS
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Details
        </button>
      </form>
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}
    </div>
  );
}

export default Profile;
