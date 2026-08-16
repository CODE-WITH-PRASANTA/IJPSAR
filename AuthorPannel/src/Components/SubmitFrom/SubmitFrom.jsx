import React, { useState, useEffect } from "react";
import API from "../../api/Axios";

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
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import "./SubmitFrom.css";

import Swal from "sweetalert2";
import AuthorPublicationDocuments from "./AuthorPublicationDocuments";

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

  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "BT", name: "Bhutan", dial: "+975" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "HK", name: "Hong Kong", dial: "+852" },

  { code: "IN", name: "India", dial: "+91" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "IR", name: "Iran", dial: "+98" },
  { code: "IQ", name: "Iraq", dial: "+964" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "JO", name: "Jordan", dial: "+962" },
  { code: "KZ", name: "Kazakhstan", dial: "+7" },

  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "KR", name: "Korea, Republic of", dial: "+82" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "MV", name: "Maldives", dial: "+960" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "NP", name: "Nepal", dial: "+977" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "NG", name: "Nigeria", dial: "+234" },

  { code: "NO", name: "Norway", dial: "+47" },
  { code: "OM", name: "Oman", dial: "+968" },
  { code: "PK", name: "Pakistan", dial: "+92" },
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

  const [captcha, setCaptcha] = useState({
    num1: Math.floor(Math.random() * 10) + 1,

    num2: Math.floor(Math.random() * 10) + 1,
  });

  const [captchaAnswer, setCaptchaAnswer] = useState("");

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

  const [paperId, setPaperId] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const editPaper = location.state?.paper || null;

  const isEdit = location.state?.isEdit || false;

  const latestFeedback = location.state?.latestFeedback || null;

  const feedbackHistory =
    editPaper?.feedbackHistory?.length > 0
      ? editPaper.feedbackHistory
      : latestFeedback
        ? [latestFeedback]
        : [];

  const revisions = editPaper?.revisions || [];

  useEffect(() => {
    if (!isEdit || !editPaper) {
      return;
    }

    setFormData({
      paperTitle: editPaper.paperTitle || "",

      abstract: editPaper.abstract || "",

      researchArea: editPaper.researchArea || "",

      authorCategory: editPaper.authorCategory || "",

      address1: editPaper.address1 || "",

      address2: editPaper.address2 || "",

      city: editPaper.city || "",

      state: editPaper.state || "",

      country: editPaper.country || "",

      pincode: editPaper.pincode || "",

      referralCode: editPaper.referralCode || "",

      editorMessage: editPaper.editorMessage || "",

      mobileCountryCode: editPaper.mobileCountryCode || "",
    });

    setEditorText(editPaper.abstract || "");

    setKeywords(editPaper.keywords || []);

    setAuthors(editPaper.authors || []);

    setTotalAuthors(editPaper.authors?.length || 1);
  }, [editPaper, isEdit]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuthorChange = (index, field, value) => {
    setAuthors((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 10) + 1,

      num2: Math.floor(Math.random() * 10) + 1,
    });

    setCaptchaAnswer("");
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddKeyword = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const keyword = currentKeyword.trim();

      if (keyword && !keywords.includes(keyword)) {
        setKeywords((prev) => [...prev, keyword]);

        setCurrentKeyword("");
      }
    }
  };

  const handleRemoveKeyword = (indexToRemove) => {
    setKeywords((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowed = ["pdf", "doc", "docx"];

    const ext = file.name.split(".").pop().toLowerCase();

    if (!allowed.includes(ext)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid File",
        text: "Only PDF, DOC and DOCX files are allowed.",
      });

      e.target.value = "";

      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      Swal.fire({
        icon: "warning",
        title: "File Too Large",
        text: "Maximum file size is 20 MB.",
      });

      e.target.value = "";

      return;
    }

    setUploadedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.paperTitle.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Field",
        text: "Paper Title is required.",
      });

      return;
    }

    if (!editorText.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Field",
        text: "Abstract is required.",
      });

      return;
    }

    if (Number(captchaAnswer) !== captcha.num1 + captcha.num2) {
      Swal.fire({
        icon: "error",
        title: "Invalid Captcha",
        text: "Please solve the verification correctly.",
      });

      generateCaptcha();

      return;
    }

    if (isEdit && !uploadedFile) {
      Swal.fire({
        icon: "warning",
        title: "Revision File Required",
        text: "Please upload the new PDF, DOC or DOCX document.",
      });

      return;
    }

    Swal.fire({
      title: isEdit ? "Uploading Revision..." : "Submitting Manuscript...",

      allowOutsideClick: false,

      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const form = new FormData();

      form.append("paperTitle", formData.paperTitle);

      form.append("abstract", editorText);

      form.append("keywords", JSON.stringify(keywords));

      form.append("authors", JSON.stringify(authors));

      form.append("mobileCountryCode", formData.mobileCountryCode);

      form.append("researchArea", formData.researchArea);

      form.append("authorCategory", formData.authorCategory);

      form.append("address1", formData.address1);

      form.append("address2", formData.address2);

      form.append("city", formData.city);

      form.append("state", formData.state);

      form.append("country", formData.country);

      form.append("pincode", formData.pincode);

      form.append("referralCode", formData.referralCode);

      form.append("editorMessage", formData.editorMessage);

      if (uploadedFile) {
        form.append("paperFile", uploadedFile);
      }

      const token = localStorage.getItem("authorToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = isEdit
        ? await API.put(`/submitform/revision/${editPaper._id}`, form, config)
        : await API.post("/submitform/create", form, config);

      if (response.data?.success) {
        const returnedPaperId =
          response.data?.data?.paperId || response.data?.paperId || "";

        setPaperId(returnedPaperId);

        await Swal.fire({
          icon: "success",

          title: isEdit ? "Revision Submitted" : "Manuscript Submitted",

          text: isEdit
            ? "Your corrected manuscript has been submitted to the editor."
            : returnedPaperId
              ? `Your Paper ID is ${returnedPaperId}`
              : "Your manuscript was submitted successfully.",

          confirmButtonText: "Continue",
        });

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

        setKeywords(["Research", "Innovation"]);

        setUploadedFile(null);

        setEditorText("");

        setCaptchaAnswer("");

        navigate("/paper-management");
      }
    } catch (error) {
      console.error("SUBMIT PAPER ERROR:", error);

      Swal.fire({
        icon: "error",

        title: "Submission Failed",

        text: error?.response?.data?.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="admin-dashboard-container">
      <main className="form-workspace-wrapper">
        <div className="admission-card-panel">
          {/* =================================================
              PREMIUM JOURNAL HEADER
          ================================================= */}

          <header className="journal-hero-header">
            <div className="journal-brand-mark">
              <div className="journal-brand-icon">
                <BookOpen size={24} strokeWidth={2.2} />
              </div>

              <div className="journal-brand-copy">
                <span className="journal-eyebrow">
                  Scholarly Publication Platform
                </span>

                <h1 className="panel-main-heading">Paper Submission Portal</h1>

                <p className="journal-subtitle">
                  Submit your research manuscript for editorial review and peer
                  evaluation through our secure journal publication workflow.
                </p>
              </div>
            </div>

            <div className="journal-header-status">
              <div className="journal-status-chip">
                <span className="status-dot"></span>
                Manuscript Intake Open
              </div>

              <div className="journal-status-chip secondary">
                <ShieldCheck size={15} />
                Secure Submission
              </div>
            </div>
          </header>

          {/* =================================================
              GUIDANCE
          ================================================= */}

          <div className="journal-guidance-strip">
            <div className="guidance-icon">
              <Sparkles size={18} />
            </div>

            <div className="guidance-copy">
              <strong>Editorial submission checklist</strong>

              <span>
                Complete manuscript, author, address and compliance details
                before submission.
              </span>
            </div>

            <div className="guidance-step">
              <span>01</span>
              Manuscript
            </div>

            <div className="guidance-step">
              <span>02</span>
              Authors
            </div>

            <div className="guidance-step">
              <span>03</span>
              Address
            </div>

            <div className="guidance-step">
              <span>04</span>
              Compliance
            </div>
          </div>

          {/* =================================================
              FEEDBACK HISTORY
          ================================================= */}

          {isEdit && feedbackHistory.length > 0 && (
            <div className="journal-history-section">
              <div className="history-section-heading">
                <div className="history-heading-icon">
                  <FileText size={18} />
                </div>

                <div>
                  <span>Editorial Communication</span>

                  <small>Previous editor feedback</small>
                </div>
              </div>

              {feedbackHistory.map((feedback, index) => (
                <div
                  className="editor-feedback-box"
                  key={`feedback-${feedback.version}-${feedback.createdAt || index}-${index}`}
                >
                  <h3>Editor Feedback</h3>

                  <p>{feedback.remark}</p>

                  <div className="feedback-meta">
                    <span>Version {feedback.version}</span>

                    <span>{feedback.editorName || "Editor"}</span>

                    <span>
                      {feedback.createdAt
                        ? new Date(feedback.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>

                  {feedback.link && (
                    <div className="feedback-meta">
                      <a
                        href={feedback.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Feedback Document
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* =================================================
              REVISION HISTORY
          ================================================= */}

          {isEdit && revisions.length > 0 && (
            <div className="journal-history-section">
              <div className="history-section-heading">
                <div className="history-heading-icon revision">
                  <Upload size={18} />
                </div>

                <div>
                  <span>Manuscript Revision History</span>

                  <small>Previously uploaded manuscript versions</small>
                </div>
              </div>

              {revisions.map((revision, index) => (
                <div
                  className="revision-history-card"
                  key={`revision-${revision.version}-${revision.uploadedAt || index}-${index}`}
                >
                  <div className="revision-version-badge">
                    V{revision.version}
                  </div>

                  <div className="revision-main-content">
                    <h3>Manuscript Version {revision.version}</h3>

                    <p>
                      {revision.remarks || "Paper document uploaded by author."}
                    </p>

                    <div className="revision-meta">
                      <span>
                        Uploaded{" "}
                        {revision.uploadedAt
                          ? new Date(revision.uploadedAt).toLocaleDateString()
                          : ""}
                      </span>

                      {revision.paperFile && (
                        <a
                          href={revision.paperFile}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText size={14} />
                          View Document
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =================================================
              PAPER ID
          ================================================= */}

          {paperId && (
            <div className="paper-id-premium-card">
              <div className="paper-id-icon">
                <CheckCircle2 size={20} />
              </div>

              <div className="paper-id-copy">
                <span>Submission Reference</span>

                <strong>{paperId}</strong>
              </div>

              <div className="paper-id-state">
                <Clock3 size={15} />
                Ready for editorial processing
              </div>
            </div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form className="structured-accordion-form" onSubmit={handleSubmit}>
            {/* =================================================
                SECTION 01
            ================================================= */}

            <div
              className={`accordion-segment-block ${
                openSections.paperDetails ? "is-expanded" : ""
              }`}
            >
              <button
                type="button"
                className="accordion-trigger-bar"
                onClick={() => toggleSection("paperDetails")}
              >
                <div className="trigger-title-group">
                  <FileText className="section-icon-marker" size={22} />

                  <span className="section-title-label">
                    <span className="section-number-badge">01</span>

                    <span className="section-title-text">
                      Manuscript Submission Details
                      <small>Core manuscript information</small>
                    </span>
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
                  {/* PAPER TITLE */}

                  <div className="form-field-grid-row universal-one-column">
                    <div className="input-field-group">
                      <label className="field-label-text">Paper Title</label>

                      <input
                        type="text"
                        name="paperTitle"
                        value={formData.paperTitle}
                        onChange={handleChange}
                        className="premium-input-box"
                        placeholder="Enter manuscript title"
                      />

                      <small className="field-helper-caption">
                        Write the title of your article/paper in camel case.
                      </small>
                    </div>
                  </div>

                  {/* ABSTRACT */}

                  <div className="form-field-grid-row universal-one-column">
                    <div className="input-field-group">
                      <label className="field-label-text">Abstract</label>

                      <div className="rich-text-editor-container">
                        <div className="editor-toolbar-strip">
                          <button
                            type="button"
                            className={`tool-action-btn ${
                              isBold ? "active-tool" : ""
                            }`}
                            onClick={() => setIsBold(!isBold)}
                          >
                            <b>B</b>
                          </button>

                          <button
                            type="button"
                            className={`tool-action-btn ${
                              isItalic ? "active-tool" : ""
                            }`}
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
                            const value = e.target.value;

                            setEditorText(value);

                            setFormData((prev) => ({
                              ...prev,
                              abstract: value,
                            }));
                          }}
                          placeholder="Write your research abstract..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* KEYWORDS */}

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

                  {/* COUNTRY + RESEARCH AREA */}

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
                        <option value="">Select country code</option>

                        {ALL_COUNTRIES.map((country) => (
                          <option key={country.code} value={country.dial}>
                            {country.name} ({country.dial})
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
                        <option value="">Select research area</option>

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

                        <option value="Pharmacy (All Branch)">
                          Pharmacy (All Branch)
                        </option>

                        <option value="Science (All Branch)">
                          Science (All Branch)
                        </option>

                        <option value="Life Science (All Branch)">
                          Life Science (All Branch)
                        </option>

                        <option value="Health Science (All Branch)">
                          Health Science (All Branch)
                        </option>

                        <option value="Arts and Social Science (All Branch)">
                          Arts and Social Science (All Branch)
                        </option>

                        <option value="Social Science (All Branch)">
                          Social Science (All Branch)
                        </option>

                        <option value="Humanities (All Branch)">
                          Humanities (All Branch)
                        </option>

                        <option value="Commerce">Commerce</option>

                        <option value="Language (All Branch)">
                          Language (All Branch)
                        </option>

                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* FILE */}

                  <div className="form-field-grid-row universal-one-column">
                    <div className="input-field-group">
                      <label className="field-label-text">
                        {isEdit
                          ? "Upload Corrected Manuscript"
                          : "Upload Manuscript"}
                      </label>

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
                          <span className="cloud-upload-vector">
                            <Upload size={32} />
                          </span>

                          <span className="dropzone-primary-prompt">
                            {uploadedFile
                              ? `Selected: ${uploadedFile.name}`
                              : isEdit && editPaper?.paperFile
                                ? "Current manuscript available — upload corrected version"
                                : "Click to browse files or drag here"}
                          </span>

                          <span className="dropzone-format-constraint-text">
                            Supported: <strong>PDF</strong>,{" "}
                            <strong>DOC</strong>, <strong>DOCX</strong> ·
                            Maximum 20 MB
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                SECTION 02 AUTHORS
            ================================================= */}

            <div
              className={`accordion-segment-block ${
                openSections.authorDetails ? "is-expanded" : ""
              }`}
            >
              <button
                type="button"
                className="accordion-trigger-bar"
                onClick={() => toggleSection("authorDetails")}
              >
                <div className="trigger-title-group">
                  <Users className="section-icon-marker" size={22} />

                  <span className="section-title-label">
                    <span className="section-number-badge">02</span>

                    <span className="section-title-text">
                      Authors Profile
                      <small>Authors and affiliations</small>
                    </span>
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
                        <option value="">Select Author Category</option>

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

                          setAuthors((prev) =>
                            Array.from(
                              {
                                length: count,
                              },
                              (_, i) =>
                                prev[i] || {
                                  fullName: "",
                                  designation: "",
                                  organization: "",
                                  contactNumber: "",
                                  email: "",
                                },
                            ),
                          );
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
                    {Array.from({
                      length: totalAuthors,
                    }).map((_, index) => (
                      <div key={index} className="individual-author-card-panel">
                        <div className="author-card-badge-header">
                          <User size={14} />
                          Author {index + 1}
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
                              placeholder="Full Name"
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
                              placeholder="Designation"
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
                              placeholder="University / Organization"
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
                              placeholder="Contact Number"
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
                              placeholder="Official Email Address"
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

            {/* =================================================
                SECTION 03 ADDRESS
            ================================================= */}

            <div
              className={`accordion-segment-block ${
                openSections.addressDetails ? "is-expanded" : ""
              }`}
            >
              <button
                type="button"
                className="accordion-trigger-bar"
                onClick={() => toggleSection("addressDetails")}
              >
                <div className="trigger-title-group">
                  <MapPin className="section-icon-marker" size={22} />

                  <span className="section-title-label">
                    <span className="section-number-badge">03</span>

                    <span className="section-title-text">
                      Correspondence Address
                      <small>Author contact address</small>
                    </span>
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
                        placeholder="Apartment, suite, unit"
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
                        placeholder="City"
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
                        placeholder="State"
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
                        <option value="">Select Country</option>

                        {ALL_COUNTRIES.map((country) => (
                          <option
                            key={`country-${country.code}`}
                            value={country.name}
                          >
                            {country.name}
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
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter Pincode"
                        className="premium-input-box"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                SECTION 04 COMPLIANCE
            ================================================= */}

            <div
              className={`accordion-segment-block ${
                openSections.termsDetails ? "is-expanded" : ""
              }`}
            >
              <button
                type="button"
                className="accordion-trigger-bar"
                onClick={() => toggleSection("termsDetails")}
              >
                <div className="trigger-title-group">
                  <ShieldCheck className="section-icon-marker" size={22} />

                  <span className="section-title-label">
                    <span className="section-number-badge">04</span>

                    <span className="section-title-text">
                      Compliance & Submission
                      <small>Final verification</small>
                    </span>
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
                      <label className="field-label-text">Referral Code</label>

                      <input
                        type="text"
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleChange}
                        placeholder="Enter referral code if available"
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

                  <div className="input-field-group secure-captcha-container-row">
                    <label className="field-label-text-inline-captcha">
                      Solve the Math Verification:
                      <strong>
                        {" "}
                        {captcha.num1} + {captcha.num2} =
                      </strong>
                    </label>

                    <input
                      type="number"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      placeholder="Answer"
                      className="premium-input-box captcha-small-input-box"
                    />

                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="captcha-refresh-btn"
                    >
                      Refresh
                    </button>
                  </div>

                  <div className="terms-agreement-disclosure-callout">
                    <p>
                      By submitting this form, you agree to the journal
                      publication terms and conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FINAL ACTION
            ================================================= */}

            <div className="form-global-action-footer">
              <div className="submission-security-note">
                <ShieldCheck size={17} />

                <span>
                  Your manuscript information is transmitted through the
                  authorized journal submission workflow.
                </span>
              </div>

              <button type="submit" className="global-master-submit-btn">
                {isEdit ? "Submit Corrected Manuscript" : "Submit Manuscript"}

                <CheckCircle2 size={18} />
              </button>
            </div>
          </form>
          {editPaper &&
            ["Accepted", "Documents Required", "Correction Required"].includes(
              editPaper.status,
            ) && <AuthorPublicationDocuments paper={editPaper} />}
        </div>
      </main>
    </div>
  );
};

export default SubmitFrom;
