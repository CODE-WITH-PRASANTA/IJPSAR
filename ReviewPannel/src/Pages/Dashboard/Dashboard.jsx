import React from "react";
import "./Dashboard.css";
import {
  FaFileAlt,
  FaCoins,
  FaWallet,
  FaGift,
  FaArrowRight,
  FaUserPlus,
  FaShareAlt,
  FaBookOpen,
  FaMoneyBillWave,
  FaInfoCircle,
  FaBalanceScale,
} from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    {
      title: "Papers Referred",
      value: "15",
      icon: <FaFileAlt />,
      color: "blue",
      btn: "View Referrals",
    },
    {
      title: "Total Points Earned",
      value: "4500",
      icon: <FaCoins />,
      color: "pink",
      btn: "View Details",
    },
    {
      title: "Points Redeemed",
      value: "4500",
      icon: <FaGift />,
      color: "orange",
      btn: "View History",
    },
    {
      title: "Points Remaining",
      value: "0",
      icon: <FaWallet />,
      color: "green",
      btn: "Request Redemption",
    },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2>Dash Board 👋</h2>
          <p>
            Your Reviewer Reference Code :
            <span> 116916</span>
          </p>
        </div>
      </div>

      {/* Notices */}
      <div className="top-notice red">
        <FaGift />

        <p>
          Now we will give <strong>300 Rupees per paper.</strong>
          Please refer your reviewer code while submitting
          paper.
        </p>
      </div>

      <div className="top-notice blue-notice">
        <FaInfoCircle />

        <p>
          Rewards can be used for your next paper
          publication only.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-stats-grid">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`dashboard-stat-card ${item.color}`}
          >
            <div className="dashboard-stat-icon">
              {item.icon}
            </div>

            <h2>{item.value}</h2>

            <p>{item.title}</p>

            <button>
              {item.btn}
              <FaArrowRight />
            </button>
          </div>
        ))}
      </div>

      {/* Submit Paper */}
      <div className="submit-paper-card">
        <div className="submit-left">
          <h2>Submit Paper with Reference Code</h2>

          <div className="submit-grid">
            <div className="submit-input-group">
              <label>City / District *</label>

              <input
                type="text"
                placeholder="Enter City/District"
              />
            </div>

            <div className="submit-input-group">
              <label>Postal Code *</label>

              <input
                type="text"
                placeholder="Enter Postal Code"
              />
            </div>
          </div>

          <div className="reference-box">
            <label>Reference Code (If Any)</label>

            <input
              type="text"
              placeholder="Enter Reference Code"
            />
          </div>

          <div className="terms-box">
            <input type="checkbox" />

            <span>
              I Agree with Terms and Conditions
            </span>
          </div>

          <div className="captcha-box">
            <span>3 + 2 =</span>

            <input
              type="text"
              placeholder="Your Answer"
            />
          </div>

          <button className="submit-paper-btn">
            Submit Paper
          </button>
        </div>
      </div>

      {/* Important & Rules */}
      <div className="info-cards-grid">
        <div className="important-card">
          <div className="card-title">
            <FaInfoCircle />

            <h2>Important Note</h2>
          </div>

          <ul>
            <li>
              Dear Reviewers, continue recommending
              your Friends, Students and Colleagues.
            </li>

            <li>
              Add your Reviewer Reference Code while
              submitting the paper and earn ₹300 per
              publication.
            </li>

            <li>
              Reviewer Reference ID :
              <strong> 116916</strong>
            </li>
          </ul>
        </div>

        <div className="rules-card">
          <div className="card-title">
            <FaBalanceScale />

            <h2>Rules & Regulation</h2>
          </div>

          <ul>
            <li>
              Reviewer gets ₹300 reward per successful
              publication.
            </li>

            <li>
              Rewards points appear after successful
              publication.
            </li>

            <li>
              Points can be redeemed after earning
              more than 300 reward points.
            </li>

            <li>
              Rewards can be used for future paper
              publication.
            </li>
          </ul>
        </div>
      </div>

      {/* Process Section */}
      <div className="process-section">
        <h2>
          IJRAR RMS - Reviewer & Referral Management
          System
        </h2>

        <div className="process-grid">
          <div className="process-card">
            <span>01</span>

            <FaUserPlus />

            <h3>Join RMS</h3>

            <p>
              Register yourself and become a member
              of RMS.
            </p>
          </div>

          <div className="process-card">
            <span>02</span>

            <FaShareAlt />

            <h3>Refer</h3>

            <p>
              Refer your colleagues and students
              using your reviewer code.
            </p>
          </div>

          <div className="process-card">
            <span>03</span>

            <FaBookOpen />

            <h3>Publish</h3>

            <p>
              Complete the publication process and
              publish your paper successfully.
            </p>
          </div>

          <div className="process-card">
            <span>04</span>

            <FaMoneyBillWave />

            <h3>Earn Rewards</h3>

            <p>
              Earn ₹300 reward after every successful
              referred publication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;