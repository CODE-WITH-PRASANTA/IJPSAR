import React from "react";
import "./Topbar.css";
import { useNavigate } from "react-router-dom";

import {
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";

import {
  FaGlobe,
  FaTelegramPlane,
  FaBars,
  FaBookOpen,
} from "react-icons/fa";

const Topbar = () => {

  const navigate = useNavigate();

  return (
    <div className="topbarMainContainer">

      <div className="topbarWrapper">

        {/* LEFT SECTION */}
        <div className="topbarLeftSection">

          <div className="topbarItem">
            <FaBookOpen className="topbarIcon" />
            <span>ISSN: Applied</span>
          </div>

          <div className="topbarDivider"></div>

          <div className="topbarItem">
            <FaBars className="topbarIcon" />
            <span>Open Access</span>
          </div>

          <div className="topbarDivider"></div>

          <div className="topbarItem">
            <FaGlobe className="topbarIcon" />
            <span>
              Open Access · Peer-Reviewed · Refereed Journal
            </span>
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="topbarRightSection">

          <div className="topbarItem">
            <HiOutlineMail className="topbarIcon" />
            <span>editor@ijpasr.com</span>
          </div>

          <div className="topbarDivider"></div>

          <div className="topbarItem">
            <HiOutlineMail className="topbarIcon" />
            <span>editorijpasr@gmail.com</span>
          </div>

          <div className="topbarDivider"></div>

          {/* LOGIN DROPDOWN */}
          <div className="topbarLoginDropdown">

            <button className="topbarLoginButton">
              <HiOutlineUser className="topbarIcon" />
              Login
            </button>

            <div className="topbarDropdownMenu">

              <a href="/login" className="topbarDropdownItem">
                Author
              </a>

              <a href="/" className="topbarDropdownItem">
                Editor
              </a>

              <a href="/" className="topbarDropdownItem">
                Admin
              </a>

            </div>

          </div>

          <div className="topbarDivider"></div>

          {/* SUBMIT BUTTON */}
          <button
            className="topbarSubmitButton"
            onClick={() => navigate("/submit-paper")}
          >
            <FaTelegramPlane />
            Submit
          </button>

        </div>

      </div>

    </div>
  );
};

export default Topbar;