import React from "react";
import "./ReedemPoints.css";
import { FaHome, FaChevronRight, FaGift, FaExclamationTriangle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const ReedemPoints = () => {
  return (
    <div className="ReedemPoints-">
      <div className="ReedemPoints-Header">
        <h1 className="ReedemPoints-Title">Redeem Amount</h1>

        <div className="ReedemPoints-Breadcrumb">
          <FaHome />
          <span>Home</span>
          <FaChevronRight className="ReedemPoints-BreadcrumbArrow" />
          <span>Redeem Amount</span>
        </div>
      </div>

      <div className="ReedemPoints-Card">
       

        <div className="ReedemPoints-Content">
          <div className="ReedemPoints-InfoBox">
            <FaGift className="ReedemPoints-GiftIcon" />

            <h3>
              Please enter Paper Id that you want to publish using RMS
              points.
            </h3>
          </div>

          <div className="ReedemPoints-WarningBox">
            <FaExclamationTriangle className="ReedemPoints-WarningIcon" />

            <p>
              You are not eligible for redemption as your total redeemable
              points are below <strong>1500</strong>. When your Point Reached
              Above &lt;= <strong>1500</strong> Point after you are able to
              Redeem points to publish paper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReedemPoints;