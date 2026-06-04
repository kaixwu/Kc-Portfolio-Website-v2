"use client";

import React, { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TechAccordion from "@/components/TechAccordion";
import type { TechItem } from "@/components/TechAccordion";
import { useProjectPage } from "@/hooks/useProjectPage";

const TECH_STACK: TechItem[] = [
  {
    id: 1,
    title: "WordPress",
    iconClass: "bx bxl-wordpress",
    description:
      "Built the entire site using the Oxygen Builder, a developer-focused visual builder that bypasses WordPress themes entirely. This gave me full control over the markup, allowing clean, semantic HTML with no bloat — critical for performance and SEO across a content-heavy, multi-section single-page layout.",
  },
  {
    id: 2,
    title: "JavaScript",
    iconClass: "bx bxl-javascript",
    description:
      "Developed custom JavaScript for interactive elements including smooth parallax scrolling effects, sticky header behavior with scroll-based triggers, and dynamic content animations using the AOS (Animate On Scroll) library to enhance user engagement throughout the page.",
  },
  {
    id: 3,
    title: "CSS",
    iconClass: "bx bxl-css3",
    description:
      "Wrote extensive custom CSS to achieve a premium, brand-aligned visual identity. This included responsive grid layouts for brand logo showcases, territory maps, team sections, and a fully mobile-optimized navigation with off-canvas menu support.",
  },
  {
    id: 4,
    title: "PHP",
    iconClass: "bx bxl-php",
    description:
      "Leveraged PHP for WordPress-specific customizations including custom post types, WPForms integration for the contact section, Rank Math SEO schema markup, and Google Tag Manager implementation for analytics tracking.",
  },
];

export default function LibertyLighthouseProject() {
  const heroRef       = useRef<HTMLElement>(null);
  const detailsRef    = useRef<HTMLElement>(null);
  const featuresRef   = useRef<HTMLElement>(null);
  const featuresBgRef = useRef<HTMLDivElement>(null);

  const { activeSidebarLink } = useProjectPage({
    sections: [
      { ref: heroRef },
      { ref: detailsRef },
      { ref: featuresRef },
    ],
    defaultSidebarLink: "#project-hero-liberty",
    parallaxRef: featuresBgRef,
    parallaxTriggerRef: featuresRef,
  });

  return (
    <>
      <Header isProjectPage={true} />

      <nav className="project-sidebar">
        <ul>
          <li>
            <a
              href="#project-hero-liberty"
              className={activeSidebarLink === "#project-hero-liberty" ? "active-link" : ""}
            >
              Liberty
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


      <section
        className="project-hero"
        id="project-hero-liberty"
        ref={heroRef}
        style={{ backgroundColor: "#0a0f1a" }}
      >
        <div className="project-hero-content">
          <h1 className="heading">
            Liberty <span>Lighthouse Group</span>
          </h1>
          <p className="project-subtitle">
            I developed and maintain the corporate website for Liberty Lighthouse Group, LLP — the leading
            independent regional sales and marketing agency for premium beverage brands across Asia Pacific
            and the Indian Subcontinent, serving both domestic and duty-free markets.
          </p>
          <a
            href="https://libertylighthousegroup.com/"
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
              Liberty Lighthouse Group needed a complete website overhaul to reflect their position as a
              leading regional beverage agency. Their existing site was outdated and failed to communicate
              their extensive portfolio of premium brands and vast territory coverage across 67+ countries.
              <br />
              <br />
              The site required a sophisticated, single-page layout that could elegantly present diverse
              content — from brand alliances and territory maps to team profiles and industry news — while
              maintaining fast performance and strong SEO.
            </p>
            <br />
            <h3 className="extra-margin-top">My Solution</h3>
            <p>
              I built the entire site using WordPress with the Oxygen Builder, giving me full control over
              the HTML structure without theme bloat. I designed a clean, professional layout with anchor-based
              navigation, allowing visitors to seamlessly browse sections like Company, Brands, Territories,
              About, Services, and Contact.
              <br />
              <br />
              I implemented custom parallax scrolling, animated statistics counters, responsive brand logo grids,
              and an interactive territory map. The site was optimized with Rank Math SEO, Google Tag Manager
              integration, and WebP image formats for maximum performance.
            </p>
          </div>

          <div className="project-info-box">
            <h3>Tech Stack</h3>
            <div className="tech-stack-icons">
              <i className="bx bxl-wordpress" role="img" aria-label="WordPress"></i>
              <i className="bx bxl-javascript" role="img" aria-label="JavaScript"></i>
              <i className="bx bxl-css3" role="img" aria-label="CSS3"></i>
              <i className="bx bxl-php" role="img" aria-label="PHP"></i>
            </div>
            <TechAccordion items={TECH_STACK} />
          </div>
        </div>
      </section>

      <section className="key-features" id="key-features" ref={featuresRef} style={{ position: "relative", overflow: "hidden" }}>
        <h2 className="heading heading-walkthrough">
          Video <span>Walkthrough</span>
        </h2>
        <div className="parallax-bg" id="key-features-bg-liberty" ref={featuresBgRef}></div>

        <div className="video-walkthrough-container">
          <video autoPlay muted loop playsInline>
            <source src="/assets/vids/liberty-lighthouse-walkthrough.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <Footer isProjectPage={true} />
    </>
  );
}
