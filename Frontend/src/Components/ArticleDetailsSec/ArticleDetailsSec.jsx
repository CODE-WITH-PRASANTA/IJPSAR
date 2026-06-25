import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  FaFilePdf, 
  FaQuoteRight, 
  FaShareAlt, 
  FaRegBookmark, 
  FaBookmark,
  FaCalendarAlt,
  FaIdCard,
  FaEnvelopeOpenText,
  FaUserTag
} from "react-icons/fa";
import API from "../../api/axios";
import "./ArticleDetailsSec.css";

// Dynamic configuration base link variable with port segments removed
const BACKEND_BASE_URL = import.meta.env.VITE_API_URL || "";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("No document ID identified within route parameters.");
      return;
    }

    const fetchArticleData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await API.get(`/submitform/${id}`);
        
        if (response.data?.success && response.data?.data) {
          const fetchedData = response.data.data;
          setArticle(fetchedData);
          
          const savedArticles = JSON.parse(localStorage.getItem("saved_articles") || "[]");
          setIsSaved(savedArticles.includes(fetchedData._id || id));
        } else {
          setError("Data payload successfully retrieved but invalid structural signature.");
        }
      } catch (err) {
        console.error("Fetch Data Execution Failure:", err);
        setError(err.response?.data?.message || err.message || "An unexpected system error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id]);

  // Enhanced dynamic file reference builder (No ports assigned)
  const handleDownloadPDF = () => {
    if (!article?.paperFile) {
      alert("No printable manuscript or publication file resource linked with this profile.");
      return;
    }
    let fileUrl = article.paperFile;
    
    if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
      return;
    }

    fileUrl = fileUrl.replace(/\\/g, "/");
    const cleanBaseUrl = BACKEND_BASE_URL.replace(/\/+$/, "");
    const cleanFilePath = fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`;

    window.open(`${cleanBaseUrl}${cleanFilePath}`, "_blank", "noopener,noreferrer");
  };

  const handleCiteAction = () => {
    if (!article) return;
    const currentYear = article.infoPublished 
      ? new Date(article.infoPublished).getFullYear() 
      : new Date(article.createdAt || Date.now()).getFullYear();
      
    const authorsStr = getPrimaryAuthorsString();
    const title = article.paperTitle || "Untitled Publication";
    const volume = article.volume || "12(6)";
    const doi = article.doiNumber || "N/A";
    
    const citationString = `${authorsStr}. (${currentYear}). ${title}. International Journal of Pharmaceutical and Advanced Scientific Research, ${volume}. DOI: ${doi}`;
    
    navigator.clipboard.writeText(citationString)
      .then(() => alert(`Citation copied to your clipboard:\n\n${citationString}`))
      .catch(() => alert("Clipboard system permission block. Manual context copy selection needed."));
  };

  const handleShareAction = async () => {
    if (!article) return;
    const shareData = {
      title: article.paperTitle || "Research Article Details",
      text: `Check out this research paper: ${article.paperTitle}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("Share execution cancelled or failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Web link sharing API not supported on this device. URL copied to clipboard instead!"));
    }
  };

  const handleSaveToggle = () => {
    if (!article) return;
    const targetId = article._id || id;
    let savedArticles = JSON.parse(localStorage.getItem("saved_articles") || "[]");

    if (!isSaved) {
      if (!savedArticles.includes(targetId)) {
        savedArticles.push(targetId);
      }
      localStorage.setItem("saved_articles", JSON.stringify(savedArticles));
      setIsSaved(true);
      alert("Article saved to browser bookmarks!");
    } else {
      savedArticles = savedArticles.filter(item => item !== targetId);
      localStorage.setItem("saved_articles", JSON.stringify(savedArticles));
      setIsSaved(false);
      alert("Article reference removed from browser bookmarks.");
    }
  };

  const parseKeywords = () => {
    if (!article?.keywords) return [];
    if (Array.isArray(article.keywords)) return article.keywords;
    if (typeof article.keywords === "string") {
      return article.keywords.split(",").map(kw => kw.trim()).filter(Boolean);
    }
    return [];
  };

  const getPrimaryAuthorsString = () => {
    if (!article) return "Unknown Author";
    if (article.authorName) {
      return Array.isArray(article.authorName) ? article.authorName.join(", ") : String(article.authorName);
    }
    if (Array.isArray(article.authors) && article.authors.length > 0) {
      return article.authors.map(a => a.name || a.authorName || (typeof a === 'string' ? a : '')).filter(Boolean).join(", ");
    }
    return "Unknown Author";
  };

  const getAuthorsListForTable = () => {
    if (!article) return [];
    
    // Scenario 1: Structured authors array exists
    if (Array.isArray(article.authors) && article.authors.length > 0) {
      return article.authors.map(auth => {
        if (typeof auth === 'string') {
          return { name: auth, email: "N/A", designation: "Researcher", organization: "No affiliation listed." };
        }
        return {
          name: auth.name || auth.authorName || "Unknown",
          email: auth.email || auth.authorEmail || "N/A",
          designation: auth.designation || "Researcher",
          organization: auth.organization || auth.affiliation || "No affiliation listed."
        };
      });
    }
    
    // Scenario 2: authorName is an Array of strings or objects
    if (Array.isArray(article.authorName)) {
      return article.authorName.map(auth => {
        if (typeof auth === 'string') {
          return {
            name: auth,
            email: article.authorEmail || article.email || "N/A",
            designation: article.designation || "Author / Researcher",
            organization: article.affiliation || article.organization || "No affiliation listed."
          };
        }
        return {
          name: auth.name || auth.authorName || "Unknown",
          email: auth.email || auth.authorEmail || article.authorEmail || article.email || "N/A",
          designation: auth.designation || article.designation || "Author / Researcher",
          organization: auth.organization || auth.affiliation || article.affiliation || article.organization || "No affiliation listed."
        };
      });
    }

    // Scenario 3: authorName is a standalone String or Single Object
    if (article.authorName) {
      return [{
        name: typeof article.authorName === 'object' ? (article.authorName.name || article.authorName.authorName) : article.authorName,
        email: article.authorEmail || article.email || "N/A",
        designation: article.designation || "Author / Researcher",
        organization: article.affiliation || article.organization || "No affiliation listed."
      }];
    }
    
    return [];
  };

  if (loading) {
    return (
      <section className="articleDetailsSection loadingState">
        <div className="articleLoadingWrapper">
          <div className="spinner"></div>
          <h3>Synchronizing Node Document Records...</h3>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="articleDetailsSection errorState">
        <div className="articleErrorContainer">
          <h2>System Processing Fault</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  const cleanKeywordsList = parseKeywords();
  const visualAuthorsList = getAuthorsListForTable();
  const topAuthorsHeading = getPrimaryAuthorsString();

  return (
    <section className="articleDetailsSection">
      <div className="articleDetailsBgGlowOne"></div>
      <div className="articleDetailsBgGlowTwo"></div>

      <div className="articleDetailsContainer">
        
        {/* LEFT SIDE: MAIN MANUSCRIPT CONTENT */}
        <div className="articleDetailsLeft">
          
          <div className="articleDetailsTags">
            <span className="articleDetailsTag active">Open Access</span>
            <span className="articleDetailsTag">{article?.authorCategory || "Original Research"}</span>
            <span className="articleDetailsTag">{article?.researchArea || "Pharmaceutics"}</span>
          </div>

          <h1 className="articleDetailsTitle">
            {article?.paperTitle || "Untitled Document Abstract Entry Title"}
          </h1>

          {/* DISPLAY AUTHOR UNDER TITLE */}
          <div className="articleDetailsTopAuthorsBlock">
            <div className="articleDetailsAuthors">
              {topAuthorsHeading}
            </div>
            {(article?.affiliation || article?.organization) && (
              <div className="articleDetailsAffiliation">
                {article.affiliation || article.organization}
              </div>
            )}
          </div>

          <div className="articleSubHeaderIdentifiers">
            <div className="idBadge">
              <FaIdCard className="badgeIcon" /> <span><strong>Paper ID:</strong> {article?.paperId || article?._id || "N/A"}</span>
            </div>
            <div className="idBadge">
              <FaCalendarAlt className="badgeIcon" /> <span><strong>Published:</strong> {article?.infoPublished || "Pending"}</span>
            </div>
          </div>

          {/* DYNAMIC AUTHORS & AFFILIATIONS DETAIL TABLE */}
          <div className="articleDetailsBlock textBlock">
            <h2>Author Profiles & Affiliations</h2>
            {visualAuthorsList.length > 0 ? (
              <div className="authorTableResponsiveWrapper">
                <table className="authorMetadataTable">
                  <thead>
                    <tr>
                      <th>Author Name</th>
                      <th>Email Address</th>
                      <th>Designation</th>
                      <th>University / Organization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visualAuthorsList.map((auth, index) => (
                      <tr key={index}>
                        <td className="fontWeightBold">{auth.name}</td>
                        <td className="emailColumn">{auth.email}</td>
                        <td><span className="designationTag">{auth.designation}</span></td>
                        <td>{auth.organization}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="noDataFallback">No structured author profiles available for this publication context.</p>
            )}
          </div>

          <div className="articleDetailsActions">
            <button className="articleDetailsBtn primary" onClick={handleDownloadPDF} disabled={!article?.paperFile}>
              <FaFilePdf /> Download PDF
            </button>
            <button className="articleDetailsBtn" onClick={handleCiteAction}>
              <FaQuoteRight /> Cite
            </button>
            <button className="articleDetailsBtn" onClick={handleShareAction}>
              <FaShareAlt /> Share
            </button>
            <button className={`articleDetailsBtn ${isSaved ? "saved-active" : ""}`} onClick={handleSaveToggle}>
              {isSaved ? <FaBookmark style={{ fill: "#00ebd2" }} /> : <FaRegBookmark />} {isSaved ? "Saved" : "Save"}
            </button>
          </div>

          <div className="articleDetailsDOI">
            <span>DOI:</span> {article?.doiNumber || "N/A"}
          </div>

          <div className="articleDetailsBlock">
            <h2>Abstract</h2>
            <p className="abstractContentParagraph">{article?.abstract || "No abstract content documentation loaded."}</p>
          </div>

          <div className="articleDetailsBlock">
            <h2>Keywords</h2>
            <div className="articleKeywords">
              {cleanKeywordsList.length > 0 ? (
                cleanKeywordsList.map((keyword, index) => (
                  <span key={index} className="articleKeyword">{keyword}</span>
                ))
              ) : (
                <span className="articleKeyword">N/A</span>
              )}
            </div>
          </div>

          {/* DYNAMIC FORM SEGMENTS (FORM METADATA FALLBACKS) */}
          {(article?.referralCode || article?.specialMessage) && (
            <div className="articleDetailsBlock submissionNotesCard">
              <h2>Submission Metadata</h2>
              {article?.referralCode && (
                <div className="metadataFieldRow">
                  <span className="fieldLabel"><FaUserTag /> Referral Code:</span>
                  <span className="fieldValue highlightedCode">{article.referralCode}</span>
                </div>
              )}
              {article?.specialMessage && (
                <div className="metadataFieldRow columnLayout">
                  <span className="fieldLabel"><FaEnvelopeOpenText /> Special Message for Editor:</span>
                  <p className="fieldValue messageBox textBlock">{article.specialMessage}</p>
                </div>
              )}
            </div>
          )}

          {/* CORE SECTIONS */}
          {article?.introduction && (
            <div className="articleDetailsBlock textBlock">
              <h3>1. Introduction</h3>
              <p>{article.introduction}</p>
            </div>
          )}
          {article?.materialsAndMethods && (
            <div className="articleDetailsBlock textBlock">
              <h3>2. Materials and Methods</h3>
              <p>{article.materialsAndMethods}</p>
            </div>
          )}
          {article?.results && (
            <div className="articleDetailsBlock textBlock">
              <h3>3. Results</h3>
              <p>{article.results}</p>
            </div>
          )}
          {article?.discussion && (
            <div className="articleDetailsBlock textBlock">
              <h3>4. Discussion</h3>
              <p>{article.discussion}</p>
            </div>
          )}

          {/* REFERENCES SECTION */}
          <div className="articleDetailsBlock">
            <h2>References</h2>
            {article?.references && Array.isArray(article.references) && article.references.length > 0 ? (
              <ol className="articleReferences">
                {article.references.map((ref, idx) => <li key={idx}>{ref}</li>)}
              </ol>
            ) : article?.referralCode ? (
              <div className="referenceMetadataCard textBlock">
                <strong>Referral Context:</strong> Referenced via tracking key <span>{article.referralCode}</span>
              </div>
            ) : (
              <p className="noDataFallback">No reference citations linked to this profile context.</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: METRICS AND METADATA CARD BAR */}
        <div className="articleDetailsRight">
          <div className="articleDetailsSticky">
            
            <div className="articleSidebarCard">
              <h4 className="articleSidebarTitle">Article Metrics</h4>
              <div className="articleMetricItem">
                <strong>Views:</strong> <span>{article?.metrics?.views ?? "0"}</span>
              </div>
              <div className="articleMetricItem">
                <strong>Downloads:</strong> <span>{article?.metrics?.downloads ?? "0"}</span>
              </div>
              <div className="articleMetricItem">
                <strong>Citations:</strong> <span>{article?.metrics?.citations ?? "0"}</span>
              </div>
              <div className="articleMetricItem">
                <strong>Altmetric:</strong> <span>{article?.metrics?.altmetric ?? "0"}</span>
              </div>
            </div>

            <div className="articleSidebarCard">
              <h4 className="articleSidebarTitle">Article Info</h4>
              <div className="articleMetricItem">
                <strong>Received:</strong> <span>{article?.infoReceived || "N/A"}</span>
              </div>
              <div className="articleMetricItem">
                <strong>Revised:</strong> <span>{article?.infoRevised || "N/A"}</span>
              </div>
              <div className="articleMetricItem">
                <strong>Accepted:</strong> <span>{article?.infoAccepted || "N/A"}</span>
              </div>
              <div className="articleMetricItem">
                <strong>Published:</strong> <span>{article?.infoPublished || "N/A"}</span>
              </div>
              <div className="articleMetricItem">
                <strong>Volume:</strong> <span>{article?.volume || "N/A"}</span>
              </div>
            </div>

            <div className="articleSidebarCard">
              <h4 className="articleSidebarTitle">Related Articles</h4>
              <div className="articleRelatedLinks">
                {article?.relatedArticles && Array.isArray(article.relatedArticles) && article.relatedArticles.length > 0 ? (
                  article.relatedArticles.map((rel, i) => (
                    <div key={i} className="articleRelatedItem">
                      {typeof rel === 'object' ? (rel.title || rel.paperTitle) : String(rel)}
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: "13px", color: "#aaa" }}>No related research maps available.</p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ArticleDetails;