import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
s;
import ChatandWaitRoom from "./pages/ChatandWaitRoom";
import ProtectedRoute from "./components/ProtectedRoute"; // Assuming ProtectedRoute is saved under components folder

const App = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    description: "",
  });
  return (
    <Router>
      <Routes>
        <Route
          path="/Login"
          element={
            <Login userDetails={userDetails} setUserDetails={setUserDetails} />
          }
        />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChatandWaitRoom />
            </ProtectedRoute>
          }
        />
        {/* Wrap other protected routes in a similar manner */}
      </Routes>
    </Router>
  );
};

export default App;
