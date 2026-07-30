import React, { useEffect, useRef, useState } from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaLanguage,
} from "react-icons/fa";
import API, { IMG_URL } from "../../API/axios";
import "./SettingProfile.css";
import Swal from "sweetalert2";

const SettingProfile = ({ editor, onProfileUpdated }) => {
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState("");

  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    designation: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    language: "",
  });

  useEffect(() => {
    if (editor) {
      setFormData({
        name: editor.name || "",
        phone: editor.phone || "",
        designation: editor.designation || "",
        address: editor.address || "",
        address2: editor.address2 || "",
        city: editor.city || "",
        state: editor.state || "",
        zip: editor.zip || "",
        language: editor.language || "English",
      });

      setImagePreview(
        editor.profileImage
          ? `${IMG_URL}${editor.profileImage}`
          : "https://i.pravatar.cc/300?img=32",
      );
    }
  }, [editor]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setImagePreview(URL.createObjectURL(file));
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("editorToken");

      const fd = new FormData();

      Object.keys(formData).forEach((key) => {
        fd.append(key, formData[key]);
      });

      if (imageFile) {
        fd.append("profileImage", imageFile);
      }

      const { data } = await API.put("/editor/profile", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          timer: 1500,
          showConfirmButton: false,
        });

        onProfileUpdated?.(data.data);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Update Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: editor.name || "",
      phone: editor.phone || "",
      designation: editor.designation || "",
      address: editor.address || "",
      address2: editor.address2 || "",
      city: editor.city || "",
      state: editor.state || "",
      zip: editor.zip || "",
      language: editor.language || "English",
    });

    setImagePreview(
      editor.profileImage
        ? `${IMG_URL}${editor.profileImage}`
        : "https://i.pravatar.cc/300?img=32",
    );

    setImageFile(null);
  };

  return (
    <div className="SettingProfile">
      <div className="SettingProfile-container">
        <div className="SettingProfile-card">
          {/* ===========================
                  Header
          =========================== */}

          <div className="SettingProfile-header">
            <div className="SettingProfile-headerLeft">
              <h2>Profile Settings</h2>
              <p>View your profile information and personal details.</p>
            </div>
          </div>

          {/* ===========================
                Cover Section
          =========================== */}

          <div className="SettingProfile-cover">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800"
              alt="Cover"
              className="SettingProfile-coverImage"
            />

            <div className="SettingProfile-coverOverlay"></div>
          </div>

          {/* ===========================
                Profile Card
          =========================== */}

          <div className="SettingProfile-profileSection">
            <div className="SettingProfile-avatarWrapper">
              <img
                src={imagePreview}
                alt=""
                className="SettingProfile-avatar"
              />

              <button
                type="button"
                className="SettingProfile-cameraBtn"
                onClick={() => fileInputRef.current.click()}
              >
                <FaCamera />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            <div className="SettingProfile-userContent">
              <h3 className="SettingProfile-name">
                {formData.name || "Editor"}

                <FaCheckCircle className="SettingProfile-verified" />
              </h3>

              <p className="SettingProfile-role">
                {formData.designation || "Editor"}
              </p>

              <span className="SettingProfile-status">Active Account</span>
            </div>
          </div>

          {/* ===========================
                  FORM
          =========================== */}

          <form className="SettingProfile-form" onSubmit={updateProfile}>
            {/* ===========================
                  USER INFO
            =========================== */}

            <div className="SettingProfile-section">
              <div className="SettingProfile-sectionTitle">
                <h2>User Information</h2>

                <p>Basic account information</p>
              </div>

              {/* Username + Email */}

              <div className="SettingProfile-row">
                <div className="SettingProfile-group">
                  <label>
                    <FaUser />
                    Username
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="SettingProfile-group">
                  <label>
                    <FaEnvelope />
                    Email Address
                  </label>

                  <input type="email" value={editor.email || ""} readOnly />
                </div>

                <div className="SettingProfile-group">
                  <label>Phone</label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="SettingProfile-group">
                  <label>Designation</label>

                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password + Confirm Password */}

              <div className="SettingProfile-row">
                <div className="SettingProfile-group">
                  <label>
                    <FaLock />
                    Password
                  </label>

                  <input type="password" value="********" readOnly />
                </div>

                <div className="SettingProfile-group">
                  <label>
                    <FaLock />
                    Confirm Password
                  </label>

                  <input type="password" value="********" readOnly />
                </div>
              </div>
            </div>

            <hr />

            {/* ===========================
                Personal Information
            =========================== */}

            <div className="SettingProfile-section">
              <div className="SettingProfile-sectionTitle">
                <h2>Personal Information</h2>

                <p>Address and location information</p>
              </div>
              {/* Address + Address 2 */}

              <div className="SettingProfile-row">
                <div className="SettingProfile-group">
                  <label>
                    <FaMapMarkerAlt />
                    Address
                  </label>

                  <textarea
                    rows="4"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="SettingProfile-group">
                  <label>
                    <FaMapMarkerAlt />
                    Address 2
                  </label>

                  <textarea
                    rows="4"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* City + State */}

              <div className="SettingProfile-row">
                <div className="SettingProfile-group">
                  <label>
                    <FaCity />
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="SettingProfile-group">
                  <label>
                    <FaGlobe />
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Zip + Language */}

              <div className="SettingProfile-row">
                <div className="SettingProfile-group">
                  <label>
                    <FaMapMarkerAlt />
                    ZIP Code
                  </label>

                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>

                <div className="SettingProfile-group">
                  <label>
                    <FaLanguage />
                    Language
                  </label>

                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}

            <div className="SettingProfile-btnWrapper">
              <button
                type="reset"
                className="SettingProfile-cancelBtn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="SettingProfile-submitBtn"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingProfile;
