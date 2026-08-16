import React, { useEffect, useState } from "react";
import API from "../../API/axios";
import "./PaperManagement.css";
import { useNavigate } from "react-router-dom";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

const STATUS_STYLES = {
  Submitted: "status-submitted",
  "Editor Assigned": "status-assigned",
  Editing: "status-editing",
  "Review Pending": "status-pending",
  "Revision Required": "status-revision",
  Accepted: "status-accepted",
  Rejected: "status-rejected",
  Completed: "status-completed",
  Published: "status-published",
};

const PaperManagement = () => {
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [removingId, setRemovingId] =
    useState(null);

  const [acceptingId, setAcceptingId] =
    useState(null);

  const navigate = useNavigate();

  const editor = JSON.parse(
    localStorage.getItem("editorData")
  );

  /* =========================================================
     FETCH PAPERS
  ========================================================= */

  const fetchPapers = async () => {
    try {
      setLoading(true);

      if (!editor?._id) {
        console.error(
          "Editor information not found."
        );

        setPapers([]);
        return;
      }

      const res = await API.get(
        `/submitform/editor/${editor._id}`
      );

      setPapers(
        Array.isArray(res?.data?.data)
          ? res.data.data
          : []
      );
    } catch (error) {
      console.error(
        "FETCH PAPERS ERROR:",
        error
      );

      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     ACCEPT PAPER
     
     Workflow:
     
     Editing
        ↓
     Accepted
        ↓
     Author uploads required documents
  ========================================================= */

  const handleAccept = async (paper) => {
    if (!paper?._id) {
      return;
    }

    const confirmAccept = window.confirm(
      `Accept "${paper.paperTitle}"?\n\n` +
        `After acceptance, the author will be required to upload:\n` +
        `• Corrected Galley Proof\n` +
        `• Copyright Transfer Form\n` +
        `• Publication Fee Payment Proof\n` +
        `• Author Photograph(s)\n` +
        `• Additional Supporting Files`
    );

    if (!confirmAccept) {
      return;
    }

    try {
      setAcceptingId(paper._id);

      /*
       * Your controller already has:
       *
       * PUT /submitform/accept/:id
       *
       * So we use that dedicated endpoint instead
       * of directly changing the status from the UI.
       */

      const response = await API.put(
        `/submitform/accept/${paper._id}`
      );

      if (
        response?.data?.success === false
      ) {
        throw new Error(
          response?.data?.message ||
            "Failed to accept paper."
        );
      }

      /*
       * Update the row immediately so the user
       * doesn't have to reload the page.
       */

      setPapers((previousPapers) =>
        previousPapers.map((item) =>
          item._id === paper._id
            ? {
                ...item,
                status: response.data?.data?.status || "Documents Required",
              }
            : item
        )
      );

      alert(
        "Paper accepted successfully.\n\nThe author can now continue with the required publication documents."
      );
    } catch (error) {
      console.error(
        "ACCEPT PAPER ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to accept paper. Please try again."
      );
    } finally {
      setAcceptingId(null);
    }
  };

  /* =========================================================
     UNASSIGN PAPER
  ========================================================= */

  const handleUnassign = async (paperId) => {
    const confirmDelete = window.confirm(
      "Unassign this paper?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setRemovingId(paperId);

      await API.delete(
        `/editor/remove-paper/${editor._id}/${paperId}`
      );

      await fetchPapers();

      alert(
        "Paper Unassigned Successfully"
      );
    } catch (error) {
      console.error(
        "UNASSIGN PAPER ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to unassign paper. Please try again."
      );
    } finally {
      setRemovingId(null);
    }
  };

  /* =========================================================
     VIEW PAPER
  ========================================================= */

  const handleView = (paperId) => {
    window.open(
      `${FRONTEND_URL}/sample-article/${paperId}`,
      "_blank"
    );
  };

  /* =========================================================
     EDIT PAPER
  ========================================================= */

  const handleEdit = (paperId) => {
    navigate(
      `/editor/edit-paper/${paperId}`
    );
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredPapers = papers.filter(
    (paper) => {
      const searchValue =
        search.toLowerCase().trim();

      if (!searchValue) {
        return true;
      }

      return (
        paper.paperTitle
          ?.toLowerCase()
          .includes(searchValue) ||
        paper.paperId
          ?.toLowerCase()
          .includes(searchValue) ||
        paper.researchArea
          ?.toLowerCase()
          .includes(searchValue) ||
        paper.status
          ?.toLowerCase()
          .includes(searchValue)
      );
    }
  );

  /* =========================================================
     STATUS COUNT
  ========================================================= */

  const countByStatus = (status) =>
    papers.filter(
      (paper) =>
        paper.status === status
    ).length;

  /* =========================================================
     ACCEPTABLE FOR ACCEPT ACTION
  ========================================================= */

  const canAccept = (paper) => {
    if (!paper) {
      return false;
    }

    /*
     * Do not show Accept for:
     *
     * Accepted
     * Rejected
     * Completed
     * Published
     */

    const blockedStatuses = [
      "Documents Required",
      "Rejected",
      "Completed",
      "Published",
    ];

    return !blockedStatuses.includes(
      paper.status
    );
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="paperManagement">

        <div className="paperLoadingCard">

          <div className="paperLoadingSpinner" />

          <h3>
            Loading papers
          </h3>

          <p>
            Preparing your editorial
            workspace...
          </p>

        </div>

      </div>
    );
  }

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="paperManagement">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="paperHeader">

        <div className="paperHeaderText">

          <div className="paperEyebrow">
            EDITORIAL WORKSPACE
          </div>

          <h1>
            Paper Management
          </h1>

          <p>
            Review, edit and manage all
            manuscripts assigned to you.
          </p>

        </div>

        <div className="paperCount">

          <span className="paperCountNum">
            {papers.length}
          </span>

          <span>
            Total Assigned
          </span>

        </div>

      </div>

      {/* =====================================================
          WORKFLOW INFORMATION
      ===================================================== */}

      <div className="workflowBanner">

        <div className="workflowBannerIcon">
          ✓
        </div>

        <div className="workflowBannerContent">

          <strong>
            Editorial workflow
          </strong>

          <span>
            Review the manuscript first.
            When it is ready for publication,
            use <b>Accept</b> to move it to
            the author document stage.
          </span>

        </div>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="paperStats">

        <div className="statCard statTotal">

          <div className="statCardTop">
            <span>
              TOTAL PAPERS
            </span>

            <div className="statIcon">
              📚
            </div>
          </div>

          <h2>
            {papers.length}
          </h2>

          <p>
            Assigned manuscripts
          </p>

        </div>

        <div className="statCard statEditing">

          <div className="statCardTop">
            <span>
              EDITING
            </span>

            <div className="statIcon">
              ✎
            </div>
          </div>

          <h2>
            {countByStatus(
              "Editing"
            )}
          </h2>

          <p>
            Currently being edited
          </p>

        </div>

        <div className="statCard statPending">

          <div className="statCardTop">
            <span>
              REVIEW PENDING
            </span>

            <div className="statIcon">
              ◷
            </div>
          </div>

          <h2>
            {countByStatus(
              "Review Pending"
            )}
          </h2>

          <p>
            Waiting for review
          </p>

        </div>

        <div className="statCard statAccepted">

          <div className="statCardTop">
            <span>
              ACCEPTED
            </span>

            <div className="statIcon">
              ✓
            </div>
          </div>

          <h2>
            {countByStatus(
              "Accepted"
            )}
          </h2>

          <p>
            Accepted manuscripts
          </p>

        </div>

      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="searchSection">

        <div className="searchWrapper">

          <svg
            className="searchIcon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
            />

            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
            />
          </svg>

          <input
            type="text"
            className="paperSearch"
            placeholder="Search by Paper ID, title, research area or status..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          {search && (
            <button
              className="clearSearch"
              type="button"
              onClick={() =>
                setSearch("")
              }
            >
              ×
            </button>
          )}

        </div>

        <div className="searchResultCount">

          {search
            ? `${filteredPapers.length} result${
                filteredPapers.length !==
                1
                  ? "s"
                  : ""
              }`
            : `${papers.length} manuscripts`}

        </div>

      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {filteredPapers.length === 0 ? (

        <div className="emptyPaper">

          <div className="emptyPaperIcon">
            📄
          </div>

          <h3>
            No Papers Found
          </h3>

          <p>
            {search
              ? "Try adjusting your search terms."
              : "No papers have been assigned to you yet."}
          </p>

          {search && (
            <button
              type="button"
              className="clearSearchButton"
              onClick={() =>
                setSearch("")
              }
            >
              Clear Search
            </button>
          )}

        </div>

      ) : (

        <div className="paperTableWrapper">

          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          <table className="paperTable">

            <thead>

              <tr>

                <th>
                  Paper ID
                </th>

                <th>
                  Paper Title
                </th>

                <th>
                  Research Area
                </th>

                <th>
                  Status
                </th>

                <th>
                  Submitted Date
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredPapers.map(
                (paper) => {

                  const statusClass =
                    STATUS_STYLES[
                      paper.status
                    ] || "";

                  const accepting =
                    acceptingId ===
                    paper._id;

                  const removing =
                    removingId ===
                    paper._id;

                  return (
                    <tr
                      key={
                        paper._id
                      }
                    >

                      {/* =================================
                          PAPER ID
                      ================================= */}

                      <td data-label="Paper ID">

                        <span className="paperIdCell">

                          {paper.paperId ||
                            "—"}

                        </span>

                      </td>

                      {/* =================================
                          TITLE
                      ================================= */}

                      <td data-label="Paper Title">

                        <div className="paperTitleWrapper">

                          <span className="paperTitleCell">
                            {paper.paperTitle ||
                              "Untitled Paper"}
                          </span>

                          <span className="paperVersion">
                            Version{" "}
                            {paper.version ||
                              1}
                          </span>

                        </div>

                      </td>

                      {/* =================================
                          RESEARCH AREA
                      ================================= */}

                      <td data-label="Research Area">

                        <span className="researchAreaCell">

                          {paper.researchArea ||
                            "Not specified"}

                        </span>

                      </td>

                      {/* =================================
                          STATUS
                      ================================= */}

                      <td data-label="Status">

                        <span
                          className={`statusBadge ${statusClass}`}
                        >

                          <span className="statusDot" />

                          {paper.status ||
                            "Unknown"}

                        </span>

                      </td>

                      {/* =================================
                          DATE
                      ================================= */}

                      <td data-label="Submitted Date">

                        <div className="dateCell">

                          <span>
                            {paper.createdAt
                              ? new Date(
                                  paper.createdAt
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month:
                                      "short",
                                    year:
                                      "numeric",
                                  }
                                )
                              : "—"}
                          </span>

                        </div>

                      </td>

                      {/* =================================
                          ACTIONS
                      ================================= */}

                      <td data-label="Actions">

                        <div className="actionBtns">

                          {/* VIEW */}

                          <button
                            type="button"
                            className="viewBtn"
                            onClick={() =>
                              handleView(
                                paper._id
                              )
                            }
                          >
                            <span className="actionIcon">
                              ↗
                            </span>

                            View
                          </button>

                          {/* EDIT */}

                          {/* <button
                            type="button"
                            className="editBtn"
                            onClick={() =>
                              handleEdit(
                                paper._id
                              )
                            }
                          >
                            <span className="actionIcon">
                              ✎
                            </span>

                            Edit
                          </button> */}

                          {/* ACCEPT */}

                          {canAccept(
                            paper
                          ) && (
                            <button
                              type="button"
                              className="acceptBtn"
                              disabled={
                                accepting ||
                                removing
                              }
                              onClick={() =>
                                handleAccept(
                                  paper
                                )
                              }
                            >

                              {accepting ? (
                                <>
                                  <span className="buttonSpinner" />

                                  Accepting...
                                </>
                              ) : (
                                <>
                                  <span className="actionIcon">
                                    ✓
                                  </span>

                                  Accept
                                </>
                              )}

                            </button>
                          )}

                          {/* ALREADY ACCEPTED */}

                          {paper.status ===
                            "Documents Required" && (
                            <span className="acceptedLabel">
                              ✓ Documents Required
                            </span>
                          )}

                          {/* UNASSIGN */}

                          <button
                            type="button"
                            className="removeBtn"
                            disabled={
                              removing ||
                              accepting
                            }
                            onClick={() =>
                              handleUnassign(
                                paper._id
                              )
                            }
                          >

                            {removing ? (
                              <>
                                <span className="buttonSpinner dark" />

                                Removing...
                              </>
                            ) : (
                              <>
                                <span className="actionIcon">
                                  ×
                                </span>

                                Unassign
                              </>
                            )}

                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

          {/* =================================================
              MOBILE CARDS
          ================================================= */}

          <div className="mobilePaperCards">

            {filteredPapers.map(
              (paper) => {

                const statusClass =
                  STATUS_STYLES[
                    paper.status
                  ] || "";

                const accepting =
                  acceptingId ===
                  paper._id;

                const removing =
                  removingId ===
                  paper._id;

                return (
                  <article
                    className="mobilePaperCard"
                    key={
                      paper._id
                    }
                  >

                    <div className="mobilePaperCardTop">

                      <div>

                        <span className="mobilePaperId">
                          {paper.paperId ||
                            "No Paper ID"}
                        </span>

                        <h3>
                          {paper.paperTitle ||
                            "Untitled Paper"}
                        </h3>

                      </div>

                      <span
                        className={`statusBadge ${statusClass}`}
                      >
                        <span className="statusDot" />

                        {paper.status}
                      </span>

                    </div>

                    <div className="mobilePaperMeta">

                      <div>
                        <span>
                          Research Area
                        </span>

                        <strong>
                          {paper.researchArea ||
                            "Not specified"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Version
                        </span>

                        <strong>
                          V
                          {paper.version ||
                            1}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Submitted
                        </span>

                        <strong>
                          {paper.createdAt
                            ? new Date(
                                paper.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "—"}
                        </strong>
                      </div>

                    </div>

                    <div className="mobileActionBtns">

                      <button
                        type="button"
                        className="viewBtn"
                        onClick={() =>
                          handleView(
                            paper._id
                          )
                        }
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="editBtn"
                        onClick={() =>
                          handleEdit(
                            paper._id
                          )
                        }
                      >
                        Edit
                      </button>

                      {canAccept(
                        paper
                      ) ? (
                        <button
                          type="button"
                          className="acceptBtn"
                          disabled={
                            accepting ||
                            removing
                          }
                          onClick={() =>
                            handleAccept(
                              paper
                            )
                          }
                        >
                          {accepting
                            ? "Accepting..."
                            : "Accept"}
                        </button>
                      ) : (
                        paper.status ===
                          "Documents Required" && (
                          <span className="acceptedLabel">
                            ✓ Documents Required
                          </span>
                        )
                      )}

                      <button
                        type="button"
                        className="removeBtn"
                        disabled={
                          removing ||
                          accepting
                        }
                        onClick={() =>
                          handleUnassign(
                            paper._id
                          )
                        }
                      >
                        {removing
                          ? "Removing..."
                          : "Unassign"}
                      </button>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default PaperManagement;
