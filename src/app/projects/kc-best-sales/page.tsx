"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface TechItem {
  id: number;
  title: string;
  iconClass: string;
  description: string;
}

const TECH_STACK: TechItem[] = [
  {
    id: 1,
    title: "WordPress",
    iconClass: "bx bxl-wordpress",
    description:
      "I used Elementor for its flexible layout capabilities. While it's a powerful builder, it had occasional bugs. I frequently wrote custom code (CSS/JS) to fix layout issues, override theme limitations, and ensure the final design was stable and matched the client's vision.",
  },
  {
    id: 2,
    title: "JavaScript",
    iconClass: "bx bxl-javascript",
    description:
      "Wrote custom JavaScript for several key functions: implementing engaging parallax effects, providing instant client-side form validation for a better user experience, and handling the form submission process to securely send customer inquiries to the client.",
  },
  {
    id: 3,
    title: "Adobe Photoshop",
    iconClass: "bx bxl-adobe",
    description:
      "This was an essential tool for this project. I used it for heavy-duty image optimization and resizing, processing the entire catalog of large product photos to be web-friendly. This was the key to achieving fast page-load times on such an image-heavy site.",
  },
];

export default function KcBestSalesProject() {
  const [openTechIndex, setOpenTechIndex] = useState<number | null>(0); // First item active by default
  const [activeSidebarLink, setActiveSidebarLink] = useState("#project-hero-kc-best-sales");

  const heroRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const featuresBgRef = useRef<HTMLDivElement>(null);

  const techContentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const sections = [
      { id: "#project-hero-kc-best-sales", ref: heroRef },
      { id: "#project-details", ref: detailsRef },
      { id: "#key-features", ref: featuresRef },
    ];

    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      if (featuresRef.current && featuresBgRef.current) {
        gsap.fromTo(featuresBgRef.current, 
          { yPercent: -15 }, 
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top bottom", 
              end: "bottom top",   
              scrub: true,         
            }
          }
        );
      }
    });

    // Fade-in Observer
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    // Sidebar Active Link Observer
    const sidebarObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSidebarLink(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((sec) => {
      if (sec.ref.current) {
        fadeInObserver.observe(sec.ref.current);
        sidebarObserver.observe(sec.ref.current);
      }
    });

    return () => {
      ctx.revert();
      sections.forEach((sec) => {
        if (sec.ref.current) {
          fadeInObserver.unobserve(sec.ref.current);
          sidebarObserver.unobserve(sec.ref.current);
        }
      });
    };
  }, []);

  const toggleTech = (index: number) => {
    setOpenTechIndex(openTechIndex === index ? null : index);
  };

  return (
    <>
      <Header isProjectPage={true} />

      <nav className="project-sidebar">
        <ul>
          <li>
            <a
              href="#project-hero-kc-best-sales"
              className={activeSidebarLink === "#project-hero-kc-best-sales" ? "active-link" : ""}
            >
              Kc Best Sales
            </a>
          </li>
          <li>
            <a
              href="#project-details"
              className={activeSidebarLink === "#project-details" ? "active-link" : ""}
            >
              Details
            </a>
          </li>
          <li>
            <a
              href="#key-features"
              className={activeSidebarLink === "#key-features" ? "active-link" : ""}
            >
              Walkthrough
            </a>
          </li>
        </ul>
      </nav>

      <div className="back-button-container">
        <Link href="/#projects" className="btn">
          <i className="bx bx-arrow-back"></i> Back to All Projects
        </Link>
      </div>

      <section
        className="project-hero"
        id="project-hero-kc-best-sales"
        ref={heroRef}
      >
        <div className="project-hero-content">
          <h1 className="heading">
            Kc <span>Best Sales</span>
          </h1>
          <p className="project-subtitle">
            This project involved building a professional online catalog for KC Best Sales, Inc.,
            a major distributor of truck and off-the-road (OTR) tires.
            The client needed a clear, credible way to present their products and technical data.
          </p>
          <a
            href="https://kcbestsales.com/"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Live Site
          </a>
        </div>
      </section>

      <section className="project-details" id="project-details" ref={detailsRef}>
        <div className="video-background-container">
          <video autoPlay muted loop playsInline>
            <source src="/assets/vids/projects-abstract-vid-background.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}></div>
        </div>

        <h2 className="heading" style={{ marginTop: 0 }}>
          Project <span>Details</span>
        </h2>
        <div className="project-details-grid">
          <div className="project-info-box">
            <h3>The Challenge</h3>
            <p>
              The biggest challenge was the sheer scale of the project combined with a tight, one-month deadline.
              I was responsible for structuring and uploading a massive catalog of products from disorganized source materials.
              <br />
              <br />
              Furthermore, all client-provided images were extremely large, high-resolution files. This required a solution to
              optimize every single image to prevent a slow, unusable website. I also had to organize all product data and brochure
              download links from scratch.
            </p>
            <br />
            <h3 className="extra-margin-top">My Solution</h3>
            <p>
              Success on this project came down to strict time management and organization.
              I began by creating a logical content structure for the hundreds of products.
              <br />
              <br />I then used Adobe Photoshop to batch-process
              and optimize the entire image library, drastically reducing file sizes for fast loading.
              When the Elementor builder had occasional bugs or limitations,
              I wrote custom CSS and JavaScript to override them, ensuring a polished, pixel-perfect result that was delivered on time.
            </p>
          </div>

          <div className="project-info-box">
            <h3>Tech Stack</h3>
            <div className="tech-stack-icons">
              <i className="bx bxl-wordpress" title="WordPress"></i>
              <i className="bx bxl-javascript" title="JavaScript"></i>
              <i className="bx bxl-adobe" title="Adobe Photoshop"></i>
            </div>

            <div style={{ marginTop: "2rem" }}>
              {TECH_STACK.map((tech, idx) => {
                const isOpen = openTechIndex === idx;
                const currentHeight = isOpen
                  ? techContentRefs.current[idx]?.scrollHeight + "px"
                  : "0px";

                return (
                  <div
                    className={`tech-accordion ${isOpen ? "active" : ""}`}
                    key={tech.id}
                  >
                    <div className="tech-header" onClick={() => toggleTech(idx)}>
                      <span className="tech-title">{tech.title}</span>
                      <button className="tech-toggle" aria-expanded={isOpen}>
                        <i className="bx bxs-chevron-down"></i>
                        <i className="bx bx-x"></i>
                      </button>
                    </div>
                    <div
                      className="tech-content"
                      style={{ maxHeight: currentHeight }}
                    >
                      <div
                        className="tech-content-inner"
                        ref={(el) => {
                          techContentRefs.current[idx] = el;
                        }}
                      >
                        <p>{tech.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="key-features" id="key-features" ref={featuresRef} style={{ position: "relative", overflow: "hidden" }}>
        <h2 className="heading heading-walkthrough">
          Video <span>Walkthrough</span>
        </h2>
        <div className="parallax-bg" id="key-features-bg-kc-best-sales" ref={featuresBgRef}></div>

        <div className="video-walkthrough-container">
          <video autoPlay muted loop playsInline>
            <source src="/assets/vids/kc-best-sales-walkthrough.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <Footer isProjectPage={true} />
    </>
  );
}
