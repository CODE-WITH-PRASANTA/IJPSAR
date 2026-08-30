import React, { useEffect, useState } from "react";
import API, { BASE_URL } from "../../api/axios";
import "./ReviewPaper.css";
import { useNavigate } from "react-router-dom";

const ReviewPaper = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState(null);

  const navigate = useNavigate();

  /* =========================================================
     FETCH PAPERS
  ========================================================= */

  const fetchPapers = async () => {
    try {
      setLoading(true);

      const editor = JSON.parse(
        localStorage.getItem("editorData")
      );

      if (!editor?._id) {
        console.error("Editor data not found");
        setPapers([]);
        return;
      }

      const res = await API.get(
        `/submitform/editor/${editor._id}`
      );

      setPapers(res.data.data || []);
    } catch (error) {
      console.error(
        "FETCH PAPERS ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  /* =========================================================
     START FINAL REVIEW
  ========================================================= */

  const startFinalReview = async (paperId) => {
    const token = localStorage.getItem("editorToken");

    if (!token) {
      alert("Editor session expired. Please login again.");
      return;
    }

    try {
      setCompletingId(paperId);

      const response = await API.put(
        `/submitform/publication/start-review/${paperId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Unable to start final review.",
        );
      }

      alert("Final review started. Approve the paper or request a correction after reviewing the documents.");

      await fetchPapers();
    } catch (error) {
      console.error("START FINAL REVIEW ERROR:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to start final review.",
      );
    } finally {
      setCompletingId(null);
    }
  };

  /* =========================================================
     REQUEST PUBLICATION CORRECTION
  ========================================================= */

  const requestCorrection = async (paperId) => {
    const remark = window.prompt(
      "Describe the correction the author must make:",
    );

    if (!remark?.trim()) {
      return;
    }

    const token = localStorage.getItem("editorToken");

    if (!token) {
      alert("Editor session expired. Please login again.");
      return;
    }

    try {
      setCompletingId(paperId);

      const response = await API.put(
        `/submitform/publication/correction/${paperId}`,
        { remark: remark.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Unable to request a correction.",
        );
      }

      alert("Correction requested from the author.");

      await fetchPapers();
    } catch (error) {
      console.error("REQUEST CORRECTION ERROR:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to request a correction.",
      );
    } finally {
      setCompletingId(null);
    }
  };

  /* =========================================================
     APPROVE PAPER
     
     WORKFLOW:

     Accepted
          ↓
     Under Final Review
          ↓
     Approved and Forwarded to Admin


     Documents Uploaded – Submitted to Editor
          ↓
     Under Final Review
          ↓
     Approved and Forwarded to Admin


     Resubmitted for Review
          ↓
     Under Final Review
          ↓
     Approved and Forwarded to Admin
  ========================================================= */

  const completePaper = async (
    paperId
  ) => {
    try {
      setCompletingId(paperId);

      /* =====================================================
         GET EDITOR TOKEN
      ===================================================== */

      const token =
        localStorage.getItem(
          "editorToken"
        );

     

      if (!token) {
        console.error(
          "EDITOR TOKEN NOT FOUND"
        );

        alert(
          "Editor session expired. Please login again."
        );

        return;
      }

      /* =====================================================
         FIND CURRENT PAPER
      ===================================================== */

      const currentPaper =
        papers.find(
          (item) =>
            item._id === paperId
        );

      if (!currentPaper) {
        alert(
          "Paper not found."
        );

        return;
      }

      if (currentPaper.status !== "Under Final Review") {
        alert("Start final review before approving and forwarding this paper.");
        return;
      }

     
      /* =====================================================
         ALREADY FORWARDED
      ===================================================== */

      if (
        currentPaper.status ===
        "Approved and Forwarded to Admin"
      ) {
        alert(
          "This paper has already been forwarded to Admin."
        );

        return;
      }

      /* =====================================================
         ALREADY PUBLISHED
      ===================================================== */

      if (
        currentPaper.status ===
        "Published"
      ) {
        alert(
          "This paper has already been published."
        );

        return;
      }

      /* =====================================================
         UNDER FINAL REVIEW
         
         UNDER FINAL REVIEW
         
                 ↓
         
         APPROVED AND FORWARDED TO ADMIN
      ===================================================== */

    

      const approveResponse =
        await API.put(
          `/submitform/publication/approve/${paperId}`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      

      /* =====================================================
         SUCCESS
      ===================================================== */

      if (
        approveResponse.data?.success
      ) {
        alert(
          "Paper approved and forwarded to Admin successfully."
        );

        await fetchPapers();
      } else {
        alert(
          approveResponse.data?.message ||
            "Paper approval failed."
        );
      }

    } catch (error) {
      console.error(
        "APPROVE / FORWARD ERROR:",
        error
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "RESPONSE:",
        error.response?.data
      );

      /* =====================================================
         MISSING DOCUMENTS
      ===================================================== */

      if (
        error.response?.data
          ?.missingDocuments
      ) {
        const missing =
          error.response.data
            .missingDocuments;

        alert(
          `Required documents are missing:\n\n${missing
            .map(
              (item) =>
                `• ${item}`
            )
            .join("\n")}`
        );

        return;
      }

      /* =====================================================
         GENERAL ERROR
      ===================================================== */

      alert(
        error.response?.data
          ?.message ||
          "Failed to approve paper."
      );

    } finally {
      setCompletingId(
        null
      );
    }
  };

  /* =========================================================
     STATUS CLASS
  ========================================================= */

  const getStatusClass = (
    status
  ) => {
    if (!status) {
      return "";
    }

    return status
      .replace(
        /\s+/g,
        ""
      )
      .toLowerCase();
  };

  /* =========================================================
     UI
     
     NO CLASS NAME CHANGES
  ========================================================= */

  return (
    <div className="reviewPaper">

      <div className="reviewHeader">

        <h2>
          Review Papers
        </h2>

        <p>
          Manage and review assigned research papers
        </p>

      </div>

      {loading ? (

        <div className="loading">

          <div className="spinner" />

          <span>
            Loading papers...
          </span>

        </div>

      ) : papers.length === 0 ? (

        <div className="emptyBox">

          <div className="emptyIcon">
            📄
          </div>

          <h3>
            No Papers Assigned
          </h3>

          <p>
            Papers assigned to you for review
            will show up here.
          </p>

        </div>

      ) : (

        <>

          {/* Table layout - visible on tablet/desktop */}

          <div className="reviewTableWrapper">

            <table className="reviewTable">

              <thead>

                <tr>

                  <th>
                    Paper ID
                  </th>

                  <th>
                    Title
                  </th>

                  <th>
                    Research Area
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    File
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {papers.map(
                  (paper) => {

                    const isCompleting =
                      completingId ===
                      paper._id;

                    const isForwarded =
                      paper.status ===
                      "Approved and Forwarded to Admin";

                    const isPublished =
                      paper.status ===
                      "Published";

                    const canStartFinalReview = [
                      "Documents Uploaded – Submitted to Editor",
                      "Resubmitted for Review",
                    ].includes(paper.status);

                    const isUnderFinalReview =
                      paper.status ===
                      "Under Final Review";

                    return (

                      <tr
                        key={
                          paper._id
                        }
                      >

                        {/* ============================
                            PAPER ID
                        ============================ */}

                        <td data-label="Paper ID">

                          <span className="paperIdTag">

                            {paper.paperId}

                          </span>

                        </td>

                        {/* ============================
                            TITLE
                        ============================ */}

                        <td
                          data-label="Title"
                          className="titleCell"
                        >

                          {paper.paperTitle}

                        </td>

                        {/* ============================
                            RESEARCH AREA
                        ============================ */}

                        <td data-label="Research Area">

                          {paper.researchArea}

                        </td>

                        {/* ============================
                            STATUS
                        ============================ */}

                        <td data-label="Status">

                          <span
                            className={`status ${getStatusClass(
                              paper.status
                            )}`}
                          >

                            {paper.status}

                          </span>

                        </td>

                        {/* ============================
                            FILE
                        ============================ */}

                        <td data-label="File">

                          <button
                            type="button"
                            className="viewBtn"
                            onClick={() =>
                              window.open(
                                `${BASE_URL}${paper.paperFile}`,
                                "_blank"
                              )
                            }
                          >
                            View
                          </button>

                        </td>

                        {/* ============================
                            ACTIONS
                        ============================ */}

                        <td data-label="Actions">

                          <div className="actionGroup">

                            {/* ==========================
                                EDIT PAPER
                            ========================== */}

                            {!isForwarded &&
                              !isPublished && (

                                <button
                                  type="button"
                                  className="editBtn"
                                  onClick={() =>
                                    navigate(
                                      `/edit-paper/${paper._id}`
                                    )
                                  }
                                >
                                  Edit Paper
                                </button>

                              )}

                            {/* ==========================
                                START FINAL REVIEW
                            ========================== */}

                            {canStartFinalReview && (

                              <button
                                type="button"
                                className="completeBtn"
                                disabled={isCompleting}
                                onClick={() =>
                                  startFinalReview(paper._id)
                                }
                              >

                                {isCompleting
                                  ? "Starting Review..."
                                  : "Start Final Review"}

                              </button>

                            )}

                            {/* ==========================
                                FINAL REVIEW DECISION
                            ========================== */}

                            {isUnderFinalReview && (

                              <>

                                <button
                                  type="button"
                                  className="editBtn"
                                  disabled={isCompleting}
                                  onClick={() =>
                                    requestCorrection(paper._id)
                                  }
                                >
                                  Request Correction
                                </button>

                                <button
                                  type="button"
                                  className="completeBtn"
                                  disabled={isCompleting}
                                  onClick={() =>
                                    completePaper(paper._id)
                                  }
                                >

                                  {isCompleting
                                    ? "Sending..."
                                    : "Approve & Send to Admin"}

                                </button>

                              </>

                            )}

                            {/* ==========================
                                ALREADY FORWARDED
                            ========================== */}

                            {isForwarded && (

                              <span className="completeBtn">

                                ✓ Sent to Admin

                              </span>

                            )}

                            {/* ==========================
                                PUBLISHED
                            ========================== */}

                            {isPublished && (

                              <span className="completeBtn">

                                ✓ Published

                              </span>

                            )}

                          </div>

                        </td>

                      </tr>

                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        </>

      )}

    </div>
  );
};

export default ReviewPaper;
