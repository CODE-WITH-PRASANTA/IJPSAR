// EditorialBoard.jsx
import React, { useState, useEffect } from "react";
import API, { BASE_URL } from "../../api/axios"; 
import "./EditorialBoardSec.css";

import {
  FaGlobeAsia,
  FaUserGraduate,
  FaAward,
} from "react-icons/fa";

/* ================= IMAGES ================= */
import editor1 from "../../assets/editor-1.jpg";
import editor2 from "../../assets/editor-2.jpg";
import editor3 from "../../assets/editor-3.webp";
import editor4 from "../../assets/editor-4.jpg";
import editor5 from "../../assets/editor-5.jpg";
import editor6 from "../../assets/editor-6.jpg";
import editor7 from "../../assets/editor-7.jpg";
import editor8 from "../../assets/editor-8.jpg";
import editor9 from "../../assets/editor-2.jpg";

/* ================= FALLBACK DATA ================= */
const fallbackSections = [
  {
    title: "Patron & Management",
    members: [
      {
        image: editor1,
        name: "Mrs. Neha",
        role: "Managing Director (MD) & CEO",
        location: "IJPASR Editorial Office",
        tags: ["Researcher", "Global Board"]
      },
    ],
  },
  {
    title: "Editor-in-Chief",
    members: [
      {
        image: editor2,
        name: "Prof. (Dr.) Ravinesh Mishra",
        role: "Editor-in-Chief (Executive)",
        location: "Baddi University of Emerging Sciences & Technology, India",
        tags: ["Researcher", "Global Board"]
      },
      {
        image: editor3,
        name: "Dr. Tulsi Bisht",
        role: "Editor-in-Chief",
        location: "Department of Pharmacy, Uttarakhand, India",
        tags: ["Researcher", "Global Board"]
      },
      {
        image: editor4,
        name: "Prof. (Dr.) Bhuwanendra Singh",
        role: "Editor-in-Chief",
        location: "SD College of Pharmacy & Vocational Studies, India",
        tags: ["Researcher", "Global Board"]
      },
    ],
  },
  {
    title: "International Editorial Advisory Board",
    members: [
      {
        image: editor5,
        name: "Dr. Sreemoy Kanti Das",
        role: "Associate Professor",
        location: "Lincoln University College, Malaysia",
        tags: ["Researcher", "Global Board"]
      },
      {
        image: editor6,
        name: "Dr. Mohammad Rashid",
        role: "Associate Professor",
        location: "College of Dentistry & Pharmacy, Saudi Arabia",
        tags: ["Researcher", "Global Board"]
      },
    ],
  },
  {
    title: "Editorial Board",
    members: [
      {
        image: editor7,
        name: "Dr. Swarupananda Mukherjee",
        role: "Associate Professor",
        location: "NSHM Knowledge Campus, Kolkata, India",
        tags: ["Researcher", "Global Board"]
      },
      {
        image: editor8,
        name: "Dr. Bashirulla Shaik",
        role: "Assistant Professor",
        location: "NITTTR Bhopal, Madhya Pradesh, India",
        tags: ["Researcher", "Global Board"]
      },
      {
        image: editor9,
        name: "Dr. Touseef Hussain",
        role: "Chief Scientist (Plant Pathologist)",
        location: "Sevama Agri Clinic Laboratory, Gujarat, India",
        tags: ["Researcher", "Global Board"]
      },
    ],
  },
];

