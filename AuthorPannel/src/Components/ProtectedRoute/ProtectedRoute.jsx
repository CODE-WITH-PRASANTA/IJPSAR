import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authorToken");

  if (!token) {
    return <Navigate to="/author/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;