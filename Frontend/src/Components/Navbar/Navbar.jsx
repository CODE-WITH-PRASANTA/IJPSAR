
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaBars,
  FaTimes,
  FaTelegramPlane,
} from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";
import "./Navbar.css";
import logo from "../../assets/p-2.jpeg";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [isStuck, setIsStuck] = useState(false);

  const navbarRef = useRef(null);
  const navbarHeightRef = useRef(100);

  useEffect(() => {
    const updateNavbar = () => {
      const topbar = document.querySelector(".topbarMainContainer");
      const topbarHeight = topbar
        ? topbar.getBoundingClientRect().height
        : 0;

      if (navbarRef.current) {
        navbarHeightRef.current =
          navbarRef.current.offsetHeight || 100;
      }

      setIsStuck(window.scrollY >= topbarHeight && topbarHeight > 0
        ? true
        : window.scrollY > 0 && !topbar
      );

      // If there is no Topbar, pin the navbar as soon as scrolling starts.
      if (topbarHeight === 0 && window.scrollY === 0) {
        setIsStuck(false);
      }
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
      passive: true,
    });
    window.addEventListener("resize", updateNavbar);

    return () => {
      window.removeEventListener("scroll", updateNavbar);
      window.removeEventListener("resize", updateNavbar);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setOpenDropdown("");
  };

  const toggleDropdown = (name) => {
    setOpenDropdown((current) =>
      current === name ? "" : name
    );
  };

  return (
    <div
      className={`navbarStickySlot ${isStuck ? "navbarIsFixed" : ""}`}
      style={{
        "--navbar-height": `${navbarHeightRef.current}px`,
      }}
    >
      <nav
        ref={navbarRef}
        className={`navbarMainContainer ${
          isStuck ? "navbarIsStuck" : ""
        }`}
      >
        <div className="navbarWrapper">
          {/* BRAND / LOGO */}
          <Link
            to="/"
            className="navbarBrandSection"
            onClick={closeMobileMenu}
          >
            <img
              src={logo}
              alt="IJPASR Logo"
              className="navbarLogo"
            />

            <div className="navbarBrandText">
              <span className="navbarBrandTitle">IJPASR</span>
              <span className="navbarBrandSubtitle">
                International Journal of Applied
              </span>
            </div>
          </Link>

          {/* MOBILE BACKDROP */}
          {mobileMenu && (
            <button
              type="button"
              className="navbarBackdrop"
              aria-label="Close navigation menu"
              onClick={closeMobileMenu}
            />
          )}

          {/* NAVIGATION MENU */}
          <div
            className={`navbarMenuContainer ${
              mobileMenu ? "navbarMenuActive" : ""
            }`}
          >
            <div className="navbarMobileHeader">
              <span>Navigation</span>
              <button
                type="button"
                className="navbarCloseButton"
                aria-label="Close menu"
                onClick={closeMobileMenu}
              >
                <FaTimes />
              </button>
            </div>

            <Link
              to="/"
              className="navbarMenuItem navbarHomeItem"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            {/* ABOUT DROPDOWN */}
            <div
              className={`navbarDropdownContainer ${
                openDropdown === "about"
                  ? "navbarDropdownOpen"
                  : ""
              }`}
            >
              <button
                type="button"
                className="navbarMenuItem navbarDropdownTrigger"
                aria-expanded={openDropdown === "about"}
                onClick={() => toggleDropdown("about")}
              >
                <span>About</span>
                <FaChevronDown className="navbarArrowIcon" />
              </button>

              <div className="navbarDropdownMenu navbarSmallDropdown">
                <Link to="/about-ijpasr" className="navbarDropdownItem" onClick={closeMobileMenu}>
                  About IJPASR
                </Link>
                <Link to="/indexing-abstracting" className="navbarDropdownItem" onClick={closeMobileMenu}>
                  Indexing &amp; Abstracting
                </Link>
                <Link to="/publication-ethics" className="navbarDropdownItem" onClick={closeMobileMenu}>
                  Publication Ethics
                </Link>
                <Link to="/faq" className="navbarDropdownItem" onClick={closeMobileMenu}>
                  FAQ
                </Link>
                <Link to="/authors" className="navbarDropdownItem" onClick={closeMobileMenu}>
                  Authors
                </Link>
                <Link to="/peer-review-process" className="navbarDropdownItem" onClick={closeMobileMenu}>
                  Peer Review Process
                </Link>
                <Link to="/plagiarism-policy" className="navbarDropdownItem" onClick={closeMobileMenu}>
                  Plagiarism Policy
                </Link>
              </div>
            </div>

            {/* ARTICLES DROPDOWN */}
            <div
              className={`navbarDropdownContainer ${
                openDropdown === "articles"
                  ? "navbarDropdownOpen"
                  : ""
              }`}
            >
              <button
                type="button"
                className="navbarMenuItem navbarDropdownTrigger"
                aria-expanded={openDropdown === "articles"}
                onClick={() => toggleDropdown("articles")}
              >
                <span>Articles</span>
                <FaChevronDown className="navbarArrowIcon" />
              </button>

              <div className="navbarDropdownMenu navbarLargeDropdown">
                <div className="navbarDropdownColumn">
                  <h4 className="navbarDropdownTitle">Browse</h4>
                  <Link to="/search-articles" className="navbarDropdownItem" onClick={closeMobileMenu}>
                    Search Articles
                  </Link>
                </div>

                <div className="navbarDropdownColumn">
                  <h4 className="navbarDropdownTitle">Authors</h4>
                  <Link to="/author-guidelines" className="navbarDropdownItem" onClick={closeMobileMenu}>
                    Author Guidelines
                  </Link>
                </div>
              </div>
            </div>

            <Link to="/editorial-board" className="navbarMenuItem" onClick={closeMobileMenu}>
              Editorial Board
            </Link>
            <Link to="/current-issue" className="navbarMenuItem" onClick={closeMobileMenu}>
              Current Issue
            </Link>
            <Link to="/archives" className="navbarMenuItem" onClick={closeMobileMenu}>
              Archives
            </Link>
            <Link to="/contact" className="navbarMenuItem" onClick={closeMobileMenu}>
              Contact
            </Link>

            {/* MOBILE PORTAL LINKS */}
            <div className="navbarMobileActionGroup">
              <span className="navbarMobileLoginHeader">
                Portal Access
              </span>

              <a href="https://author.ijpasr.com" className="navbarMobileLoginOption">
                Author Portal
              </a>
              <a href="https://editor.ijpasr.com/editor-login" className="navbarMobileLoginOption">
                Editor Portal
              </a>
              <a href="https://admin.ijpasr.com/" className="navbarMobileLoginOption">
                Admin Portal
              </a>

              <div className="navbarMobileContact">
                <a href="mailto:editor@ijpasr.com">editor@ijpasr.com</a>
                <a href="mailto:editorijpasr@gmail.com">editorijpasr@gmail.com</a>
              </div>
            </div>
          </div>

          {/* LOGIN AND SUBMIT PAPER */}
          <div className="navbarActionControlCluster">
            <div className="navbarLoginDropdown">
              <button type="button" className="navbarLoginButton">
                <HiOutlineUser className="navbarLoginIcon" />
                <span>Login</span>
                <FaChevronDown className="navbarLoginArrow" />
              </button>

              <div className="navbarLoginDropdownMenu">
                <a href="https://author.ijpasr.com" className="navbarDesktopLoginOption">
                  Author Portal
                </a>
                <a href="https://editor.ijpasr.com/editor-login" className="navbarDesktopLoginOption">
                  Editor Portal
                </a>
                <a href="https://admin.ijpasr.com/" className="navbarDesktopLoginOption">
                  Admin Portal
                </a>
              </div>
            </div>

            <a
              href="https://author.ijpasr.com"
              className="navbarPrimarySubmitButton"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane className="submitIconAnim" />
              <span>Submit Paper</span>
            </a>

            <button
              type="button"
              className="navbarMobileIcon"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenu}
              onClick={() => setMobileMenu(true)}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
