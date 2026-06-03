import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MainLayout from "./Layout/Mainlayout/Mainlayout";




const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Routes */}
        <Route path="/" element={<MainLayout />} />

        

      </Routes>
    </BrowserRouter>
  );
};

export default App;