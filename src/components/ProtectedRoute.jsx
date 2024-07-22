import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  const isTokenExpired = () => {
    // If there is no token expiry date, return false, there is no token
    if (!tokenExpiry) return false;

    const expiryDate = new Date(tokenExpiry);
    const now = new Date();

    return now > expiryDate; // True if expired
  };

  if (!token || isTokenExpired()) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;
