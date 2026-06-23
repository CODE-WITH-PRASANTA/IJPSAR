import React from "react";
import {
  FaClock,
  FaCheck,
  FaTimes,
  FaSmile,
  FaCommentDots,
} from "react-icons/fa";
import "./SettingActivity.css";

const SettingActivity = () => {
  return (
    <div className="SettingActivity">
      <div className="SettingActivity-container">

        {/* Activity 1 */}
        <div className="SettingActivity-item">
          <div className="SettingActivity-avatar">W</div>

          <div className="SettingActivity-content">
            <p className="SettingActivity-text">
              <span className="SettingActivity-name">Wilson</span> added
              reaction in
              <span className="SettingActivity-tag blue">
                #product website
              </span>
              post
            </p>

            <div className="SettingActivity-time">
              <FaClock />
              <span>09.00AM</span>
            </div>
          </div>
        </div>

        {/* Activity 2 */}
        <div className="SettingActivity-item">
          <div className="SettingActivity-avatar image">🖼</div>

          <div className="SettingActivity-content">
            <p className="SettingActivity-uploadTitle">
              2 image files and 2 videos uploaded
            </p>

            <div className="SettingActivity-gallery">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1486946255434-2466348c2166?w=600"
                alt=""
              />
            </div>

            <div className="SettingActivity-time">
              <FaClock />
              <span>Updated at 12:45 pm</span>
            </div>
          </div>
        </div>

        {/* Activity 3 */}
        <div className="SettingActivity-item">
          <div className="SettingActivity-avatar green">D</div>

          <div className="SettingActivity-content">
            <p className="SettingActivity-text">
              <span className="SettingActivity-name">Dane Wiza</span>
              added reaction in
              <span className="SettingActivity-tag greenTag">
                #product website
              </span>
              post
            </p>

            <div className="SettingActivity-postCard">
              <h4>Need a feature</h4>

              <p>
                Hello everyone, question on email marketing. What are some
                tips/tricks to avoid going to promotion spam / junk for
                automated marketing emails...
              </p>

              <div className="SettingActivity-reactions">
                <button>
                  <FaSmile /> 10 Reactions
                </button>

                <button>
                  <FaCommentDots /> 12 Replies
                </button>
              </div>
            </div>

            <div className="SettingActivity-time">
              <FaClock />
              <span>09.00AM</span>
            </div>
          </div>
        </div>

        {/* Activity 4 */}
        <div className="SettingActivity-item">
          <div className="SettingActivity-avatar pink">B</div>

          <div className="SettingActivity-content">
            <p className="SettingActivity-text">
              <span className="SettingActivity-name">Betty Mante</span>
              Request joined
              <span className="SettingActivity-tag red">
                #researchteam
              </span>
              groups
            </p>

            <div className="SettingActivity-actions">
              <button className="SettingActivity-accept">
                Accept
              </button>

              <button className="SettingActivity-reject">
                Rejects
              </button>
            </div>

            <div className="SettingActivity-time">
              <FaClock />
              <span>4 days ago</span>
            </div>
          </div>
        </div>

        {/* Activity 5 */}
        <div className="SettingActivity-item">
          <div className="SettingActivity-avatar blueLight">P</div>

          <div className="SettingActivity-content">
            <p className="SettingActivity-text">
              <span className="SettingActivity-name">Pinkie</span>
              uploaded
              <strong> 2 </strong>
              attachment
              <span className="SettingActivity-tag blue">
                #researchteam
              </span>
            </p>

            <div className="SettingActivity-actions">
              <button className="SettingActivity-accept">
                <FaCheck />
                Accept
              </button>

              <button className="SettingActivity-reject">
                <FaTimes />
                Rejects
              </button>
            </div>

            <div className="SettingActivity-time">
              <FaClock />
              <span>4 days ago</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingActivity;