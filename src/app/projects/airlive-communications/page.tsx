"use client";

import React, { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TechAccordion from "@/components/TechAccordion";
import ViewAllProjectsButton from "@/components/ViewAllProjectsButton";
import type { TechItem } from "@/components/TechAccordion";
import { useProjectPage } from "@/hooks/useProjectPage";

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
  const heroRef        = useRef<HTMLElement>(null);
  const detailsRef     = useRef<HTMLElement>(null);
  const featuresRef    = useRef<HTMLElement>(null);
  const featuresBgRef  = useRef<HTMLDivElement>(null);

  const { activeSidebarLink } = useProjectPage({
    sections: [
      { ref: heroRef },
      { ref: detailsRef },
      { ref: featuresRef },
    ],
    defaultSidebarLink: "#project-hero-airlive",
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


      <section
        className="project-hero"
        id="project-hero-airlive"
        ref={heroRef}
      >
        <ViewAllProjectsButton />
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
              <i className="bx bxl-wordpress" role="img" aria-label="WordPress"></i>
              <i className="bx bxl-javascript" role="img" aria-label="JavaScript"></i>
              <i className="bx bxl-adobe" role="img" aria-label="Adobe Photoshop"></i>
            </div>
            <TechAccordion items={TECH_STACK} />
          </div>
        </div>
      </section>

      <section className="key-features" id="key-features" ref={featuresRef} style={{ position: "relative", overflow: "hidden" }}>
        <h2 className="heading heading-walkthrough">
          Video <span>Walkthrough</span>
        </h2>
        <div className="parallax-bg" id="key-features-bg-airlive-coms" ref={featuresBgRef}></div>

        <div className="video-walkthrough-container">
          <video autoPlay muted loop playsInline>
            <source src="/assets/vids/airlive-coms-walkthrough.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <Footer isProjectPage={true} />
    </>
  );
}
