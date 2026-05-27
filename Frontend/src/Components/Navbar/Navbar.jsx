import React, { useState } from "react";

import {
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./Navbar.css";

/* LOGO */
import logo from "../../assets/p-2.JPEG";

const Navbar = () => {

  const [mobileMenu, setMobileMenu] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <nav className="navbarMainContainer">

      <div className="navbarWrapper">

        {/* LEFT LOGO */}
        <div className="navbarLogoContainer">

          <Link to="/">
            <img
              src={logo}
              alt="IJPASR Logo"
              className="navbarLogo"
            />
          </Link>

        </div>

        {/* MENU */}
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
              >
                About IJPASR
              </Link>

              <Link
                to="/editorial-board"
                className="navbarDropdownItem"
              >
                Editorial Board
              </Link>

              <Link
                to="/indexing-abstracting"
                className="navbarDropdownItem"
              >
                Indexing & Abstracting
              </Link>

              <Link
                to="/publication-ethics"
                className="navbarDropdownItem"
              >
                Publication Ethics
              </Link>

              <Link
                to="/peer-review-process"
                className="navbarDropdownItem"
              >
                Peer Review Process
              </Link>

              <Link
                to="/plagiarism-policy"
                className="navbarDropdownItem"
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
                >
                  Current Issue
                </Link>

                <Link
                  to="/archives"
                  className="navbarDropdownItem"
                >
                  Archives
                </Link>

                <Link
                  to="/search-articles"
                  className="navbarDropdownItem"
                >
                  Search Articles
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
                >
                  Submit Manuscript
                </Link>

                <Link
                  to="/author-guidelines"
                  className="navbarDropdownItem"
                >
                  Author Guidelines
                </Link>

              </div>

            </div>

          </div>

          {/* FAQ */}
          <Link
            to="/faq"
            className="navbarMenuItem"
            onClick={closeMobileMenu}
          >
            FAQ
          </Link>

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

        {/* MOBILE MENU ICON */}
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