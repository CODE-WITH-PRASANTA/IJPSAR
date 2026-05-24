// TestimonialHome.jsx

import React, { useEffect, useState } from "react";
import "./TestimonialHome.css";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonialData = [
  {
    id: 1,
    review:
      "IJPASR provides a rigorous yet rapid peer-review process. The editorial workflow is professional and highly organised.",
    name: "Prof. (Dr.) Ravinesh Mishra",
    role: "Dean R&D",
    university: "Baddi University, Himachal Pradesh, India",
    initial: "R",
  },
  {
    id: 2,
    review:
      "Open-access publishing with IJPASR significantly improves the global visibility and reach of allied science research.",
    name: "Dr. Sreemoy Kanti Das",
    role: "Associate Professor",
    university: "Lincoln University College, Malaysia",
    initial: "S",
  },
  {
    id: 3,
    review:
      "High editorial standards make IJPASR a trustworthy venue for serious pharmaceutical and allied science research.",
    name: "Dr. Mohammad Rashid",
    role: "Associate Professor",
    university: "Buraydah Colleges, Saudi Arabia",
    initial: "M",
  },
];

const TestimonialHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonialData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialData.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(autoSlide);
  }, []);

  return (
    <section className="testimonialHome">
      <div className="testimonialHome-container">

        {/* HEADER */}
        <div className="testimonialHome-header">
          <span className="testimonialHome-subtitle">
            Researcher Feedback
          </span>

          <h2 className="testimonialHome-heading">
            Trusted by Scientists Worldwide
          </h2>
        </div>

        {/* DESKTOP VIEW */}
        <div className="testimonialHome-grid">
          {testimonialData.map((item) => (
            <div className="testimonialHome-card" key={item.id}>

              <div className="testimonialHome-glow"></div>

              <div className="testimonialHome-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="testimonialHome-review">
                “{item.review}”
              </p>

              <div className="testimonialHome-user">

                <div className="testimonialHome-avatar">
                  {item.initial}
                </div>

                <div className="testimonialHome-userInfo">
                  <h3>{item.name}</h3>

                  <p>
                    {item.role} — {item.university}
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* MOBILE SLIDER */}
        <div className="testimonialHome-mobileSlider">

          <div className="testimonialHome-card">

            <div className="testimonialHome-glow"></div>

            <div className="testimonialHome-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="testimonialHome-review">
              “{testimonialData[currentIndex].review}”
            </p>

            <div className="testimonialHome-user">

              <div className="testimonialHome-avatar">
                {testimonialData[currentIndex].initial}
              </div>

              <div className="testimonialHome-userInfo">
                <h3>{testimonialData[currentIndex].name}</h3>

                <p>
                  {testimonialData[currentIndex].role} —{" "}
                  {testimonialData[currentIndex].university}
                </p>
              </div>

            </div>

          </div>

          {/* PAGINATION */}
          <div className="testimonialHome-controls">

            <button onClick={prevSlide}>
              <FaChevronLeft />
            </button>

            <div className="testimonialHome-dots">
              {testimonialData.map((_, index) => (
                <span
                  key={index}
                  className={
                    currentIndex === index
                      ? "testimonialHome-dot active"
                      : "testimonialHome-dot"
                  }
                ></span>
              ))}
            </div>

            <button onClick={nextSlide}>
              <FaChevronRight />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialHome;