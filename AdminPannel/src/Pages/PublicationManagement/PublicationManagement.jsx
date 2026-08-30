import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  RefreshCw,
  FileText,
  FileCheck2,
  Eye,
  ExternalLink,
  CheckCircle2,
  Upload,
  User,
  Mail,
  Globe2,
  BookOpen,
  X,
  AlertCircle,
  Loader2,
  Layers3,
} from "lucide-react";

import API, { BASE_URL } from "../../api/axios";

import "./PublicationManagement.css";

const PublicationManagement = () => {
  /* =========================================================
     STATE
  ========================================================= */

  const [papers, setPapers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  /*
    all         = all submitted papers
    publication = only papers having publication data
  */
  const [viewMode, setViewMode] = useState("publication");

  const [selectedPaper, setSelectedPaper] = useState(null);

  const [actionLoading, setActionLoading] = useState("");

  /* =========================================================
     FILE URL
  ========================================================= */

  const getFileUrl = useCallback((filePath) => {
    if (!filePath) {
      return "";
    }

    if (
      filePath.startsWith("http://") ||
      filePath.startsWith("https://")
    ) {
      return filePath;
    }

    return `${BASE_URL}${filePath}`;
  }, []);

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =========================================================
     NORMALIZE DOCUMENT
  ========================================================= */

  const normalizeDocument = useCallback(
    (document, documentType) => {
      if (!document) {
        return [];
      }

      const documents = Array.isArray(document)
        ? document
        : [document];

      return documents
        .filter((item) => item && item.file)
        .map((item, index) => ({
          ...item,

          documentType,

          uniqueKey:
            item._id ||
            `${documentType}-${item.version || 1}-${index}`,

          version: item.version || 1,

          originalName:
            item.originalName ||
            item.file?.split("/")?.pop() ||
            "Document",

          fileUrl: getFileUrl(item.file),

          uploadedByRole:
            item.uploadedByRole || "Unknown",

          uploadedAt:
            item.uploadedAt ||
            item.createdAt ||
            null,
        }));
    },
    [getFileUrl]
  );

  /* =========================================================
     GET PUBLICATION DOCUMENTS
  ========================================================= */

  const getPublicationDocuments = useCallback(
    (paper) => {
      const publicationDocuments =
        paper?.publicationDocuments;

      if (!publicationDocuments) {
        return [];
      }

      const documents = [];

      /* Corrected Galley Proof */
      documents.push(
        ...normalizeDocument(
          publicationDocuments.correctedGalleyProof,
          "Corrected Galley Proof"
        )
      );

      /* Copyright Transfer Form */
      documents.push(
        ...normalizeDocument(
          publicationDocuments.copyrightTransferForm,
          "Copyright Transfer Form"
        )
      );

      /* Publication Fee Payment Proof */
      documents.push(
        ...normalizeDocument(
          publicationDocuments.publicationFeePaymentProof,
          "Publication Fee Payment Proof"
        )
      );

      /* Old property support */
      documents.push(
        ...normalizeDocument(
          publicationDocuments.publicationFeeProof,
          "Publication Fee Payment Proof"
        )
      );

      /* Author Photographs */
      documents.push(
        ...normalizeDocument(
          publicationDocuments.authorPhotographs,
          "Author Photograph"
        )
      );

      /* Additional Supporting Files */
      documents.push(
        ...normalizeDocument(
          publicationDocuments.additionalSupportingFiles,
          "Additional Supporting File"
        )
      );

      /* Sort newest version first */
      return documents.sort((a, b) => {
        const versionA = Number(a.version) || 0;
        const versionB = Number(b.version) || 0;

        if (versionA !== versionB) {
          return versionB - versionA;
        }

        const dateA = a.uploadedAt
          ? new Date(a.uploadedAt).getTime()
          : 0;

        const dateB = b.uploadedAt
          ? new Date(b.uploadedAt).getTime()
          : 0;

        return dateB - dateA;
      });
    },
    [normalizeDocument]
  );

  /* =========================================================
     HAS PUBLICATION DATA

     IMPORTANT:
     Publication Data depends on documents,
     NOT on Published status.

     Therefore after Unpublish the paper will
     remain inside Publication Data.
  ========================================================= */

  const hasPublicationData = useCallback((paper) => {
    if (!paper) {
      return false;
    }

    const publicationDocuments =
      paper.publicationDocuments;

    if (!publicationDocuments) {
      return false;
    }

    return (
      (Array.isArray(
        publicationDocuments.correctedGalleyProof
      )
        ? publicationDocuments.correctedGalleyProof.length >
          0
        : !!publicationDocuments.correctedGalleyProof) ||

      (Array.isArray(
        publicationDocuments.copyrightTransferForm
      )
        ? publicationDocuments.copyrightTransferForm.length >
          0
        : !!publicationDocuments.copyrightTransferForm) ||

      (Array.isArray(
        publicationDocuments.publicationFeePaymentProof
      )
        ? publicationDocuments.publicationFeePaymentProof.length >
          0
        : !!publicationDocuments.publicationFeePaymentProof) ||

      (Array.isArray(
        publicationDocuments.publicationFeeProof
      )
        ? publicationDocuments.publicationFeeProof.length >
          0
        : !!publicationDocuments.publicationFeeProof) ||

      (Array.isArray(
        publicationDocuments.authorPhotographs
      )
        ? publicationDocuments.authorPhotographs.length > 0
        : !!publicationDocuments.authorPhotographs) ||

      (Array.isArray(
        publicationDocuments.additionalSupportingFiles
      )
        ? publicationDocuments.additionalSupportingFiles.length >
          0
        : !!publicationDocuments.additionalSupportingFiles)
    );
  }, []);

  /* =========================================================
     PUBLISHABLE STATUS

     Both statuses can publish:

     1. Complete
     2. Approved and Forwarded to Admin
  ========================================================= */

  const isPublishReady = useCallback((paper) => {
    if (!paper) {
      return false;
    }

    return (
      paper.status === "Complete" ||
      paper.status === "Approved and Forwarded to Admin"
    );
  }, []);

  /* =========================================================
     FETCH PAPERS
  ========================================================= */

  const fetchPapers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/submitform/all"
      );

      const data = Array.isArray(
        response.data?.data
      )
        ? response.data.data
        : [];

      setPapers(data);

     
    } catch (error) {
      console.error(
        "FETCH PAPERS ERROR:",
        error?.response?.data ||
          error?.message
      );

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "MESSAGE:",
        error?.message
      );

      setPapers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  /* =========================================================
     REFRESH WHEN TAB BECOMES ACTIVE
  ========================================================= */

  useEffect(() => {
    const handleVisibility = () => {
      if (
        document.visibilityState === "visible"
      ) {
        fetchPapers();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [fetchPapers]);

  /* =========================================================
     REFRESH WINDOW FOCUS
  ========================================================= */

  useEffect(() => {
    const handleFocus = () => {
      fetchPapers();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, [fetchPapers]);

  /* =========================================================
     PUBLISH PAPER
  ========================================================= */

  const publishPaper = async (id) => {
    try {
      setActionLoading(`publish-${id}`);

      const response = await API.put(
        `/submitform/publish/${id}`
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to publish the paper."
        );
      }

      await fetchPapers();

      /*
        Update opened modal
      */
      if (selectedPaper?._id === id) {
        setSelectedPaper((previous) => ({
          ...previous,

          status:
            response.data?.data?.status ||
            "Published",

          isPublished: true,
        }));
      }
    } catch (error) {
      console.error(
        "PUBLISH ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to publish the paper."
      );
    } finally {
      setActionLoading("");
    }
  };

  /* =========================================================
     UNPUBLISH PAPER

     After unpublish the backend should normally return:

     Approved and Forwarded to Admin

     OR

     Complete

     The returned status is used directly.
  ========================================================= */

  const unpublishPaper = async (id) => {
    try {
      setActionLoading(`unpublish-${id}`);

      const response = await API.put(
        `/submitform/unpublish/${id}`
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to unpublish the paper."
        );
      }

      await fetchPapers();

      if (selectedPaper?._id === id) {
        setSelectedPaper((previous) => ({
          ...previous,

          status:
            response.data?.data?.status ||
            "Complete",

          isPublished: false,
        }));
      }
    } catch (error) {
      console.error(
        "UNPUBLISH ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to unpublish the paper."
      );
    } finally {
      setActionLoading("");
    }
  };

  /* =========================================================
     SEARCH + VIEW MODE + STATUS
  ========================================================= */

  const filteredPapers = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return papers.filter((paper) => {
      /* SEARCH */

      const matchesSearch =
        !query ||
        paper.paperTitle
          ?.toLowerCase()
          .includes(query) ||
        paper.paperId
          ?.toLowerCase()
          .includes(query) ||
        paper.authorName
          ?.toLowerCase()
          .includes(query) ||
        paper.authorEmail
          ?.toLowerCase()
          .includes(query) ||
        paper.authors?.[0]?.fullName
          ?.toLowerCase()
          .includes(query);

      /* STATUS */

      const matchesStatus =
        statusFilter === "All" ||
        paper.status === statusFilter;

      /* VIEW */

      const matchesViewMode =
        viewMode === "all" ||
        hasPublicationData(paper);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesViewMode
      );
    });
  }, [
    papers,
    search,
    statusFilter,
    viewMode,
    hasPublicationData,
  ]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalPapers = papers.length;

  const publicationDataCount =
    papers.filter(hasPublicationData).length;

  const publishedCount =
    papers.filter(
      (paper) =>
        paper.status === "Published" ||
        paper.isPublished === true
    ).length;

  const completeCount =
    papers.filter(
      (paper) =>
        paper.status === "Complete"
    ).length;

  const adminReadyCount =
    papers.filter(
      (paper) =>
        paper.status ===
        "Approved and Forwarded to Admin"
    ).length;

  const documentsSubmittedCount =
    papers.filter(
      (paper) =>
        paper.status ===
        "Documents Submitted"
    ).length;

  /* =========================================================
     STATUS CLASS
  ========================================================= */

  const getStatusClass = (status) => {
    const value =
      (status || "").toLowerCase();

    if (
      value.includes("published")
    ) {
      return "status-published";
    }

    if (
      value.includes("complete")
    ) {
      return "status-complete";
    }

    if (
      value.includes("approved")
    ) {
      return "status-approved";
    }

    if (
      value.includes(
        "documents submitted"
      )
    ) {
      return "status-documents";
    }

    if (
      value.includes(
        "documents required"
      )
    ) {
      return "status-required";
    }

    if (
      value.includes("accepted")
    ) {
      return "status-accepted";
    }

    if (
      value.includes("rejected")
    ) {
      return "status-rejected";
    }

    if (
      value.includes("review")
    ) {
      return "status-review";
    }

    return "status-default";
  };

  /* =========================================================
     GET AUTHOR
  ========================================================= */

  const getAuthorName = (paper) => {
    return (
      paper.authorName ||
      paper.authors?.[0]?.fullName ||
      "-"
    );
  };

  const getAuthorEmail = (paper) => {
    return (
      paper.authorEmail ||
      paper.authors?.[0]?.email ||
      "-"
    );
  };

  /* =========================================================
     DOCUMENT CARD
  ========================================================= */

  const DocumentCard = ({
    document,
  }) => {
    if (!document) {
      return null;
    }

    return (
      <div className="document-card">
        <div className="document-left">
          <div className="document-icon">
            <FileText size={20} />
          </div>

          <div className="document-info">
            <strong
              title={document.originalName}
            >
              {document.originalName}
            </strong>

            <span>
              {document.documentType}
            </span>

            <small>
              Version {document.version}
              {" • "}
              {document.uploadedByRole}
            </small>

            {document.uploadedAt && (
              <small>
                Uploaded{" "}
                {formatDate(
                  document.uploadedAt
                )}
              </small>
            )}
          </div>
        </div>

        <a
          href={document.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="document-view-btn"
          title="Open document"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    );
  };

  /* =========================================================
     ACTION BUTTONS
  ========================================================= */

  const renderActions = (paper) => {
    const isPublished =
      paper.isPublished === true ||
      paper.status === "Published";

    const isAdminReady =
      isPublishReady(paper);

    const publishing =
      actionLoading ===
      `publish-${paper._id}`;

    const unpublishing =
      actionLoading ===
      `unpublish-${paper._id}`;

    return (
      <div className="action-group">
        {/* VIEW */}

        <button
          type="button"
          className="view-btn"
          onClick={() =>
            setSelectedPaper(paper)
          }
        >
          <Eye size={15} />
          View
        </button>

        {/* ORIGINAL PAPER */}

        {paper.paperFile && (
          <a
            href={getFileUrl(
              paper.paperFile
            )}
            target="_blank"
            rel="noreferrer"
            className="original-btn"
          >
            <FileText size={15} />
            Paper
          </a>
        )}

        {/* UNPUBLISH */}

        {isPublished ? (
          <button
            type="button"
            className="unpublish-btn"
            disabled={unpublishing}
            onClick={() =>
              unpublishPaper(
                paper._id
              )
            }
          >
            {unpublishing ? (
              <Loader2
                size={15}
                className="spin"
              />
            ) : (
              <RefreshCw size={15} />
            )}

            {unpublishing
              ? "..."
              : "Unpublish"}
          </button>
        ) : isAdminReady ? (
          /* PUBLISH */

          <button
            type="button"
            className="publish-btn"
            disabled={publishing}
            onClick={() =>
              publishPaper(
                paper._id
              )
            }
          >
            {publishing ? (
              <Loader2
                size={15}
                className="spin"
              />
            ) : (
              <CheckCircle2
                size={15}
              />
            )}

            {publishing
              ? "..."
              : "Publish"}
          </button>
        ) : null}
      </div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="pub-management">
      {/* HEADER */}

      <div className="pub-header">
        <div>
          <div className="header-label">
            <Layers3 size={15} />
            ADMIN CONTROL
          </div>

          <h1>
            Publication Management
          </h1>

          <p>
            Manage submitted papers,
            publication documents and
            publishing workflow.
          </p>
        </div>

        <button
          type="button"
          className="refresh-btn"
          onClick={fetchPapers}
          disabled={loading}
        >
          <RefreshCw
            size={17}
            className={
              loading ? "spin" : ""
            }
          />

          {loading
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* STATS */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FileText size={21} />
          </div>

          <div>
            <h4>
              Total Papers
            </h4>

            <h2>
              {totalPapers}
            </h2>
          </div>
        </div>

        <div className="stat-card accepted-card">
          <div className="stat-icon green">
            <FileCheck2 size={21} />
          </div>

          <div>
            <h4>
              Publication Data
            </h4>

            <h2>
              {publicationDataCount}
            </h2>
          </div>
        </div>

        <div className="stat-card review-card">
          <div className="stat-icon orange">
            <Upload size={21} />
          </div>

          <div>
            <h4>
              Documents Submitted
            </h4>

            <h2>
              {documentsSubmittedCount}
            </h2>
          </div>
        </div>

        <div className="stat-card published-card">
          <div className="stat-icon cyan">
            <Globe2 size={21} />
          </div>

          <div>
            <h4>
              Published
            </h4>

            <h2>
              {publishedCount}
            </h2>
          </div>
        </div>
      </div>

      {/* TOGGLE */}

      <div className="view-toggle-wrapper">
        <div className="view-toggle">
          <button
            type="button"
            className={
              viewMode === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setViewMode("all")
            }
          >
            <FileText size={16} />

            All Papers

            <span>
              {totalPapers}
            </span>
          </button>

          <button
            type="button"
            className={
              viewMode ===
              "publication"
                ? "active"
                : ""
            }
            onClick={() =>
              setViewMode(
                "publication"
              )
            }
          >
            <FileCheck2 size={16} />

            Publication Data

            <span>
              {publicationDataCount}
            </span>
          </button>
        </div>
      </div>

      {/* TOOLBAR */}

      <div className="toolbar">
        <div className="search-wrapper">
          <Search size={18} />

          <input
            type="text"
            className="search-box"
            placeholder="Search by title, paper ID or author..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() =>
                setSearch("")
              }
            >
              <X size={15} />
            </button>
          )}
        </div>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Submitted">
            Submitted
          </option>

          <option value="Review Pending">
            Review Pending
          </option>

          <option value="Accepted">
            Accepted
          </option>

          <option value="Rejected">
            Rejected
          </option>

          <option value="Documents Required">
            Documents Required
          </option>

          <option value="Documents Submitted">
            Documents Submitted
          </option>

          <option value="Complete">
            Complete
          </option>

          <option value="Approved and Forwarded to Admin">
            Approved and Forwarded to Admin
          </option>

          <option value="Published">
            Published
          </option>
        </select>

        <div className="result-count">
          Showing{" "}
          <strong>
            {filteredPapers.length}
          </strong>{" "}
          /{" "}
          <strong>
            {viewMode ===
            "publication"
              ? publicationDataCount
              : totalPapers}
          </strong>
        </div>
      </div>

      {/* LOADING */}

      {loading &&
      papers.length === 0 ? (
        <div className="loading-box">
          <Loader2
            size={34}
            className="spin"
          />

          <h3>
            Loading papers...
          </h3>

          <p>
            Fetching latest
            publication data.
          </p>
        </div>
      ) : filteredPapers.length ===
        0 ? (
        <div className="empty-box">
          <div className="empty-icon">
            <FileText size={30} />
          </div>

          <h3>
            No papers found
          </h3>

          <p>
            No papers match the
            selected view, search or
            status filter.
          </p>

          {viewMode ===
            "publication" && (
            <button
              type="button"
              onClick={() =>
                setViewMode("all")
              }
            >
              Show All Papers
            </button>
          )}
        </div>
      ) : (
        <>
          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          <div className="table-wrapper">
            <table className="publication-table">
              <thead>
                <tr>
                  <th>
                    Paper ID
                  </th>

                  <th>
                    Title
                  </th>

                  <th>
                    Author
                  </th>

                  <th>
                    Status
                  </th>

                  {viewMode ===
                    "publication" && (
                    <th>
                      Publication Data
                    </th>
                  )}

                  <th>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPapers.map(
                  (paper) => {
                    const documents =
                      getPublicationDocuments(
                        paper
                      );

                    const latestDocument =
                      documents[0];

                    return (
                      <tr
                        key={
                          paper._id
                        }
                      >
                        {/* PAPER ID */}

                        <td>
                          <span className="paper-id">
                            {paper.paperId ||
                              paper._id}
                          </span>
                        </td>

                        {/* TITLE */}

                        <td>
                          <div className="title-cell">
                            <strong>
                              {
                                paper.paperTitle
                              }
                            </strong>

                            <small>
                              Version{" "}
                              {paper.version ||
                                1}
                            </small>
                          </div>
                        </td>

                        {/* AUTHOR */}

                        <td>
                          <div className="author-cell">
                            <div className="author-avatar">
                              <User
                                size={
                                  15
                                }
                              />
                            </div>

                            <div>
                              <strong>
                                {getAuthorName(
                                  paper
                                )}
                              </strong>

                              <span>
                                {getAuthorEmail(
                                  paper
                                )}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* STATUS */}

                        <td>
                          <span
                            className={`status-badge ${getStatusClass(
                              paper.status
                            )}`}
                          >
                            <span className="status-dot" />

                            {paper.status ||
                              "Unknown"}
                          </span>
                        </td>

                        {/* PUBLICATION DATA */}

                        {viewMode ===
                          "publication" && (
                          <td>
                            {documents.length >
                            0 ? (
                              <div className="publication-data-cell">
                                <div className="publication-data-count">
                                  <FileCheck2
                                    size={
                                      15
                                    }
                                  />

                                  <strong>
                                    {
                                      documents.length
                                    }
                                  </strong>

                                  <span>
                                    document
                                    {documents.length !==
                                    1
                                      ? "s"
                                      : ""}
                                  </span>
                                </div>

                                {latestDocument && (
                                  <div className="latest-document">
                                    <span>
                                      {
                                        latestDocument.documentType
                                      }
                                    </span>

                                    <small>
                                      {
                                        latestDocument.originalName
                                      }
                                    </small>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="no-publication">
                                <AlertCircle
                                  size={
                                    14
                                  }
                                />
                                No documents
                              </span>
                            )}
                          </td>
                        )}

                        {/* ACTIONS */}

                        <td>
                          {renderActions(
                            paper
                          )}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              MOBILE CARDS
          ================================================= */}

          <div className="mobile-paper-list">
            {filteredPapers.map(
              (paper) => {
                const documents =
                  getPublicationDocuments(
                    paper
                  );

                const latestDocument =
                  documents[0];

                const isPublished =
                  paper.isPublished ===
                    true ||
                  paper.status ===
                    "Published";

                const isAdminReady =
                  isPublishReady(
                    paper
                  );

                return (
                  <article
                    className="mobile-paper-card"
                    key={paper._id}
                  >
                    <div className="mobile-card-header">
                      <span className="paper-id">
                        {paper.paperId ||
                          paper._id}
                      </span>

                      <span
                        className={`status-badge ${getStatusClass(
                          paper.status
                        )}`}
                      >
                        <span className="status-dot" />

                        {paper.status}
                      </span>
                    </div>

                    <h3>
                      {
                        paper.paperTitle
                      }
                    </h3>

                    <div className="mobile-author">
                      <div className="author-avatar">
                        <User
                          size={15}
                        />
                      </div>

                      <div>
                        <strong>
                          {getAuthorName(
                            paper
                          )}
                        </strong>

                        <span>
                          {getAuthorEmail(
                            paper
                          )}
                        </span>
                      </div>
                    </div>

                    {viewMode ===
                      "publication" && (
                      <div className="mobile-publication-box">
                        <div className="mobile-publication-header">
                          <span>
                            <FileCheck2
                              size={
                                16
                              }
                            />

                            Publication
                            Data
                          </span>

                          <strong>
                            {
                              documents.length
                            }
                          </strong>
                        </div>

                        {latestDocument ? (
                          <DocumentCard
                            document={
                              latestDocument
                            }
                          />
                        ) : (
                          <div className="no-publication">
                            <AlertCircle
                              size={
                                15
                              }
                            />
                            No publication
                            documents
                          </div>
                        )}

                        {documents.length >
                          1 && (
                          <button
                            type="button"
                            className="view-more-documents"
                            onClick={() =>
                              setSelectedPaper(
                                paper
                              )
                            }
                          >
                            View all{" "}
                            {
                              documents.length
                            }{" "}
                            documents
                          </button>
                        )}
                      </div>
                    )}

                    <div className="mobile-actions">
                      <button
                        type="button"
                        className="view-btn"
                        onClick={() =>
                          setSelectedPaper(
                            paper
                          )
                        }
                      >
                        <Eye
                          size={15}
                        />
                        View
                      </button>

                      {paper.paperFile && (
                        <a
                          href={getFileUrl(
                            paper.paperFile
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="original-btn"
                        >
                          <FileText
                            size={
                              15
                            }
                          />
                          Paper
                        </a>
                      )}

                      {isPublished ? (
                        <button
                          type="button"
                          className="unpublish-btn"
                          disabled={
                            actionLoading ===
                            `unpublish-${paper._id}`
                          }
                          onClick={() =>
                            unpublishPaper(
                              paper._id
                            )
                          }
                        >
                          <RefreshCw
                            size={
                              15
                            }
                          />
                          Unpublish
                        </button>
                      ) : isAdminReady ? (
                        <button
                          type="button"
                          className="publish-btn"
                          disabled={
                            actionLoading ===
                            `publish-${paper._id}`
                          }
                          onClick={() =>
                            publishPaper(
                              paper._id
                            )
                          }
                        >
                          <CheckCircle2
                            size={
                              15
                            }
                          />
                          Publish
                        </button>
                      ) : null}
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </>
      )}

      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {selectedPaper && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedPaper(null)
          }
        >
          <div
            className="modal-box"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* MODAL HEADER */}

            <div className="modal-header">
              <div>
                <span className="modal-label">
                  PAPER DETAILS
                </span>

                <h2>
                  {
                    selectedPaper.paperTitle
                  }
                </h2>

                <div className="modal-meta">
                  <span>
                    <FileText
                      size={14}
                    />

                    {selectedPaper.paperId ||
                      selectedPaper._id}
                  </span>

                  <span>
                    Version{" "}
                    {selectedPaper.version ||
                      1}
                  </span>

                  <span
                    className={`status-badge ${getStatusClass(
                      selectedPaper.status
                    )}`}
                  >
                    <span className="status-dot" />

                    {
                      selectedPaper.status
                    }
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setSelectedPaper(
                    null
                  )
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              {/* PAPER INFORMATION */}

              <section className="modal-section">
                <div className="section-title">
                  <BookOpen
                    size={18}
                  />

                  <div>
                    <h3>
                      Paper Information
                    </h3>

                    <p>
                      Research paper
                      details.
                    </p>
                  </div>
                </div>

                <div className="details-grid">
                  <div>
                    <span>
                      Paper ID
                    </span>

                    <strong>
                      {selectedPaper.paperId ||
                        selectedPaper._id}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Version
                    </span>

                    <strong>
                      V
                      {selectedPaper.version ||
                        1}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Research Area
                    </span>

                    <strong>
                      {selectedPaper.researchArea ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Country
                    </span>

                    <strong>
                      {selectedPaper.country ||
                        selectedPaper.address
                          ?.country ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Submitted
                    </span>

                    <strong>
                      {formatDate(
                        selectedPaper.createdAt
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Updated
                    </span>

                    <strong>
                      {formatDate(
                        selectedPaper.updatedAt
                      )}
                    </strong>
                  </div>
                </div>

                <div className="abstract-box">
                  <span>
                    Abstract
                  </span>

                  <p>
                    {selectedPaper.abstract ||
                      "No abstract available."}
                  </p>
                </div>
              </section>

              {/* AUTHOR */}

              <section className="modal-section">
                <div className="section-title">
                  <User size={18} />

                  <div>
                    <h3>
                      Author
                    </h3>

                    <p>
                      Author information.
                    </p>
                  </div>
                </div>

                <div className="author-detail">
                  <div className="author-avatar large">
                    <User
                      size={22}
                    />
                  </div>

                  <div>
                    <strong>
                      {getAuthorName(
                        selectedPaper
                      )}
                    </strong>

                    <span>
                      <Mail
                        size={14}
                      />

                      {getAuthorEmail(
                        selectedPaper
                      )}
                    </span>

                    <span>
                      <Globe2
                        size={14}
                      />

                      {selectedPaper.country ||
                        selectedPaper.address
                          ?.country ||
                        "Country not available"}
                    </span>
                  </div>
                </div>
              </section>

              {/* PUBLICATION DOCUMENTS */}

              <section className="modal-section">
                <div className="section-title publication-section-heading">
                  <div className="section-title-left">
                    <FileCheck2
                      size={18}
                    />

                    <div>
                      <h3>
                        Publication Data
                      </h3>

                      <p>
                        Current publication
                        documents.
                      </p>
                    </div>
                  </div>

                  <span className="document-count">
                    {
                      getPublicationDocuments(
                        selectedPaper
                      ).length
                    }{" "}
                    Files
                  </span>
                </div>

                <div className="document-list">
                  {getPublicationDocuments(
                    selectedPaper
                  ).length === 0 ? (
                    <div className="empty-documents">
                      <AlertCircle
                        size={25}
                      />

                      <h4>
                        No publication
                        documents
                      </h4>

                      <p>
                        No publication
                        documents are
                        available for
                        this paper.
                      </p>
                    </div>
                  ) : (
                    getPublicationDocuments(
                      selectedPaper
                    ).map(
                      (document) => (
                        <DocumentCard
                          key={
                            document.uniqueKey
                          }
                          document={
                            document
                          }
                        />
                      )
                    )
                  )}
                </div>
              </section>

              {/* ORIGINAL PAPER */}

              <section className="modal-section">
                <div className="section-title">
                  <FileText
                    size={18}
                  />

                  <div>
                    <h3>
                      Original Paper
                    </h3>

                    <p>
                      Original submitted
                      research paper.
                    </p>
                  </div>
                </div>

                {selectedPaper.paperFile ? (
                  <a
                    href={getFileUrl(
                      selectedPaper.paperFile
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="open-original"
                  >
                    <FileText
                      size={18}
                    />

                    Open Original Paper

                    <ExternalLink
                      size={16}
                    />
                  </a>
                ) : (
                  <div className="no-publication">
                    <AlertCircle
                      size={15}
                    />

                    Original paper
                    not available.
                  </div>
                )}
              </section>
            </div>

            {/* MODAL ACTIONS */}

            <div className="modal-footer">
              <button
                type="button"
                className="close-btn"
                onClick={() =>
                  setSelectedPaper(
                    null
                  )
                }
              >
                Close
              </button>

              {/* PUBLISH */}

              {isPublishReady(
                selectedPaper
              ) &&
                !selectedPaper.isPublished && (
                  <button
                    type="button"
                    className="publish-btn modal-publish"
                    disabled={
                      actionLoading ===
                      `publish-${selectedPaper._id}`
                    }
                    onClick={() =>
                      publishPaper(
                        selectedPaper._id
                      )
                    }
                  >
                    <CheckCircle2
                      size={16}
                    />

                    {actionLoading ===
                    `publish-${selectedPaper._id}`
                      ? "Publishing..."
                      : "Publish Paper"}
                  </button>
                )}

              {/* UNPUBLISH */}

              {(selectedPaper.isPublished ||
                selectedPaper.status ===
                  "Published") && (
                <button
                  type="button"
                  className="unpublish-btn"
                  disabled={
                    actionLoading ===
                    `unpublish-${selectedPaper._id}`
                  }
                  onClick={() =>
                    unpublishPaper(
                      selectedPaper._id
                    )
                  }
                >
                  <RefreshCw
                    size={16}
                  />

                  {actionLoading ===
                  `unpublish-${selectedPaper._id}`
                    ? "Unpublishing..."
                    : "Unpublish"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicationManagement;