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
      "Engineered using Next.js 16 App Router and React 19. Server components minimize the initial JavaScript payload for faster load times, while 'use client' directives are strictly scoped to interactive elements requiring GSAP or WebGL APIs.",
  },
  {
    id: 2,
    title: "GSAP & ScrollTrigger",
    iconClass: "bx bx-code-alt",
    description:
      "Powered by GSAP 3 for highly optimized, hardware-accelerated animations. Features cinematic intros, scroll-linked parallax, and sticky 3D card stacks - all strictly managed within React's lifecycle to prevent memory leaks.",
  },
  {
    id: 3,
    title: "Vanilla CSS & Responsive Design",
    iconClass: "bx bxl-css3",
    description:
      "Styled entirely with hand-crafted, framework-free Vanilla CSS. Utilizes fluid typography (clamp), modern CSS Grid, and scoped BEM architecture to ensure a pixel-perfect, responsive layout across all device sizes.",
  },
];

const PORTFOLIO_FEATURES = [
  {
    img: "/assets/vids/fluidgradient.mp4",
    alt: "WebGL Fluid Gradients",
    text: "Immersive, real-time 3D fluid gradients powered by Three.js to give the site a premium, dynamic feel without sacrificing performance.",
  },
  {
    img: "/assets/vids/parallax.mp4",
    alt: "Smooth GSAP Parallax",
    text: "Hardware-accelerated parallax scrolling driven by GSAP and ScrollTrigger, creating a cinematic depth effect across sections.",
  },
  {
    img: "/assets/vids/3dcards.mp4",
    alt: "Sticky 3D Stacks",
    text: "Interactive 3D card stacking mechanics for the projects showcase, built entirely with complex mathematics and CSS transforms.",
  },
  {
    img: "/assets/vids/transitions.mp4",
    alt: "Cinematic Transitions",
    text: "Custom-built, non-blocking page transitions that use morphing elements and curtain reveals to keep the user engaged.",
  },
  {
    img: "/assets/vids/responsive.mp4",
    alt: "Fluid Responsiveness",
    text: "Hand-crafted CSS Grid and clamp() typography ensure the layout remains flawlessly readable and beautiful on any screen.",
  },
];

const PORTFOLIO_SUBHEADINGS = [
  "webgl gradients",
  "smooth parallax",
  "3d stacks",
  "transitions",
  "responsiveness",
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
            A fully custom, high-performance portfolio built from the ground up.
            It merges state-of-the-art WebGL graphics with cinematic GSAP scroll
            animations to deliver a premium, highly interactive user experience.
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
              The objective was to engineer a portfolio that breaks away from generic templates,
              ensuring every interaction feels deliberate and premium.
              <br /><br />
              The primary technical challenge was orchestrating complex, overlapping GSAP animations - such
              as scroll-linked parallax, WebGL fluid simulations, and sticky 3D card stacks - without
              causing layout thrashing, performance bottlenecks, or memory leaks during navigation.
            </p>
            <br />
            <h3 className="extra-margin-top">My Solution</h3>
            <p>
              To ensure buttery-smooth performance (60+ FPS), each animated section is
              self-contained using GSAP Contexts scoped to strict React refs. All animations
              and ScrollTriggers are aggressively garbage-collected upon unmount.
              <br /><br />
              Additionally, heavy background elements like Three.js WebGL gradients and looping
              videos are managed by IntersectionObservers - pausing automatically when off-screen
              to save battery life and GPU resources on mobile devices.
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

      {/* ── Arc Features Slider ────────────────────────────────── */}
      <FeaturesSection 
        features={PORTFOLIO_FEATURES} 
        subheadings={PORTFOLIO_SUBHEADINGS} 
      />

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
