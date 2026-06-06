import React, { useState } from "react";
import API from "../../api/axios";
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

  // ================= HANDLE INPUT =================
  const handleFloatingFormChange = (e) => {
    setFloatingFormData({
      ...floatingFormData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleFloatingFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ FIX: use API instead of axios
      const response = await API.post(
        "/floatingform/create",
        floatingFormData
      );

      if (response.data.success) {
        alert("Lead Submitted Successfully!");

        setFloatingFormData({
          name: "",
          address: "",
          phone: "",
          message: "",
        });
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Submit Error:", error);

      alert(
        error?.response?.data?.message || "Failed to submit lead"
      );
    }
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

              <h2 className="floatingFormHeading">IJPASR</h2>

              <p className="floatingFormSubHeading">
                International Journal of Pharmaceutical and Allied Science Research
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
              />

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