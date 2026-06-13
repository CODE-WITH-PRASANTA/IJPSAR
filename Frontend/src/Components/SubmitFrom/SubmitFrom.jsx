import React, { useState } from "react";
import API from "../../api/axios";
import {
  FileText,
  Users,
  MapPin,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Upload,
  Plus,
  X,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  User,
} from "lucide-react";

import "./SubmitFrom.css";

const ALL_COUNTRIES = [
  { code: "AF", name: "Afghanistan", dial: "+93" },
  { code: "AL", name: "Albania", dial: "+355" },
  { code: "DZ", name: "Algeria", dial: "+213" },
  { code: "AS", name: "American Samoa", dial: "+1" },
  { code: "AD", name: "Andorra", dial: "+376" },
  { code: "AO", name: "Angola", dial: "+244" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "AM", name: "Armenia", dial: "+374" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "AZ", name: "Azerbaijan", dial: "+994" },
  { code: "BS", name: "Bahamas", dial: "+1" },
  { code: "BH", name: "Bahrain", dial: "+973" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "BB", name: "Barbados", dial: "+1" },
  { code: "BY", name: "Belarus", dial: "+375" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "BZ", name: "Belize", dial: "+501" },
  { code: "BJ", name: "Benin", dial: "+229" },
  { code: "BM", name: "Bermuda", dial: "+1" },
  { code: "BT", name: "Bhutan", dial: "+975" },
  { code: "BO", name: "Bolivia", dial: "+591" },
  { code: "BA", name: "Bosnia and Herzegovina", dial: "+387" },
  { code: "BW", name: "Botswana", dial: "+267" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "BG", name: "Bulgaria", dial: "+359" },
  { code: "BF", name: "Burkina Faso", dial: "+226" },
  { code: "BI", name: "Burundi", dial: "+257" },
  { code: "KH", name: "Cambodia", dial: "+855" },
  { code: "CM", name: "Cameroon", dial: "+237" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "CR", name: "Costa Rica", dial: "+506" },
  { code: "HR", name: "Croatia", dial: "+385" },
  { code: "CU", name: "Cuba", dial: "+53" },
  { code: "CY", name: "Cyprus", dial: "+357" },
  { code: "CZ", name: "Czech Republic", dial: "+420" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "DJ", name: "Djibouti", dial: "+253" },
  { code: "EC", name: "Ecuador", dial: "+593" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "SV", name: "El Salvador", dial: "+503" },
  { code: "EE", name: "Estonia", dial: "+372" },
  { code: "ET", name: "Ethiopia", dial: "+251" },
  { code: "FJ", name: "Fiji", dial: "+679" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "GM", name: "Gambia", dial: "+220" },
  { code: "GE", name: "Georgia", dial: "+995" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "GH", name: "Ghana", dial: "+233" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "GT", name: "Guatemala", dial: "+502" },
  { code: "HN", name: "Honduras", dial: "+504" },
  { code: "HK", name: "Hong Kong", dial: "+852" },
  { code: "HU", name: "Hungary", dial: "+36" },
  { code: "IS", name: "Iceland", dial: "+354" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "IR", name: "Iran", dial: "+98" },
  { code: "IQ", name: "Iraq", dial: "+964" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "JM", name: "Jamaica", dial: "+1" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "JO", name: "Jordan", dial: "+962" },
  { code: "KZ", name: "Kazakhstan", dial: "+7" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "KR", name: "Korea, Republic of", dial: "+82" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "LV", name: "Latvia", dial: "+371" },
  { code: "LB", name: "Lebanon", dial: "+961" },
  { code: "LY", name: "Libya", dial: "+218" },
  { code: "LT", name: "Lithuania", dial: "+370" },
  { code: "LU", name: "Luxembourg", dial: "+352" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "MV", name: "Maldives", dial: "+960" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "MC", name: "Monaco", dial: "+377" },
  { code: "MA", name: "Morocco", dial: "+212" },
  { code: "NP", name: "Nepal", dial: "+977" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "OM", name: "Oman", dial: "+968" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "PA", name: "Panama", dial: "+507" },
  { code: "PE", name: "Peru", dial: "+51" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "RO", name: "Romania", dial: "+40" },
  { code: "RU", name: "Russian Federation", dial: "+7" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "LK", name: "Sri Lanka", dial: "+94" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "UA", name: "Ukraine", dial: "+380" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "VN", name: "Vietnam", dial: "+84" },
];

