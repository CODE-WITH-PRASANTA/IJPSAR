import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaHome,
  FaChevronRight,
  FaFileMedicalAlt,
  FaRegFileAlt,
  FaFilePdf,
} from "react-icons/fa";
import API from "../../api/axios";
import "./ArticleDetailsBreadcrumb.css";
import breadcrumbBg from "../../assets/bg-9.jpg";

const BACKEND_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const ArticleDetailsBreadcrumb = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // State to manage "Read More / Read Less" for abstract
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);

  useEffect(() => {
    if (!id || id === "undefined") {
      setError("Invalid Article ID");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Article ID:", id);
        const { data } = await API.get(`/submitform/${id}`);
        console.log("Article Response:", data);

        if (data?.success) {
          setArticle(data.data);
        } else {
          setError("Article Not Found");
        }
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.data?.message || "Failed to fetch article"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  /**
   * Enhanced PDF viewer logic handling cross-platform paths,
   * backslashes from Windows servers, and missing clean URI segments.
   */
  const handleViewArticle = () => {
    if (!article?.paperFile) {
      alert("No PDF file path is available for this article.");
      return;
    }

    let fileUrl = article.paperFile;

    // 1. If it's already a fully qualified HTTP/HTTPS string, open it directly
    if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // 2. Normalize Windows server file backslashes (\) to standard web forward slashes (/)
    fileUrl = fileUrl.replace(/\\/g, "/");

    // 3. Prevent double slashing layouts when matching with base URLs
    const cleanBaseUrl = BACKEND_BASE_URL.replace(/\/+$/, "");
    const cleanFilePath = fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`;

    const completePdfUrl = `${cleanBaseUrl}${cleanFilePath}`;
    
    console.log("Target PDF Application URL:", completePdfUrl);
    window.open(completePdfUrl, "_blank", "noopener,noreferrer");
  };

  // Helper text processing for abstract string truncation
  const getAbstractText = () => {
    const text = article?.abstract || "No abstract available";
    if (text.length <= 300 || isAbstractExpanded) {
      return text;
    }
    return `${text.substring(0, 300)}...`;
  };

  return (
    <section
      className="articleDetailsBread"
      style={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(3,18,38,0.94),
            rgba(0,92,82,0.82)
          ),
          url(${breadcrumbBg})
        `,
      }}
    >
      <div className="articleDetailsBreadOverlay"></div>

      <div className="articleDetailsBreadContainer">
        
        {/* Left Side: Article Information */}
        <div className="articleDetailsBreadLeft">
          
          <span className="articleDetailsMiniTag">
            {article?.authorCategory || "Research Article"}
          </span>

          <h1>
            {loading
              ? "Loading Article..."
              : article?.paperTitle || "Article Details"}
          </h1>

          {error && (
            <div
              style={{
                color: "#ff4d4f",
                marginBottom: "15px",
                fontWeight: "600",
              }}
            >
              {error}
            </div>
          )}

          {/* Abstract Section with Divider Line and Read More Toggle */}
          <div className="articleDetailsAbstractWrapper">
            <hr className="abstractDivider" />
            <p className="articleDetailsAbstractText">
              {loading ? "Loading Article Information..." : getAbstractText()}
              
              {!loading && article?.abstract && article.abstract.length > 300 && (
                <button
                  className="readMoreBtn"
                  onClick={() => setIsAbstractExpanded(!isAbstractExpanded)}
                >
                  {isAbstractExpanded ? " Read Less" : " Read More"}
                </button>
              )}
            </p>
            <hr className="abstractDivider" />
          </div>

          {/* Navigation Paths / Breadcrumb */}
          <div className="articleDetailsBreadPath">
            <Link to="/">
              <FaHome /> Home
            </Link>

            <FaChevronRight />

            <Link to="/reform-to-transformation">
              From Reform to Transformation: NEP 2020 and the Future of Higher Education in Andhra Pradesh
            </Link>

            <FaChevronRight />

            <span className="activePath">
              {article?.paperTitle || "Article Details"}
            </span>
          </div>

          {/* Generated Paper ID UI Wrapper */}
          {!loading && article && (
            <div className="articleDetailsPaperIdBox">
              <FaRegFileAlt className="paperIdIcon" />
              <span>
                <strong>Paper ID: </strong> 
                {article.paperId || article._id || "N/A"}
              </span>
            </div>
          )}

        </div>

        {/* Right Side: Quick Specs Card */}
        <div className="articleDetailsBreadCard">
          
          <div className="articleDetailsCardIcon">
            <FaFileMedicalAlt />
          </div>

          <h3>{article?.researchArea || "Research Area"}</h3>

          <p>
            {Array.isArray(article?.keywords)
              ? article.keywords.join(", ")
              : article?.keywords || "No Keywords Available"}
          </p>

          <button
            onClick={handleViewArticle}
            disabled={!article?.paperFile}
            className={`viewArticleBtn ${!article?.paperFile ? "disabledBtn" : ""}`}
          >
            <FaFilePdf style={{ marginRight: "8px", verticalAlign: "middle" }} />
            View Article (PDF)
          </button>

        </div>

      </div>
    </section>
  );
};

export default ArticleDetailsBreadcrumb;