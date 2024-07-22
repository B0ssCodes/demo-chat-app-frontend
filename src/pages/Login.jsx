import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../utility/parseJwt";

function Login({ userDetails, setUserDetails, userId, handleUserId }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

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

    // Check if any credential is empty (copilot)
    const isAnyFieldEmpty = Object.values(credentials).some(
      (value) => value.trim() === ""
    );
    if (isAnyFieldEmpty) {
      alert("Please fill in all fields.");
      return;
    }

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
      };
      const token = data.result.token;
      const decodedJwt = parseJwt(token);
      handleUserId(decodedJwt.nameid);
      console.log(decodedJwt.nameid);
      const expiryTime = new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      );

      // Delete the token if there is one already
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");

      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", expiryTime.toISOString());

      setUserDetails({
        username: user.username,
        email: user.email,
        description: user.description,
      });
      console.log(userDetails);
      onLoginSuccess(user);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center container">
      <div className="container p-5 formContainer">
        <h2 className="text-center display-4">Login</h2>
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
          className="btn btn-success mt-4"
          onClick={() => navigate("/Register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
