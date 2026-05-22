// Footer.jsx

import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import {
  FiMail,
  FiGlobe,
} from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";

import footerLogo from "../../assets/p-2.JPEG"; // IMPORT YOUR LOGO
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footerMainContainer">
      <div className="footerWrapper">

        {/* LEFT SECTION */}
        <div className="footerLeftSection">
          <div className="footerLogoContainer">
            <img
              src={footerLogo}
              alt="IJPASR Logo"
              className="footerLogoImage"
            />

            <div className="footerLogoTextContainer">
              <h2>IJPASR</h2>
              <p>Pharmaceutical & Allied Sciences Research</p>
            </div>
          </div>

          <p className="footerDescription">
            An international, open-access, peer-reviewed journal
            dedicated to advancing pharmaceutical sciences, drug
            discovery, and translational research.
          </p>

          <div className="footerSocialIconsContainer">
            <a href="/">
              <FaXTwitter />
            </a>

            <a href="/">
              <FaLinkedinIn />
            </a>

            <a href="/">
              <FaFacebookF />
            </a>

            <a href="/">
              R
            </a>

            <a href="/">
              iD
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footerLinksSection">
          <h3>QUICK LINKS</h3>

          <div className="footerLinksList">
            <Link to="/about">About</Link>
            <Link to="/editorial-board">Editorial Board</Link>
            <Link to="/indexing">Indexing</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/terms-and-conditions">
              Terms & Conditions
            </Link>
            <Link to="/return-refund-policy">
              Return & Refund Policy
            </Link>
            <Link to="/privacy-policy">
              Privacy Policy
            </Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
        </div>

        {/* AUTHORS */}
        <div className="footerLinksSection">
          <h3>AUTHORS</h3>

          <div className="footerLinksList">
            <Link to="/submit-paper">Submit Paper</Link>
            <Link to="/guidelines">Guidelines</Link>
            <Link to="/peer-review">Peer Review</Link>
            <Link to="/ethics">Ethics</Link>
          </div>
        </div>

        {/* ARTICLES */}
        <div className="footerLinksSection">
          <h3>ARTICLES</h3>

          <div className="footerLinksList">
            <Link to="/current-issue">Current Issue</Link>
            <Link to="/archives">Archives</Link>
            <Link to="/search">Search</Link>
            <Link to="/plagiarism">Plagiarism</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div className="footerLinksSection">
          <h3>CONTACT</h3>

          <div className="footerContactContainer">

            <div className="footerContactItem">
              <FiMail />
              <a href="mailto:editor@ijpasr.com">
                editor@ijpasr.com
              </a>
            </div>

            <div className="footerContactItem">
              <FiMail />
              <a href="mailto:editorijpasr@gmail.com">
                editorijpasr@gmail.com
              </a>
            </div>

            <div className="footerContactItem">
              <FiGlobe />
              <a
                href="https://www.ijpasr.com"
                target="_blank"
                rel="noreferrer"
              >
                www.ijpasr.com
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footerBottomContainer">
        <div className="footerBottomWrapper">

          <p>
            © 2026 IJPASR | Developed by PR WEBSTOCK
          </p>

          {/* <div className="footerBottomRight">
            <span>ISSN: Applied</span>
            <BsDot />
            <span>Open Access</span>
          </div> */}

        </div>
      </div>
    </footer>
  );
};

export default Footer;