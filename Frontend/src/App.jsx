import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";


import './App.css'
import Home from './Pages/Home/Home'

function App() {
  return (
    <Router>

      {/* 🔝 Global Top Layout */}
      <Topbar />
      <Navbar />
      

      {/* 🔄 Routes */}
      <Routes>

       
      </Routes>

     <Footer />
     
    </Router>
  );
}

export default App;