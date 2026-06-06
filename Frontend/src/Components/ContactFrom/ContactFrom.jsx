import React, { useEffect, useState } from "react";
import "./ContactFrom.css";
import {
  FaEnvelope,
  FaGlobe,
  FaClock,
  FaPaperPlane,
  FaAward,
} from "react-icons/fa";
import API from "../../api/axios";

const ContactFrom = () => {
  const [contacts, setContacts] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    message: "",
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts");
      setContacts(res.data || []);
    } catch (error) {
      console.error("GET Error:", error);
    }
  };

  // Safe fallback search logic for the primary admin block
  const adminContactDoc = contacts.find(
    (c) => c.primaryEmail && c.primaryEmail !== "no-email-provided@domain.com" && !c.message
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      name: formData.fullName,
      address: formData.address,
      phone: formData.phoneNumber,
      message: formData.message,
    };

    const res = await API.post(
      "/floatingform/create",
      payload
    );

    console.log("Lead Created:", res.data);

    alert("Message sent successfully!");

    setFormData({
      fullName: "",
      address: "",
      phoneNumber: "",
      message: "",
    });

  } catch (error) {
    console.error(
      "POST Error:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
      "Failed to send message"
    );
  }
};

  // UI layout fallback definitions
  const displayEmail = adminContactDoc?.primaryEmail || "editor@ijpasr.com";
  const displaySecEmail = adminContactDoc?.secondaryEmail || "editorijpasr@gmail.com";
  const displayWebsite = adminContactDoc?.website || "www.ijpasr.com";
  const displayResponse = adminContactDoc?.responseTime || "24–48 Hours";

  return (
    <section className="contactFrom">
      <div className="contactFrom-container">

        {/* Left Side: Contact Information Sidebar */}
        <div className="contactFrom-left">
          <span className="contactFrom-tag">
            Editorial Office
          </span>

          <h2 className="contactFrom-heading">
            Get In <span>Touch</span>
          </h2>

          <p className="contactFrom-description">
            For manuscript submission, peer review,
            publication support, indexing,
            certificates, and journal related queries —
            connect with the editorial office anytime.
          </p>

          <div className="contactFrom-infoWrapper">
            <div className="contactFrom-infoItem">
              <div className="contactFrom-infoIcon">
                <FaEnvelope />
              </div>
              <p>{displayEmail}</p>
            </div>

            <div className="contactFrom-infoItem">
              <div className="contactFrom-infoIcon">
                <FaEnvelope />
              </div>
              <p>{displaySecEmail}</p>
            </div>

            <div className="contactFrom-infoItem">
              <div className="contactFrom-infoIcon">
                <FaGlobe />
              </div>
              <p>{displayWebsite}</p>
            </div>

            <div className="contactFrom-infoItem">
              <div className="contactFrom-infoIcon">
                <FaClock />
              </div>
              <p>Editorial response: {displayResponse}</p>
            </div>
          </div>

          <div className="contactFrom-awardCard">
            <div className="contactFrom-awardGlow"></div>
            <div className="contactFrom-awardTop">
              <div className="contactFrom-awardIcon">
                <FaAward />
              </div>
              <h3>Best Paper Award Nomination</h3>
            </div>
            <p>
              Submit nomination with paper title,
              authors, article ID and justification.
            </p>
          </div>
        </div>

        {/* Right Side: Message Submission Form */}
        <div className="contactFrom-right">
          <div className="contactFrom-formGlow"></div>

          <div className="contactFrom-formHeader">
            <h3>Send Us A Message</h3>
            <p>
              We usually respond within 24–48 hours.
            </p>
          </div>

          <form className="contactFrom-form" onSubmit={handleSubmit}>
            <div className="contactFrom-grid">
              <div className="contactFrom-inputGroup">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                />
              </div>

              <div className="contactFrom-inputGroup">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  required
                />
              </div>
            </div>

            <div className="contactFrom-inputGroup">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                required
              />
            </div>

            <div className="contactFrom-inputGroup">
              <label>Write Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write Your Message"
                rows="6"
                required
              />
            </div>

            <button type="submit" className="contactFrom-submitBtn">
              <FaPaperPlane />
              <span>Send Message</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactFrom;