import React from "react";
import "./Topbar.css";
import { HiOutlineMail } from "react-icons/hi";

/* IMPORT LOGO IMAGE */
import logo from "../../assets/p-2.JPEG";

const Topbar = () => {
  return (
    <div className="topbarMainContainer">
      <div className="topbarWrapper">

        {/* LEFT SIDE */}
        <div className="topbarLeftSection">
          <div className="topbarProjectName">
            IJPASR
          </div>

          <div className="topbarDivider"></div>

          <div className="topbarEmailContainer">
            <div className="topbarEmailItem">
              <HiOutlineMail className="topbarMailIcon" />
              <span>editor@ijpasr.com</span>
            </div>

            <div className="topbarEmailItem">
              <HiOutlineMail className="topbarMailIcon" />
              <span>editorijpasr@gmail.com</span>
            </div>
          </div>
        </div>

        {/* CENTER LOGO */}
        <div className="topbarCenterSection">
          <img
            src={logo}
            alt="IJPASR Logo"
            className="topbarLogo"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="topbarRightSection">
          <button className="topbarSubmitButton">
            Submit Paper
          </button>
        </div>

      </div>
    </div>
  );
};

export default Topbar;