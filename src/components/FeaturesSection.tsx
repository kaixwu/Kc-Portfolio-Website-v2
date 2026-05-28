"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Features Section ─────────────────────────────────── */}
      <section className="features-sect" ref={sectionRef} id="features">
        {/* Feature Counter */}
        <div className="features-counter">
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
        <div className="features-cards">
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
