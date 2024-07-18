import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Replace 'token' with your actual token key

  if (!token) {
    // If there is no token in localStorage, redirect to login
    return <Navigate to="/Login" replace />;
  }

  return children; // If there is a token, render the children components
};

export default ProtectedRoute;
