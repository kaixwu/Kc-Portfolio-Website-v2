"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";

interface TechItem {
  id: number;
  title: string;
  iconClass: string;
  description: string;
}

const TECH_STACK: TechItem[] = [
  {
    id: 1,
    title: "Next.js 16 & React 19",
    iconClass: "bx bxl-react",
    description:
      "Built entirely on Next.js 16 with the App Router and React 19. The file-based routing system made adding project sub-pages trivial, while server components kept the initial bundle lean. 'use client' directives are scoped only to components that need GSAP or browser APIs.",
  },
  {
    id: 2,
    title: "GSAP & ScrollTrigger",
    iconClass: "bx bx-code-alt",
    description:
      "All signature animations — the cinematic intro curtain reveal, scroll-pinned arc card gallery, sticky 3D project stack, and image-morph transition — are driven by GSAP 3 with ScrollTrigger, Flip, and CustomEase plugins. Animations are created inside useEffect and fully cleaned up on unmount.",
  },
  {
    id: 3,
    title: "Vanilla CSS & Responsive Design",
    iconClass: "bx bxl-css3",
    description:
      "All styles are hand-crafted vanilla CSS scoped with BEM-style class prefixes to prevent conflicts across sections. Every layout uses clamp(), min(), and CSS Grid for fluid responsiveness — from iPhone SE (375px) to iPad Pro and desktop — without a single CSS framework.",
  },
];

export default function KcPortfolioProject() {
  const [openTechIndex, setOpenTechIndex] = useState<number | null>(0);
  const [activeSidebarLink, setActiveSidebarLink] = useState("#project-hero-kc-portfolio");

  const heroRef     = useRef<HTMLElement>(null);
  const detailsRef  = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const featuresBgRef = useRef<HTMLDivElement>(null);

  const techContentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const sections = [
      { id: "#project-hero-kc-portfolio", ref: heroRef },
      { id: "#project-details",           ref: detailsRef },
      { id: "#key-features",              ref: featuresRef },
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

    // Fade-in observer
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    // Sidebar active-link observer
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

      {/* ── Sidebar navigation ────────────────────────────────── */}
      <nav className="project-sidebar">
        <ul>
          <li>
            <a
              href="#project-hero-kc-portfolio"
              className={activeSidebarLink === "#project-hero-kc-portfolio" ? "active-link" : ""}
            >
              Portfolio
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
              href="#features"
              className={activeSidebarLink === "#features" ? "active-link" : ""}
            >
              Features
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

      {/* ── Back button ───────────────────────────────────────── */}
      <div className="back-button-container">
        <Link href="/#projects" className="btn">
          <i className="bx bx-arrow-back"></i> Back to All Projects
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="project-hero"
        id="project-hero-kc-portfolio"
        ref={heroRef}
      >
        <div className="project-hero-content">
          <h1 className="heading">
            Kc <span>Portfolio</span>
          </h1>
          <p className="project-subtitle">
            Designed and built this very portfolio from the ground up — a fully
            custom Next.js application with cinematic GSAP animations, a
            scroll-driven arc card gallery, sticky 3D project stack, and a
            seamlessly responsive layout across every device.
          </p>
          <a
            href="https://github.com/kaixwu/"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* ── Project Details ───────────────────────────────────── */}
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
              The goal was to build a portfolio that doesn&apos;t feel like a template — every
              interaction needed to feel intentional and premium.
              <br /><br />
              The key technical challenge was coordinating multiple complex GSAP animations
              (scroll-triggered arc arc cards, sticky 3D card stacks, a cinematic intro overlay)
              without any of them interfering with each other or leaking event listeners
              between page transitions.
            </p>
            <br />
            <h3 className="extra-margin-top">My Solution</h3>
            <p>
              Each animated section is fully self-contained using GSAP contexts scoped to
              their own refs, with all ScrollTriggers and timelines cleaned up in the useEffect
              return function.
              <br /><br />
              The intro animation uses a non-passive event listener approach to guarantee
              scroll-lock across all browsers and devices, releasing it exactly when the
              GSAP morph transition completes. CSS is organised with strict BEM-style
              class prefixes so no two sections ever conflict.
            </p>
          </div>

          <div className="project-info-box">
            <h3>Tech Stack</h3>
            <div className="tech-stack-icons">
              <i className="bx bxl-react"    title="Next.js / React"></i>
              <i className="bx bx-code-alt"  title="GSAP"></i>
              <i className="bx bxl-css3"     title="Vanilla CSS"></i>
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

      {/* ── Arc Features Slider (reused from main page) ──────────── */}
      <FeaturesSection />

      {/* ── Walkthrough / Key Features ────────────────────────── */}
      <section className="key-features" id="key-features" ref={featuresRef} style={{ position: "relative", overflow: "hidden" }}>
        <h2 className="heading heading-walkthrough">
          Video <span>Walkthrough</span>
        </h2>
        <div className="parallax-bg" id="key-features-bg-kc-portfolio" ref={featuresBgRef}></div>

        <div className="video-walkthrough-container">
          {/* Using the home background video as a placeholder until a
              dedicated portfolio walkthrough recording is available.   */}
          <video autoPlay muted loop playsInline>
            <source src="/assets/vids/home-abstract-vid-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <Footer isProjectPage={true} />
    </>
  );
}
