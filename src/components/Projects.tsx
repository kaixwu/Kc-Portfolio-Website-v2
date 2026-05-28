import React from "react";
import Link from "next/link";

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="video-background-container">
        <video autoPlay muted loop playsInline id="projects-video-bg">
          <source src="/assets/vids/projects-abstract-vid-background.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <h2 className="heading">Projects</h2>

      <div className="projects-box">
        <div className="project-card">
          <img src="/assets/img/kc-best-sales-hero-background.webp" alt="Kc Best Sales Project Thumbnail" />
          <h3>Kc Best Sales, Inc.</h3>
          <p>
            This project involved building a professional online catalog for KC Best Sales, Inc.,
            a major distributor of truck and off-the-road (OTR) tires. The client needed a clear, credible way to present
            their products and technical data. I built a responsive website that highlights their core brands and allows customers
            to easily browse, compare tire models, and access detailed specification tables.
          </p>
          <Link href="/projects/kc-best-sales" className="btn">
            View Project
          </Link>
        </div>

        <div className="project-card">
          <img src="/assets/img/airlive-coms-hero-background.webp" alt="AirLive Communications Project Thumbnail" />
          <h3>AirLive Communications, Inc.</h3>
          <p>
            I developed the corporate website for AirLive Communications, a top-tier provider of dedicated business internet in the Philippines.
            The site serves as their primary digital storefront, built to attract and inform enterprise and SME clients.
            My role was to translate their established brand and complex services into a clean, professional,
            and easy-to-navigate website that drives inquiries and builds trust with potential customers.
          </p>
          <Link href="/projects/airlive-communications" className="btn">
            View Project
          </Link>
        </div>
      </div>
    </section>
  );
}
