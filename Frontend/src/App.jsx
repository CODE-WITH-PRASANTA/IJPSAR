import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from './Pages/Home/Home'
import AboutIJPSAR from './Pages/AboutIJPSAR/AboutIJPSAR'
import EditorialBoard from "./Pages/EditorialBoard/EditorialBoard";
import IndexingAbstracting from "./Pages/IndexingAbstracting/IndexingAbstracting";
import PublicationEthics from "./Pages/PublicationEthics/PublicationEthics";

import Authors from "./Pages/Authors/Authors";

function App() {
  return (
    <Router>

      {/* 🔝 Global Top Layout */}
      <Topbar />
      <Navbar />
      

      {/* 🔄 Routes */}
      <Routes>

       <Route path="/" element={<Home />} />
       <Route path="/about-ijpasr" element={<AboutIJPSAR />} />
        <Route path="/editorial-board" element={<EditorialBoard />} />
        <Route path="/indexing-abstracting" element={<IndexingAbstracting />} />
        <Route path="/publication-ethics" element={<PublicationEthics />} />

       <Route path="/authors" element={<Authors />} />

      </Routes>

     <Footer />

     
     
    </Router>
  );
}

export default App;