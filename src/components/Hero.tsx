import React from "react";

export default function Hero() {
  return (
    <section className="home" id="home">
      <div className="video-background-container">
        <video autoPlay muted loop playsInline id="home-video-bg">
          <source src="/assets/vids/home-abstract-vid-background.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="home-content">
        <h1>Hi, its <span> Kc</span></h1>
        <h3> <span>I'm a Web Developer!</span></h3>
        <p>
          I'm a results-driven web developer focused on building clean, responsive, and user-friendly digital experiences.
          I specialize in Wordpress and CSS Effects and love turning complex problems into simple, elegant solutions.
        </p>

        <div className="social-icons">
          <a href="https://github.com/kaixwu/" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/kyle-christian-casipit-55520b33a/" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-linkedin-square"></i>
          </a>
          <a href="https://www.instagram.com/kaixwu/" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-instagram-alt"></i>
          </a>
        </div>

        <div className="btn-group">
          <a
            href="https://docs.google.com/document/d/1TrskzdxG6aCopOvLwVftjDqCgChCq2B_nzJD9YmZGq8/edit?usp=sharing"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Kc's Resume
          </a>
          <a href="#contact" className="btn">Contact Me</a>
        </div>
      </div>

      <div className="home-img">
        <img src="/assets/img/kc-img-2.jpg" alt="Kc Casipit profile portrait" />
      </div>
    </section>
  );
}
