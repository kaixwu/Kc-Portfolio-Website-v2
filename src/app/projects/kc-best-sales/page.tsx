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
  const heroRef    = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLElement>(null);
  const featuresRef    = useRef<HTMLElement>(null);
  const featuresBgRef  = useRef<HTMLDivElement>(null);

  const { activeSidebarLink } = useProjectPage({
    sections: [
      { ref: heroRef },
      { ref: detailsRef },
      { ref: featuresRef },
    ],
    defaultSidebarLink: "#project-hero-kc-best-sales",
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


      <section
        className="project-hero"
        id="project-hero-kc-best-sales"
        ref={heroRef}
      >
        <ViewAllProjectsButton />
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