const EditorialBoard = () => {
  const [dbMembers, setDbMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from live database backend
  useEffect(() => {
    const fetchLiveMembers = async () => {
      try {
        const response = await API.get("/editorialboard/all");
        let dataArray = [];
        
        if (Array.isArray(response.data)) {
          dataArray = response.data;
        } else if (response.data && Array.isArray(response.data.members)) {
          dataArray = response.data.members;
        } else if (response.data && typeof response.data === 'object') {
          dataArray = response.data.data || [];
        }
        
        setDbMembers(dataArray);
      } catch (error) {
        console.error("Error connecting to editorial board backend dataset:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMembers();
  }, []);

  // Utility logic parser to resolve relative asset paths clean of syntax errors
  const parseImageSource = (imagePath) => {
    if (!imagePath) return "👤";
    if (
      imagePath.startsWith("http://") || 
      imagePath.startsWith("https://") || 
      imagePath.startsWith("blob:") || 
      imagePath.startsWith("data:") ||
      imagePath.startsWith("static/media/")
    ) {
      return imagePath;
    }
    const cleanBase = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
    return `${cleanBase}/${cleanPath}`;
  };

  // Safe parsing helper for custom user tags coming from the database
  const parseMemberTags = (tagsField) => {
    if (!tagsField) return ["Researcher", "Global Board"]; // Default fallback tags
    
    if (Array.isArray(tagsField)) {
      return tagsField.length > 0 ? tagsField : ["Researcher", "Global Board"];
    }
    
    if (typeof tagsField === "string") {
      try {
        const parsed = JSON.parse(tagsField);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // Fallback if it's a comma-separated string instead of serialized JSON
        const splitTags = tagsField.split(",").map(t => t.trim()).filter(Boolean);
        if (splitTags.length > 0) return splitTags;
      }
    }
    
    return ["Researcher", "Global Board"];
  };

  // Dynamic conditional footer icon assigner to fit your existing visual design markup styles
  const getTagIcon = (tagIndex) => {
    // Alternates icons elegantly based on positioning parameters
    return tagIndex % 2 === 0 ? <FaUserGraduate /> : <FaGlobeAsia />;
  };

  // Titles targeted structural layout mapping sequence rules definitions
  const targetCategories = [
    "Patron & Management",
    "Editor-in-Chief",
    "International Editorial Advisory Board",
    "Editorial Board"
  ];

  // Construct structured dynamic UI object lists from backend database responses
  const activeDisplaySections = targetCategories.map((title) => {
    const filteredDBRecords = dbMembers.filter(
      (m) => m.category?.trim().toLowerCase() === title.toLowerCase()
    );

    // Transform dynamic parameters structural model names cleanly onto existing cards markup interfaces 
    const mappedDBMembers = filteredDBRecords.map((m) => ({
      image: parseImageSource(m.profileImage || m.image),
      name: m.name,
      role: m.designation || m.role,
      location: m.institution || m.location,
      tags: parseMemberTags(m.tags)
    }));

    // If live database contains records for this tier, use them. Else, load the design fallback mockups.
    if (mappedDBMembers.length > 0) {
      return { title, members: mappedDBMembers };
    } else {
      const fallbackMatch = fallbackSections.find((sec) => sec.title === title);
      return { title, members: fallbackMatch ? fallbackMatch.members : [] };
    }
  });

  return (
    <section className="editorialBoard">
      <div className="editorialBoardContainer">

        {/* ================= TOP CONTENT ================= */}
        <div className="editorialTopContent">
          <span className="editorialMiniTag">
            INTERNATIONAL EDITORIAL TEAM
          </span>

          <h2>
            Meet Our
            <span> Editorial Experts</span>
          </h2>

          <p>
            IJPASR is guided by distinguished
            academicians, scientists, researchers,
            and industry professionals committed to
            maintaining high publication standards.
          </p>
        </div>

        {/* ================= ALL SECTIONS ================= */}
        {activeDisplaySections.map((section, index) => (
          <div
            className="editorialSection"
            key={index}
          >
            {/* SECTION TITLE */}
            <div className="sectionTitleWrap">
              <h3>{section.title}</h3>
              <div className="sectionLine"></div>
            </div>

            {/* GRID */}
            <div className="editorialGrid">
              {section.members.map((member, i) => (
                <div
                  className="editorialCard"
                  key={i}
                >
                  {/* CARD GLOW */}
                  <div className="cardGlow"></div>

                  {/* TOP BADGE */}
                  <div className="topBadge">
                    <FaAward />
                  </div>

                  {/* IMAGE */}
                  <div className="editorialImageWrap">
                    <img
                      src={member.image}
                      alt={member.name}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"; 
                      }}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="editorialContent">
                    <h4>{member.name}</h4>
                    <span>{member.role}</span>
                    <p>{member.location}</p>

                    {/* FOOTER - DYNAMIC TAGS PIPELINE */}
                    <div className="editorialFooter">
                      {member.tags.slice(0, 2).map((tag, tagIdx) => (
                        <div className="footerItem" key={tagIdx}>
                          {getTagIcon(tagIdx)}
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