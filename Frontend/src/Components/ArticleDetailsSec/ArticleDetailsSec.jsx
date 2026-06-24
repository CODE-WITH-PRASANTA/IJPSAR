import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaFilePdf, FaQuoteRight, FaShareAlt, FaRegBookmark, FaBookmark } from "react-icons/fa";
import API from "../../api/axios";
import "./ArticleDetailsSec.css";

const BACKEND_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
          setArticle(response.data.data);
          
          // Persistence sync check for saved state tracking
          const savedArticles = JSON.parse(localStorage.getItem("saved_articles") || "[]");
          setIsSaved(savedArticles.includes(response.data.data._id || id));
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

  // Action: Open / Download PDF Link from Cloud/Server Storage File
  const handleDownloadPDF = () => {
    if (!article?.paperFile) {
      alert("No printable manuscript or publication file resource linked with this profile.");
      return;
    }
    const pathDelimiter = article.paperFile.startsWith("/") ? "" : "/";
    const absoluteResourceUrl = `${BACKEND_BASE_URL}${pathDelimiter}${article.paperFile}`;
    window.open(absoluteResourceUrl, "_blank", "noopener,noreferrer");
  };

  // Action: Simple formatted modal popup clipboard generator for Reference Citation
  const handleCiteAction = () => {
    if (!article) return;
    const currentYear = article.infoPublished 
      ? new Date(article.infoPublished).getFullYear() 
      : new Date(article.createdAt || Date.now()).getFullYear();
      
    const authors = parseAuthors();
    const title = article.paperTitle || "Untitled Publication";
    const volume = article.volume || "12(6)";
    const doi = article.doiNumber || "N/A";
    
    const citationString = `${authors}. (${currentYear}). ${title}. International Journal of Pharmaceutical and Advanced Scientific Research, ${volume}. DOI: ${doi}`;
    
    navigator.clipboard.writeText(citationString)
      .then(() => alert(`Citation copied to your clipboard:\n\n${citationString}`))
      .catch(() => alert("Clipboard system permission block. Manual context copy selection needed."));
  };

  // Action: Dynamic System Level Platform Native Web Share API
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
        .then(() => alert("Web link dynamic sharing API not supported on this device. URL copied to clipboard instead!"));
    }
  };

  // Action: Toggle reactive state indicator with local state caching engine
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
      alert("Article dynamically flagged as saved for cache tracking!");
    } else {
      savedArticles = savedArticles.filter(item => item !== targetId);
      localStorage.setItem("saved_articles", JSON.stringify(savedArticles));
      setIsSaved(false);
      alert("Article reference item tags removed from session cache.");
    }
  };

  // Safe rendering helpers for flexible backend structure inputs
  const parseKeywords = () => {
    if (!article?.keywords) return [];
    if (Array.isArray(article.keywords)) return article.keywords;
    if (typeof article.keywords === "string") {
      return article.keywords.split(",").map(kw => kw.trim()).filter(Boolean);
    }
    return [];
  };

  const parseAuthors = () => {
    if (!article?.authorName) return "Unknown Author";
    if (Array.isArray(article.authorName)) return article.authorName.join(", ");
    return String(article.authorName);
  };

  if (loading) {
    return (
      <section className="articleDetailsSection" style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff" }}>
        <div className="articleLoadingWrapper"><h3>Synchronizing Node Document Records...</h3></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="articleDetailsSection" style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", color: "#ff4d4d" }}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>System Processing Fault</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  const cleanKeywordsList = parseKeywords();

  return (
    <section className="articleDetailsSection">
      {/* BACKGROUND GLOWS */}
      <div className="articleDetailsBgGlowOne"></div>
      <div className="articleDetailsBgGlowTwo"></div>

      <div className="articleDetailsContainer">
        {/* ======================================================
            LEFT SIDE (MANUSCRIPT BODY CONTENT)
        ====================================================== */}
        <div className="articleDetailsLeft">
          
          {/* TAGS */}
          <div className="articleDetailsTags">
            <span className="articleDetailsTag active">Open Access</span>
            <span className="articleDetailsTag">{article?.authorCategory || "Original Research"}</span>
            <span className="articleDetailsTag">{article?.researchArea || "Pharmaceutics"}</span>
          </div>

          {/* TITLE */}
          <h1 className="articleDetailsTitle">
            {article?.paperTitle || "Untitled Document Abstract Entry Title"}
          </h1>

          {/* AUTHORS */}
          <div className="articleDetailsAuthors">
            {parseAuthors()}
          </div>

          {/* AFFILIATION */}
          <div className="articleDetailsAffiliation">
            {article?.affiliation || "No affiliation details listed."}
          </div>

          {/* ACTION BUTTONS */}
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

          {/* DOI */}
          <div className="articleDetailsDOI">
            <span>DOI:</span> {article?.doiNumber || "N/A"}
          </div>

          {/* ABSTRACT */}
          <div className="articleDetailsBlock">
            <h2>Abstract</h2>
            <p>{article?.abstract || "No abstract content documentation loaded for this metadata profile submission entry."}</p>
          </div>

          {/* KEYWORDS */}
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

          {/* 1. INTRODUCTION SECTION */}
          <div className="articleDetailsBlock">
            <h3>1. Introduction</h3>
            <p>{article?.introduction || "No introduction data provided for this document structure."}</p>
          </div>

          {/* 2. MATERIALS AND METHODS SECTION */}
          <div className="articleDetailsBlock">
            <h3>2. Materials and Methods</h3>
            <p>{article?.materialsAndMethods || "No materials and methods data provided for this document structure."}</p>
          </div>

          {/* 3. RESULTS SECTION */}
          <div className="articleDetailsBlock">
            <h3>3. Results</h3>
            <p>{article?.results || "No results data provided for this document structure."}</p>
          </div>

          {/* 4. DISCUSSION SECTION */}
          <div className="articleDetailsBlock">
            <h3>4. Discussion</h3>
            <p>{article?.discussion || "No discussion data provided for this document structure."}</p>
          </div>

          {/* REFERENCES SECTION */}
          <div className="articleDetailsBlock">
            <h2>References</h2>
            <ol className="articleReferences">
              {article?.references && Array.isArray(article.references) && article.references.length > 0 ? (
                article.references.map((ref, idx) => <li key={idx}>{ref}</li>)
              ) : (
                <p style={{ color: "#aaa", fontSize: "14px" }}>No reference citations linked to this profile context.</p>
              )}
            </ol>
          </div>
        </div>

        {/* ======================================================
            RIGHT SIDE (SIDEBAR METRICS & DETAILS)
        ====================================================== */}
        <div className="articleDetailsRight">
          <div className="articleDetailsSticky">
            
            {/* ARTICLE METRICS */}
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

            {/* ARTICLE INFO */}
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

            {/* RELATED ARTICLES */}
            <div className="articleSidebarCard">
              <h4 className="articleSidebarTitle">Related Articles</h4>
              <div className="articleRelatedLinks">
                {article?.relatedArticles && Array.isArray(article.relatedArticles) && article.relatedArticles.length > 0 ? (
                  article.relatedArticles.map((rel, i) => (
                    <div key={i} className="articleRelatedItem">{rel}</div>
                  ))
                ) : (
                  <p style={{ fontSize: "13px", color: "#6b7280" }}>No related research maps available.</p>
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