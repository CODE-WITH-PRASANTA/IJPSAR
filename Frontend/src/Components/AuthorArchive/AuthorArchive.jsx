import React, { useEffect, useMemo, useState } from "react";
import "./AuthorArchive.css";

import {
  FaSearch,
  FaCalendarAlt,
  FaBookOpen,
  FaUserEdit,
  FaArrowRight,
  FaFilePdf,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import API, { BASE_URL } from "../../api/axios";

const AuthorArchive = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [volume, setVolume] = useState("Any");
  const [issue, setIssue] = useState("Any");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Latest");

  /* ================= FETCH PUBLISHED PAPERS ================= */

  const fetchPublishedPapers = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/submitform/published/all"
      );

      console.log(
        "Published Papers:",
        response.data
      );

      setPapers(response.data.data || []);
    } catch (error) {
      console.error(
        "Fetch published papers error:",
        error.response?.data || error.message
      );

      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedPapers();
  }, []);

  /* ================= GET YEAR ================= */

  const getPaperYear = (paper) => {
    const date =
      paper.publishedAt || paper.createdAt;

    return new Date(date).getFullYear();
  };

  /* ================= GET MONTH / ISSUE ================= */

  const getPaperIssue = (paper) => {
    const date =
      paper.publishedAt || paper.createdAt;

    return new Date(date).getMonth() + 1;
  };

  /* ================= GET VOLUME ================= */

  const years = useMemo(() => {
    return [
      ...new Set(
        papers.map((paper) => getPaperYear(paper))
      ),
    ].sort((a, b) => a - b);
  }, [papers]);

  const getPaperVolume = (paper) => {
    const year = getPaperYear(paper);

    return years.indexOf(year) + 1;
  };

  /* ================= VOLUME OPTIONS ================= */

  const volumeOptions = useMemo(() => {
    return [
      ...new Set(
        papers.map((paper) =>
          getPaperVolume(paper)
        )
      ),
    ].sort((a, b) => b - a);
  }, [papers, years]);

  /* ================= ISSUE OPTIONS ================= */

  const issueOptions = useMemo(() => {
    return [
      ...new Set(
        papers.map((paper) =>
          getPaperIssue(paper)
        )
      ),
    ].sort((a, b) => a - b);
  }, [papers]);

  /* ================= CATEGORY OPTIONS ================= */

  const categoryOptions = useMemo(() => {
    return [
      ...new Set(
        papers
          .map((paper) => paper.researchArea)
          .filter(Boolean)
      ),
    ].sort();
  }, [papers]);

  /* ================= MULTIPLE FILTER ================= */

  const filteredPapers = useMemo(() => {
    let result = [...papers];

    /* KEYWORD */

    if (searchKeyword.trim()) {
      const query = searchKeyword
        .trim()
        .toLowerCase();

      result = result.filter((paper) => {
        const authors = paper.authors
          ?.map((author) => author.name)
          .join(" ");

        const searchableText = [
          paper.paperTitle,
          paper.abstract,
          paper.paperId,
          paper.researchArea,
          authors,
          ...(paper.keywords || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    /* VOLUME */

    if (volume !== "Any") {
      result = result.filter(
        (paper) =>
          getPaperVolume(paper) ===
          Number(volume)
      );
    }

    /* ISSUE */

    if (issue !== "Any") {
      result = result.filter(
        (paper) =>
          getPaperIssue(paper) === Number(issue)
      );
    }

    /* CATEGORY */

    if (category !== "All") {
      result = result.filter(
        (paper) =>
          paper.researchArea === category
      );
    }

    /* SORT */

    if (sort === "Latest") {
      result.sort(
        (a, b) =>
          new Date(
            b.publishedAt || b.createdAt
          ) -
          new Date(
            a.publishedAt || a.createdAt
          )
      );
    }

    if (sort === "Oldest") {
      result.sort(
        (a, b) =>
          new Date(
            a.publishedAt || a.createdAt
          ) -
          new Date(
            b.publishedAt || b.createdAt
          )
      );
    }

    return result;
  }, [
    papers,
    searchKeyword,
    volume,
    issue,
    category,
    sort,
    years,
  ]);

  /* ================= SEARCH ================= */

  const handleSearch = () => {
    setSearchKeyword(keyword);
  };

  /* ================= AUTHORS ================= */

  const getAuthors = (authors = []) => {
    if (!authors.length) {
      return "Unknown Author";
    }

    return authors
      .map(
        (author) =>
          author.name ||
          author.fullName ||
          author.authorName
      )
      .filter(Boolean)
      .join(", ");
  };

  /* ================= PDF ================= */

  const handlePdf = (paperFile) => {
    if (!paperFile) {
      alert("PDF not available");
      return;
    }

    const pdfUrl = paperFile.startsWith("http")
      ? paperFile
      : `${BASE_URL}/${paperFile.replace(/\\/g, "/")}`;

    window.open(pdfUrl, "_blank");
  };

  return (
    <section className="authorarchive">
      <div className="authorarchive-glow authorarchive-glow1" />
      <div className="authorarchive-glow authorarchive-glow2" />

      <div className="authorarchive-container">

        {/* FILTER */}

        <div className="authorarchive-filter">
          <div className="authorarchive-filter-grid">

            {/* KEYWORD */}

            <div className="authorarchive-input-group authorarchive-large">
              <label>
                Keyword / Title / Author
              </label>

              <input
                type="text"
                placeholder="Search title, author, keyword..."
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>

            {/* VOLUME */}

            <div className="authorarchive-input-group">
              <label>Volume</label>

              <select
                value={volume}
                onChange={(e) =>
                  setVolume(e.target.value)
                }
              >
                <option value="Any">Any</option>

                {volumeOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    Volume {item}
                  </option>
                ))}
              </select>
            </div>

            {/* ISSUE */}

            <div className="authorarchive-input-group">
              <label>Issue</label>

              <select
                value={issue}
                onChange={(e) =>
                  setIssue(e.target.value)
                }
              >
                <option value="Any">Any</option>

                {issueOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    Issue{" "}
                    {String(item).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            {/* CATEGORY */}

            <div className="authorarchive-input-group">
              <label>Category</label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option value="All">All</option>

                {categoryOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="authorarchive-search-btn"
            onClick={handleSearch}
          >
            <FaSearch />
            Search
          </button>
        </div>

        {/* RESULT TOP */}

        <div className="authorarchive-result-top">
          <p>
            Showing {filteredPapers.length} of{" "}
            {papers.length} results
          </p>

          <select
            className="authorarchive-sort"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="Latest">
              Latest
            </option>

            <option value="Oldest">
              Oldest
            </option>
          </select>
        </div>

        {/* CARDS */}

        <div className="authorarchive-grid">
          {loading ? (
            <p>Loading published papers...</p>
          ) : filteredPapers.length === 0 ? (
            <p>No published papers found.</p>
          ) : (
            filteredPapers.map((paper) => {
              const paperDate =
                paper.publishedAt ||
                paper.createdAt;

              const paperVolume =
                getPaperVolume(paper);

              const paperIssue =
                getPaperIssue(paper);

              return (
                <div
                  className="authorarchive-card"
                  key={paper._id}
                >
                  <div className="authorarchive-card-top">
                    <span className="authorarchive-category">
                      {paper.researchArea ||
                        "Research"}
                    </span>

                    <div className="authorarchive-meta">
                      <span>
                        <FaCalendarAlt />

                        {new Date(
                          paperDate
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </span>

                      <span>
                        <FaBookOpen />

                        Vol {paperVolume} • Issue{" "}
                        {String(
                          paperIssue
                        ).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <h3 className="authorarchive-title">
                    {paper.paperTitle}
                  </h3>

                  <div className="authorarchive-authors">
                    <FaUserEdit />

                    {getAuthors(paper.authors)}
                  </div>

                  <div className="authorarchive-doi">
                    Paper ID: {paper.paperId}
                  </div>

                  <div className="authorarchive-card-bottom">
                    <button
                      className="authorarchive-pdf"
                      onClick={() =>
                        handlePdf(paper.paperFile)
                      }
                    >
                      <FaFilePdf />
                      PDF
                    </button>

                    <Link
                      to={`/sample-article/${paper._id}`}
                      className="authorarchive-read"
                    >
                      Read Article
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthorArchive;