// Privacypolicy.jsx

import React from "react";
import "./Privacypolicy.css";

const Privacypolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="privacy-policy__container">

        {/* Main Heading */}
        <h1 className="privacy-policy__main-title">
          PRIVACY POLICY (IJPASR)
        </h1>

        <p className="privacy-policy__text">
          IJPASR respects the privacy of authors, reviewers, and visitors.
          This Privacy Policy explains how we collect, use, and protect
          personal information provided on our website.
        </p>

        {/* Section 1 */}
        <section className="privacy-policy__section">
          <h2 className="privacy-policy__title">
            1. Information We Collect
          </h2>

          <p className="privacy-policy__text">
            We may collect the following information:
          </p>

          {/* Author Info */}
          <div className="privacy-policy__sub-section">
            <h3 className="privacy-policy__sub-title">
              a) Author Information
            </h3>

            <ul className="privacy-policy__list">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Affiliation/Institution</li>
              <li>Address (if provided)</li>
              <li>Manuscript details</li>
            </ul>
          </div>

          {/* Reviewer Info */}
          <div className="privacy-policy__sub-section">
            <h3 className="privacy-policy__sub-title">
              b) Reviewer Information
            </h3>

            <ul className="privacy-policy__list">
              <li>Name and contact details</li>
              <li>Expertise area</li>
              <li>Review comments and recommendations</li>
            </ul>
          </div>

          {/* Visitor Info */}
          <div className="privacy-policy__sub-section">
            <h3 className="privacy-policy__sub-title">
              c) Website Visitor Information
            </h3>

            <ul className="privacy-policy__list">
              <li>IP address</li>
              <li>browser type</li>
              <li>device information</li>
              <li>location data (approximate)</li>
              <li>pages visited and time spent</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="privacy-policy__section">
          <h2 className="privacy-policy__title">
            2. Use of Information
          </h2>

          <p className="privacy-policy__text">
            Collected information is used for:
          </p>

          <ul className="privacy-policy__list">
            <li>Manuscript Submission and Processing</li>
            <li>Peer Review Communication</li>
            <li>Sending Acceptance/Rejection Notifications</li>
            <li>Sending Publication Updates</li>
            <li>Maintaining Journal Records</li>
            <li>Improving Website Performance</li>
            <li>Sending Newsletters (if subscribed)</li>
          </ul>

          <p className="privacy-policy__text">
            IJPASR does not sell personal information to any third party.
          </p>
        </section>

        {/* Section 3 */}
        <section className="privacy-policy__section">
          <h2 className="privacy-policy__title">
            3. Data Protection and Security
          </h2>

          <p className="privacy-policy__text">
            We follow standard security measures to protect user information.
          </p>

          <p className="privacy-policy__text">
            However, IJPASR cannot guarantee 100% security against hacking,
            unauthorized access, or technical failures.
          </p>
        </section>

        {/* Section 4 */}
        <section className="privacy-policy__section">
          <h2 className="privacy-policy__title">
            4. Cookies Policy
          </h2>

          <p className="privacy-policy__text">
            IJPASR website may use cookies to enhance user experience.
          </p>

          <p className="privacy-policy__text">
            Cookies may be used to:
          </p>

          <ul className="privacy-policy__list">
            <li>Store User Preferences</li>
            <li>Analyse Website Traffic</li>
            <li>Improve functionality</li>
          </ul>

          <p className="privacy-policy__text">
            Users may disable cookies through browser settings.
          </p>
        </section>

        {/* Section 5 */}
        <section className="privacy-policy__section">
          <h2 className="privacy-policy__title">
            5. Third-Party Sharing
          </h2>

          <p className="privacy-policy__text">
            We may share limited information with:
          </p>

          <ul className="privacy-policy__list">
            <li>Indexing Agencies</li>
            <li>DOI Registration Agencies</li>
            <li>Journal Hosting Providers</li>
          </ul>

          <p className="privacy-policy__text">
            only when required for publication and indexing purposes.
          </p>
        </section>

        {/* Section 6 */}
        <section className="privacy-policy__section">
          <h2 className="privacy-policy__title">
            6. Email Communication Policy
          </h2>

          <p className="privacy-policy__text">
            Authors and reviewers may receive emails related to:
          </p>

          <ul className="privacy-policy__list">
            <li>Submission Status</li>
            <li>Review Updates</li>
            <li>Publication Notifications</li>
            <li>Journal Announcements</li>
          </ul>

          <p className="privacy-policy__text">
            If a user wishes to stop receiving promotional emails, they can
            contact the journal.
          </p>
        </section>

        {/* Section 7 */}
        <section className="privacy-policy__section">
          <h2 className="privacy-policy__title">
            7. Policy Updates
          </h2>

          <p className="privacy-policy__text">
            IJPASR reserves the right to update this privacy policy anytime
            without prior notice.
          </p>

          <p className="privacy-policy__text">
            Updated policy will be effective once published on the website.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Privacypolicy;