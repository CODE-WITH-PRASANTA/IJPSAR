import React, { useEffect, useState } from "react";
import "./TestimonialHome.css";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteRight,
} from "react-icons/fa";
import API from "../../api/axios";

const TestimonialHome = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport size to handle dynamic pagination step intervals
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize(); // Run on initial mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await API.get("/testimonials");
      const activeTestimonials = response.data.filter(
        (item) => item.status === "Active" || item.status === "active"
      );
      setTestimonialData(activeTestimonials);
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination Logic
  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(testimonialData.length / itemsPerPage);
  const currentGroupIndex = Math.floor(currentIndex / itemsPerPage);

  const nextSlide = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
    } else {
      const nextGroup = currentGroupIndex + 1;
      if (nextGroup >= totalPages) {
        setCurrentIndex(0); // Loop back to start
      } else {
        setCurrentIndex(nextGroup * itemsPerPage);
      }
    }
  };

  const prevSlide = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
    } else {
      const prevGroup = currentGroupIndex - 1;
      if (prevGroup < 0) {
        setCurrentIndex((totalPages - 1) * itemsPerPage); // Loop to the end group
      } else {
        setCurrentIndex(prevGroup * itemsPerPage);
      }
    }
  };

  const handleDotClick = (pageIdx) => {
    setCurrentIndex(pageIdx * itemsPerPage);
  };

  // Auto-play effect matching current layout constraints
  useEffect(() => {
    if (testimonialData.length <= itemsPerPage) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonialData, currentIndex, isMobile]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <section className="testimonialHome-status">
        <div className="testimonialHome-spinner-container">
          <div className="testimonialHome-spinner"></div>
          <p style={{ color: "#5b726c", marginTop: "12px" }}>Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonialData.length === 0) {
    return (
      <section className="testimonialHome-status">
        <div className="testimonialHome-container-fallback">
          <h3 className="testimonialHome-empty-text">No Testimonials Available</h3>
        </div>
      </section>
    );
  }

  // Slice out items to render based on page offsets
  const visibleTestimonials = isMobile 
    ? [testimonialData[currentIndex]] 
    : testimonialData.slice(currentGroupIndex * itemsPerPage, (currentGroupIndex * itemsPerPage) + itemsPerPage);

  return (
    <section className="testimonialHome">
      <div className="testimonialHome-container">
        
        {/* Section Header */}
        <div className="testimonialHome-header">
          <span className="testimonialHome-subtitle">Researcher Feedback</span>
          <h2 className="testimonialHome-heading">
            Trusted by <span>Scientists</span> Worldwide
          </h2>
        </div>

        {/* Dynamic Pagination Grid Wrapper */}
        <div className={`testimonialHome-grid ${isMobile ? "mobile-view" : "desktop-view"}`}>
          {visibleTestimonials.map((item, idx) => {
            if (!item) return null; // Fallback safety catch
            return (
              <div className="testimonialHome-card" key={item.id || idx}>
                <div className="testimonialHome-watermark-quote">
                  <FaQuoteRight />
                </div>
                <div className="testimonialHome-glow"></div>

                <div className="testimonialHome-stars">
                  {[...Array(Number(item.rating) || 5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="testimonialHome-review">
                  {item.feedback ? `"${item.feedback}"` : `"Outstanding system capability and seamless operational control integration."`}
                </p>

                <div className="testimonialHome-user">
                  {item.image || item.avatar ? (
                    <img
                      src={item.image || item.avatar}
                      alt={item.name || "User Profile"}
                      className="testimonialHome-avatarImg"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const fallbackNode = e.target.nextSibling;
                        if (fallbackNode) fallbackNode.style.display = "flex";
                      }}
                    />
                  ) : null}
                  
                  <div 
                    className="testimonialHome-avatar" 
                    style={{ display: item.image || item.avatar ? 'none' : 'flex' }}
                  >
                    {item.initial || getInitials(item.name)}
                  </div>

                  <div className="testimonialHome-userInfo">
                    <h3>{item.name || "Anonymous Researcher"}</h3>
                    <p>
                      {item.designation || "Scientist / Associate"}
                      {item.organization && ` • ${item.organization}`}
                      {item.country && ` (${item.country})`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Controls & Pagination Indicators */}
        {totalPages > 1 && (
          <div className="testimonialHome-controls">
            <button onClick={prevSlide} aria-label="Previous Testimonials">
              <FaChevronLeft />
            </button>

            <div className="testimonialHome-dots">
              {[...Array(totalPages)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`testimonialHome-dot ${
                    currentGroupIndex === index ? "active" : ""
                  }`}
                />
              ))}
            </div>

            <button onClick={nextSlide} aria-label="Next Testimonials">
              <FaChevronRight />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialHome;