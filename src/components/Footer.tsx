"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const FluidGradient = dynamic(() => import("./FluidGradient"), { ssr: false });

interface FooterProps {
  isProjectPage?: boolean;
  isAboutPage?: boolean;
}

export default function Footer({ isProjectPage = false, isAboutPage = false }: FooterProps) {
  return (
    <footer className="footer" style={{ position: "relative", overflow: "hidden" }}>
      {/* Fluid Gradient background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <FluidGradient 
          color1="#0d1117" 
          color2="#ea580c" 
          color3="#1a1207" 
          color4="#ff3300"
          opacity={0.55}
          colorIntensity={0.5}
        />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)" }}></div>
      </div>

      {/* Content wrapper to sit above background */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="social-icons">
          <a href="https://github.com/kaixwu/" target="_blank" rel="noopener noreferrer" aria-label="Visit Kc Casipit's GitHub Profile">
            <i className="bx bxl-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/kyle-christian-casipit-55520b33a/" target="_blank" rel="noopener noreferrer" aria-label="Visit Kc Casipit's LinkedIn Profile">
            <i className="bx bxl-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/kaixwu/" target="_blank" rel="noopener noreferrer" aria-label="Visit Kc Casipit's Instagram Profile">
            <i className="bx bxl-instagram-alt"></i>
          </a>
        </div>

        <ul className="list">
          {isAboutPage ? (
            <>
              <li><a href="/">HOME</a></li>
              <li><a href="/#tech-stack">TECH STACK</a></li>
              <li><a href="/#projects">PROJECTS</a></li>
              <li><a href="/#contact">CONTACT</a></li>
            </>
          ) : isProjectPage ? (
            <>
              <li><a href="/#tech-stack">TECH STACK</a></li>
              <li><Link href="/about">ABOUT</Link></li>
              <li><a href="/#projects">PROJECTS</a></li>
              <li><a href="/#contact">CONTACT</a></li>
            </>
          ) : (
            <>
              <li><a href="#tech-stack">TECH STACK</a></li>
              <li><Link href="/about">ABOUT</Link></li>
              <li><a href="#projects">PROJECTS</a></li>
              <li><a href="#contact">CONTACT</a></li>
            </>
          )}
        </ul>

        <p className="copyright">
          Kc Casipit | All Rights Reserved 2026
        </p>
      </div>
    </footer>
  );
}
