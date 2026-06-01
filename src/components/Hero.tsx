"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Typewriter from "./Typewriter";

const FluidGradient = dynamic(() => import("./FluidGradient"), { ssr: false });

export default function Hero() {
  return (
    <section className="home" id="home">
      <div className="video-background-container" style={{ backgroundColor: "#000" }}>
        <FluidGradient 
          color1="#ea580c" 
          color2="#ff0000" 
          color3="#111111" 
          color4="#2a0000"
          opacity={0.75}
          colorIntensity={0.4}
        />
        <div className="video-overlay" style={{ background: "rgba(0, 0, 0, 0.25)" }}></div>
      </div>

      <div className="home-content">
        <h1>Hi, its <span> Kc</span></h1>
        <h3> 
          <span>
            I'm a <Typewriter roles={["Web Developer", "Web App Developer", "Backend Developer", "Project Manager", "WordPress Developer", "Full Stack Developer", "Tech Enthusiast"]} />
          </span>
        </h3>
        <p>
          I am a software developer with extensive experience building scalable web applications, robust websites, and comprehensive digital platforms. With a broad technology stack spanning modern frontend frameworks, backend integrations, and performance optimization, I architect end-to-end solutions tailored to complex technical requirements.
        </p>



        <div className="btn-group">
          <a
            href="#projects"
            className="btn"
          >
            View Kc's Projects
          </a>
          <a href="#contact" className="btn">Contact Me</a>
        </div>
      </div>

      <div className="home-img">
        <img src="/assets/img/kc-img-2.jpg" alt="Kc Casipit - Web Developer Profile Portrait" loading="lazy" />
      </div>
    </section>
  );
}
