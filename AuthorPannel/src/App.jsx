import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Tasks from "./Pages/Tasks/Tasks";
import CalendarPage from "./Pages/CalendarPage/CalendarPage";

import SubmitFrom from "./Components/SubmitFrom/SubmitFrom";
import AuthorAuth from "./Components/AuthorAuth/AuthorAuth";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/author/auth" replace />} />

        {/* Login / Register */}
        <Route path="/author/auth" element={<AuthorAuth />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/submit-paper" element={<SubmitFrom />} />

          <Route path="/tasks" element={<Tasks />} />

          <Route path="/calendar" element={<CalendarPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/author/auth" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;