
import React, { useState, useEffect } from 'react';

import API, { BASE_URL } from "../../api/axios";

import './EditorialBoard.css';

const EditorialBoard = () => {

  // =====================================================
  // FORM STATE VALUES
  // =====================================================

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [institution, setInstitution] = useState('');
  const [category, setCategory] = useState('Editorial Board');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orcid, setOrcid] = useState('');
  const [biography, setBiography] = useState('');

  // =====================================================
  // STORAGE FOR ACTUAL FILE OBJECT
  // =====================================================

  const [selectedFile, setSelectedFile] = useState(null);

  // =====================================================
  // IMAGE PREVIEW STATE
  // =====================================================

  const [profileImage, setProfileImage] = useState(null);

  // =====================================================
  // TAG SYSTEM STATE VALUES
  // =====================================================

  const [tags, setTags] = useState([
    'Researcher',
    'Global Board',
    'Reviewer',
    'AI',
    'IEEE'
  ]);

  const [tagInput, setTagInput] = useState('');

  // =====================================================
  // PRIMARY WORKSPACE ENGINE ARRAY STATE
  // =====================================================

  const [boardMembers, setBoardMembers] = useState([]);

  // =====================================================
  // APPLICATION LOADING / UI STATES
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // =====================================================
  // FETCH ALL BOARD MEMBERS ON COMPONENT MOUNT
  // =====================================================

  useEffect(() => {
    fetchBoardMembers();
  }, []);

  // =====================================================
  // FETCH DATA FROM EXPRESS SERVER
  // =====================================================

  const fetchBoardMembers = async () => {
    try {
      setLoading(true);

      const response = await API.get("/editorialboard/all");

      // Normalize incoming data safely
      let dataArray = [];

      if (Array.isArray(response.data)) {
        dataArray = response.data;
      } else if (
        response.data &&
        Array.isArray(response.data.members)
      ) {
        dataArray = response.data.members;
      } else if (
        response.data &&
        typeof response.data === 'object'
      ) {
        dataArray = response.data.data || [];
      }

      setBoardMembers(dataArray);

    } catch (error) {
      console.error(
        "Error retrieving dataset records:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESOLVE IMAGE SOURCE
  // =====================================================

  const resolveImageSource = (imagePath) => {
    if (!imagePath) return null;

    // Already absolute URL / blob / data
    if (
      imagePath.startsWith('http://') ||
      imagePath.startsWith('https://') ||
      imagePath.startsWith('blob:') ||
      imagePath.startsWith('data:')
    ) {
      return imagePath;
    }

    // Clean trailing / leading slashes
    const cleanBase = BASE_URL.endsWith('/')
      ? BASE_URL.slice(0, -1)
      : BASE_URL;

    const cleanPath = imagePath.startsWith('/')
      ? imagePath.slice(1)
      : imagePath;

    return `${cleanBase}/${cleanPath}`;
  };

  // =====================================================
  // HANDLE IMAGE CHANGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Free old blob preview
      if (
        profileImage &&
        profileImage.startsWith('blob:')
      ) {
        URL.revokeObjectURL(profileImage);
      }

      setProfileImage(
        URL.createObjectURL(file)
      );
    }
  };

  // =====================================================
  // CHIPS ARRAY KEYPRESS
  // =====================================================

  const handleKeyDown = (e) => {
    if (
      e.key === 'Enter' &&
      tagInput.trim() !== ''
    ) {
      e.preventDefault();

      if (!tags.includes(tagInput.trim())) {
        setTags([
          ...tags,
          tagInput.trim()
        ]);
      }

      setTagInput('');
    }
  };

  // =====================================================
  // REMOVE TAG
  // =====================================================

  const removeTag = (indexToRemove) => {
    setTags(
      tags.filter(
        (_, index) =>
          index !== indexToRemove
      )
    );
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetFormFields = () => {
    setName('');
    setDesignation('');
    setInstitution('');
    setCategory('Editorial Board');
    setEmail('');
    setPhone('');
    setOrcid('');
    setBiography('');

    setSelectedFile(null);
    setProfileImage(null);

    setTags([
      'Researcher',
      'Global Board',
      'Reviewer',
      'AI',
      'IEEE'
    ]);

    setTagInput('');

    setEditingId(null);
  };

  // =====================================================
  // CORE SUBMIT ROUTE
  // CREATE / UPDATE
  // =====================================================

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // =================================================
    // NO REQUIRED FIELD VALIDATION
    // =================================================
    //
    // All form fields are optional now.
    //
    // =================================================

    const formData = new FormData();

    // =================================================
    // BASIC INFORMATION
    // =================================================

    formData.append(
      "name",
      name.trim()
    );

    formData.append(
      "designation",
      designation.trim()
    );

    formData.append(
      "institution",
      institution.trim()
    );

    formData.append(
      "category",
      category
    );

    // =================================================
    // CONTACT INFORMATION
    // =================================================

    formData.append(
      "email",
      email.trim()
    );

    formData.append(
      "phone",
      phone.trim()
    );

    // =================================================
    // ORCID ID
    // =================================================

    formData.append(
      "orcid",
      orcid.trim()
    );

    // =================================================
    // BIOGRAPHY
    // =================================================

    formData.append(
      "biography",
      biography.trim()
    );

    // =================================================
    // TAGS
    // =================================================

    formData.append(
      "tags",
      JSON.stringify(tags)
    );

    // =================================================
    // PROFILE IMAGE
    // =================================================

    if (selectedFile) {
      formData.append(
        "profileImage",
        selectedFile
      );
    }

    try {
      setLoading(true);

      // =================================================
      // UPDATE
      // =================================================

      if (editingId !== null) {

        await API.put(
          `/editorialboard/update/${editingId}`,
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data'
            }
          }
        );

        alert(
          "Member registry parameters successfully updated."
        );

      }

      // =================================================
      // CREATE
      // =================================================

      else {

        await API.post(
          "/editorialboard/create",
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data'
            }
          }
        );

        alert(
          "Member profile processed and saved safely into system registry."
        );
      }

      // =================================================
      // RESET
      // =================================================

      resetFormFields();

      // =================================================
      // REFRESH TABLE
      // =================================================

      await fetchBoardMembers();

    } catch (error) {

      console.error(
        "Form transmission failed error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Internal transmission network block failure."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIALIZE EDIT SEQUENCE
  // =====================================================

  const initializeEditSequence = (member) => {

    setEditingId(
      member._id || member.id
    );

    setName(
      member.name || ''
    );

    setDesignation(
      member.designation || ''
    );

    setInstitution(
      member.institution || ''
    );

    setCategory(
      member.category ||
      'Editorial Board'
    );

    setEmail(
      member.email || ''
    );

    setPhone(
      member.phone || ''
    );

    // =================================================
    // ORCID
    // =================================================

    setOrcid(
      member.orcid ||
      member.ORCID ||
      member.orcidId ||
      ''
    );

    setBiography(
      member.biography || ''
    );

    // =================================================
    // TAGS
    // =================================================

    if (Array.isArray(member.tags)) {

      setTags(member.tags);

    } else if (
      typeof member.tags === 'string'
    ) {

      try {

        setTags(
          JSON.parse(member.tags)
        );

      } catch {

        setTags([]);

      }

    } else {

      setTags([]);

    }

    // =================================================
    // IMAGE
    // =================================================

    const rawImage =
      member.profileImage ||
      member.image ||
      null;

    setProfileImage(rawImage);

    setSelectedFile(null);

    // =================================================
    // SCROLL TO FORM
    // =================================================

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // =====================================================
  // DELETE RECORD
  // =====================================================

  const executeDestructionSequence = async (
    id
  ) => {

    if (
      window.confirm(
        "Confirm structural deletion of this record?"
      )
    ) {

      try {

        setLoading(true);

        await API.delete(
          `/editorialboard/delete/${id}`
        );

        alert(
          "Registry data node successfully purged."
        );

        if (editingId === id) {
          resetFormFields();
        }

        await fetchBoardMembers();

      } catch (error) {

        console.error(
          "Error executing component deletion route:",
          error
        );

        alert(
          "Failed to remove data element tracking instance."
        );

      } finally {

        setLoading(false);

      }
    }
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="eb-container">

      <h2 className="eb-main-title">
        Editorial Board Management
      </h2>

      {/* =====================================================
          FORM SECTION
      ====================================================== */}

      <form
        className="eb-form-card"
        onSubmit={handleFormSubmit}
      >

        <div className="eb-card-header-row">

          <h3 className="eb-card-sub-title">
            {editingId
              ? '⚡ Configuration Interface: Update Row Instance'
              : '✦ Configuration Interface: Append New Instance'}
          </h3>

          {editingId && (
            <button
              type="button"
              className="eb-btn-abort"
              onClick={resetFormFields}
            >
              Cancel Configuration
            </button>
          )}

        </div>

        <div className="eb-form-grid">

          {/* =================================================
              IMAGE UPLOAD
          ================================================= */}

          <div className="eb-form-group eb-col-full md-eb-col-6">

            <label className="eb-label">
              Upload Profile Image
            </label>

            <div className="eb-upload-box">

              <input
                type="file"
                id="profileUpload"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleImageChange}
                className="eb-file-input"
              />

              <label
                htmlFor="profileUpload"
                className="eb-upload-label"
              >

                {profileImage ? (

                  <img
                    src={resolveImageSource(
                      profileImage
                    )}
                    alt="Preview"
                    className="eb-image-preview"
                    onError={(e) => {
                      e.target.style.display =
                        'none';

                      e.target.parentNode.innerHTML =
                        '<div className="eb-upload-placeholder"><span className="eb-upload-icon">👤</span><p>Image Error</p></div>';
                    }}
                  />

                ) : (

                  <div className="eb-upload-placeholder">

                    <span className="eb-upload-icon">
                      ✦
                    </span>

                    <p>
                      Drag & Drop Here
                    </p>

                    <span>
                      OR
                    </span>

                    <button
                      type="button"
                      className="eb-upload-btn"
                    >
                      Choose Image
                    </button>

                  </div>

                )}

              </label>

            </div>

            <p className="eb-help-text">
              Supported: JPG, PNG, WEBP
            </p>

          </div>

          {/* =================================================
              NAME & DESIGNATION
          ================================================= */}

          <div className="eb-form-group eb-col-full md-eb-col-6">

            <div className="eb-sub-group">

              <label className="eb-label">
                Editor Name
              </label>

              <input
                type="text"
                className="eb-input"
                placeholder="e.g. Dr. Swarupananda Mukherjee"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

            <div className="eb-sub-group">

              <label className="eb-label">
                Designation
              </label>

              <input
                type="text"
                className="eb-input"
                placeholder="e.g. Associate Professor"
                value={designation}
                onChange={(e) =>
                  setDesignation(e.target.value)
                }
              />

            </div>

          </div>

          {/* =================================================
              INSTITUTION
          ================================================= */}

          <div className="eb-form-group eb-col-full md-eb-col-6">

            <label className="eb-label">
              Institution
            </label>

            <input
              type="text"
              className="eb-input"
              placeholder="e.g. NSHM Knowledge Campus, Kolkata, India"
              value={institution}
              onChange={(e) =>
                setInstitution(e.target.value)
              }
            />

          </div>

          {/* =================================================
              CATEGORY
          ================================================= */}

          <div className="eb-form-group eb-col-full md-eb-col-6">

            <label className="eb-label">
              Select Category
            </label>

            <select
              className="eb-select"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              <option value="Patron & Management">
                ▼ Patron & Management
              </option>

              <option value="Editor-in-Chief">
                ▼ Editor-in-Chief
              </option>

              <option value="International Editorial Advisory Board">
                ▼ International Editorial Advisory Board
              </option>

              <option value="Editorial Board">
                ▼ Editorial Board
              </option>

            </select>

            <p className="eb-help-text">
              Decides where the profile appears on the website.
            </p>

          </div>

          {/* =================================================
              KEY TAGS
          ================================================= */}

          <div className="eb-form-group eb-col-full">

            <label className="eb-label">
              Key Tags
            </label>

            <div className="eb-chips-wrapper">

              {tags.map((tag, index) => (

                <span
                  key={index}
                  className="eb-chip"
                >

                  {tag}

                  <button
                    type="button"
                    className="eb-chip-remove"
                    onClick={() =>
                      removeTag(index)
                    }
                  >
                    &times;
                  </button>

                </span>

              ))}

              <input
                type="text"
                className="eb-chip-input"
                placeholder="Press Enter to add tags"
                value={tagInput}
                onChange={(e) =>
                  setTagInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
              />

            </div>

          </div>

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="eb-form-group eb-col-full md-eb-col-6">

            <label className="eb-label">
              Email
            </label>

            <input
              type="email"
              className="eb-input"
              placeholder="editor@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* =================================================
              PHONE
          ================================================= */}

          <div className="eb-form-group eb-col-full md-eb-col-6">

            <label className="eb-label">
              Phone
            </label>

            <input
              type="tel"
              className="eb-input"
              placeholder="+1 234 567 890"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

          </div>

          {/* =================================================
              ORCID ID
          ================================================= */}

          <div className="eb-form-group eb-col-full md-eb-col-6">

            <label className="eb-label">
              ORCID ID
            </label>

            <input
              type="text"
              className="eb-input"
              placeholder="e.g. 0000-0002-1825-0097"
              value={orcid}
              onChange={(e) =>
                setOrcid(e.target.value)
              }
            />

            <p className="eb-help-text">
              Enter the editor's ORCID identifier.
            </p>

          </div>

          {/* =================================================
              BIOGRAPHY
          ================================================= */}

          <div className="eb-form-group eb-col-full">

            <label className="eb-label">
              Biography
            </label>

            <textarea
              className="eb-textarea"
              rows="4"
              placeholder="Write a brief biography..."
              value={biography}
              onChange={(e) =>
                setBiography(e.target.value)
              }
            />

          </div>

        </div>

        {/* =================================================
            SAVE / UPDATE BUTTON
        ================================================= */}

        <div className="eb-form-actions">

          <button
            type="submit"
            disabled={loading}
            className={`eb-btn-primary ${
              editingId
                ? 'eb-btn-state-updating'
                : ''
            }`}
          >

            {loading
              ? 'Processing...'
              : editingId
                ? '⚡ Update Registry Node'
                : 'Save Profile'}

          </button>

        </div>

      </form>

      {/* =====================================================
          LIST TABLE SECTION
      ====================================================== */}

      <div className="eb-table-card">

        <h3 className="eb-table-title">
          Registered Board Members
        </h3>

        <div className="eb-table-responsive">

          <table className="eb-table">

            <thead>

              <tr>

                <th>
                  Profile
                </th>

                <th>
                  Name & Designation
                </th>

                <th>
                  Institution
                </th>

                <th>
                  Category
                </th>

                <th>
                  Contact
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {boardMembers.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="eb-empty-feedback"
                  >
                    No records found in active registry dataset.
                  </td>

                </tr>

              ) : (

                boardMembers.map((member) => {

                  const currentId =
                    member._id ||
                    member.id;

                  const rawImage =
                    member.profileImage ||
                    member.image;

                  const computedImageSrc =
                    resolveImageSource(
                      rawImage
                    );

                  return (

                    <tr
                      key={currentId}
                      className={
                        editingId === currentId
                          ? 'eb-row-active-edit'
                          : ''
                      }
                    >

                      {/* PROFILE */}

                      <td>

                        <div className="eb-table-avatar">

                          {computedImageSrc ? (

                            <img
                              src={computedImageSrc}
                              alt={`${
                                member.name ||
                                'Member'
                              }'s Avatar`}
                              onError={(e) => {

                                e.target.style.display =
                                  'none';

                                e.target.parentNode.innerText =
                                  '👤';

                              }}
                            />

                          ) : (

                            '👤'

                          )}

                        </div>

                      </td>

                      {/* NAME */}

                      <td>

                        <div className="eb-table-name">
                          {member.name || '--'}
                        </div>

                        <div className="eb-table-subtext">
                          {member.designation || '--'}
                        </div>

                      </td>

                      {/* INSTITUTION */}

                      <td>

                        <div className="eb-table-inst-cell">
                          {member.institution || '--'}
                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td>

                        <span className="eb-table-badge">
                          {member.category || '--'}
                        </span>

                      </td>

                      {/* CONTACT */}

                      <td>

                        <div className="eb-table-contact-cell">

                          <div>
                            {member.email || (
                              <span className="eb-none">
                                --
                              </span>
                            )}
                          </div>

                          <div className="eb-table-subtext">
                            {member.phone || '--'}
                          </div>

                          {/* ORCID */}

                          {member.orcid && (

                            <div className="eb-table-subtext">
                              ORCID: {member.orcid}
                            </div>

                          )}

                        </div>

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="eb-table-actions">

                          <button
                            type="button"
                            className="eb-btn-text-edit"
                            onClick={() =>
                              initializeEditSequence(
                                member
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="eb-btn-text-delete"
                            onClick={() =>
                              executeDestructionSequence(
                                currentId
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  );

                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default EditorialBoard;

