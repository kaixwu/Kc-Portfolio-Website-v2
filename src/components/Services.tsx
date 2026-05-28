"use client";

import React, { useEffect, useRef } from "react";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      if (!window.matchMedia("(min-width: 480px)").matches) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY;
      const scrollPosition = window.scrollY - offsetTop;
      const speed = 0.3;

      bgRef.current.style.backgroundPositionY = `${-(scrollPosition * speed)}px`;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="parallax-bg" id="services-parallax-bg" ref={bgRef}></div>

      <h2 className="heading">Services</h2>

      <div className="services-container">
        <div className="service-box">
          <div className="service-info">
            <i className="bx bxl-figma"></i>
            <h4>Graphic Design</h4>
            <p>
              I handle everything from professional photo enhancements like sharpening images,
              fixing dimensions, and removing unwanted objects—to crafting clean and memorable logos that help you stand out.
            </p>
          </div>
        </div>

        <div className="service-box">
          <div className="service-info">
            <i className="bx bxl-wordpress"></i>
            <h4>Wordpress Development</h4>
            <p>
              I build flexible and powerful WordPress sites using modern tools like Elementor and Oxygen. I go beyond standard drag-and-drop,
              frequently writing custom code (CSS, PHP, or JS) to overcome builder limitations and deliver a truly unique,
              tailored website for your specific needs.
            </p>
          </div>
        </div>

        <div className="service-box">
          <div className="service-info">
            <i className="bx bx-code-curly"></i>
            <h4>Website Development</h4>
            <p>
              For projects needing a completely custom solution, I build responsive websites from the ground up. I use modern JavaScript to create
              engaging user experiences, from implementing smooth parallax scrolling effects to ensuring your forms are reliable,
              secure, and easy to use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
