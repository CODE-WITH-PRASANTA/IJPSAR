import React, { useEffect, useState } from "react";
import "./EditorialBoardSec.css";
import API, { BASE_URL } from "../../api/axios";

import {
  FaGlobeAsia,
  FaUserGraduate,
  FaAward,
} from "react-icons/fa";

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
      const res = await API.get("/editorialboard/category-wise");

      if (res.data.success) {
        const grouped = res.data.data;

        const formatted = Object.entries(grouped).map(
          ([title, members]) => ({
            title,
            members,
          })
        );

        setSections(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch editorial board:", err);
    } finally {
      setLoading(false);
    }
  };

  const getImage = (path) => {
    if (!path) {
      return "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop";
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

  if (loading) {
    return (
      <div className="editorialLoading">
        Loading Editorial Board...
      </div>
    );
  }

  return (
    <section className="editorialBoard">
      <div className="editorialBoardContainer">
        {/* Top Content */}
        <div className="editorialTopContent">
          <span className="editorialMiniTag">
            INTERNATIONAL EDITORIAL TEAM
          </span>

          <h2>
            Meet Our <span>Editorial Experts</span>
          </h2>

          <p>
            IJPASR is guided by distinguished academicians, scientists,
            researchers, and industry professionals committed to maintaining
            high publication standards.
          </p>
        </div>

        {/* Sections */}
        {sections
          .filter((section) => section.members.length > 0)
          .map((section) => (
            <div className="editorialSection" key={section.title}>
              <div className="sectionTitleWrap">
                <h3>{section.title}</h3>
                <div className="sectionLine"></div>
              </div>

              <div className="editorialGrid">
                {section.members.map((member) => (
                  <div className="editorialCard" key={member._id}>
                    <div className="cardGlow"></div>

                    <div className="topBadge">
                      <FaAward />
                    </div>

                    <div className="editorialImageWrap">
                      <img
                        src={getImage(member.profileImage)}
                        alt={member.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop";
                        }}
                      />
                    </div>

                    <div className="editorialContent">
                      <h4>{member.name}</h4>

                      <span>{member.designation}</span>

                      <p>{member.institution}</p>

                      <div className="editorialFooter">
                        {(member.tags || [])
                          .slice(0, 2)
                          .map((tag, index) => (
                            <div className="footerItem" key={index}>
                              {getTagIcon(index)}
                              <small>{tag}</small>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default EditorialBoard;