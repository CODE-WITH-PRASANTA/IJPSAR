import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import AboutIJPSAR from "./Pages/AboutIJPSAR/AboutIJPSAR";
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

import FaqSection from "./Pages/FaqSection/FaqSection";
import LoginForm from "./Components/LoginForm/LoginForm";
import SubmitFrom from "./Components/SubmitFrom/SubmitFrom";

import ReturnRefund from "./Components/ReturnRefund/ReturnRefund";
import Privacypolicy from "./Components/Privacypolicy/Privacypolicy";
import Disclaimer from "./Components/Disclaimer/Disclaimer";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";
import FloatingForm from "./Components/FloatingForm/FloatingForm";
import PreeReview from "./Pages/PreeReview/PreeReview";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        {/* <Topbar /> */}

        <Navbar />
        <ScrollToTop />
        {/* 🔄 Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-ijpasr" element={<AboutIJPSAR />} />
          <Route path="/editorial-board" element={<EditorialBoard />} />
          <Route
            path="/indexing-abstracting"
            element={<IndexingAbstracting />}
          />
          <Route path="/publication-ethics" element={<PublicationEthics />} />
          <Route path="/peer-review-process" element={<PeerReview />} />
          <Route path="/plagiarism-policy" element={<PlagiarismPolicy />} />
          <Route path="/submit-manuscript" element={<SubmitManuscript />} />
          <Route path="/author-guidelines" element={<AuthorGuidelines />} />
          <Route path="/sample-article/:id" element={<ArticleDetails />} />

          <Route path="/authors" element={<Authors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/current-issue" element={<CurrentIsuue />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/search-articles" element={<SearchArticle />} />
          
          <Route path="/best-paper-award" element={<Nomination />} />
          <Route path="/terms-and-conditions" element={<TermCondition />} />
          <Route path="/faq" element={<FaqSection />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/about-ijpasr" element={<AboutIJPSAR />} />
          <Route path="/editorial-board" element={<EditorialBoard />} />
          <Route
            path="/indexing-abstracting"
            element={<IndexingAbstracting />}
          />
          <Route path="/publication-ethics" element={<PublicationEthics />} />
          <Route path="/peer-review-process" element={<PeerReview />} />
          <Route path="/plagiarism-policy" element={<PlagiarismPolicy />} />
          <Route path="/submit-manuscript" element={<SubmitManuscript />} />
          <Route path="/author-guidelines" element={<AuthorGuidelines />} />
          <Route path="/sample-article/:id" element={<ArticleDetails />} />

          <Route path="/submit-paper" element={<SubmitFrom />} />

          <Route path="/return-refund-policy" element={<ReturnRefund />} />
          <Route path="/privacy-policy" element={<Privacypolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/peer-review" element={<PreeReview />} />
        </Routes>

        <Footer />

        <FloatingIcons />
        <FloatingForm />
      </Router>
    </>
  );
}

export default App;
