// EditorialBoard.jsx

import React from "react";
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

/* ================= DATA ================= */

const sections = [
  {
    title: "Patron & Management",

    members: [
      {
        image: editor1,
        name: "Mrs. Neha",
        role: "Managing Director (MD) & CEO",
        location: "IJPASR Editorial Office",
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
        location:
          "Baddi University of Emerging Sciences & Technology, India",
      },

      {
        image: editor3,
        name: "Dr. Tulsi Bisht",
        role: "Editor-in-Chief",
        location:
          "Department of Pharmacy, Uttarakhand, India",
      },

      {
        image: editor4,
        name: "Prof. (Dr.) Bhuwanendra Singh",
        role: "Editor-in-Chief",
        location:
          "SD College of Pharmacy & Vocational Studies, India",
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
        location:
          "Lincoln University College, Malaysia",
      },

      {
        image: editor6,
        name: "Dr. Mohammad Rashid",
        role: "Associate Professor",
        location:
          "College of Dentistry & Pharmacy, Saudi Arabia",
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
        location:
          "NSHM Knowledge Campus, Kolkata, India",
      },

      {
        image: editor8,
        name: "Dr. Bashirulla Shaik",
        role: "Assistant Professor",
        location:
          "NITTTR Bhopal, Madhya Pradesh, India",
      },

      {
        image: editor9,
        name: "Dr. Touseef Hussain",
        role:
          "Chief Scientist (Plant Pathologist)",
        location:
          "Sevama Agri Clinic Laboratory, Gujarat, India",
      },
    ],
  },
];

const EditorialBoard = () => {
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

        {sections.map((section, index) => (
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
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="editorialContent">
                    <h4>{member.name}</h4>

                    <span>{member.role}</span>

                    <p>{member.location}</p>

                    {/* FOOTER */}
                    <div className="editorialFooter">
                      <div className="footerItem">
                        <FaUserGraduate />
                        <small>Researcher</small>
                      </div>

                      <div className="footerItem">
                        <FaGlobeAsia />
                        <small>Global Board</small>
                      </div>
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