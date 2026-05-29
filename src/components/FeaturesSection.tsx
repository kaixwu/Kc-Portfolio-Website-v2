"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ── Content adapted for Kc's portfolio ──────────────────────
const FEATURES = [
  {
    img: "/assets/img/kc-org-img1.jpg",
    alt: "Discovery & Planning",
    text: "Deep dive into project goals, target audience, and requirements to create a solid foundation for everything that follows.",
  },
  {
    img: "/assets/img/kc-org-img2.jpg",
    alt: "Design & Prototyping",
    text: "Craft wireframes and high-fidelity prototypes in Figma, refining the visual identity and user experience until it feels right.",
  },
  {
    img: "/assets/img/kc-org-img3.jpg",
    alt: "Development & Build",
    text: "Bring designs to life with clean, semantic code — building responsive layouts with modern web technologies like Next.js.",
  },
  {
    img: "/assets/img/kc-org-img4.jpg",
    alt: "Testing & Refinement",
    text: "Thorough cross-browser and cross-device testing to ensure everything works flawlessly on every screen and device.",
  },
  {
    img: "/assets/img/kc-org-img5.jpg",
    alt: "Launch & Delivery",
    text: "Deploy the final product, perform final QA, and hand off a fully functional website ready to make a real impact.",
  },
];

const SUBHEADINGS = [
  "planning",
  "prototyping",
  "development",
  "refinement",
  "delivery",
];

// ── Arc animation constants ─────────────────────────────────
// 5 real cards + 2 empty = 7 total (matches original totalCards)
const TOTAL_CARDS = FEATURES.length + 2; // 7
const ARC_ANGLE = Math.PI * 0.4;
const START_ANGLE = Math.PI / 2 - ARC_ANGLE / 2;
// totalTravel = 1 + totalCards / 7 = 1 + 7/7 = 2
const TOTAL_TRAVEL = 1 + TOTAL_CARDS / 7;

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countContainerRef = useRef<HTMLDivElement>(null);

  // Play/pause video based on viewport visibility to save GPU/Battery
  useIsomorphicLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useIsomorphicLayoutEffect(() => {
    // Sticky scroll height — optimized to prevent empty black scroll space at the end
    const stickyHeight = window.innerHeight * 2.0;

    // Responsive radius — standardizing breakpoint to 1024px for iPad Pro support
    const getRadius = () =>
      window.innerWidth <= 1024
        ? window.innerWidth * 7.5
        : window.innerWidth * 2.5;

    // Counter element height changes at breakpoints to match CSS
    const getCounterH = () => {
      const w = window.innerWidth;
      if (w < 480) return 30; // Mobile
      if (w < 850) return 35; // iPad Air / Standard Tablet
      if (w <= 1024) return 40; // iPad Pro / Large Tablet
      return 50; // Desktop
    };

    // ── Reconstructed positionCards ──────────────────────────────────
    function positionCards(progress: number) {
      const radius = getRadius();
      const h = getCounterH();

      // Position each card along the arc
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        // Progress for this specific card along the arc (starts with first card centered)
        const p = 0.5 + progress * (4 / TOTAL_CARDS) - i / TOTAL_CARDS;
        const angle = START_ANGLE + ARC_ANGLE * p;

        // Convert polar → Cartesian (screen coords: y grows downward)
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        // Rotation keeps card perpendicular to the arc tangent
        const rotation = -(angle - Math.PI / 2) * (180 / Math.PI);

        gsap.set(card, {
          x,
          // -(y - radius) means: at angle=PI/2 (top) → y_screen=0 (center),
          // approaching from below (+y) and exiting above (-y)
          y: -(y - radius),
          rotation,
        });
      });

      // ── Counter: find the last real card that has passed the arc midpoint ──
      // When a card's p >= 0.5, it has reached or passed the front-center position
      let activeStep = -1; // -1 = no card at front yet → counter hidden
      for (let i = 0; i < FEATURES.length; i++) {
        const p = 0.5 + progress * (4 / TOTAL_CARDS) - i / TOTAL_CARDS;
        if (p >= 0.5) activeStep = i;
      }

      if (countContainerRef.current) {
        // activeStep === -1 → push counter below clip (hidden)
        // activeStep  >=  0 → snap to the matching number
        gsap.set(countContainerRef.current, {
          y: activeStep === -1 ? h : -h * activeStep,
        });
      }
    }

    // Initialise card positions before any scroll
    positionCards(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${stickyHeight}px`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => positionCards(self.progress),
      });
    }, sectionRef);

    return () => {
      // Explicitly kill every ScrollTrigger whose trigger element is inside
      // this section BEFORE calling ctx.revert(). GSAP's pin:true injects a
      // pin-spacer <div> into the real DOM; if we let React unmount first,
      // the spacer is already orphaned and ScrollTrigger.revert() throws
      // "removeChild: not a child of this node". Killing first removes spacers cleanly.
      const section = sectionRef.current;
      ScrollTrigger.getAll().forEach((st) => {
        if (section && st.trigger && section.contains(st.trigger as Node)) {
          st.kill(true);
        }
      });
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* ── Features Section ─────────────────────────────────── */}
      <section className="features-sect" ref={sectionRef} id="features">
        
        {/* Background Video */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="features-bg-video"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.35 // Make it subtle to not overpower the content
          }}
        >
          <source src="/assets/vids/features-bg.mp4" type="video/mp4" />
        </video>

        {/* Video Attribution */}
        <div style={{
          position: "absolute",
          bottom: "10px",
          right: "15px",
          zIndex: 1,
          fontSize: "0.75rem",
          color: "rgba(255, 255, 255, 0.3)",
        }}>
          Video by <a href="https://pixabay.com/users/olenchic-16658974/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=202587" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>Olena</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=202587" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>Pixabay</a>
        </div>

        {/* Feature Counter */}
        <div className="features-counter" style={{ zIndex: 1 }}>
          <div className="features-counter-title">
            <span className="features-counter-h">Features</span>
          </div>
          <div className="features-count">
            <div className="features-count-container" ref={countContainerRef}>
              {SUBHEADINGS.map((text, idx) => (
                <span className="features-count-h" key={idx}>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Arc Cards */}
        <div className="features-cards" style={{ zIndex: 1 }}>
          {FEATURES.map((feature, i) => (
            <div
              className="features-card"
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <div className="features-card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={feature.img} alt={feature.alt} />
              </div>
              <div className="features-card-content">
                <p>{feature.text}</p>
              </div>
            </div>
          ))}

          {/* Two empty spacer cards — required for arc end-padding */}
          {[FEATURES.length, FEATURES.length + 1].map((idx) => (
            <div
              className="features-card features-empty"
              key={`empty-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
