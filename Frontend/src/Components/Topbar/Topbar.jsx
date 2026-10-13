import React from "react";
import { FaBookOpen, FaGlobe } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbarMainContainer">
      <div className="topbarWrapper">

        {/* LEFT: JOURNAL INFORMATION */}
        <div className="topbarJournalInfo">
          <div className="topbarInfoItem">
            <FaBookOpen className="topbarInfoIcon" />
            <span>ISSN: Applied</span>
          </div>

          <span className="topbarDivider" />

          <div className="topbarInfoItem">
            <FaGlobe className="topbarInfoIcon" />
            <span>Open Access · Refereed</span>
          </div>
        </div>

        {/* RIGHT: EMAIL ADDRESSES */}
        <div className="topbarEmailGroup">
          <a
            href="mailto:editor@ijpasr.com"
            className="topbarEmailLink"
          >
            <HiOutlineMail className="topbarEmailIcon" />
            <span>editor@ijpasr.com</span>
          </a>

          <span className="topbarDivider" />

          <a
            href="mailto:editorijpasr@gmail.com"
            className="topbarEmailLink"
          >
            <HiOutlineMail className="topbarEmailIcon" />
            <span>editorijpasr@gmail.com</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Topbar;