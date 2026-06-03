import React from "react";
import "./Homesec.css";
import {
  FaArrowRight,
  FaGlobe,
  FaBookOpen,
  FaSearch,
} from "react-icons/fa";

import heroBg from "../../assets/p-1.jpg";
import logo from "../../assets/p-2.jpeg";
import { motion } from "framer-motion";

const PharmaHero = () => {
  return (
    <motion.section
      className="pharmaHero"
      style={{
        backgroundImage: `linear-gradient(
          rgba(3, 25, 52, 0.90),
          rgba(7, 55, 92, 0.85)
        ), url(${heroBg})`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="pharmaOverlay"></div>

      <div className="pharmaContainer">

        {/* LEFT CONTENT */}
        <motion.div
          className="pharmaLeft"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="pharmaTag"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="tagDot"></span>
            Open Access • Peer-Reviewed • Quarterly
          </motion.div>

          <motion.div
            className="pharmaTitleWrap"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.img
              src={logo}
              alt="journal-logo"
              className="pharmaLogo"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />

            <h1 className="pharmaTitle">
              International Journal of
              <span> Pharmaceutical & Allied </span>
              Sciences Research
            </h1>
          </motion.div>

          <motion.p
            className="pharmaDescription"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            A global platform dedicated to innovative pharmaceutical and allied
            sciences research. Publish high-quality peer-reviewed articles with
            rapid review, international visibility, and impactful scientific
            contribution.
          </motion.p>

          <motion.div
            className="pharmaButtons"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="submitBtn"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Submit Paper
              <FaArrowRight />
            </motion.button>

            <motion.button
              className="issueBtn"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <FaBookOpen />
              Current Issue
            </motion.button>
          </motion.div>

          <motion.div
            className="pharmaSearch"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <input
              type="text"
              placeholder="Search articles, authors, DOI, keywords..."
            />

            <motion.button
              whileHover={{
                scale: 1.1,
              }}
            >
              <FaSearch />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="pharmaRight"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="statsCard"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[ 
              { title: "3-4", text: "Days To Publish" },
              { title: "24h", text: "Fast Track" },
              { title: "Global", text: "Research Reach" },
              { title: "1-2", text: "Days Review" }
            ].map((item, index) => (
              <motion.div
                className="statBox"
                key={index}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.2
                }}
                whileHover={{
                  y: -10
                }}
              >
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="floatingCard"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <FaGlobe className="floatingIcon" />

            <div>
              <h3>International Visibility</h3>
              <p>
                Indexed and accessible worldwide for researchers,
                institutions, and scholars.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PharmaHero;