// ArticleDetails.jsx

import React from "react";
import "./ArticleDetailsSec.css";

import {
  FaFilePdf,
  FaQuoteRight,
  FaShareAlt,
  FaRegBookmark,
} from "react-icons/fa";

const ArticleDetails = () => {
  return (
    <section className="articleDetailsSection">

      {/* BACKGROUND GLOW */}
      <div className="articleDetailsBgGlowOne"></div>
      <div className="articleDetailsBgGlowTwo"></div>

      <div className="articleDetailsContainer">

        {/* ======================================================
            LEFT SIDE
        ====================================================== */}
        <div className="articleDetailsLeft">

          {/* TAGS */}
          <div className="articleDetailsTags">

            <span className="articleDetailsTag active">
              Open Access
            </span>

            <span className="articleDetailsTag">
              Original Research
            </span>

            <span className="articleDetailsTag">
              Pharmaceutics
            </span>

          </div>

          {/* TITLE */}
          <h1 className="articleDetailsTitle">
            Novellipid nanoparticles enhance oral bioavailability
            of curcumin in rats: A pharmacokinetic study
          </h1>

          {/* AUTHORS */}
          <div className="articleDetailsAuthors">
            R. Sharma<sup>1</sup>, J. Patel<sup>1</sup>,
            M. Kuznetsov<sup>2</sup>
          </div>

          {/* AFFILIATION */}
          <div className="articleDetailsAffiliation">
            <sup>1</sup> Dept. of Pharmaceutics,
            University of Mumbai, India ·
            <sup>2</sup> Moscow State Medical Univ., Russia
          </div>

          {/* ACTION BUTTONS */}
          <div className="articleDetailsActions">

            <button className="articleDetailsBtn primary">
              <FaFilePdf />
              Download PDF
            </button>

            <button className="articleDetailsBtn">
              <FaQuoteRight />
              Cite
            </button>

            <button className="articleDetailsBtn">
              <FaShareAlt />
              Share
            </button>

            <button className="articleDetailsBtn">
              <FaRegBookmark />
              Save
            </button>

          </div>

          {/* DOI */}
          <div className="articleDetailsDOI">
            <span>DOI:</span>
            {" "}
            10.55421/ijpasr.2025.1206.001
          </div>

          {/* ABSTRACT */}
          <div className="articleDetailsBlock">

            <h2>Abstract</h2>

            <p>
              Curcumin, a polyphenolic compound from
              <i> Curcuma longa</i>, exhibits poor oral
              bioavailability. This study formulated
              solid lipid nanoparticles (SLN) loaded
              with curcumin via hot homogenization,
              characterized their physicochemical
              properties, and evaluated pharmacokinetics
              in Wistar rats.
              The optimized SLN formulation showed a
              3.8-fold increase in AUC compared to free
              curcumin, demonstrating SLN as a promising
              strategy for enhancing curcumin bioavailability.
            </p>

          </div>

          {/* KEYWORDS */}
          <div className="articleDetailsBlock">

            <h2>Keywords</h2>

            <div className="articleKeywords">

              <span className="articleKeyword">
                curcumin
              </span>

              <span className="articleKeyword">
                solid lipid nanoparticles
              </span>

              <span className="articleKeyword">
                oral bioavailability
              </span>

              <span className="articleKeyword">
                pharmacokinetics
              </span>

            </div>

          </div>

          {/* INTRODUCTION */}
          <div className="articleDetailsBlock">

            <h3>1. Introduction</h3>

            <p>
              Curcumin has been extensively studied for
              its anti-inflammatory, antioxidant, and
              anticancer properties. However, its clinical
              translation is hindered by extremely low
              aqueous solubility, rapid metabolism,
              and poor systemic absorption.
            </p>

          </div>

          {/* MATERIALS */}
          <div className="articleDetailsBlock">

            <h3>2. Materials and Methods</h3>

            <p>
              Curcumin (≥98% purity) was procured from
              Sigma-Aldrich. Glyceryl monostearate,
              soy lecithin, and Tween 80 served as lipid
              matrix and surfactants.
              SLN were prepared by hot homogenization
              followed by ultrasonication.
            </p>

          </div>

          {/* RESULTS */}
          <div className="articleDetailsBlock">

            <h3>3. Results</h3>

            <p>
              The optimized SLN formulation exhibited
              a mean particle size of 142 ± 6 nm,
              polydispersity index of 0.18,
              and entrapment efficiency of 89.3%.
              In-vivo pharmacokinetic studies revealed
              significantly enhanced bioavailability.
            </p>

          </div>

          {/* DISCUSSION */}
          <div className="articleDetailsBlock">

            <h3>4. Discussion</h3>

            <p>
              The enhanced bioavailability is attributed
              to lymphatic uptake, protection from
              first-pass metabolism, and improved
              membrane permeability conferred by
              the lipid matrix.
            </p>

          </div>

          {/* REFERENCES */}
          <div className="articleDetailsBlock">

            <h2>References</h2>

            <ol className="articleReferences">

              <li>
                Aggarwal BB, et al. Anticancer potential
                of curcumin. Anticancer Res.
                2003;23:363–98.
              </li>

              <li>
                Müller RH, et al. Solid lipid nanoparticles.
                Eur J Pharm Biopharm.
                2000;50:161–77.
              </li>

              <li>
                Anand P, et al. Bioavailability of curcumin:
                problems and promises.
                Mol Pharm. 2007;4:807–18.
              </li>

            </ol>

          </div>

        </div>

        {/* ======================================================
            RIGHT SIDE
        ====================================================== */}
        <div className="articleDetailsRight">

          <div className="articleDetailsSticky">

            {/* ARTICLE METRICS */}
            <div className="articleSidebarCard">

              <h4 className="articleSidebarTitle">
                Article Metrics
              </h4>

              <div className="articleMetricItem">
                <strong>Views:</strong>
                <span>12,840</span>
              </div>

              <div className="articleMetricItem">
                <strong>Downloads:</strong>
                <span>4,217</span>
              </div>

              <div className="articleMetricItem">
                <strong>Citations:</strong>
                <span>38</span>
              </div>

              <div className="articleMetricItem">
                <strong>Altmetric:</strong>
                <span>64</span>
              </div>

            </div>

            {/* ARTICLE INFO */}
            <div className="articleSidebarCard">

              <h4 className="articleSidebarTitle">
                Article Info
              </h4>

              <div className="articleMetricItem">
                <strong>Received:</strong>
                <span>Sep 18, 2025</span>
              </div>

              <div className="articleMetricItem">
                <strong>Revised:</strong>
                <span>Oct 22, 2025</span>
              </div>

              <div className="articleMetricItem">
                <strong>Accepted:</strong>
                <span>Nov 02, 2025</span>
              </div>

              <div className="articleMetricItem">
                <strong>Published:</strong>
                <span>Nov 12, 2025</span>
              </div>

              <div className="articleMetricItem">
                <strong>Volume:</strong>
                <span>12 · Issue 06</span>
              </div>

            </div>

            {/* RELATED ARTICLES */}
            <div className="articleSidebarCard">

              <h4 className="articleSidebarTitle">
                Related Articles
              </h4>

              <div className="articleRelatedLinks">

                <div className="articleRelatedItem">
                  SLN for topical methotrexate delivery
                </div>

                <div className="articleRelatedItem">
                  Phytochemical profile of W. somnifera
                </div>

                <div className="articleRelatedItem">
                  Nanoemulsion of resveratrol
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ArticleDetails;