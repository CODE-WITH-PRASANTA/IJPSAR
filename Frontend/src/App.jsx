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
import PeerReview from "./Pages/PeerReview/PeerReview";
import PlagiarismPolicy from "./Pages/PlagiarismPolicy/PlagiarismPolicy";
import SubmitManuscript from "./Pages/SubmitManuscript/SubmitManuscript";
import AuthorGuidelines from "./Pages/AuthorGuidelines/AuthorGuidelines";
import ArticleDetails from "./Pages/ArticleDetails/ArticleDetails";

import Authors from "./Pages/Authors/Authors";
import Contact from "./Pages/Contact/Contact";
import CurrentIsuue from "./Pages/CurrentIsuue/CurrentIsuue";
import Archives from "./Pages/Archives/Archives";
import SearchArticle from "./Pages/SearchArticle/SearchArticle";
import Nomination from "./Pages/Nomination/Nomination";
import TermCondition from "./Pages/TermCondition/TermCondition";

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
        <Route path="/peer-review-process" element={<PeerReview />} />
        <Route path="/plagiarism-policy" element={<PlagiarismPolicy />} />
        <Route path="/submit-manuscript" element={<SubmitManuscript />} />
        <Route path="/author-guidelines" element={<AuthorGuidelines />} />
        <Route path="/sample-article" element={<ArticleDetails />} />

       <Route path="/authors" element={<Authors />} />
       <Route path="/contact" element={<Contact/>}/>
       <Route path="/current-issue" element={<CurrentIsuue/>}/>
       <Route path="/archives" element={<Archives/>}/>
       <Route path="/search-articles" element={<SearchArticle/>}/>
       <Route path="/best-paper-award" element={<Nomination/>}/>
       <Route path="/terms-and-conditions" element={<TermCondition/>}/>

      </Routes>

     <Footer />

     
     
    </Router>
  );
}

export default App;