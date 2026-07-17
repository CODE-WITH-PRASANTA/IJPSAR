import { FiUser, FiClock, FiTrash2 } from "react-icons/fi";

import { useEffect, useState } from "react";

import SettingActivity from "../SettingActivity/SettingActivity";
import "./ProfileManagement.css";
import SettingProfile from "../SettingProfile/SettingProfile";
import Swal from "sweetalert2";

import API from "../../API/axios";

// 👇 WRITE IT HERE
const handleDeleteAccount = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0f6c75",
    cancelButtonColor: "#ea5455",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your account has been deleted.",
        icon: "success",
        confirmButtonColor: "#0f6c75",
      });
    }
  });
};

const ProfileManagement = () => {
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("editorToken");

    if (!token) {
      console.log("No Token Found");
      return;
    }

    const { data } = await API.get("/editor/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);

    if (data.success) {
      setEditor(data.data);
    }
  } catch (error) {
    console.log(error.response?.data || error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      Loading Profile...
    </div>
  );
}
  return (
    <div className="profileManagement">
      <div className="profileManagement__container">
        {/* LEFT SIDEBAR */}
        <div className="profileManagement__left">
          <div className="profileManagement__settingsCard">
            <h3 className="profileManagement__settingsTitle">Settings</h3>

            <ul className="profileManagement__menu">
              <li
                className={`profileManagement__menuItem ${
                  activeTab === "profile"
                    ? "profileManagement__menuItem--active"
                    : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <FiUser />
                <span>Profile</span>
              </li>

              <li
                className={`profileManagement__menuItem ${
                  activeTab === "activity"
                    ? "profileManagement__menuItem--active"
                    : ""
                }`}
                onClick={() => setActiveTab("activity")}
              >
                <FiClock />
                <span>Activity</span>
              </li>

              <li
                className="profileManagement__menuItem profileManagement__menuItem--danger"
                onClick={() => setActiveTab("delete")}
              >
                <FiTrash2 />
                <span>Delete</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="profileManagement__right">
          {activeTab === "profile" && (
            <div className="profileManagement__profileCard">
              {/* Your existing Profile UI here */}
             <SettingProfile editor={editor || {}} />
            </div>
          )}

          {activeTab === "activity" && <SettingActivity />}

          {activeTab === "delete" && (
            <div className="profileManagement__profileCard"></div>
          )}
          {activeTab === "delete" && (
            <div className="profileManagement__profileCard">
              <div className="profileManagement__deleteWrapper">
                <div className="profileManagement__deleteIcon">
                  <FiTrash2 />
                </div>

                <h2 className="profileManagement__deleteTitle">
                  Delete Account
                </h2>

                <p className="profileManagement__deleteDescription">
                  Once you delete your account, there is no going back. Please
                  be certain before proceeding.
                </p>

                <button
                  className="profileManagement__deleteButton"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
