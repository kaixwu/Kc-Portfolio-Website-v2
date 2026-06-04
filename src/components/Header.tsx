"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface HeaderProps {
  isProjectPage?: boolean;
}

export default function Header({ isProjectPage = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isAnimating = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  // Refs for animation targets
  const navToggleMenuRef = useRef<HTMLParagraphElement>(null);
  const navToggleCloseRef = useRef<HTMLParagraphElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBgPathRef = useRef<SVGPathElement>(null);
  const menuBgSvgRef = useRef<SVGSVGElement>(null);
  const menuLogoRef = useRef<HTMLDivElement>(null);
  const menuLinksContainerRef = useRef<HTMLDivElement>(null);
  const menuInfoItemsRef = useRef<(HTMLElement | null)[]>([]);

  // We'll store our SplitText instances here so we can clean them up
  const splitsRef = useRef<SplitText[]>([]);
  const hasMounted = useRef(false);
  const lastHashRef = useRef("");

  // Handle Next.js cross-page hash routing natively with GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return;

    // Only run on cross-page navigations (when layout is fundamentally changing)
    if (lastHashRef.current === window.location.hash) return;
    
    const currentHash = window.location.hash;
    lastHashRef.current = currentHash;

    const handleScroll = () => {
      const target = document.querySelector(currentHash);
      if (target) {
        // Use exact pixel offset and instant scroll to bypass Lenis interpolation
        // during GSAP layout recalculations
        const y = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, left: 0, behavior: "instant" });
      }
    };

    // 1. Initial attempt for standard Next.js routing
    requestAnimationFrame(handleScroll);

    // 2. The core fix: listen for GSAP to finish its pin-spacer calculations
    ScrollTrigger.addEventListener("refresh", handleScroll);

    // Clean up listener to prevent scroll-jumping if user resizes window later
    const timer = setTimeout(() => {
      ScrollTrigger.removeEventListener("refresh", handleScroll);
    }, 2000);

    return () => {
      ScrollTrigger.removeEventListener("refresh", handleScroll);
      clearTimeout(timer);
    };
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    // Force close menu even if it is currently animating open.
    // This fixes the bug where users had to double-click links.
    setIsOpen(false);
  };

  // 1. Initialize SplitText on mount
  useIsomorphicLayoutEffect(() => {
    if (!menuLinksContainerRef.current) return;
    const linkElements = Array.from(menuLinksContainerRef.current.querySelectorAll("a"));
    
    const currentSplits = linkElements.map(
      (link) => new SplitText(link, { type: "chars", charsClass: "char" })
    );
    splitsRef.current = currentSplits;

    // Initial CSS state for menu items
    const chars = currentSplits.flatMap((s) => s.chars);
    gsap.set(chars, { opacity: 0, x: "750%" });
    
    const infoItems = menuInfoItemsRef.current.filter(Boolean);
    gsap.set(infoItems, { opacity: 0, y: 100 });

    hasMounted.current = true;

    return () => {
      currentSplits.forEach((s) => s.revert());
      splitsRef.current = [];
    };
  }, []);

  // 2. Handle Animations when isOpen changes
  useIsomorphicLayoutEffect(() => {
    if (!hasMounted.current || !menuBgSvgRef.current || !menuBgPathRef.current) return;

    // The SVG paths MUST be drawn in the viewBox coordinate system (0 0 1133 861),
    // NOT the actual screen pixels, because preserveAspectRatio="none" stretches it.
    const svgWidth = 1133;
    const svgHeight = 861;
    const svgCenterX = svgWidth / 2;

    const OPEN_HIDDEN = `M${svgWidth},0 L${svgWidth},0 Q${svgCenterX},0 0,0 L0,0 Z`;
    const OPEN_BULGE = `M${svgWidth},0 L${svgWidth},345 Q${svgCenterX},620 0,345 L0,0 Z`;
    const OPEN_FULL = `M${svgWidth},0 L${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,0 Z`;
    const CLOSE_START = `M${svgWidth},0 L${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,0 Z`;
    const CLOSE_BULGE = `M${svgWidth},${svgHeight} L${svgWidth},350 Q${svgCenterX},130 0,350 L0,${svgHeight} Z`;
    const CLOSE_HIDDEN = `M${svgWidth},${svgHeight} L${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,${svgHeight} Z`;

    const infoItems = menuInfoItemsRef.current.filter(Boolean);
    const linkElements = Array.from(menuLinksContainerRef.current!.querySelectorAll("a"));
    const chars = splitsRef.current.flatMap((s) => s.chars);

    // Kill any existing timeline so animations don't conflict
    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (isOpen) {
      // OPEN ANIMATION
      isAnimating.current = true;
      gsap.to(navToggleMenuRef.current, { duration: 0.25, opacity: 0, ease: "none" });
      gsap.to(navToggleCloseRef.current, { duration: 0.25, opacity: 1, ease: "none", delay: 0.25 });

      // Ensure starting positions are reset
      gsap.set(chars, { opacity: 0, x: "750%" });
      gsap.set(linkElements, { opacity: 1 });
      gsap.set(infoItems, { opacity: 0, y: 100 });
      gsap.set(menuBgPathRef.current, { attr: { d: OPEN_HIDDEN } });

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });
      tlRef.current = tl;

      tl.to(menuBgPathRef.current, { duration: 0.35, attr: { d: OPEN_BULGE }, ease: "power2.in" })
        .to(menuBgPathRef.current, { duration: 0.35, attr: { d: OPEN_FULL }, ease: "power2.out" })
        .to(menuLogoRef.current, { duration: 0.75, opacity: 1, ease: "none" }, "-=0.75")
        .to(infoItems, { duration: 0.75, opacity: 1, y: 0, ease: "power3.out", stagger: 0.075 }, "-=0.75")
        .to(chars, { duration: 1.5, x: "0%", ease: "elastic.out(1, 0.25)", stagger: 0.01 }, 0.45)
        .to(chars, { duration: 0.75, opacity: 1, ease: "power2.out", stagger: 0.01 }, 0.45);
    } else {
      // CLOSE ANIMATION
      const currentPathD = menuBgPathRef.current.getAttribute("d");
      
      if (currentPathD !== OPEN_HIDDEN && currentPathD !== CLOSE_HIDDEN && currentPathD) {
        isAnimating.current = true;
        gsap.set(menuBgPathRef.current, { attr: { d: CLOSE_START } });

        gsap.to(navToggleCloseRef.current, { duration: 0.3, opacity: 0, ease: "none" });
        gsap.to(navToggleMenuRef.current, { duration: 0.3, opacity: 1, ease: "none", delay: 0.25 });

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(menuBgPathRef.current, { attr: { d: OPEN_HIDDEN } });
            gsap.set(chars, { opacity: 0, x: "750%" });
            gsap.set(linkElements, { opacity: 1 });
            gsap.set(infoItems, { opacity: 0, y: 100 });
            isAnimating.current = false;
          },
        });
        tlRef.current = tl;

        tl.to(menuLogoRef.current, { duration: 0.3, opacity: 0, ease: "none" }, 0)
          .to(linkElements, { duration: 0.3, opacity: 0, ease: "none" }, 0)
          .to(infoItems, { duration: 0.3, opacity: 0, ease: "none" }, 0)
          .to(menuBgPathRef.current, { duration: 0.35, attr: { d: CLOSE_BULGE }, ease: "power2.in" }, 0)
          .to(menuBgPathRef.current, { duration: 0.35, attr: { d: CLOSE_HIDDEN }, ease: "power2.out" });
      } else {
        // Initial hidden state
        gsap.set(menuBgPathRef.current, { attr: { d: OPEN_HIDDEN } });
        gsap.set(navToggleCloseRef.current, { opacity: 0 });
        gsap.set(navToggleMenuRef.current, { opacity: 1 });
      }
    }
  }, [isOpen]);

  // Logo component reuse
  const Logo = () => (
    <div className="text-logo">
      Kc <span>Casipit</span>
    </div>
  );

  return (
    <div className="nav">
      <div className="nav-logo">
        {isProjectPage ? (
          <Link href="/" onClick={closeMenu}><Logo /></Link>
        ) : (
          <a href="#home" onClick={closeMenu}><Logo /></a>
        )}
      </div>

      <div className="nav-toggle" onClick={toggleMenu}>
        <p className="nav-toggle-menu" ref={navToggleMenuRef}>Menu</p>
        <p className="nav-toggle-close" ref={navToggleCloseRef}>Close</p>
      </div>

      <div className={`menu ${isOpen ? "is-open" : ""}`} ref={menuRef}>
        <svg className="menu-bg-svg" viewBox="0 0 1133 861" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" ref={menuBgSvgRef}>
          <path id="menu-path" fill="var(--second-bg-color)" d="" ref={menuBgPathRef} />
        </svg>

        <div className="menu-logo" ref={menuLogoRef}>
          {isProjectPage ? (
            <a href="/" onClick={closeMenu}><Logo /></a>
          ) : (
            <a href="#home" onClick={closeMenu}><Logo /></a>
          )}
        </div>

        <div className="menu-col menu-col-info">
          <p ref={(el) => { menuInfoItemsRef.current[0] = el; }}>Get in touch</p>
          <a href="mailto:casipitkylechristian@gmail.com" ref={(el) => { menuInfoItemsRef.current[1] = el; }}>casipitkylechristian@gmail.com</a>

          <br />
          <br />
          <h6 ref={(el) => { menuInfoItemsRef.current[3] = el; }}>Metro Manila, <br />Philippines</h6>
        </div>

        <div className="menu-col menu-col-links" ref={menuLinksContainerRef}>
          {isProjectPage ? (
            <>
              <a href="/" onClick={closeMenu}>home</a>
              <Link href="/#projects" onClick={closeMenu}>projects</Link>
              <Link href="/about" onClick={closeMenu}>about</Link>
              <Link href="/#contact" onClick={closeMenu}>contact</Link>
            </>
          ) : (
            <>
              <a href="#home" onClick={closeMenu}>home</a>
              <a href="#projects" onClick={closeMenu}>projects</a>
              <Link href="/about" onClick={closeMenu}>about</Link>
              <a href="#contact" onClick={closeMenu}>contact</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
