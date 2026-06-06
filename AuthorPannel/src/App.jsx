import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Tasks from "./Pages/Tasks/Tasks";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Wrapper */}
        <Route element={<MainLayout />}>

        
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route path="/tasks" element={<Tasks />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;