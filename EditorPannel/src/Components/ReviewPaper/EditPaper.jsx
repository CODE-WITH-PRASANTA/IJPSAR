import React, { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  Files,
  Hash,
  Info,
  Link2,
  Loader2,
  Mail,
  MessageSquareText,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  Users,
  XCircle,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import API, { BASE_URL } from "../../API/axios";

import "./EditPaper.css";

/* =========================================================
   STATUS STYLES
========================================================= */

const STATUS_STYLES = {
  Submitted: {
    className: "status-pending",
    label: "Submitted",
  },

  "Editor Assigned": {
    className: "status-assigned",
    label: "Editor Assigned",
  },

  "Under Review": {
    className: "status-editing",
    label: "Under Review",
  },

  Accepted: {
    className: "status-accepted",
    label: "Accepted",
  },

  Rejected: {
    className: "status-rejected",
    label: "Rejected",
  },

  "Documents Required": {
    className: "status-pending",
    label: "Documents Required",
  },
  "Documents Submitted": {
    className: "status-assigned",
    label: "Documents Submitted",
  },

  "Approved and Forwarded to Admin": {
    className: "status-accepted",
    label: "Approved & Forwarded to Admin",
  },

  Published: {
    className: "status-accepted",
    label: "Published",
  },
};
/* =========================================================
   STATUS OPTIONS
========================================================= */

const STATUS_OPTIONS = ["Under Review", "Accepted", "Rejected"];

/* =========================================================
   STATUS DESCRIPTIONS
========================================================= */

const STATUS_DESCRIPTIONS = {
  Submitted:
    "The manuscript has been submitted by the author and is waiting for editor assignment.",

  "Editor Assigned": "An editor has been assigned to review the manuscript.",

  "Under Review":
    "The manuscript is currently being reviewed by the assigned editor.",

  Accepted: "The manuscript has been accepted by the editor.",

  Rejected: "The manuscript has been rejected from the editorial workflow.",

  "Documents Required":
    "The paper has been accepted and the author must upload the required publication documents.",

  "Documents Submitted":
    "The author has submitted the required publication documents and they are ready for editor approval.",

  "Approved and Forwarded to Admin":
    "The editor has approved the publication documents and forwarded the paper to Admin for publication.",

  Published: "The paper has been published by Admin.",
};
/* =========================================================
   ACCEPTED DOCUMENT REQUIREMENTS
========================================================= */

const REQUIRED_DOCUMENTS = [
  "Corrected Galley Proof",
  "Copyright Transfer Form",
  "Publication Fee Payment Proof",
  "Author Photograph(s)",
];

const OPTIONAL_DOCUMENTS = ["Additional Supporting Files"];

/* =========================================================
   HELPERS
========================================================= */

const getStatusStyle = (status) => {
  return (
    STATUS_STYLES[status] || {
      className: "status-default",
      label: status || "Unknown",
    }
  );
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const normalizeText = (value) => {
  return String(value || "").trim();
};

const normalizeStatus = (value) => {
  return String(value || "")
    .trim()
    .replace(/[–—−]/g, "-")
    .replace(/\s+/g, " ")
    .toLowerCase();
};

const isPublicationDocumentsSubmitted = (status) => {
  return normalizeStatus(status) === "documents submitted";
};

const getFileName = (filePath) => {
  if (!filePath) {
    return "No document uploaded";
  }

  const cleanPath = String(filePath).split("?")[0].split("#")[0];

  const parts = cleanPath.split("/");

  return parts[parts.length - 1] || "Uploaded Document";
};

const getFileType = (filePath) => {
  if (!filePath) {
    return "Unknown";
  }

  const cleanPath = String(filePath).split("?")[0].split("#")[0].toLowerCase();

  if (cleanPath.endsWith(".pdf")) {
    return "PDF";
  }

  if (cleanPath.endsWith(".doc")) {
    return "DOC";
  }

  if (cleanPath.endsWith(".docx")) {
    return "DOCX";
  }

  if (cleanPath.endsWith(".jpg") || cleanPath.endsWith(".jpeg")) {
    return "JPG";
  }

  if (cleanPath.endsWith(".png")) {
    return "PNG";
  }

  return "DOCUMENT";
};

/* =========================================================
   FILE URL
========================================================= */

const getFileUrl = (filePath) => {
  if (!filePath) {
    return "";
  }

  const value = String(filePath);

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${BASE_URL}${value}`;
};

const isRequiredDocumentUploaded = (requiredDocument, publicationDocuments) => {
  return publicationDocuments.some((documentItem) => {
    if (requiredDocument === "Author Photograph(s)") {
      return documentItem.title.startsWith("Author Photograph");
    }

    return documentItem.title === requiredDocument;
  });
};

const isOptionalDocumentUploaded = (optionalDocument, publicationDocuments) => {
  if (optionalDocument === "Additional Supporting Files") {
    return publicationDocuments.some((documentItem) =>
      documentItem.title.startsWith("Additional Supporting File"),
    );
  }

  return false;
};

/* =========================================================
   PUBLICATION DOCUMENT NORMALIZER
========================================================= */

const getPublicationDocuments = (publicationDocuments) => {
  if (!publicationDocuments) {
    return [];
  }

  const documents = [];

  /* =====================================================
     CORRECTED GALLEY PROOF
  ===================================================== */

  const correctedGalleyProof = publicationDocuments.correctedGalleyProof;

  if (correctedGalleyProof?.file || correctedGalleyProof?.url) {
    const file = correctedGalleyProof.file || correctedGalleyProof.url;

    documents.push({
      id: "corrected-galley-proof",

      title: "Corrected Galley Proof",

      file,

      originalName:
        correctedGalleyProof.originalName ||
        correctedGalleyProof.name ||
        getFileName(file),

      type: correctedGalleyProof.type || getFileType(file),

      version: correctedGalleyProof.version || 1,

      uploadedAt:
        correctedGalleyProof.uploadedAt || correctedGalleyProof.createdAt,

      uploadedBy:
        correctedGalleyProof.uploadedByRole ||
        correctedGalleyProof.uploadedBy ||
        "Author",
    });
  }

  /* =====================================================
     COPYRIGHT TRANSFER FORM
  ===================================================== */

  const copyrightTransferForm = publicationDocuments.copyrightTransferForm;

  if (copyrightTransferForm?.file || copyrightTransferForm?.url) {
    const file = copyrightTransferForm.file || copyrightTransferForm.url;

    documents.push({
      id: "copyright-transfer-form",

      title: "Copyright Transfer Form",

      file,

      originalName:
        copyrightTransferForm.originalName ||
        copyrightTransferForm.name ||
        getFileName(file),

      type: copyrightTransferForm.type || getFileType(file),

      version: copyrightTransferForm.version || 1,

      uploadedAt:
        copyrightTransferForm.uploadedAt || copyrightTransferForm.createdAt,

      uploadedBy:
        copyrightTransferForm.uploadedByRole ||
        copyrightTransferForm.uploadedBy ||
        "Author",
    });
  }

  /* =====================================================
     PUBLICATION FEE PAYMENT PROOF
  ===================================================== */
  const publicationFeeProof =
    publicationDocuments.publicationFeePaymentProof ||
    publicationDocuments.publicationFeeProof;

  if (publicationFeeProof?.file || publicationFeeProof?.url) {
    const file = publicationFeeProof.file || publicationFeeProof.url;

    documents.push({
      id: "publication-fee-proof",

      title: "Publication Fee Payment Proof",

      file,

      originalName:
        publicationFeeProof.originalName ||
        publicationFeeProof.name ||
        getFileName(file),

      type: publicationFeeProof.type || getFileType(file),

      version: publicationFeeProof.version || 1,

      uploadedAt:
        publicationFeeProof.uploadedAt || publicationFeeProof.createdAt,

      uploadedBy:
        publicationFeeProof.uploadedByRole ||
        publicationFeeProof.uploadedBy ||
        "Author",
    });
  }

  /* =====================================================
     AUTHOR PHOTOGRAPHS
  ===================================================== */

  const authorPhotographs = publicationDocuments.authorPhotographs;

  if (Array.isArray(authorPhotographs)) {
    authorPhotographs.forEach((photo, index) => {
      if (!photo?.file && !photo?.url) {
        return;
      }

      const file = photo.file || photo.url;

      documents.push({
        id: `author-photograph-${index}`,

        title: `Author Photograph ${index + 1}`,

        file,

        originalName: photo.originalName || photo.name || getFileName(file),

        type: photo.type || getFileType(file),

        version: photo.version || 1,

        uploadedAt: photo.uploadedAt || photo.createdAt,

        uploadedBy: photo.uploadedByRole || photo.uploadedBy || "Author",
      });
    });
  }

  /* =====================================================
     ADDITIONAL SUPPORTING FILES
  ===================================================== */

  const additionalSupportingFiles =
    publicationDocuments.additionalSupportingFiles;

  if (Array.isArray(additionalSupportingFiles)) {
    additionalSupportingFiles.forEach((supportingFile, index) => {
      if (!supportingFile?.file && !supportingFile?.url) {
        return;
      }

      const file = supportingFile.file || supportingFile.url;

      documents.push({
        id: `supporting-file-${index}`,

        title: `Additional Supporting File ${index + 1}`,

        file,

        originalName:
          supportingFile.originalName ||
          supportingFile.name ||
          getFileName(file),

        type: supportingFile.type || getFileType(file),

        version: supportingFile.version || 1,

        uploadedAt: supportingFile.uploadedAt || supportingFile.createdAt,

        uploadedBy:
          supportingFile.uploadedByRole ||
          supportingFile.uploadedBy ||
          "Author",
      });
    });
  }

  return documents;
};

/* =========================================================
   INFO ROW
========================================================= */

const InfoRow = ({ icon, label, value, valueClass = "" }) => {
  return (
    <div className="sidebar-info-row">
      <div className="sidebar-info-label">
        {icon}
        <span>{label}</span>
      </div>

      <strong className={valueClass}>{value}</strong>
    </div>
  );
};

/* =========================================================
   COMPONENT
========================================================= */

const EditPaper = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  /* =======================================================
     PAPER
  ======================================================= */

  const [paper, setPaper] = useState(null);

  /* =======================================================
     FORM
  ======================================================= */

  const [formData, setFormData] = useState({
    paperTitle: "",
    abstract: "",
    editorRemarks: "",
    feedbackLink: "",
    status: "",
  });

  /* =======================================================
     STATES
  ======================================================= */

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [activeTab, setActiveTab] = useState("details");

  const [publicationDocuments, setPublicationDocuments] = useState([]);

  /* =======================================================
     FETCH PAPER
  ======================================================= */

  useEffect(() => {
    fetchPaper();

    // eslint-disable-next-line
  }, [id]);

  const fetchPaper = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const response = await API.get(`/submitform/${id}`);

      const data = response?.data?.data;
      

      if (!data) {
        throw new Error("Paper information was not found.");
      }

      setPaper(data);

      setFormData({
        paperTitle: data.paperTitle || "",

        abstract: data.abstract || "",

        editorRemarks: data.editorRemarks || "",

        feedbackLink: data.feedbackLink || "",

        status: data.status || "Editing",
      });

      /* ===================================================
         PUBLICATION DOCUMENTS
      =================================================== */

      setPublicationDocuments(
        getPublicationDocuments(data.publicationDocuments),
      );

      /* ===================================================
         CURRENT MANUSCRIPT
      =================================================== */

      if (data.paperFile) {
        setSelectedDocument({
          id: "current-document",

          type: "current",

          version: data.version || 1,

          paperFile: data.paperFile,

          remarks: "Current manuscript",

          uploadedAt: data.updatedAt || data.createdAt,
        });
      } else {
        setSelectedDocument(null);
      }
    } catch (err) {
      console.error("FETCH PAPER ERROR:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load paper. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadedRequiredDocuments = REQUIRED_DOCUMENTS.filter(
    (requiredDocument) =>
      isRequiredDocumentUploaded(requiredDocument, publicationDocuments),
  ).length;

  /* =======================================================
     DOCUMENTS
  ======================================================= */

  const documents = useMemo(() => {
    if (!paper) {
      return [];
    }

    const list = [];

    if (paper.paperFile) {
      list.push({
        id: "current-document",

        type: "current",

        version: paper.version || 1,

        paperFile: paper.paperFile,

        remarks: "Current manuscript",

        uploadedAt: paper.updatedAt || paper.createdAt,
      });
    }

    const revisions = Array.isArray(paper.revisions) ? paper.revisions : [];

    revisions.forEach((revision, index) => {
      if (!revision?.paperFile) {
        return;
      }

      list.push({
        id: revision._id
          ? `revision-${String(revision._id)}-${index}`
          : `revision-${index}-${revision.version || "unknown"}`,
        type: "previous",
        version: revision.version || index + 1,
        paperFile: revision.paperFile,
        remarks: revision.remarks || "Previous manuscript",
        uploadedAt:
          revision.uploadedAt || revision.createdAt || paper.createdAt,
      });
    });

    return list;
  }, [paper]);

  /* =======================================================
     SELECT DOCUMENT
  ======================================================= */

  const handleDocumentChange = (event) => {
    const documentId = event.target.value;

    const document = documents.find((item) => item.id === documentId);

    if (document) {
      setSelectedDocument(document);
    }
  };

  /* =======================================================
     SELECTED FILE URL
  ======================================================= */

  const selectedFileUrl = useMemo(() => {
    if (!selectedDocument?.paperFile) {
      return "";
    }

    return getFileUrl(selectedDocument.paperFile);
  }, [selectedDocument]);

  /* =======================================================
     FILE PREVIEW TYPE
  ======================================================= */

  const selectedFileType = useMemo(() => {
    return getFileType(selectedDocument?.paperFile);
  }, [selectedDocument]);

  const isPDF = selectedFileType === "PDF";

  const isWord = selectedFileType === "DOC" || selectedFileType === "DOCX";

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =======================================================
     STATUS CHANGE
  ======================================================= */

  const handleStatusChange = (status) => {
    setFormData((previous) => ({
      ...previous,
      status,
    }));
  };

  /* =======================================================
     OPEN MANUSCRIPT
  ======================================================= */

  const handleOpenDocument = () => {
    if (!selectedFileUrl) {
      return;
    }

    window.open(selectedFileUrl, "_blank", "noopener,noreferrer");
  };

  /* =======================================================
     DOWNLOAD MANUSCRIPT
  ======================================================= */

  const handleDownload = () => {
    if (!selectedFileUrl) {
      return;
    }

    const link = document.createElement("a");

    link.href = selectedFileUrl;

    link.setAttribute("download", getFileName(selectedDocument?.paperFile));

    link.setAttribute("target", "_blank");

    link.setAttribute("rel", "noopener noreferrer");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  /* =======================================================
     OPEN PUBLICATION DOCUMENT
  ======================================================= */

  const handleOpenPublicationDocument = (publicationDocument) => {
    if (!publicationDocument?.file) {
      return;
    }

    const url = getFileUrl(publicationDocument.file);

    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* =======================================================
     DOWNLOAD PUBLICATION DOCUMENT
  ======================================================= */

  const handleDownloadPublicationDocument = (publicationDocument) => {
    if (!publicationDocument?.file) {
      return;
    }

    const url = getFileUrl(publicationDocument.file);

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      publicationDocument.originalName || getFileName(publicationDocument.file),
    );

    link.setAttribute("target", "_blank");

    link.setAttribute("rel", "noopener noreferrer");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  /* =======================================================
     SAVE PAPER
  ======================================================= */

  /* =======================================================
   SAVE PAPER DETAILS / EDITORIAL CHANGES
======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

  

    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const token =
        localStorage.getItem("editorToken") || localStorage.getItem("token");

      if (!token) {
        throw new Error("Editor session expired. Please login again.");
      }

      /* =====================================================
       COMMON EDITORIAL DATA
    ===================================================== */

      const editorialPayload = {
        paperTitle: normalizeText(formData.paperTitle),

        abstract: normalizeText(formData.abstract),

        editorRemarks: formData.editorRemarks || "",

        feedbackLink: formData.feedbackLink || "",

        editorVersion: paper?.version || 1,
      };

     

      let response;

      /* =====================================================
       STEP 1
       EDITOR ASSIGNED
              ↓
       UNDER REVIEW

       IMPORTANT:
       Do NOT use /update here.
       Use /start-editing.
    ===================================================== */

      if (
        paper?.status === "Editor Assigned" &&
        formData.status === "Under Review"
      ) {
       

        /* First save title / abstract / remarks */
        const updateResponse = await API.put(
          `/submitform/update/${id}`,
          editorialPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        
        if (!updateResponse?.data?.success) {
          throw new Error(
            updateResponse?.data?.message ||
              "Unable to save editorial changes.",
          );
        }

        /* Then change workflow status */
        response = await API.put(
          `/submitform/start-editing/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        
      } else if (
        /* =====================================================
       STEP 2
       UNDER REVIEW
             ↓
       ACCEPTED
    ===================================================== */
        paper?.status === "Under Review" &&
        formData.status === "Accepted"
      ) {
      
        /* First save editorial information */
        const updateResponse = await API.put(
          `/submitform/update/${id}`,
          editorialPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

      

        if (!updateResponse?.data?.success) {
          throw new Error(
            updateResponse?.data?.message ||
              "Unable to save editorial changes.",
          );
        }

        /* Then accept */
        response = await API.put(
          `/submitform/accept/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        
      } else if (
        /* =====================================================
       STEP 3
       UNDER REVIEW
             ↓
       REJECTED
    ===================================================== */
        paper?.status === "Under Review" &&
        formData.status === "Rejected"
      ) {
       

        if (!normalizeText(formData.editorRemarks)) {
          throw new Error(
            "Please provide rejection remarks before rejecting the paper.",
          );
        }

        /* Save remarks first */
        const updateResponse = await API.put(
          `/submitform/update/${id}`,
          editorialPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

       

        if (!updateResponse?.data?.success) {
          throw new Error(
            updateResponse?.data?.message ||
              "Unable to save editorial changes.",
          );
        }

        /* Then reject */
        response = await API.put(
          `/submitform/reject/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        
      } else if (formData.status === paper?.status) {
        /* =====================================================
       NO WORKFLOW CHANGE
       Just save normal editorial information
    ===================================================== */
       
        response = await API.put(`/submitform/update/${id}`, editorialPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
      } else {
        /* =====================================================
       INVALID WORKFLOW TRANSITION
    ===================================================== */
        throw new Error(
          `Invalid workflow transition: ${paper?.status} → ${formData.status}`,
        );
      }

      /* =====================================================
       RESPONSE VALIDATION
    ===================================================== */

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Unable to update paper.");
      }

      /* =====================================================
       UPDATE LOCAL PAPER
    ===================================================== */

      const updatedPaper = response?.data?.data;

      if (updatedPaper) {
        setPaper(updatedPaper);

        setFormData({
          paperTitle: updatedPaper.paperTitle || "",

          abstract: updatedPaper.abstract || "",

          editorRemarks: updatedPaper.editorRemarks || "",

          feedbackLink: updatedPaper.feedbackLink || "",

          status: updatedPaper.status || "Editing",
        });

        setPublicationDocuments(
          getPublicationDocuments(updatedPaper.publicationDocuments),
        );

        /* ===============================================
         REBUILD MANUSCRIPT DOCUMENT LIST
      =============================================== */

        setSelectedDocument(
          updatedPaper.paperFile
            ? {
                id: "current-document",

                type: "current",

                version: updatedPaper.version || 1,

                paperFile: updatedPaper.paperFile,

                remarks: "Current manuscript",

                uploadedAt: updatedPaper.updatedAt || updatedPaper.createdAt,
              }
            : null,
        );
      }

      /* =====================================================
       SUCCESS
    ===================================================== */

      setSuccessMessage(
        response?.data?.message || "Editorial changes saved successfully.",
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error("UPDATE PAPER ERROR:", err);

      console.error("STATUS:", err?.response?.status);

      console.error("RESPONSE:", err?.response?.data);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update paper.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleRequestPublicationDocuments = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const token =
        localStorage.getItem("editorToken") || localStorage.getItem("token");

      if (!token) {
        throw new Error("Editor session expired. Please login again.");
      }

      /* =====================================================
       ONLY ACCEPTED PAPER CAN REQUEST DOCUMENTS
    ===================================================== */

      if (paper?.status !== "Accepted") {
        throw new Error(
          "Publication documents can only be requested after the paper is accepted.",
        );
      }

      const response = await API.put(
        `/submitform/request-publication-documents/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

     

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Unable to request publication documents.",
        );
      }

      const updatedPaper = {
        ...paper,
        ...(response?.data?.data || {}),
        status: response?.data?.data?.status || "Documents Required",
      };

      /* =====================================================
       UPDATE PAPER
    ===================================================== */

      setPaper(updatedPaper);

      /* =====================================================
       UPDATE FORM STATUS
    ===================================================== */

      setFormData((previous) => ({
        ...previous,

        paperTitle: updatedPaper.paperTitle ?? previous.paperTitle,

        abstract: updatedPaper.abstract ?? previous.abstract,

        editorRemarks: updatedPaper.editorRemarks ?? previous.editorRemarks,

        feedbackLink: updatedPaper.feedbackLink ?? previous.feedbackLink,

        status: updatedPaper.status,
      }));

      /* =====================================================
       UPDATE DOCUMENTS
    ===================================================== */

      setPublicationDocuments(
        getPublicationDocuments(updatedPaper.publicationDocuments),
      );

      setSuccessMessage(
        response?.data?.message || "Publication documents are now required.",
      );
    } catch (err) {
      console.error("REQUEST PUBLICATION DOCUMENTS ERROR:", err);

      console.error("STATUS:", err?.response?.status);

      console.error("RESPONSE:", err?.response?.data);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to request publication documents.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleApprovePublicationDocuments = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const token =
        localStorage.getItem("editorToken") || localStorage.getItem("token");

      if (!token) {
        throw new Error("Editor session expired. Please login again.");
      }

      if (!isPublicationDocumentsSubmitted(paper?.status)) {
        throw new Error(
          "Publication documents must be submitted by the author before approval.",
        );
      }

      if (uploadedRequiredDocuments !== REQUIRED_DOCUMENTS.length) {
        throw new Error(
          "All required publication documents must be uploaded before approval.",
        );
      }

      const response = await API.put(
        `/submitform/publication/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Unable to approve publication documents.",
        );
      }

      const updatedPaper = {
        ...paper,
        ...(response?.data?.data || {}),
        status:
          response?.data?.data?.status || "Approved and Forwarded to Admin",
      };

      setPaper(updatedPaper);

      setFormData((previous) => ({
        ...previous,
        paperTitle: updatedPaper.paperTitle ?? previous.paperTitle,
        abstract: updatedPaper.abstract ?? previous.abstract,
        editorRemarks: updatedPaper.editorRemarks ?? previous.editorRemarks,
        feedbackLink: updatedPaper.feedbackLink ?? previous.feedbackLink,
        status: updatedPaper.status,
      }));

      setPublicationDocuments(
        getPublicationDocuments(updatedPaper.publicationDocuments),
      );

      setSuccessMessage(
        response?.data?.message ||
          "Publication documents approved and forwarded to Admin.",
      );
    } catch (err) {
      console.error("APPROVE PUBLICATION DOCUMENTS ERROR:", err);

      console.error("STATUS:", err?.response?.status);
      console.error("RESPONSE:", err?.response?.data);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to approve publication documents.",
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="edit-paper-loading">
        <Loader2 size={28} className="spin-icon" />

        <span>Loading manuscript...</span>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error && !paper) {
    return (
      <div className="edit-paper-error">
        <XCircle size={30} />

        <h2>Unable to load manuscript</h2>

        <p>{error}</p>

        <button type="button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  if (!paper) {
    return null;
  }

  const currentStatus = getStatusStyle(formData.status);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="edit-paper-page">
      {/* ===================================================
          TOP HEADER
      =================================================== */}

      <header className="edit-paper-header">
        <div className="edit-paper-header-left">
          <button
            type="button"
            className="back-editor-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="header-divider" />

          <div>
            <span className="header-eyebrow">EDITORIAL MANAGEMENT</span>

            <h1>Edit Manuscript</h1>

            <p>
              Review and manage manuscript information and publication
              documents.
            </p>
          </div>
        </div>

        <div className="header-paper-id">
          <Hash size={15} />

          <span>{paper.paperId || "—"}</span>
        </div>
      </header>

      {/* ===================================================
          ALERTS
      =================================================== */}

      {error && (
        <div className="editor-alert error">
          <XCircle size={17} />

          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="editor-alert success">
          <CheckCircle2 size={17} />

          <span>{successMessage}</span>
        </div>
      )}

      {/* ===================================================
          PAPER SUMMARY
      =================================================== */}

      <section className="paper-summary-card">
        <div className="paper-summary-icon">
          <BookOpen size={22} />
        </div>

        <div className="paper-summary-content">
          <span>MANUSCRIPT</span>

          <h2>{paper.paperTitle || "Untitled Manuscript"}</h2>

          <div className="paper-summary-meta">
            <span>
              <Hash size={13} />
              {paper.paperId || "—"}
            </span>

            <span>
              <RefreshCw size={13} />V{paper.version || 1}
            </span>

            <span>
              <CalendarDays size={13} />
              {formatDate(paper.createdAt)}
            </span>
          </div>
        </div>

        <div className={`paper-summary-status ${currentStatus.className}`}>
          <span className="status-indicator-dot" />

          {currentStatus.label}
        </div>
      </section>

      {/* ===================================================
          MAIN MANUSCRIPT AREA
      =================================================== */}

      <div className="editor-main-grid">
        {/* =================================================
            LEFT DOCUMENT VIEWER
        ================================================= */}

        <main className="document-workspace">
          <div className="workspace-card">
            {/* DOCUMENT HEADER */}

            <div className="workspace-header">
              <div>
                <span>MANUSCRIPT DOCUMENT</span>

                <h2>Document Viewer</h2>
              </div>

              <div className="workspace-actions">
                <button
                  type="button"
                  className="document-action-btn"
                  onClick={handleOpenDocument}
                  disabled={!selectedFileUrl}
                >
                  <ExternalLink size={14} />
                  Open
                </button>

                <button
                  type="button"
                  className="document-action-btn primary"
                  onClick={handleDownload}
                  disabled={!selectedFileUrl}
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>

            {/* DOCUMENT SELECTOR */}

            {documents.length > 0 && (
              <div className="document-selector-area">
                <div className="selector-label-row">
                  <div>
                    <span>MANUSCRIPT VERSION</span>

                    <strong>Select document</strong>
                  </div>

                  <div className="document-count">
                    {documents.length}{" "}
                    {documents.length === 1 ? "document" : "documents"}
                  </div>
                </div>

                <div className="document-select-wrapper">
                  <FileCheck2 size={16} />

                  <select
                    value={selectedDocument?.id || documents[0]?.id || ""}
                    onChange={handleDocumentChange}
                  >
                    {documents.map((documentItem) => (
                      <option key={documentItem.id} value={documentItem.id}>
                        {documentItem.type === "current"
                          ? `Current Manuscript — Version ${documentItem.version}`
                          : `Previous Manuscript — Version ${documentItem.version}`}
                      </option>
                    ))}
                  </select>

                  <ChevronDown size={16} />
                </div>

                {selectedDocument && (
                  <div className="selected-document-meta">
                    <div className="selected-document-left">
                      <span
                        className={`document-version-state ${
                          selectedDocument.type === "current"
                            ? "current"
                            : "previous"
                        }`}
                      >
                        {selectedDocument.type === "current"
                          ? "CURRENT"
                          : "PREVIOUS"}
                      </span>

                      <span className="selected-version-text">
                        Version {selectedDocument.version}
                      </span>
                    </div>

                    <span>{formatDateTime(selectedDocument.uploadedAt)}</span>
                  </div>
                )}
              </div>
            )}

            {/* VIEWER */}

            <div className="document-viewer">
              {!selectedDocument ? (
                <div className="document-empty-state">
                  <div className="empty-document-icon">
                    <FileText size={32} />
                  </div>

                  <h3>No document available</h3>

                  <p>This manuscript does not have an uploaded document.</p>
                </div>
              ) : isPDF ? (
                <iframe
                  src={selectedFileUrl}
                  title={`Manuscript Version ${selectedDocument.version}`}
                  className="manuscript-pdf-frame"
                />
              ) : isWord ? (
                <div className="word-document-state">
                  <div className="word-document-icon">
                    <FileText size={34} />
                  </div>

                  <div className="word-document-content">
                    <span className="word-document-label">
                      MICROSOFT WORD DOCUMENT
                    </span>

                    <h3>Manuscript Version {selectedDocument.version}</h3>

                    <p>
                      Word documents cannot be rendered directly inside the
                      browser. Download the file to review its contents.
                    </p>

                    <button
                      type="button"
                      className="viewer-download-btn"
                      onClick={handleDownload}
                    >
                      <Download size={16} />
                      Download Manuscript
                    </button>
                  </div>
                </div>
              ) : (
                <div className="word-document-state">
                  <div className="word-document-icon">
                    <FileText size={34} />
                  </div>

                  <div className="word-document-content">
                    <span className="word-document-label">DOCUMENT</span>

                    <h3>Unsupported Preview</h3>

                    <p>This document type cannot be previewed directly.</p>

                    <button
                      type="button"
                      className="viewer-download-btn"
                      onClick={handleDownload}
                    >
                      <Download size={16} />
                      Download Document
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              AUTHOR PUBLICATION DOCUMENTS
          ================================================= */}

          <section className="publication-documents-card">
            <div className="publication-documents-header">
              <div className="publication-documents-heading">
                <div className="publication-documents-icon">
                  <Files size={20} />
                </div>

                <div>
                  <span>AUTHOR PUBLICATION SUBMISSION</span>

                  <h2>Uploaded Publication Documents</h2>

                  <p>
                    All publication documents uploaded by the author for this
                    manuscript.
                  </p>
                </div>
              </div>

              <div className="publication-documents-count">
                <strong>{publicationDocuments.length}</strong>

                <span>
                  {publicationDocuments.length === 1 ? "Document" : "Documents"}
                </span>
              </div>
            </div>

            {/* EMPTY */}

            {publicationDocuments.length === 0 ? (
              <div className="publication-documents-empty">
                <div className="publication-empty-icon">
                  <Upload size={27} />
                </div>

                <div>
                  <h3>No publication documents uploaded</h3>

                  <p>
                    The author has not submitted any publication documents yet.
                  </p>
                </div>
              </div>
            ) : (
              <div className="publication-documents-list">
                {publicationDocuments.map((publicationDocument) => (
                  <div
                    className="publication-document-item"
                    key={publicationDocument.id}
                  >
                    {/* FILE ICON */}

                    <div className="publication-document-file-icon">
                      <FileText size={24} />
                    </div>

                    {/* INFORMATION */}

                    <div className="publication-document-info">
                      <div className="publication-document-title-row">
                        <h3>{publicationDocument.title}</h3>

                        <span
                          className={`publication-document-status ${
                            publicationDocument.title.startsWith(
                              "Additional Supporting File",
                            )
                              ? "optional"
                              : ""
                          }`}
                        >
                          {publicationDocument.title.startsWith(
                            "Additional Supporting File",
                          ) ? (
                            <>
                              <Info size={13} />
                              Optional
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={13} />
                              Uploaded
                            </>
                          )}
                        </span>
                      </div>

                      <strong
                        className="publication-document-name"
                        title={publicationDocument.originalName}
                      >
                        {publicationDocument.originalName}
                      </strong>

                      <div className="publication-document-meta">
                        <span>{publicationDocument.type}</span>

                        <span>•</span>

                        <span>Version {publicationDocument.version}</span>

                        <span>•</span>

                        <span>
                          Uploaded by {publicationDocument.uploadedBy}
                        </span>

                        <span>•</span>

                        <span>
                          {formatDateTime(publicationDocument.uploadedAt)}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="publication-document-actions">
                      <button
                        type="button"
                        className="publication-document-action"
                        onClick={() =>
                          handleOpenPublicationDocument(publicationDocument)
                        }
                      >
                        <ExternalLink size={15} />
                        Open
                      </button>

                      <button
                        type="button"
                        className="publication-document-action primary"
                        onClick={() =>
                          handleDownloadPublicationDocument(publicationDocument)
                        }
                      >
                        <Download size={15} />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* REQUIREMENT SUMMARY */}

            {/* =====================================================
    DOCUMENT REQUIREMENT SUMMARY
===================================================== */}

            <div className="publication-requirement-footer">
              {/* HEADER */}
              <div className="publication-requirement-title">
                <Info size={16} />

                <div>
                  <strong>Publication document requirements</strong>

                  <span>Required and optional documents for publication</span>
                </div>
              </div>

              {/* =================================================
      REQUIRED DOCUMENTS
  ================================================= */}

              <div className="publication-requirement-section">
                <div className="publication-requirement-section-heading">
                  <div>
                    <strong>Required Documents</strong>

                    <span>
                      All of these documents must be uploaded before publication
                      approval.
                    </span>
                  </div>

                  <span className="publication-requirement-count">
                    {uploadedRequiredDocuments}/{REQUIRED_DOCUMENTS.length}
                  </span>
                </div>

                <div className="publication-requirement-list">
                  {REQUIRED_DOCUMENTS.map((requiredDocument) => {
                    const uploaded = isRequiredDocumentUploaded(
                      requiredDocument,
                      publicationDocuments,
                    );

                    return (
                      <div
                        key={requiredDocument}
                        className={`publication-requirement-item ${
                          uploaded ? "uploaded" : "pending"
                        }`}
                      >
                        {uploaded ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Clock3 size={14} />
                        )}

                        <span>{requiredDocument}</span>

                        <small>{uploaded ? "Uploaded" : "Pending"}</small>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* =================================================
      OPTIONAL DOCUMENTS
  ================================================= */}

              <div className="publication-requirement-section optional">
                <div className="publication-requirement-section-heading">
                  <div>
                    <strong>Optional Documents</strong>

                    <span>
                      These documents are not required for publication approval.
                    </span>
                  </div>

                  <span className="optional-badge">OPTIONAL</span>
                </div>

                <div className="publication-requirement-list">
                  {OPTIONAL_DOCUMENTS.map((optionalDocument) => {
                    const uploaded = isOptionalDocumentUploaded(
                      optionalDocument,
                      publicationDocuments,
                    );

                    return (
                      <div
                        key={optionalDocument}
                        className={`publication-requirement-item optional-item ${
                          uploaded ? "uploaded" : "optional-pending"
                        }`}
                      >
                        {uploaded ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Info size={14} />
                        )}

                        <span>{optionalDocument}</span>

                        <small>{uploaded ? "Uploaded" : "Not Uploaded"}</small>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* =================================================
            RIGHT EDITOR SIDEBAR
        ================================================= */}

        <aside className="editor-sidebar">
          {/* ASSIGNMENT */}

          <div className="premium-sidebar-card">
            <div className="sidebar-card-heading">
              <div className="sidebar-card-icon indigo">
                <User size={17} />
              </div>

              <div>
                <span>ASSIGNMENT</span>

                <h3>Editor Details</h3>
              </div>
            </div>

            <div className="assignment-profile">
              <div className="editor-avatar">
                {(paper.editorName || "E").charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{paper.editorName || "Not Assigned"}</strong>

                <span>Assigned Editor</span>
              </div>
            </div>

            <div className="sidebar-info-list">
              <InfoRow
                icon={<CalendarDays size={14} />}
                label="Assigned"
                value={formatDate(paper.editorAssignedAt)}
              />

              <InfoRow
                icon={<RefreshCw size={14} />}
                label="Version"
                value={`V${paper.version || 1}`}
              />

              <InfoRow
                icon={<Clock3 size={14} />}
                label="Last Updated"
                value={formatDate(paper.updatedAt)}
              />
            </div>
          </div>

          {/* PAPER INFORMATION */}

          <div className="premium-sidebar-card">
            <div className="sidebar-card-heading">
              <div className="sidebar-card-icon teal">
                <FileCheck2 size={17} />
              </div>

              <div>
                <span>MANUSCRIPT</span>
                <h3>Paper Information</h3>
              </div>
            </div>

            <div className="sidebar-info-list">
              {/* PAPER ID */}
              <InfoRow
                icon={<Hash size={14} />}
                label="Paper ID"
                value={paper.paperId || paper._id || "—"}
                valueClass="highlight"
              />

              {/* PAPER TITLE */}
              <InfoRow
                icon={<FileText size={14} />}
                label="Paper Title"
                value={paper.paperTitle || "—"}
              />

              {/* AUTHOR */}
              <InfoRow
                icon={<User size={14} />}
                label="Author"
                value={paper.authors?.[0]?.fullName || "—"}
              />

              {/* EMAIL */}
              <InfoRow
                icon={<Mail size={14} />}
                label="Email"
                value={paper.authors?.[0]?.email || "—"}
              />

              {/* CONTACT */}
              <InfoRow
                icon={<MessageSquareText size={14} />}
                label="Contact"
                value={paper.authors?.[0]?.contactNumber || "—"}
              />

              {/* RESEARCH AREA */}
              <InfoRow
                icon={<BookOpen size={14} />}
                label="Research Area"
                value={paper.researchArea || "—"}
              />

              {/* AUTHOR CATEGORY */}
              <InfoRow
                icon={<User size={14} />}
                label="Category"
                value={paper.authorCategory || "—"}
              />

              {/* SUBMITTED */}
              <InfoRow
                icon={<CalendarDays size={14} />}
                label="Submitted"
                value={formatDate(paper.createdAt)}
              />
            </div>
          </div>

          {/* DOCUMENT SUMMARY */}

          <div className="premium-sidebar-card">
            <div className="sidebar-card-heading">
              <div className="sidebar-card-icon purple">
                <Files size={17} />
              </div>

              <div>
                <span>PUBLICATION</span>

                <h3>Document Summary</h3>
              </div>
            </div>

            <div className="publication-sidebar-summary">
              <div>
                <strong>{publicationDocuments.length}</strong>

                <span>Uploaded</span>
              </div>

              <div>
                <strong>
                  {REQUIRED_DOCUMENTS.length - uploadedRequiredDocuments}
                </strong>

                <span>Pending</span>
              </div>
            </div>

            <div className="sidebar-document-status">
              {publicationDocuments.length === 0 ? (
                <>
                  <Clock3 size={15} />

                  <span>Waiting for author documents</span>
                </>
              ) : uploadedRequiredDocuments === REQUIRED_DOCUMENTS.length ? (
                <>
                  <CheckCircle2 size={15} />

                  <span>Required documents uploaded</span>
                </>
              ) : (
                <>
                  <Info size={15} />

                  <span>Some documents are still pending</span>
                </>
              )}
            </div>
          </div>

          {paper.status === "Accepted" && (
            <div className="publication-next-action-card">
              <div className="publication-next-action-content">
                <div className="publication-next-action-icon">
                  <FileCheck2 size={20} />
                </div>

                <div>
                  <span>NEXT PUBLICATION STEP</span>

                  <h3>Request Publication Documents</h3>

                  <p>
                    The paper has been accepted. Ask the author to upload the
                    required publication documents.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="request-publication-documents-btn"
                onClick={handleRequestPublicationDocuments}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 size={17} className="spin-icon" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FileCheck2 size={17} />
                    Request Publication Documents
                  </>
                )}
              </button>
            </div>
          )}

          {isPublicationDocumentsSubmitted(paper.status) && (
            <div className="publication-next-action-card">
              <div className="publication-next-action-content">
                <div className="publication-next-action-icon">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <span>NEXT PUBLICATION STEP</span>

                  <h3>Approve Publication Documents</h3>

                  <p>
                    The author has submitted the publication documents. Review
                    them and forward the paper to Admin for publication.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="request-publication-documents-btn"
                onClick={handleApprovePublicationDocuments}
                disabled={
                  saving ||
                  uploadedRequiredDocuments !== REQUIRED_DOCUMENTS.length
                }
              >
                {saving ? (
                  <>
                    <Loader2 size={17} className="spin-icon" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={17} />
                    Approve & Forward to Admin
                  </>
                )}
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* ===================================================
          EDITOR FORM
      =================================================== */}

      <form className="editor-form-shell" onSubmit={handleSubmit}>
        {/* TABS */}

        <div className="editor-tabs">
          <button
            type="button"
            className={activeTab === "details" ? "active" : ""}
            onClick={() => setActiveTab("details")}
          >
            <FileText size={15} />
            Details
          </button>

          <button
            type="button"
            className={activeTab === "feedback" ? "active" : ""}
            onClick={() => setActiveTab("feedback")}
          >
            <MessageSquareText size={15} />
            Feedback
          </button>

          <button
            type="button"
            className={activeTab === "status" ? "active" : ""}
            onClick={() => setActiveTab("status")}
          >
            <RefreshCw size={15} />
            Status
          </button>
        </div>

        {/* =================================================
            DETAILS TAB
        ================================================= */}

        {activeTab === "details" && (
          <div className="form-tab-content">
            <div className="form-section-intro">
              <div className="intro-line details-line" />

              <div>
                <h3>Manuscript Details</h3>

                <p>Update the manuscript title and abstract information.</p>
              </div>
            </div>

            <div className="editor-field">
              <label>Paper Title</label>

              <div className="premium-input-wrap">
                <FileText size={17} />

                <input
                  type="text"
                  name="paperTitle"
                  value={formData.paperTitle}
                  onChange={handleChange}
                  placeholder="Enter paper title"
                />
              </div>
            </div>

            <div className="editor-field">
              <label>Abstract</label>

              <div className="premium-textarea-wrap">
                <textarea
                  name="abstract"
                  rows="8"
                  value={formData.abstract}
                  onChange={handleChange}
                  placeholder="Enter manuscript abstract..."
                />

                <div className="textarea-footer">
                  <span>Manuscript abstract</span>

                  <span>{formData.abstract.length} characters</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            FEEDBACK TAB
        ================================================= */}

        {activeTab === "feedback" && (
          <div className="form-tab-content">
            <div className="form-section-intro">
              <div className="intro-line feedback-line" />

              <div>
                <h3>Editorial Feedback</h3>

                <p>Add comments or instructions for the author.</p>
              </div>
            </div>

            <div className="editorial-note-card">
              <div className="editorial-note-icon">
                <MessageSquareText size={18} />
              </div>

              <div>
                <strong>Editor's note</strong>

                <span>
                  Use clear and constructive language when requesting revisions.
                </span>
              </div>
            </div>

            <div className="editor-field">
              <label>
                <span>Editor Remarks</span>

                <em>Recommended</em>
              </label>

              <div className="premium-textarea-wrap">
                <textarea
                  name="editorRemarks"
                  rows="9"
                  value={formData.editorRemarks}
                  onChange={handleChange}
                  placeholder="Write your editorial comments, revision requirements or review notes..."
                />

                <div className="textarea-footer">
                  <span>Visible to the editorial workflow</span>

                  <span>{formData.editorRemarks.length} characters</span>
                </div>
              </div>
            </div>

            <div className="editor-field">
              <label>
                <span>Feedback / Reference Link</span>

                <em>Optional</em>
              </label>

              <div className="premium-input-wrap">
                <Link2 size={17} />

                <input
                  type="url"
                  name="feedbackLink"
                  value={formData.feedbackLink}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                />

                {formData.feedbackLink && (
                  <a
                    href={formData.feedbackLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="input-external-link"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            STATUS TAB
        ================================================= */}

        {activeTab === "status" && (
          <div className="form-tab-content">
            <div className="form-section-intro">
              <div className="intro-line status-line" />

              <div>
                <h3>Editorial Workflow</h3>

                <p>Set the manuscript's current editorial status.</p>
              </div>
            </div>

            <div className="current-workflow-card">
              <div className="workflow-card-top">
                <div>
                  <span>CURRENT WORKFLOW</span>

                  <h3>{currentStatus.label}</h3>
                </div>

                <div
                  className={`workflow-large-status ${currentStatus.className}`}
                >
                  <span className="status-indicator-dot" />

                  {currentStatus.label}
                </div>
              </div>

              <p>
                {STATUS_DESCRIPTIONS[formData.status] ||
                  "Select the appropriate status after completing your editorial action."}
              </p>
            </div>

            <div className="status-option-grid">
              {STATUS_OPTIONS.map((status) => {
                const statusStyle = getStatusStyle(status);

                const isSelected = formData.status === status;

                return (
                  <button
                    type="button"
                    key={status}
                    className={`status-selection-card ${
                      isSelected ? "selected" : ""
                    } ${statusStyle.className}`}
                    onClick={() => handleStatusChange(status)}
                  >
                    <div className="status-selection-icon">
                      {isSelected ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <Clock3 size={18} />
                      )}
                    </div>

                    <div>
                      <strong>{status}</strong>

                      <span>{STATUS_DESCRIPTIONS[status]}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {formData.status === "Accepted" && (
              <div className="accepted-document-card">
                <div className="accepted-document-heading">
                  <div className="accepted-document-icon">
                    <FileCheck2 size={18} />
                  </div>

                  <div>
                    <span>NEXT PUBLICATION STAGE</span>

                    <h3>Documents Required</h3>
                  </div>
                </div>

                <p>
                  After acceptance, the author should provide the required
                  publication documents. Additional Supporting Files are
                  optional.
                </p>

                {/* =====================================================
        REQUIRED DOCUMENTS
    ===================================================== */}

                <div className="accepted-document-list">
                  {REQUIRED_DOCUMENTS.map((documentItem) => (
                    <div className="accepted-document-item" key={documentItem}>
                      <CheckCircle2 size={15} />

                      <span>{documentItem}</span>

                      <small>Required</small>
                    </div>
                  ))}
                </div>

                {/* =====================================================
        OPTIONAL DOCUMENTS
    ===================================================== */}

                <div className="accepted-document-list">
                  {OPTIONAL_DOCUMENTS.map((documentItem) => (
                    <div className="accepted-document-item" key={documentItem}>
                      <Info size={15} />

                      <span>{documentItem}</span>

                      <small>Optional</small>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.status === "Rejected" && (
              <div className="rejected-workflow-note">
                <XCircle size={18} />

                <div>
                  <strong>Rejection reason required</strong>

                  <span>
                    Please provide the editorial reason in the feedback tab
                    before saving the rejection.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================
            FORM FOOTER
        ================================================= */}

        <div className="editor-form-footer">
          <div className="save-information">
            <div className="save-shield">
              <ShieldCheck size={17} />
            </div>

            <div>
              <strong>Editorial changes</strong>

              <span>
                Changes are saved to manuscript ID {paper.paperId || "—"}.
              </span>
            </div>
          </div>

          <div className="editor-form-actions">
            <button
              type="button"
              className="cancel-editor-btn"
              onClick={() => navigate(-1)}
              disabled={saving}
            >
              Cancel
            </button>

            <button type="submit" className="save-editor-btn" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 size={17} className="spin-icon" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPaper;
