import React, { useState } from "react";
import {
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <nav className="navbarMainContainer">

      <div className="navbarWrapper">

        {/* MOBILE MENU */}
        <div
          className={`navbarMenuContainer ${
            mobileMenu ? "navbarMenuActive" : ""
          }`}
        >

          {/* CLOSE BUTTON */}
          <div
            className="navbarCloseButton"
            onClick={closeMobileMenu}
          >
            <FaTimes />
          </div>

          {/* HOME */}
          <Link
            to="/"
            className="navbarMenuItem"
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          {/* ABOUT */}
          <div className="navbarDropdownContainer">

            <div className="navbarMenuItem">
              About
              <FaChevronDown className="navbarArrowIcon" />
            </div>

            <div className="navbarDropdownMenu navbarSmallDropdown">

              <Link
                to="/about-ijpasr"
                className="navbarDropdownItem"
                onClick={closeMobileMenu}
              >
                About IJPASR
              </Link>

              <Link
                to="/editorial-board"
                className="navbarDropdownItem"
                onClick={closeMobileMenu}
              >
                Editorial Board
              </Link>

              <Link
                to="/indexing-abstracting"
                className="navbarDropdownItem"
                onClick={closeMobileMenu}
              >
              Indexing & Abstracting
              </Link>

              <Link
                to="/publication-ethics"
                className="navbarDropdownItem"
                onClick={closeMobileMenu}
              >
               Publication Ethics
              </Link>

              <Link
                to="/peer-review-process"
                className="navbarDropdownItem"
                onClick={closeMobileMenu}
              >
                Peer Review Process
              </Link>

               <Link
                to="/plagiarism-policy"
                className="navbarDropdownItem"
                onClick={closeMobileMenu}
              >
               Plagiarism Policy
              </Link>

            </div>

          </div>

          {/* ARTICLES */}
          <div className="navbarDropdownContainer">

            <div className="navbarMenuItem">
              Articles
              <FaChevronDown className="navbarArrowIcon" />
            </div>

            <div className="navbarDropdownMenu navbarLargeDropdown">

              {/* LEFT */}
              <div className="navbarDropdownColumn">

                <h4 className="navbarDropdownTitle">
                  Browse
                </h4>

                <Link
                  to="/current-issue"
                  className="navbarDropdownItem"
                  onClick={closeMobileMenu}
                >
                  Current Issue
                </Link>

                <Link
                  to="/archives"
                  className="navbarDropdownItem"
                  onClick={closeMobileMenu}
                >
                  Archives
                </Link>

                <Link
                  to="/search-articles"
                  className="navbarDropdownItem"
                  onClick={closeMobileMenu}
                >
                  Search Articles
                </Link>

                <Link
                  to="/best-paper-award"
                  className="navbarDropdownItem"
                  onClick={closeMobileMenu}
                >
                  Best Paper Award
                </Link>

              </div>

              {/* RIGHT */}
              <div className="navbarDropdownColumn">

                <h4 className="navbarDropdownTitle">
                  Authors
                </h4>

                <Link
                  to="/submit-manuscript"
                  className="navbarDropdownItem"
                  onClick={closeMobileMenu}
                >
                  Submit Manuscript
                </Link>

                <Link
                  to="/author-guidelines"
                  className="navbarDropdownItem"
                  onClick={closeMobileMenu}
                >
                  Author Guidelines
                </Link>

                <Link
                  to="/sample-article"
                  className="navbarDropdownItem"
                  onClick={closeMobileMenu}
                >
                  Sample Article
                </Link>

              </div>

            </div>

          </div>

          {/* AUTHORS */}
          <Link
            to="/authors"
            className="navbarMenuItem"
            onClick={closeMobileMenu}
          >
            Authors
          </Link>

          {/* CONTACT */}
          <Link
            to="/contact"
            className="navbarMenuItem"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

        </div>

        {/* MOBILE HAMBURGER */}
        <div
          className="navbarMobileIcon"
          onClick={() => setMobileMenu(true)}
        >
          <FaBars />
        </div>

      </div>

    </nav>
  );
};

export default Navbar;