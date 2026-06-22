import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Tasks from "./Pages/Tasks/Tasks";
import CalendarPage from "./Pages/CalendarPage/CalendarPage";
import SubmitFrom from "./Components/SubmitFrom/SubmitFrom";
import Papermanagement from "./Components/Papermanagement/Papermanagement";
import Publishpaper from "./Components/Publishpaper/Publishpaper";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root URL */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Layout Wrapper */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/tasks" element={<Tasks />} />

          <Route path="/submit-paper" element={<SubmitFrom />} />

          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/paper-management" element={<Papermanagement />} />
          <Route path="/published-papers" element={<Publishpaper />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
