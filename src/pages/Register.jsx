import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // Same attributes as RegisterRequestDTO in backend
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    const { username, email, password, description } = credentials;
    if (!username || !email || !password || !description) {
      alert("Please fill in all fields.");
      return;
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7162/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const data = await response.json();
        alert(`Registration failed: ${data.message}`); // Changed from data.messages to data.message
        return; // Add return to prevent further execution
      }
      navigate("/Login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(`Registration failed. ${error.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center container">
      <div className="container p-5 formContainer">
        <h2 className="text-center">Register</h2>
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
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
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
          <div className="form-group mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={credentials.description}
              onChange={handleChange}
              className="form-control"
              placeholder="Describe yourself"
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
