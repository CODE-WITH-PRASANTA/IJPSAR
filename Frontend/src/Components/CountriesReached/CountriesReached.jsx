// CountriesReached.jsx

import React, { useEffect, useRef, useState } from "react";
import "./CountriesReached.css";
import {
  FaGlobeAsia,
  FaUsers,
  FaFileAlt,
  FaClock,
} from "react-icons/fa";

const statsData = [
  {
    id: 1,
    number: 500,
    suffix: "+",
    title: "Published Articles",
    icon: <FaFileAlt />,
  },
  {
    id: 2,
    number: 120,
    suffix: "+",
    title: "Editorial Members",
    icon: <FaUsers />,
  },
  {
    id: 3,
    number: 35,
    suffix: "+",
    title: "Countries Reached",
    icon: <FaGlobeAsia />,
  },
  {
    id: 4,
    number: 2,
    suffix: " Days",
    title: "Review Notification",
    icon: <FaClock />,
  },
];

const Counter = ({ end, suffix }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);

          const updateCounter = () => {
            start += increment;

            if (start < end) {
              setCount(Math.ceil(start));
              requestAnimationFrame(updateCounter);
            } else {
              setCount(end);
            }
          };

          updateCounter();
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end]);

  return (
    <h2 ref={counterRef} className="countriesReached-number">
      {count}
      {suffix}
    </h2>
  );
};

const CountriesReached = () => {
  return (
    <section className="countriesReached">
      <div className="countriesReached-wrapper">

        <div className="countriesReached-bgShape"></div>

        <div className="countriesReached-container">
          {statsData.map((item) => (
            <div className="countriesReached-card" key={item.id}>

              <div className="countriesReached-top">

                <div className="countriesReached-icon">
                  {item.icon}
                </div>

                <Counter
                  end={item.number}
                  suffix={item.suffix}
                />

              </div>

              <p className="countriesReached-title">
                {item.title}
              </p>

              <div className="countriesReached-line"></div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesReached;