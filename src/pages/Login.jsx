import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Step 1: Import useHistory
import { parseJwt } from "../utility/parseJwt";

function Login({ userDetails, setUserDetails, userId, handleUserId }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Step 2: Use useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLoginSuccess = (user) => {
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7162/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const user = {
        username: data.result.username,
        email: data.result.email,
        description: data.result.description,
      }; // Assuming the response contains the user object
      const token = data.result.token; // Assuming the response contains the token
      const decodedJwt = parseJwt(token);
      handleUserId(decodedJwt.nameid);
      console.log(decodedJwt.nameid);
      // Calculate expiry time (current time + 14 days)
      const expiryTime = new Date(
        new Date().getTime() + 14 * 24 * 60 * 60 * 1000
      );

      // Store token and expiry time in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", expiryTime.toISOString());

      setUserDetails({
        username: user.username,
        email: user.email,
        description: user.description,
      });
      console.log(userDetails);
      onLoginSuccess(user);
      navigate("/"); // Redirect to ChatandWaitRoom
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center container">
      <div className="container p-5 formContainer">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <button
          className="btn btn-success"
          onClick={() => navigate("/Register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
