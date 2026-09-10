import React, { useEffect, useState } from "react";
import API, { BASE_URL } from "../../api/Axios";
import "./AuthorPublicationDocuments.css";
import Swal from "sweetalert2";

import {
  Upload,
  FileText,
  ShieldCheck,
  CreditCard,
  UserRound,
  FolderOpen,
  CheckCircle2,
  Clock3,
  ArrowRight,
  X,
  AlertCircle,
  Send,
  BookOpen,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

const DOCUMENT_TYPES = [
  {
    key: "correctedGalleyProof",
    title: "Corrected Galley Proof",
    description:
      "Upload the final corrected version of the manuscript/galley proof.",
    required: true,
    icon: FileText,
    accept: ".pdf",
    formats: "PDF",
  },

 {
    key: "copyrightTransferForm",
    title: "Copyright Transfer Form",
    description: "Upload the completed and signed copyright transfer form.",
    required: true,
    icon: ShieldCheck,
    accept: ".pdf,.doc,.docx", // <-- Removed .jpg,.jpeg,.png
    formats: "PDF, DOC, DOCX",     // <-- Updated display text
  },

  {
    key: "publicationFeePaymentProof",
    title: "Publication Fee Payment Proof",
    description:
      "Upload the receipt, transaction proof, or payment confirmation.",
    required: true,
    icon: CreditCard,
    accept: ".pdf,.jpg,.jpeg,.png",
    formats: "PDF, JPG, PNG",
  },

  {
    key: "authorPhotographs",
    title: "Author Photograph(s)",
    description: "Upload clear photograph(s) of the author(s) for publication.",
    required: true,
    icon: UserRound,
    accept: ".jpg,.jpeg,.png,.webp",
    formats: "JPG, PNG, WEBP",
    multiple: true,
  },

  {
    key: "additionalSupportingFiles",
    title: "Additional Supporting Files",
    description: "Upload any additional files required for publication.",
    required: false,
    icon: FolderOpen,
    accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip",
    formats: "PDF, DOC, DOCX, JPG, PNG, ZIP",
    multiple: true,
  },
];

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const AuthorPublicationDocuments = ({ paper: paperProp = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const paperFromState = location.state?.paper || null;

  const initialPaper = paperProp || paperFromState;

  const paperIdFromState =
    location.state?.paperId ||
    paperProp?._id ||
    paperProp?.id ||
    paperFromState?._id ||
    paperFromState?.id ||
    location.state?.id ||
    null;

  const [paper, setPaper] = useState(initialPaper);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [files, setFiles] = useState({
    correctedGalleyProof: [],
    copyrightTransferForm: [],
    publicationFeePaymentProof: [],
    authorPhotographs: [],
    additionalSupportingFiles: [],
  });

  const [existingDocuments, setExistingDocuments] = useState({
    correctedGalleyProof: [],
    copyrightTransferForm: [],
    publicationFeePaymentProof: [],
    authorPhotographs: [],
    additionalSupportingFiles: [],
  });

  const [dragActive, setDragActive] = useState(null);

  const getPaperId = () => {
    return paperIdFromState || paper?._id || paper?.id || null;
  };

  const normalizeDocuments = (value) => {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const loadExistingDocuments = (paperData) => {
    const publicationDocuments = paperData?.publicationDocuments || {};


    const paymentProof =
      publicationDocuments.publicationFeePaymentProof ||
      publicationDocuments.publicationFeeProof ||
      null;

  

    const documents = {
      correctedGalleyProof: normalizeDocuments(
        publicationDocuments.correctedGalleyProof,
      ),

      copyrightTransferForm: normalizeDocuments(
        publicationDocuments.copyrightTransferForm,
      ),

      publicationFeePaymentProof: normalizeDocuments(paymentProof),

      authorPhotographs: normalizeDocuments(
        publicationDocuments.authorPhotographs,
      ),

      additionalSupportingFiles: normalizeDocuments(
        publicationDocuments.additionalSupportingFiles,
      ),
    };

   

    setExistingDocuments(documents);
  };

  const fetchPaper = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("authorToken");

      if (!token) {
        await Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login as an author to continue.",
        });

        navigate("/author-login");

        return;
      }

      const id = getPaperId();

      if (initialPaper) {
        setPaper(initialPaper);

        loadExistingDocuments(initialPaper);

        return;
      }

      if (!id) {
        await Swal.fire({
          icon: "error",
          title: "Paper Not Found",
          text: "No paper was selected for publication documents.",
        });

        return;
      }

      const response = await API.get(`/submitform/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedPaper = response.data?.data || response.data?.paper || null;

      if (!fetchedPaper) {
        throw new Error("Paper data not found.");
      }

      setPaper(fetchedPaper);

      loadExistingDocuments(fetchedPaper);
    } catch (error) {
      console.error("FETCH PUBLICATION PAPER ERROR:", error);

      if (!initialPaper) {
        await Swal.fire({
          icon: "error",
          title: "Unable to Load Paper",
          text:
            error?.response?.data?.message ||
            "Unable to load publication information.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaper();
  }, [paperProp]);

  const validateFile = (file, documentType) => {
    if (!file) {
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: "warning",
        title: "File Too Large",
        text: `${file.name} exceeds the maximum 20 MB file size.`,
      });

      return false;
    }

    const extension = "." + file.name.split(".").pop().toLowerCase();

    const allowedExtensions = documentType.accept
      .split(",")
      .map((item) => item.trim().toLowerCase());

    if (!allowedExtensions.includes(extension)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid File",
        text: `${file.name} is not supported for ${documentType.title}.`,
      });

      return false;
    }

    return true;
  };

  const handleFileChange = (event, documentType) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) {
      return;
    }

    const validFiles = selectedFiles.filter((file) =>
      validateFile(file, documentType),
    );

    if (!validFiles.length) {
      event.target.value = "";

      return;
    }

    setFiles((previous) => {
      const currentFiles = previous[documentType.key] || [];

      const nextFiles = documentType.multiple
        ? [...currentFiles, ...validFiles]
        : [validFiles[0]];

      return {
        ...previous,

        [documentType.key]: nextFiles,
      };
    });

    event.target.value = "";
  };

  const handleDragEnter = (event, key) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(key);
  };

  const handleDragOver = (event, key) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(key);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(null);
  };

  const handleDrop = (event, documentType) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(null);

    const droppedFiles = Array.from(event.dataTransfer.files || []);

    if (!droppedFiles.length) {
      return;
    }

    const validFiles = droppedFiles.filter((file) =>
      validateFile(file, documentType),
    );

    if (!validFiles.length) {
      return;
    }

    setFiles((previous) => {
      const currentFiles = previous[documentType.key] || [];

      const nextFiles = documentType.multiple
        ? [...currentFiles, ...validFiles]
        : [validFiles[0]];

      return {
        ...previous,

        [documentType.key]: nextFiles,
      };
    });
  };

  const removeSelectedFile = (documentKey, index) => {
    setFiles((previous) => ({
      ...previous,

      [documentKey]: previous[documentKey].filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    }));
  };

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "0 KB";
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const uploadedCount = DOCUMENT_TYPES.filter(
    (documentType) =>
      files[documentType.key]?.length > 0 ||
      existingDocuments[documentType.key]?.length > 0,
  ).length;

  const requiredCount = DOCUMENT_TYPES.filter(
    (documentType) => documentType.required,
  ).length;

  const completedRequiredCount = DOCUMENT_TYPES.filter(
    (documentType) =>
      documentType.required &&
      (files[documentType.key]?.length > 0 ||
        existingDocuments[documentType.key]?.length > 0),
  ).length;

  const getMissingDocuments = () => {
    return DOCUMENT_TYPES.filter(
      (documentType) =>
        documentType.required &&
        !files[documentType.key]?.length &&
        !existingDocuments[documentType.key]?.length,
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paperId = getPaperId();

    const allowedPublicationStatuses = ["Accepted", "Documents Required"];

    if (!allowedPublicationStatuses.includes(paper?.status)) {
      await Swal.fire({
        icon: "info",
        title: "Publication Documents Not Available",
        text: `This paper is currently in "${
          paper?.status || "Unknown"
        }" status. Publication documents can be uploaded only when the paper is Accepted or Documents Required.`,
      });

      return;
    }

    if (!paperId) {
      Swal.fire({
        icon: "error",
        title: "Paper Not Found",
        text: "Unable to identify the paper.",
      });

      return;
    }

    const missingDocuments = getMissingDocuments();

    if (missingDocuments.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Required Documents Missing",

        html: `
        <div style="text-align:left">
          <p>
            Please upload the following
            required documents:
          </p>

          <ul>
            ${missingDocuments.map((item) => `<li>${item.title}</li>`).join("")}
          </ul>
        </div>
      `,
      });

      return;
    }

    const token = localStorage.getItem("authorToken");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please login again.",
      });

      navigate("/author-login");

      return;
    }

    try {
      setSubmitting(true);

      Swal.fire({
        title: "Submitting Documents...",
        text: "Uploading and submitting your publication documents to the editor.",
        allowOutsideClick: false,
        allowEscapeKey: false,

        didOpen: () => {
          Swal.showLoading();
        },
      });

      const formData = new FormData();

      files.correctedGalleyProof.forEach((file) => {
        formData.append("correctedGalleyProof", file);
      });

      files.copyrightTransferForm.forEach((file) => {
        formData.append("copyrightTransferForm", file);
      });

      files.publicationFeePaymentProof.forEach((file) => {
        formData.append("publicationFeePaymentProof", file);
      });

      files.authorPhotographs.forEach((file) => {
        formData.append("authorPhotographs", file);
      });

      files.additionalSupportingFiles.forEach((file) => {
        formData.append("additionalSupportingFiles", file);
      });

    

      for (const [key, value] of formData.entries()) {
        console.log("FORM DATA:", key, value?.name || value);
      }

      const uploadResponse = await API.put(
        `/submitform/publication/documents/${paperId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

     

      if (!uploadResponse.data?.success) {
        throw new Error(
          uploadResponse.data?.message ||
            "Publication documents upload failed.",
        );
      }

      const submitResponse = await API.put(
        `/submitform/publication/submit/${paperId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );


      if (!submitResponse.data?.success) {
        throw new Error(
          submitResponse.data?.message ||
            "Unable to submit publication documents to editor.",
        );
      }

      const finalPaper =
        submitResponse.data?.data || uploadResponse.data?.data || null;

      if (finalPaper) {
        setPaper(finalPaper);

        loadExistingDocuments(finalPaper);
      }

      await Swal.fire({
        icon: "success",
        title: "Documents Submitted",
        text: "Your publication documents have been uploaded and submitted to the editor successfully.",
        confirmButtonText: "Continue",
      });

      navigate("/paper-management", {
        state: {
          publicationSubmitted: true,
          paperId,
        },
      });
    } catch (error) {
      console.error("PUBLICATION DOCUMENT SUBMIT ERROR:", error);

      console.error("STATUS:", error?.response?.status);

      console.error("RESPONSE:", error?.response?.data);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",

        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to submit publication documents.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderExistingDocuments = (documentType) => {
    const documents = existingDocuments[documentType.key] || [];

    if (!documents.length) {
      return null;
    }

    return (
      <div className="existing-documents">
               {" "}
        <div className="existing-documents-heading">
                    <CheckCircle2 size={15} />         {" "}
          <span>Previously uploaded</span>       {" "}
        </div>
               {" "}
        <div className="existing-document-list">
                   {" "}
          {documents.map((document, index) => {
            const documentUrl =
              typeof document === "string"
                ? document
                : document?.url || document?.path || document?.file;

            const documentName =
              typeof document === "string"
                ? document.split("/").pop()
                : document?.originalName ||
                  document?.filename ||
                  document?.name ||
                  `Document ${index + 1}`;

            if (!documentUrl) {
              console.warn("Existing document has no URL:", document);

              return null;
            }

            const fullUrl = documentUrl.startsWith("http")
              ? documentUrl
              : `${BASE_URL}${documentUrl}`;

            return (
              <a
                key={`${documentName}-${index}`}
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="existing-document-link"
              >
                                <FileText size={16} />               {" "}
                <span>{documentName}</span>
                                <ArrowRight size={14} />             {" "}
              </a>
            );
          })}
                 {" "}
        </div>
             {" "}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="publication-documents-page">
               {" "}
        <div className="publication-loading-card">
                    <div className="publication-spinner" />         {" "}
          <h3>Loading Publication Details</h3>         {" "}
          <p>Preparing your publication document submission.</p>       {" "}
        </div>
             {" "}
      </div>
    );
  }

  return (
    <div className="publication-documents-page">
           {" "}
      <div className="publication-documents-container">
                     {" "}
        <header className="publication-documents-hero">
                   {" "}
          <div className="publication-hero-left">
                       {" "}
            <div className="publication-brand-icon">
                            <BookOpen size={26} />           {" "}
            </div>
                       {" "}
            <div>
                           {" "}
              <span className="publication-eyebrow">
                                Scholarly Publication Workflow            
                 {" "}
              </span>
                            <h1>Publication Documents</h1>             {" "}
              <p>
                                Submit the required publication documents for
                your accepted                 manuscript.              {" "}
              </p>
                         {" "}
            </div>
                     {" "}
          </div>
                   {" "}
          <div className="publication-secure-chip">
                        <ShieldCheck size={17} />            Secure Submission  
                   {" "}
          </div>
                 {" "}
        </header>
               {" "}
        <section className="publication-paper-card">
                   {" "}
          <div className="publication-paper-info">
                        <span className="publication-label">Manuscript</span>   
                    <h2>{paper?.paperTitle || "Accepted Manuscript"}</h2>       
               {" "}
            <div className="publication-meta">
                           {" "}
              {paper?.paperId && (
                <span>
                                    <FileText size={14} />                 
                  Paper ID: {paper.paperId}               {" "}
                </span>
              )}
                           {" "}
              <span>
                                <CheckCircle2 size={14} />               {" "}
                {paper?.status || "Documents Required"}             {" "}
              </span>
                         {" "}
            </div>
                     {" "}
          </div>
                   {" "}
          <div className="publication-stage-badge">
            <Clock3 size={15} />
            {paper?.status || "Documents Required"}
          </div>
                 {" "}
        </section>
               {" "}
        <section className="publication-progress-card">
                   {" "}
          <div className="publication-progress-top">
                       {" "}
            <div>
                            <strong>Publication Checklist</strong>             {" "}
              <span>
                                {completedRequiredCount} of {requiredCount}{" "}
                required documents                 uploaded              {" "}
              </span>
                         {" "}
            </div>
                       {" "}
            <div className="publication-progress-number">
                            {completedRequiredCount}/{requiredCount}         
               {" "}
            </div>
                     {" "}
          </div>
                   {" "}
          <div className="publication-progress-track">
                       {" "}
            <div
              className="publication-progress-fill"
              style={{
                width: `${
                  requiredCount
                    ? (completedRequiredCount / requiredCount) * 100
                    : 0
                }%`,
              }}
            />
                     {" "}
          </div>
                 {" "}
        </section>
                       {" "}
        <div className="publication-notice">
                   {" "}
          <div className="publication-notice-icon">
                        <AlertCircle size={19} />         {" "}
          </div>
                   {" "}
          <div>
                        <strong>Please review your documents carefully</strong> 
                     {" "}
            <p>
                            All required publication documents must be uploaded
              before               submitting this manuscript to the editor.    
                     {" "}
            </p>
                     {" "}
          </div>
                 {" "}
        </div>
                     {" "}
        <form className="publication-documents-form" onSubmit={handleSubmit}>
                   {" "}
          <div className="publication-section-heading">
                       {" "}
            <div>
                            <span>Publication Requirements</span>             {" "}
              <small>Upload each document in the appropriate category.</small> 
                       {" "}
            </div>
                       {" "}
            <span className="publication-upload-count">
                            {uploadedCount}/{DOCUMENT_TYPES.length} Complete    
                     {" "}
            </span>
                     {" "}
          </div>
                   {" "}
          <div className="publication-document-grid">
                       {" "}
            {DOCUMENT_TYPES.map((documentType, index) => {
              const Icon = documentType.icon;

              const selectedFiles = files[documentType.key] || [];

              const existing = existingDocuments[documentType.key] || [];

              const hasFile = selectedFiles.length > 0 || existing.length > 0;

              const isDrag = dragActive === documentType.key;

              return (
                <div
                  key={documentType.key}
                  className={`publication-document-card ${
                    hasFile ? "document-completed" : ""
                  }`}
                >
                                                   {" "}
                  <div className="publication-document-header">
                                       {" "}
                    <div className="publication-document-icon">
                                            <Icon size={21} />                 
                       {" "}
                    </div>
                                       {" "}
                    <div className="publication-document-title">
                                           {" "}
                      <div>
                                               {" "}
                        <span className="document-number">0{index + 1}</span>   
                                            <h3>{documentType.title}</h3>       
                                     {" "}
                      </div>
                                           {" "}
                      {documentType.required ? (
                        <span className="required-badge">Required</span>
                      ) : (
                        <span className="optional-badge">Optional</span>
                      )}
                                         {" "}
                    </div>
                                     {" "}
                  </div>
                                                   {" "}
                  <p className="publication-document-description">
                                        {documentType.description}             
                       {" "}
                  </p>
                                                 {" "}
                  <div
                    className={`publication-dropzone ${
                      isDrag ? "drag-active" : ""
                    } ${hasFile ? "has-document" : ""}`}
                    onDragEnter={(event) =>
                      handleDragEnter(event, documentType.key)
                    }
                    onDragOver={(event) =>
                      handleDragOver(event, documentType.key)
                    }
                    onDragLeave={handleDragLeave}
                    onDrop={(event) => handleDrop(event, documentType)}
                  >
                                       {" "}
                    <input
                      type="file"
                      id={`publication-${documentType.key}`}
                      accept={documentType.accept}
                      multiple={!!documentType.multiple}
                      onChange={(event) =>
                        handleFileChange(event, documentType)
                      }
                      className="publication-hidden-file"
                    />
                                       {" "}
                    <label
                      htmlFor={`publication-${documentType.key}`}
                      className="publication-dropzone-label"
                    >
                                           {" "}
                      <div className="publication-upload-icon">
                                               {" "}
                        {hasFile ? (
                          <CheckCircle2 size={27} />
                        ) : (
                          <Upload size={27} />
                        )}
                                             {" "}
                      </div>
                                           {" "}
                      <strong>
                                               {" "}
                        {hasFile ? "Document Added" : "Upload Document"}       
                                     {" "}
                      </strong>
                                           {" "}
                      <span>
                                               {" "}
                        {hasFile
                          ? "Click to replace or add another file"
                          : "Click to browse or drag & drop"}
                                             {" "}
                      </span>
                                         {" "}
                    </label>
                                     {" "}
                  </div>
                                   {" "}
                  <div className="publication-format-text">
                                        Supported:{" "}
                    <strong>{documentType.formats}</strong>                   {" "}
                    {" · "}                    Maximum 20 MB                
                     {" "}
                  </div>
                                                     {" "}
                  {selectedFiles.length > 0 && (
                    <div className="selected-publication-files">
                                           {" "}
                      <div className="selected-files-heading">
                                                <span>New Upload</span>         
                                     {" "}
                        <span>
                                                    {selectedFiles.length} file
                                                   {" "}
                          {selectedFiles.length > 1 ? "s" : ""}                 
                               {" "}
                        </span>
                                             {" "}
                      </div>
                                           {" "}
                      {selectedFiles.map((file, fileIndex) => (
                        <div
                          key={`${file.name}-${fileIndex}`}
                          className="selected-publication-file"
                        >
                                                   {" "}
                          <div className="selected-file-icon">
                                                        <FileText size={16} /> 
                                                   {" "}
                          </div>
                                                   {" "}
                          <div className="selected-file-info">
                                                       {" "}
                            <strong>{file.name}</strong>                       
                                <span>{formatFileSize(file.size)}</span>       
                                             {" "}
                          </div>
                                                   {" "}
                          <button
                            type="button"
                            className="remove-publication-file"
                            onClick={() =>
                              removeSelectedFile(documentType.key, fileIndex)
                            }
                            aria-label="Remove file"
                          >
                                                        <X size={16} />         
                                           {" "}
                          </button>
                                                 {" "}
                        </div>
                      ))}
                                         {" "}
                    </div>
                  )}
                                                 {" "}
                  {renderExistingDocuments(documentType)}               {" "}
                </div>
              );
            })}
                     {" "}
          </div>
                   {" "}
          <div className="publication-submit-card">
                       {" "}
            <div className="publication-submit-copy">
                           {" "}
              <div className="publication-submit-icon">
                                <Send size={19} />             {" "}
              </div>
                           {" "}
              <div>
                                <strong>Ready to submit?</strong>               {" "}
                <p>
                                    Once submitted, your documents will be sent
                  to the editor for                   final publication
                  processing.                {" "}
                </p>
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="publication-submit-actions">
                           {" "}
              <button
                type="button"
                className="publication-cancel-button"
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                                Back              {" "}
              </button>
                           {" "}
              <button
                type="submit"
                className="publication-submit-button"
                disabled={submitting}
              >
                               {" "}
                {submitting ? (
                  <>
                                        <span className="button-spinner" />     
                                  Submitting...                  {" "}
                  </>
                ) : (
                  <>
                                        <Send size={17} />                   
                    Submit to Editor                    {" "}
                    <ArrowRight size={17} />                 {" "}
                  </>
                )}
                             {" "}
              </button>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </form>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default AuthorPublicationDocuments;
