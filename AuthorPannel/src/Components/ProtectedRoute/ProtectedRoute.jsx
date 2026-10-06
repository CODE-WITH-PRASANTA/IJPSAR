import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  isTokenValid,
  getTokenRemainingTime,
  logoutUser,
} from "../../Utils/auth";

const ProtectedRoute = ({ children }) => {
  const valid = isTokenValid();

  useEffect(() => {
    if (!valid) return;

    const remaining = getTokenRemainingTime();

    const timer = setTimeout(() => {
      Swal.fire({
        icon: "info",
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
        confirmButtonColor: "#2563EB",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
      }).then(() => {
        logoutUser("session-expired");
      });
    }, remaining);

    return () => clearTimeout(timer);
  }, [valid]);

  if (!valid) {
    return <Navigate to="/author/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;