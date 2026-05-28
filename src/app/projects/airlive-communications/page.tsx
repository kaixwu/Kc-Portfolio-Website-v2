"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
      "Used the Oxygen builder, which is a powerful, developer-focused tool. Unlike typical drag-and-drop builders, Oxygen allowed me to write and deeply integrate custom code (HTML, CSS, & PHP), giving us full control over the site's structure and breaking free from template limitations.",
  },
  {
    id: 2,
    title: "JavaScript",
    iconClass: "bx bxl-javascript",
    description:
      "Wrote custom, from-scratch JavaScript to achieve two key functions: implementing the smooth parallax scrolling effect and ensuring the 'Contact Us' form handling was secure, responsive, and reliable.",
  },
  {
    id: 3,
    title: "Adobe Photoshop",
    iconClass: "bx bxl-adobe",
    description:
      "All visual assets were processed in Photoshop. This involved editing and refining images, optimizing them for fast web loading, and carefully slicing and layering them to work perfectly with the custom parallax script.",
  },
];

export default function AirLiveCommunicationsProject() {
  const [openTechIndex, setOpenTechIndex] = useState<number | null>(0); // First item active by default
  const [activeSidebarLink, setActiveSidebarLink] = useState("#project-hero-airlive");

  const heroRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);

  const techContentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const sections = [
      { id: "#project-hero-airlive", ref: heroRef },
      { id: "#project-details", ref: detailsRef },
      { id: "#key-features", ref: featuresRef },
    ];

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
              href="#project-hero-airlive"
              className={activeSidebarLink === "#project-hero-airlive" ? "active-link" : ""}
            >
              AirLive
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
        id="project-hero-airlive"
        ref={heroRef}
      >
        <div className="project-hero-content">
          <h1 className="heading">
            AirLive <span>Communications</span>
          </h1>
          <p className="project-subtitle">
            I developed the corporate website for AirLive Communications, a top-tier provider of
            dedicated business internet in the Philippines. The site serves as their primary digital storefront,
            built to attract and inform enterprise and SME clients.
          </p>
          <a
            href="https://airlivecom.com/"
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
              The primary challenge was that the client had limited digital assets.
              I was responsible for content creation from scratch, which included writing all the website copy and sourcing/editing all images.
              <br />
              <br />
              Technically, the client wanted a modern, engaging parallax scrolling effect.
              The WordPress builder we used, Oxygen, didn't have this feature built-in, so
              it required a custom-coded solution to achieve the desired smooth and performant effect.
            </p>
            <br />
            <h3 className="extra-margin-top">My Solution</h3>
            <p>
              I embraced the challenge by taking on a full-service role. I thoroughly researched their industry to write clear,
              professional, and persuasive copy.
              <br />
              <br />
              For the technical hurdle, I researched various JavaScript techniques and
              developed a lightweight, custom script to create the parallax effect. This gave us full control over the animation
              without slowing the site down. All images were then carefully optimized to ensure fast loading times and a seamless user experience.
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

      <section className="key-features" id="key-features" ref={featuresRef}>
        <h2 className="heading heading-walkthrough">
          Video <span>Walkthrough</span>
        </h2>
        <div className="parallax-bg" id="key-features-bg-airlive-coms"></div>

        <div className="video-walkthrough-container">
          <video autoPlay muted loop playsInline>
            <source src="/assets/vids/airlive-coms-walkthrough.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <nav className="project-nav">
        <Link href="/projects/kc-best-sales" className="btn">
          <i className="bx bx-left-arrow-alt"></i> Previous Project
        </Link>
        <Link href="/#projects" className="btn">
          <i className="bx bx-grid-horizontal"></i> All Projects
        </Link>
      </nav>

      <Footer isProjectPage={true} />
    </>
  );
}
