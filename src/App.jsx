import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute"; // Assuming ProtectedRoute is saved under components folder
import Navbar from "./components/layout/Navbar";
import { parseJwt } from "./utility/parseJwt";
import Dashboard from "./pages/Dashboard";
import ActiveChat from "./pages/ActiveChat";
import History from "./pages/History";
import Profile from "./pages/Profile";
const App = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    description: "",
  });

  const [userId, setUserId] = useState(null);

  const handleUserId = (id) => {
    setUserId(id);
  };
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming the token is stored with the key 'token'
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.nameid) {
        handleUserId(decoded.nameid);
      }
    }
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Router>
      <Navbar
        userId={userId}
        setUserId={handleUserId}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard userId={userId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/History"
          element={
            <ProtectedRoute>
              <History userId={userId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile userId={userId} />
            </ProtectedRoute>
          }
        />
        <Route path="/ActiveChat/:roomId" element={<ActiveChat />} />{" "}
        <Route
          path="/Login"
          element={
            <Login
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              userId={userId}
              handleUserId={handleUserId}
            />
          }
        />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
