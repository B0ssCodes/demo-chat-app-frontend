import { Link } from "react-router-dom";
import Logout from "../Logout";

function Navbar({ userDetails, setUserDetails, userId, setUserId }) {
  const navbarStyle = {
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: "#f8f9fa", // Bootstrap light bg color
  };

  return (
    <nav
      style={navbarStyle}
      className="navbar navbar-expand-lg navbar-light bg-light"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ChatApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/history">
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            {/* Conditionally render Logout based on userDetails */}
            {userId && (
              <li className="nav-item">
                <Logout
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                  userId={userId}
                  setUserId={setUserId}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
