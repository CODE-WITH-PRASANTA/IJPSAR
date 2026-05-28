import React, { useState } from "react";
import "./FloatingForm.css";
import logo from "../../assets/p-2.JPEG";

const FloatingForm = () => {
  const [floatingFormOpen, setFloatingFormOpen] = useState(true);

  const [floatingFormData, setFloatingFormData] = useState({
    name: "",
    address: "",
    phone: "",
    message: "",
  });

  const handleFloatingFormChange = (e) => {
    setFloatingFormData({
      ...floatingFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFloatingFormSubmit = (e) => {
    e.preventDefault();

    alert("Lead Submitted Successfully!");

    setFloatingFormData({
      name: "",
      address: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
      {floatingFormOpen && (
        <div className="floatingFormWrapper">
          <div className="floatingFormCard">
            {/* CLOSE BUTTON */}

            <button
              className="floatingFormCloseBtn"
              onClick={() => setFloatingFormOpen(false)}
            >
              ×
            </button>

            {/* HEADER */}

            <div className="floatingFormHeader">
              <div className="floatingFormLogoBox">
                <img
                  src={logo}
                  alt="IJPASR"
                  className="floatingFormLogo"
                />
              </div>

              <h2 className="floatingFormHeading">IJPASR </h2>

              <p className="floatingFormSubHeading">
                International Journal of Pharmaceutical and Allied Science
                Research
              </p>
            </div>

            {/* FORM */}

            <form
              className="floatingFormForm"
              onSubmit={handleFloatingFormSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={floatingFormData.name}
                onChange={handleFloatingFormChange}
                className="floatingFormInput"
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Enter Address"
                value={floatingFormData.address}
                onChange={handleFloatingFormChange}
                className="floatingFormInput"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                value={floatingFormData.phone}
                onChange={handleFloatingFormChange}
                className="floatingFormInput"
                required
              />

              <textarea
                name="message"
                placeholder="Write Your Message"
                rows="4"
                value={floatingFormData.message}
                onChange={handleFloatingFormChange}
                className="floatingFormTextarea"
                required
              ></textarea>

              <button type="submit" className="floatingFormSubmitBtn">
                Submit Lead
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingForm;