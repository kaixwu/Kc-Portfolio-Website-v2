"use client";

import React, { useState, useEffect, useRef } from "react";

interface SliderItem {
  id: number;
  title: string;
  imgUrl: string;
  isHeadingMedium?: boolean;
}

const DESTINATIONS: SliderItem[] = [
  {
    id: 1,
    title: "JAPAN",
    imgUrl: "/assets/img/destination-japan.webp",
  },
  {
    id: 2,
    title: "NEW ZEALAND",
    imgUrl: "/assets/img/destination-new-zealand.jpg",
  },
  {
    id: 3,
    title: "TAIWAN",
    imgUrl: "/assets/img/destination-taiwan.jpg",
    isHeadingMedium: true,
  },
];

export default function DestinationSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setDiameter = () => {
      if (sliderRef.current) {
        const width = sliderRef.current.offsetWidth;
        const height = sliderRef.current.offsetHeight;
        const diameter = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        document.documentElement.style.setProperty("--diameter", `${diameter}px`);
      }
    };

    setDiameter();
    window.addEventListener("resize", setDiameter);

    return () => {
      window.removeEventListener("resize", setDiameter);
    };
  }, []);

  const handleNext = () => {
    if (activeIndex < DESTINATIONS.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <section className="slider" id="destination" ref={sliderRef}>
      <div className="list">
        {DESTINATIONS.map((dest, idx) => {
          let itemClass = "item";
          if (idx === activeIndex) {
            itemClass += " active";
          }

          return (
            <div className={itemClass} key={dest.id}>
              <div
                className="image"
                style={{ "--url": `url('${dest.imgUrl}')` } as React.CSSProperties}
              ></div>
              <div className="content">
                <h2 className={dest.isHeadingMedium ? "heading-medium" : ""}>
                  DREAM DESTINATION: <span>{dest.title}</span>
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      <div className="arrows">
        <button
          id="prev"
          onClick={handlePrev}
          className={activeIndex === 0 ? "d-none" : ""}
          aria-label="Previous destination"
          style={{
            border: "2px solid rgba(255, 255, 255, 0.8)",
            borderRadius: "20px",
            padding: "10px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(8px)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            className="w-8 h-8 hover-effect"
            style={{ color: "var(--main-color)", transition: "0.3s" }}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </button>
        <button
          id="next"
          onClick={handleNext}
          className={activeIndex === DESTINATIONS.length - 1 ? "d-none" : ""}
          aria-label="Next destination"
          style={{
            border: "2px solid rgba(255, 255, 255, 0.8)",
            borderRadius: "20px",
            padding: "10px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(8px)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            className="w-8 h-8 hover-effect"
            style={{ color: "var(--main-color)", transition: "0.3s" }}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
