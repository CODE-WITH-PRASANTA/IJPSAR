import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaChevronDown, 
  FaBars, 
  FaTimes, 
  FaBookOpen, 
  FaGlobe, 
  FaTelegramPlane 
} from "react-icons/fa";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import "./Navbar.css";
import logo from "../../assets/p-2.jpeg";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <nav className="navbarMainContainer">
      <div className="navbarWrapper">
        
        {/* LEFT BRAND SECTION */}
        <div className="navbarBrandSection">
          <Link to="/" className="navbarLogoLink">
            <img src={logo} alt="IJPASR Logo" className="navbarLogo" />
          </Link>
          <div className="navbarBrandMeta">
            <div className="navbarMetaBadge">
              <FaBookOpen className="navbarMetaIcon" />
              <span>ISSN: Applied</span>
            </div>
            <div className="navbarMetaBadge hide-mobile-meta">
              <FaGlobe className="navbarMetaIcon" />
              <span>Open Access · Refereed</span>
            </div>
          </div>
        </div>

        {/* MIDDLE COMBINED STACK (EMAILS ON TOP, TITLES UNDERNEATH) */}
        <div className="navbarMiddleStack">
          
          {/* DESKTOP EMAIL STRIP (PLACED DIRECTLY ABOVE TITLES) */}
          <div className="navbarEmailRibbon">
            <a href="mailto:editor@ijpasr.com" className="navbarEmailLink">
              <HiOutlineMail className="navbarEmailIcon" />
              <span>editor@ijpasr.com</span>
            </a>
            <div className="navbarEmailDivider"></div>
            <a href="mailto:editorijpasr@gmail.com" className="navbarEmailLink">
              <HiOutlineMail className="navbarEmailIcon" />
              <span>editorijpasr@gmail.com</span>
            </a>
          </div>

          {/* CORE INTERACTIVE MENU LINKS */}
          <div className={`navbarMenuContainer ${mobileMenu ? "navbarMenuActive" : ""}`}>
            <div className="navbarCloseButton" onClick={closeMobileMenu}>
              <FaTimes />
            </div>

            <Link to="/" className="navbarMenuItem" onClick={closeMobileMenu}>
              Home
            </Link>

            {/* ABOUT DROPDOWN */}
            <div className="navbarDropdownContainer">
              <div className="navbarMenuItem">
                About
                <FaChevronDown className="navbarArrowIcon" />
              </div>
              <div className="navbarDropdownMenu navbarSmallDropdown">
                <Link to="/about-ijpasr" className="navbarDropdownItem" onClick={closeMobileMenu}>About IJPASR</Link>
                <Link to="/indexing-abstracting" className="navbarDropdownItem" onClick={closeMobileMenu}>Indexing & Abstracting</Link>
                <Link to="/publication-ethics" className="navbarDropdownItem" onClick={closeMobileMenu}>Publication Ethics</Link>
                <Link to="/faq" className="navbarDropdownItem" onClick={closeMobileMenu}>FAQ</Link>
                <Link to="/authors" className="navbarDropdownItem" onClick={closeMobileMenu}>Authors</Link>
                <Link to="/peer-review-process" className="navbarDropdownItem" onClick={closeMobileMenu}>Peer Review Process</Link>
                <Link to="/plagiarism-policy" className="navbarDropdownItem" onClick={closeMobileMenu}>Plagiarism Policy</Link>
              </div>
            </div>

            {/* ARTICLES DROPDOWN */}
            <div className="navbarDropdownContainer">
              <div className="navbarMenuItem">
                Articles
                <FaChevronDown className="navbarArrowIcon" />
              </div>
              <div className="navbarDropdownMenu navbarLargeDropdown">
                <div className="navbarDropdownColumn">
                  <h4 className="navbarDropdownTitle">Browse</h4>
                  <Link to="/search-articles" className="navbarDropdownItem" onClick={closeMobileMenu}>Search Articles</Link>
                </div>
                <div className="navbarDropdownColumn">
                  <h4 className="navbarDropdownTitle">Authors</h4>
                  <Link to="/submit-manuscript" className="navbarDropdownItem" onClick={closeMobileMenu}>Submit Manuscript</Link>
                  <Link to="/author-guidelines" className="navbarDropdownItem" onClick={closeMobileMenu}>Author Guidelines</Link>
                </div>
              </div>
            </div>
              
            <Link to="/editorial-board" className="navbarMenuItem" onClick={closeMobileMenu}>Editorial Board</Link>
            <Link to="/current-issue" className="navbarMenuItem" onClick={closeMobileMenu}>Current Issue</Link>
            <Link to="/archives" className="navbarMenuItem" onClick={closeMobileMenu}>Archives</Link>
            <Link to="/contact" className="navbarMenuItem" onClick={closeMobileMenu}>Contact</Link>

            {/* MOBILE ONLY ACTION BLOCK INSIDE DRAWER */}
            <div className="navbarMobileActionGroup">
              <div className="navbarMobileLoginHeader">Portal Access</div>
              <div className="navbarMobileLoginLinks">
                <Link to="/login" className="navbarMobileLoginOption" onClick={closeMobileMenu}>Author</Link>
                <a href="https://editor.ijpasr.com/editor-login" className="navbarMobileLoginOption" onClick={closeMobileMenu}>Editor</a>
                <a href="https://admin.ijpasr.com/" className="navbarMobileLoginOption" onClick={closeMobileMenu}>Admin</a>
              </div>
              <div className="navbarMobileEmails">
                <div className="navbarMobileEmailItem">
                  <HiOutlineMail /> <span>editor@ijpasr.com</span>
                </div>
                <div className="navbarMobileEmailItem">
                  <HiOutlineMail /> <span>editorijpasr@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT ACTION CONTROLS */}
        <div className="navbarActionControlCluster">
          
          {/* DESKTOP INTEGRATED LOGIN DROPDOWN */}
          <div className="navbarLoginDropdown">
            <button className="navbarLoginButton">
              <HiOutlineUser className="navbarLoginIcon" />
              <span>Login</span>
            </button>
            <div className="navbarLoginDropdownMenu">
              <Link to="/login" className="navbarLoginDropdownLink">Author Portal</Link>
              <a href="https://editor.ijpasr.com/editor-login" className="navbarLoginDropdownLink">Editor Portal</a>
              <a href="https://admin.ijpasr.com" className="navbarLoginDropdownLink">Admin Portal</a>
            </div>
          </div>

          {/* PROMINENT ACTION BUTTON */}
          <button 
            className="navbarPrimarySubmitButton"
            onClick={() => navigate("/submit-paper")}
          >
            <FaTelegramPlane className="submitIconAnim" />
            <span>Submit Paper</span>
          </button>
          
          {/* HAMBURGER TRIGGER */}
          <div className="navbarMobileIcon" onClick={() => setMobileMenu(true)}>
            <FaBars />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;