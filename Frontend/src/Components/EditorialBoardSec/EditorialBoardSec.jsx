
import React, { useEffect, useState } from "react";
import "./EditorialBoardSec.css";

import API, { BASE_URL } from "../../api/axios";

import {
  FaGlobeAsia,
  FaUserGraduate,
  FaAward,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBookOpen,
} from "react-icons/fa";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop";

const getTagIcon = (index) => {
  return index % 2 === 0 ? <FaUserGraduate /> : <FaGlobeAsia />;
};

const EditorialBoard = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/editorialboard/category-wise"
      );

      if (res.data?.success) {
        const grouped = res.data.data || {};

        const formatted = Object.entries(grouped).map(
          ([title, members]) => ({
            title,
            members: Array.isArray(members)
              ? members
              : [],
          })
        );

        setSections(formatted);
      } else {
        setSections([]);
      }
    } catch (err) {
      console.error(
        "Failed to fetch editorial board:",
        err
      );

      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  const getImage = (path) => {
    if (!path) {
      return DEFAULT_IMAGE;
    }

    if (
      path.startsWith("http://") ||
      path.startsWith("https://") ||
      path.startsWith("blob:") ||
      path.startsWith("data:")
    ) {
      return path;
    }

    const base = BASE_URL.endsWith("/")
      ? BASE_URL.slice(0, -1)
      : BASE_URL;

    const imagePath = path.startsWith("/")
      ? path.slice(1)
      : path;

    return `${base}/${imagePath}`;
  };

  const getOrcidUrl = (orcid) => {
    if (!orcid) return "";

    const cleanOrcid = String(orcid)
      .trim()
      .replace(
        /^https?:\/\/orcid\.org\//i,
        ""
      )
      .replace(/^orcid\.org\//i, "");

    return `https://orcid.org/${cleanOrcid}`;
  };

  const getTags = (tags) => {
    if (Array.isArray(tags)) {
      return tags.filter(Boolean);
    }

    if (typeof tags === "string") {
      try {
        const parsed = JSON.parse(tags);

        if (Array.isArray(parsed)) {
          return parsed.filter(Boolean);
        }
      } catch {
        return tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      }
    }

    return [];
  };

  if (loading) {
    return (
      <div className="editorialLoading">
        <div className="editorialLoadingSpinner"></div>
        <span>Loading Editorial Board...</span>
      </div>
    );
  }

  return (
    <section className="editorialBoard">
      <div className="editorialBoardContainer">

        {/* ============================
            TOP CONTENT
        ============================ */}

        <div className="editorialTopContent">

          <span className="editorialMiniTag">
            <span className="miniTagDot"></span>
            INTERNATIONAL EDITORIAL TEAM
          </span>

          <h2>
            Meet Our{" "}
            <span>Editorial Experts</span>
          </h2>

          <p>
            IJPASR is guided by distinguished
            academicians, scientists,
            researchers, and industry
            professionals committed to
            maintaining high publication
            standards.
          </p>

        </div>

        {/* ============================
            SECTIONS
        ============================ */}

        {sections
          .filter(
            (section) =>
              section.members &&
              section.members.length > 0
          )
          .map((section) => (

            <div
              className="editorialSection"
              key={section.title}
            >

              {/* SECTION TITLE */}

              <div className="sectionTitleWrap">

                <div className="sectionTitleIcon">
                  <FaAward />
                </div>

                <h3>
                  {section.title}
                </h3>

                <div className="sectionLine"></div>

                <span className="sectionCount">
                  {section.members.length}
                </span>

              </div>

              {/* GRID */}

              <div className="editorialGrid">

                {section.members.map(
                  (member, index) => {

                    const memberId =
                      member._id ||
                      member.id ||
                      `${member.name}-${index}`;

                    const image = getImage(
                      member.profileImage
                    );

                    const orcid =
                      member.orcid ||
                      member.ORCID ||
                      member.orcidId ||
                      "";

                    const orcidUrl =
                      getOrcidUrl(orcid);

                    const memberTags =
                      getTags(member.tags);

                    return (
                      <article
                        className="editorialCard"
                        key={memberId}
                      >

                        {/* CARD GLOW */}

                        <div className="cardGlow"></div>

                        <div className="cardGlowSecondary"></div>

                        {/* TOP BADGE */}

                        <div className="topBadge">
                          <FaAward />
                        </div>

                        {/* IMAGE */}

                        <div className="editorialImageWrap">

                          <div className="imageRing"></div>

                          <img
                            src={image}
                            alt={
                              member.name ||
                              "Editorial Board Member"
                            }
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror =
                                null;

                              e.currentTarget.src =
                                DEFAULT_IMAGE;
                            }}
                          />

                        </div>

                        {/* CONTENT */}

                        <div className="editorialContent">

                          {/* NAME */}

                          <h4>
                            {member.name ||
                              "Name not available"}
                          </h4>

                          {/* DESIGNATION */}

                          {member.designation && (
                            <span className="memberDesignation">
                              {member.designation}
                            </span>
                          )}

                          {/* INSTITUTION */}

                          {member.institution && (
                            <p className="memberInstitution">
                              {member.institution}
                            </p>
                          )}

                          {/* CONTACT DETAILS */}

                          <div className="memberDetails">

                            {member.email && (
                              <div className="editorialDetailItem">
                                <div className="detailIcon">
                                  <FaEnvelope />
                                </div>

                                <div className="detailContent">
                                  <small>Email</small>

                                  <a
                                    href={`mailto:${member.email}`}
                                  >
                                    {member.email}
                                  </a>
                                </div>
                              </div>
                            )}

                            {member.phone && (
                              <div className="editorialDetailItem">
                                <div className="detailIcon">
                                  <FaPhone />
                                </div>

                                <div className="detailContent">
                                  <small>Phone</small>

                                  <a
                                    href={`tel:${member.phone}`}
                                  >
                                    {member.phone}
                                  </a>
                                </div>
                              </div>
                            )}

                            {orcid && (
                              <div className="editorialDetailItem">
                                <div className="detailIcon orcidIcon">
                                  <FaIdCard />
                                </div>

                                <div className="detailContent">
                                  <small>ORCID</small>

                                  <a
                                    href={orcidUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {orcid}
                                  </a>
                                </div>
                              </div>
                            )}

                          </div>

                          {/* BIOGRAPHY */}

                          {member.biography && (
                            <div className="editorialBiography">

                              <div className="editorialBiographyTitle">
                                <div className="bioIcon">
                                  <FaBookOpen />
                                </div>

                                <span>
                                  Biography
                                </span>
                              </div>

                              <p>
                                {member.biography}
                              </p>

                            </div>
                          )}

                          {/* TAGS */}

                          {memberTags.length > 0 && (
                            <div className="editorialFooter">

                              {memberTags.map(
                                (tag, tagIndex) => (
                                  <div
                                    className="footerItem"
                                    key={`${tag}-${tagIndex}`}
                                  >
                                    {getTagIcon(
                                      tagIndex
                                    )}

                                    <small>
                                      {tag}
                                    </small>
                                  </div>
                                )
                              )}

                            </div>
                          )}

                        </div>

                      </article>
                    );
                  }
                )}

              </div>

            </div>
          ))}

        {/* NO MEMBERS */}

        {sections.every(
          (section) =>
            !section.members ||
            section.members.length === 0
        ) && (
          <div className="editorialLoading editorialEmpty">
            No Editorial Board Members Found.
          </div>
        )}

      </div>
    </section>
  );
};

export default EditorialBoard;

