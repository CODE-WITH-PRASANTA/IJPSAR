import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const EditorProtectedRoute = () => {
  const token = localStorage.getItem("editorToken");
  const editor = JSON.parse(
    localStorage.getItem("editorData")
  );

  if (!token || !editor) {
    return <Navigate to="/editor-login" replace />;
  }

  if (editor.role !== "Editor") {
    return <Navigate to="/editor-login" replace />;
  }

  return <Outlet />;
};

export default EditorProtectedRoute;