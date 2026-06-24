import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaHome,
  FaChevronRight,
  FaFileMedicalAlt,
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

        const { data } = await API.get(
          `/submitform/${id}`
        );

        console.log("Article Response:", data);

        if (data?.success) {
          setArticle(data.data);
        } else {
          setError("Article Not Found");
        }
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
            "Failed to fetch article"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleViewArticle = () => {
    if (!article?.paperFile) return;

    const filePath = article.paperFile.startsWith("/")
      ? article.paperFile
      : `/${article.paperFile}`;

    window.open(
      `${BACKEND_BASE_URL}${filePath}`,
      "_blank"
    );
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

        <div className="articleDetailsBreadLeft">

          <span className="articleDetailsMiniTag">
            {article?.authorCategory ||
              "Research Article"}
          </span>

          <h1>
            {loading
              ? "Loading Article..."
              : article?.paperTitle ||
                "Article Details"}
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

          <p>
            {loading
              ? "Loading Article Information..."
              : article?.abstract ||
                "No abstract available"}
          </p>

          <div className="articleDetailsBreadPath">
            <Link to="/">
              <FaHome />
              Home
            </Link>

            <FaChevronRight />

            <span>
              {article?.paperTitle ||
                "Article Details"}
            </span>
          </div>

        </div>

        <div className="articleDetailsBreadCard">

          <div className="articleDetailsCardIcon">
            <FaFileMedicalAlt />
          </div>

          <h3>
            {article?.researchArea ||
              "Research Area"}
          </h3>

          <p>
            {Array.isArray(article?.keywords)
              ? article.keywords.join(", ")
              : article?.keywords ||
                "No Keywords Available"}
          </p>

          <button
            onClick={handleViewArticle}
            disabled={!article?.paperFile}
          >
            View Article
          </button>

        </div>

      </div>
    </section>
  );
};

export default ArticleDetailsBreadcrumb;