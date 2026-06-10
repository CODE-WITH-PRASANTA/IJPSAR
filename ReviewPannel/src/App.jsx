import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Wrapper */}
        <Route path="/" element={<MainLayout />}>

          
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;