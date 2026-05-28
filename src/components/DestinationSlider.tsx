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
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
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
              strokeWidth="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </button>
        <button
          id="next"
          onClick={handleNext}
          className={activeIndex === DESTINATIONS.length - 1 ? "d-none" : ""}
          aria-label="Next destination"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
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
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
