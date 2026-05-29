"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

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
          opacity={0.6}
          colorIntensity={0.4}
        />
        <div className="video-overlay" style={{ background: "rgba(0, 0, 0, 0.4)" }}></div>
      </div>

      <div className="home-content">
        <h1>Hi, its <span> Kc</span></h1>
        <h3> <span>I'm a Web Developer!</span></h3>
        <p>
          I'm a results-driven web developer focused on building clean, responsive, and user-friendly digital experiences.
          I specialize in Wordpress and CSS Effects and love turning complex problems into simple, elegant solutions.
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
        <img src="/assets/img/kc-img-2.jpg" alt="Kc Casipit profile portrait" />
      </div>
    </section>
  );
}