const SubmitFrom = () => {
  const [openSections, setOpenSections] = useState({
    paperDetails: true,
    authorDetails: false,
    addressDetails: false,
    termsDetails: false,
  });
  const [formData, setFormData] = useState({
    paperTitle: "",
    abstract: "",
    mobileCountryCode: "",
    researchArea: "",
    authorCategory: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    referralCode: "",
    editorMessage: "",
  });

  const [authors, setAuthors] = useState([
    {
      fullName: "",
      designation: "",
      organization: "",
      contactNumber: "",
      email: "",
    },
  ]);

  const [keywords, setKeywords] = useState(["Research", "Innovation"]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [totalAuthors, setTotalAuthors] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [editorText, setEditorText] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuthorChange = (index, field, value) => {
    const updatedAuthors = [...authors];

    updatedAuthors[index][field] = value;

    setAuthors(updatedAuthors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit clicked");
    console.log("Selected file:", uploadedFile);

    try {
      const data = new FormData();

      data.append("paperTitle", formData.paperTitle);
      data.append("abstract", editorText);
      data.append("keywords", JSON.stringify(keywords));

      data.append("authors", JSON.stringify(authors));

      data.append("mobileCountryCode", formData.mobileCountryCode);

      data.append("researchArea", formData.researchArea);

      data.append("authorCategory", formData.authorCategory);

      data.append("address1", formData.address1);

      data.append("address2", formData.address2);

      data.append("city", formData.city);

      data.append("state", formData.state);

      data.append("country", formData.country);

      data.append("pincode", formData.pincode);

      data.append("referralCode", formData.referralCode);

      data.append("editorMessage", formData.editorMessage);

      if (uploadedFile) {
        data.append("paperFile", uploadedFile);
      }

      const response = await API.post("/submitform/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Paper Submitted Successfully");

        setFormData({
          paperTitle: "",
          abstract: "",
          mobileCountryCode: "",
          researchArea: "",
          authorCategory: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          referralCode: "",
          editorMessage: "",
        });

        setAuthors([
          {
            fullName: "",
            designation: "",
            organization: "",
            contactNumber: "",
            email: "",
          },
        ]);

        setKeywords([]);
        setUploadedFile(null);
        setEditorText("");
      }
    } catch (error) {
      console.error("FULL ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      alert(
        error?.response?.data?.message ||
          JSON.stringify(error?.response?.data) ||
          "Submission Failed",
      );
    }
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddKeyword = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
        setKeywords([...keywords, currentKeyword.trim()]);
        setCurrentKeyword("");
      }
    }
  };

  const handleRemoveKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowed = ["pdf", "doc", "docx"];
    const ext = file.name.split(".").pop().toLowerCase();

    if (!allowed.includes(ext)) {
      alert("Only PDF, DOC and DOCX files are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert("Maximum file size is 20 MB");
      e.target.value = "";
      return;
    }

    setUploadedFile(file);
  };

  return (
    <div className="admin-dashboard-container">
      <main className="form-workspace-wrapper">
        <div className="admission-card-panel">
          <div className="panel-header-action-row">
            <h1 className="panel-main-heading">Paper Submission Portal</h1>
          </div>

          <form className="structured-accordion-form" onSubmit={handleSubmit}>
            {/* SECTION 1: Paper / Manuscript Details */}
            <div
              className={`accordion-segment-block ${openSections.paperDetails ? "is-expanded" : ""}`}
            >
              <button
                type="button"
                className="accordion-trigger-bar"
                onClick={() => toggleSection("paperDetails")}
              >
                <div className="trigger-title-group">
                  <FileText className="section-icon-marker" size={22} />
                  <span className="section-title-label">
                    Manuscript Submission Details
                  </span>
                </div>
                {openSections.paperDetails ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              <div className="accordion-collapsible-content">
                <div className="inner-content-padding">
                  <div className="form-field-grid-row universal-one-column">
                    <div className="input-field-group">
                      <label className="field-label-text">Paper Title</label>
                      <input
                        type="text"
                        name="paperTitle"
                        value={formData.paperTitle}
                        onChange={handleChange}
                        className="premium-input-box"
                      />
                      <small className="field-helper-caption">
                        Write the title of your article/paper in camel case.
                        (first letter of each word should be in Upper case)
                      </small>
                    </div>
                  </div>

                  <div className="form-field-grid-row universal-one-column">
                    <div className="input-field-group">
                      <label className="field-label-text">Abstract</label>
                      <div className="rich-text-editor-container">
                        <div className="editor-toolbar-strip">
                          <button
                            type="button"
                            className={`tool-action-btn ${isBold ? "active-tool" : ""}`}
                            onClick={() => setIsBold(!isBold)}
                          >
                            <b>B</b>
                          </button>
                          <button
                            type="button"
                            className={`tool-action-btn ${isItalic ? "active-tool" : ""}`}
                            onClick={() => setIsItalic(!isItalic)}
                          >
                            <i>I</i>
                          </button>
                          <span className="toolbar-divider-pipe"></span>
                          <span className="editor-status-tag">
                            Live Editor Box
                          </span>
                        </div>
                        <textarea
                          className={`editor-textarea-pane ${
                            isBold ? "text-weight-bold" : ""
                          } ${isItalic ? "text-style-italic" : ""}`}
                          value={editorText}
                          onChange={(e) => {
                            setEditorText(e.target.value);

                            setFormData({
                              ...formData,
                              abstract: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-field-grid-row universal-one-column">
                    <div className="input-field-group">
                      <label className="field-label-text">Keywords</label>
                      <div className="hashtag-manager-container">
                        <div className="tags-flex-wrap-pool">
                          {keywords.map((tag, idx) => (
                            <span key={idx} className="hashtag-badge-pill">
                              #{tag}
                              <button
                                type="button"
                                onClick={() => handleRemoveKeyword(idx)}
                                className="remove-tag-cross-btn"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="hashtag-append-input-row">
                          <input
                            type="text"
                            placeholder="Type a tag and press enter"
                            value={currentKeyword}
                            onChange={(e) => setCurrentKeyword(e.target.value)}
                            onKeyDown={handleAddKeyword}
                            className="hashtag-pure-input"
                          />
                          <button
                            type="button"
                            onClick={handleAddKeyword}
                            className="append-tag-action-btn"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-field-grid-row split-two-equal-columns">
                    <div className="input-field-group">
                      <label className="field-label-text">
                        Mobile Country Code
                      </label>

                      <select
                        name="mobileCountryCode"
                        value={formData.mobileCountryCode}
                        onChange={handleChange}
                        className="premium-select-dropdown"
                      >
                        <option value="">
                          (Select country code for mobile number)
                        </option>

                        {ALL_COUNTRIES.map((c) => (
                          <option key={`dial-${c.code}`} value={c.dial}>
                            {c.name} ({c.dial})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="input-field-group">
                      <label className="field-label-text">Research Area</label>

                      <select
                        name="researchArea"
                        value={formData.researchArea}
                        onChange={handleChange}
                        className="premium-select-dropdown"
                      >
                        <option value="">
                          (Please select your research area)
                        </option>

                        <option value="Computer Science & Engineering">
                          Computer Science & Engineering
                        </option>

                        <option value="Information Technology">
                          Information Technology
                        </option>

                        <option value="Electrical & Electronics">
                          Electrical & Electronics
                        </option>

                        <option value="Mechanical Systems">
                          Mechanical Systems
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field-grid-row universal-one-column">
                    <div className="input-field-group">
                      <label className="field-label-text">Upload Paper</label>
                      <div className="premium-file-dropzone-box">
                        <input
                          type="file"
                          id="paperFileDrop"
                          accept=".doc,.docx,.pdf"
                          onChange={handleFileChange}
                          className="hidden-native-file-input"
                        />
                        <label
                          htmlFor="paperFileDrop"
                          className="dropzone-interactive-surface"
                        >
                          <Upload className="cloud-upload-vector" size={32} />
                          <span className="dropzone-primary-prompt">
                            {uploadedFile
                              ? `Selected: ${uploadedFile.name}`
                              : "Click to browse files or drag here"}
                          </span>
                          <span className="dropzone-format-constraint-text">
                            Supported Formats: <strong>.doc</strong>,{" "}
                            <strong>.docx</strong>, or <strong>.pdf</strong>{" "}
                            only
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Authors Details */}
            <div
              className={`accordion-segment-block ${openSections.authorDetails ? "is-expanded" : ""}`}
            >
              <button
                type="button"
                className="accordion-trigger-bar"
                onClick={() => toggleSection("authorDetails")}
              >
                <div className="trigger-title-group">
                  <Users className="section-icon-marker" size={22} />
                  <span className="section-title-label">
                    Authors Profile Configurations
                  </span>
                </div>
                {openSections.authorDetails ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              <div className="accordion-collapsible-content">
                <div className="inner-content-padding">
                  <div className="form-field-grid-row split-two-equal-columns">
                    <div className="input-field-group">
                      <label className="field-label-text">
                        Author Category
                      </label>
                      <select
                        name="authorCategory"
                        value={formData.authorCategory}
                        onChange={handleChange}
                        className="premium-select-dropdown"
                      >
                        <option value="">
                          (Please select an Author category)
                        </option>
                        <option value="Student Researcher">
                          Student Researcher
                        </option>
                        <option value="Faculty / Professor">
                          Faculty / Professor
                        </option>
                        <option value="Industry Professional">
                          Industry Professional
                        </option>
                      </select>
                    </div>

                    <div className="input-field-group">
                      <label className="field-label-text">Total Authors</label>
                      <select
                        className="premium-select-dropdown focus-highlight-green"
                        value={totalAuthors}
                        onChange={(e) => {
                          const count = Number(e.target.value);

                          setTotalAuthors(count);

                          const updatedAuthors = Array.from(
                            { length: count },
                            (_, i) =>
                              authors[i] || {
                                fullName: "",
                                designation: "",
                                organization: "",
                                contactNumber: "",
                                email: "",
                              },
                          );

                          setAuthors(updatedAuthors);
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="dynamic-authors-stack-container">
                    {Array.from({ length: totalAuthors }).map((_, index) => (
                      <div key={index} className="individual-author-card-panel">
                        <div className="author-card-badge-header">
                          <User size={14} />
                          <span>Author {index + 1}</span>
                        </div>

                        <div className="author-fields-inner-matrix">
                          <div className="iconic-input-wrapper-box">
                            <div className="wrapper-prepend-icon">
                              <User size={16} />
                            </div>
                            <input
                              type="text"
                              value={authors[index]?.fullName || ""}
                              onChange={(e) =>
                                handleAuthorChange(
                                  index,
                                  "fullName",
                                  e.target.value,
                                )
                              }
                              placeholder={`Author ${index + 1} - Full Name`}
                              className="iconic-pure-input"
                            />
                          </div>

                          <div className="iconic-input-wrapper-box">
                            <div className="wrapper-prepend-icon">
                              <Briefcase size={16} />
                            </div>
                            <input
                              type="text"
                              value={authors[index]?.designation || ""}
                              onChange={(e) =>
                                handleAuthorChange(
                                  index,
                                  "designation",
                                  e.target.value,
                                )
                              }
                              placeholder={`Author ${index + 1} - Designation`}
                              className="iconic-pure-input"
                            />
                          </div>

                          <div className="iconic-input-wrapper-box">
                            <div className="wrapper-prepend-icon">
                              <GraduationCap size={16} />
                            </div>
                            <input
                              type="text"
                              value={authors[index]?.organization || ""}
                              onChange={(e) =>
                                handleAuthorChange(
                                  index,
                                  "organization",
                                  e.target.value,
                                )
                              }
                              placeholder={`Author ${index + 1} - University/Organization`}
                              className="iconic-pure-input"
                            />
                          </div>

                          <div className="iconic-input-wrapper-box">
                            <div className="wrapper-prepend-icon">
                              <Phone size={16} />
                            </div>
                            <input
                              type="tel"
                              value={authors[index]?.contactNumber || ""}
                              onChange={(e) =>
                                handleAuthorChange(
                                  index,
                                  "contactNumber",
                                  e.target.value,
                                )
                              }
                              placeholder={`Author ${index + 1} - Contact Number`}
                              className="iconic-pure-input"
                            />
                          </div>

                          <div className="iconic-input-wrapper-box full-width-span-matrix">
                            <div className="wrapper-prepend-icon">
                              <Mail size={16} />
                            </div>
                            <input
                              type="email"
                              value={authors[index]?.email || ""}
                              onChange={(e) =>
                                handleAuthorChange(
                                  index,
                                  "email",
                                  e.target.value,
                                )
                              }
                              placeholder={`Author ${index + 1} - Official Email Address`}
                              className="iconic-pure-input"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: Address Details */}
            <div
              className={`accordion-segment-block ${openSections.addressDetails ? "is-expanded" : ""}`}
            >
              <button
                type="button"
                className="accordion-trigger-bar"
                onClick={() => toggleSection("addressDetails")}
              >
                <div className="trigger-title-group">
                  <MapPin className="section-icon-marker" size={22} />
                  <span className="section-title-label">
                    Geographical Address Details
                  </span>
                </div>
                {openSections.addressDetails ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              <div className="accordion-collapsible-content">
                <div className="inner-content-padding">
                  <div className="form-field-grid-row split-two-equal-columns">
                    <div className="input-field-group">
                      <label className="field-label-text">Address Line 1</label>
                      <input
                        type="text"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        placeholder="Street address, P.O. box"
                        className="premium-input-box"
                      />
                    </div>
                    <div className="input-field-group">
                      <label className="field-label-text">Address Line 2</label>
                      <input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        placeholder="Apartment, suite, unit, building"
                        className="premium-input-box"
                      />
                    </div>
                  </div>

                  <div className="form-field-grid-row split-two-equal-columns">
                    <div className="input-field-group">
                      <label className="field-label-text">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g., Bhubaneswar"
                        className="premium-input-box"
                      />
                    </div>
                    <div className="input-field-group">
                      <label className="field-label-text">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g., Odisha"
                        className="premium-input-box"
                      />
                    </div>
                  </div>

                  <div className="form-field-grid-row split-two-equal-columns">
                    <div className="input-field-group">
                      <label className="field-label-text">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="premium-select-dropdown"
                      >
                        <option value="">(Select Country Name)</option>

                        {ALL_COUNTRIES.map((c) => (
                          <option key={`country-${c.code}`} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="input-field-group">
                      <label className="field-label-text">
                        Pincode / Postal Code
                      </label>
                      <input
                        type="text"
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleChange}
                        placeholder="Enter referral code"
                        className="premium-input-box"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: Terms & Conditions */}
            <div
              className={`accordion-segment-block ${openSections.termsDetails ? "is-expanded" : ""}`}
            >
              <button
                type="button"
                className="accordion-trigger-bar"
                onClick={() => toggleSection("termsDetails")}
              >
                <div className="trigger-title-group">
                  <ShieldCheck className="section-icon-marker" size={22} />
                  <span className="section-title-label">
                    Compliance / Referral Details
                  </span>
                </div>
                {openSections.termsDetails ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              <div className="accordion-collapsible-content">
                <div className="inner-content-padding">
                  <div className="form-field-grid-row universal-one-column">
                    <div className="input-field-group">
                      <label className="field-label-text">
                        Referral Code (if you have)
                      </label>
                      <input
                        type="text"
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleChange}
                        placeholder="Enter referral code"
                        className="premium-input-box"
                      />
                    </div>
                  </div>

                  <div className="form-field-grid-row universal-one-column">
                    <div className="input-field-group">
                      <label className="field-label-text">
                        Special Message for Editor
                      </label>
                      <textarea
                        name="editorMessage"
                        value={formData.editorMessage}
                        onChange={handleChange}
                        placeholder="Type any specific remarks or notes for the editorial team..."
                        className="premium-input-box text-area-fixed-height"
                      />
                    </div>
                  </div>

                  <div className="form-field-grid-row universal-one-column">
                    <div className="input-field-group secure-captcha-container-row">
                      <label className="field-label-text-inline-captcha">
                        Solve the Math Verification: <strong>1 + 4 =</strong>
                      </label>
                      <input
                        type="number"
                        placeholder="Answer"
                        className="premium-input-box captcha-small-input-box"
                      />
                    </div>
                  </div>

                  <div className="terms-agreement-disclosure-callout">
                    <p>
                      By submitting this form you have agreed to our
                      comprehensive publication terms and conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-global-action-footer">
              <button type="submit" className="global-master-submit-btn">
                Submit Entire Application
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubmitFrom;
